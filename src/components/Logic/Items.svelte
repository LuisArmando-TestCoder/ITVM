<script lang="ts">
    import type { ChangeEventHandler } from "svelte/elements";
    import type { Inventory, Item, User } from "./types";
    import { onMount } from "svelte";
    import { inventory, users } from "./Data";
    import { get, writable, type Writable } from "svelte/store";
    import changeDisplayedObjects from "./changeDisplayedObjects";
    import toggleObjects from "./toggleObjects";
    import { errorDisclaimer, takenItem, takenUser } from "./store";
    import moveItem from "./moveItem";
    import forceReRender from "./forceReRender";

    let inputElement: HTMLInputElement;
    let displayedItems = writable<Item[]>();
    let itemsToggles = writable<{
        [index: string]: boolean;
    }>();

    onMount(() => {
        displayedItems.set($inventory.items);
        itemsToggles.set(
            Object.fromEntries(
                $inventory.items.map((item) => [item.id, false]),
            ),
        );
    });

    function handleItemDropIn(): any {
        const result = moveItem({
            itemId: $takenItem.id,
            movementType: "in",
            state: $takenItem.state,
            userId: $takenUser?.id,
        });

        if (result instanceof Error) {
            errorDisclaimer.set(result);

            return;
        }

        forceReRender();
    }

    function handleDragStart(displayedItem: Item) {
        takenItem.set(displayedItem);
    }

    function adjustIsoDateByGmt(isoDate: string, gmtOffset: number) {
        const offsetMilliseconds = gmtOffset * 60 * 60 * 1000;
        const adjustedDate = new Date(
            new Date(isoDate).getTime() + offsetMilliseconds,
        );

        // Format the date to a human-readable string
        return adjustedDate.toLocaleString("en-EN", {
            timeZone: "UTC", // Keep time zone consistent with GMT offset
            dateStyle: "full",
            timeStyle: "short",
        });
    }

    function getElementById(elements: Item[], elementId: string): Item {
        return elements.find(({ id }) => elementId === id) as Item;
    }
</script>

<div class="objects">
    <div class="search">
        <input
            type="text"
            placeholder="Look for inventory items"
            bind:this={inputElement}
            on:input={changeDisplayedObjects({
                inputElement,
                listToChange: displayedItems,
                listToLookUp: $inventory.items,
                elementsToLookInto: ["name", "id", "state"],
            })}
        />
    </div>
    <ul
        on:dragover|preventDefault
        on:drop={() => handleItemDropIn()}
        class="objects--list"
    >
        {#if $displayedItems}
            {#each $displayedItems as displayedItem}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                <li
                    class="objects--list-item"
                    draggable="true"
                    on:dragstart={() => handleDragStart(displayedItem)}
                    on:click={() => {
                        toggleObjects(itemsToggles, displayedItem.id);
                    }}
                >
                    <b class="objects--list-item-name">{displayedItem.name}</b>
                    <span class="objects--special-copy"
                        >({displayedItem.state})</span
                    >
                    {@html (() => {
                        const user = $users.find(({ currentItemsIds }) =>
                            currentItemsIds.find(
                                (id) => id === displayedItem.id,
                            ),
                        );

                        return user?.name
                            ? ` | Currently being witheld by ${
                                  user.name
                              }, id <strong class="objects--special">${
                                  user.id
                              }</strong>`
                            : "";
                    })()}
                    <div
                        class="objects--info {$itemsToggles[displayedItem.id]}"
                    >
                        <ul class="secondary">
                            <li class="objects--list-item no-shadow">
                                <ul>
                                    <li>
                                        ID: <strong class="objects--special"
                                            >{displayedItem.id}</strong
                                        >
                                    </li>
                                    <li>
                                        Category: <strong
                                            class="objects--special-copy"
                                            >{displayedItem.category}</strong
                                        >
                                    </li>
                                    <li>
                                        Price: <strong
                                            class="objects--special-copy"
                                            >${displayedItem.price}</strong
                                        >
                                    </li>
                                </ul>
                            </li>
                            {#if getElementById($inventory.items, displayedItem.id).movements.length}
                                <li class="objects--list-item">
                                    <ul>
                                        {#each getElementById($inventory.items, displayedItem.id).movements as movement}
                                            <li>
                                                <strong
                                                    class="objects--special-copy"
                                                    >{$users.find(({ id }) => {
                                                        return (
                                                            id ===
                                                            movement.userId
                                                        );
                                                    })?.name}</strong
                                                >
                                                with the id
                                                <strong class="objects--special"
                                                    >{$users.find(({ id }) => {
                                                        return (
                                                            id ===
                                                            movement.userId
                                                        );
                                                    })?.id}</strong
                                                >
                                                {movement.type === "in"
                                                    ? "deposited"
                                                    : "took"}
                                                the item
                                                {movement.type === "in"
                                                    ? "into"
                                                    : "from"}
                                                the inventory at
                                                {adjustIsoDateByGmt(
                                                    movement.time,
                                                    -6,
                                                )}
                                            </li>
                                        {/each}
                                    </ul>
                                </li>
                            {/if}
                        </ul>
                    </div>
                </li>
            {/each}
        {/if}
    </ul>
</div>

<style lang="scss">
    @import "./style.scss";
</style>
