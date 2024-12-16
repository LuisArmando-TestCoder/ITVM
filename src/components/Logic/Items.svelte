<script lang="ts">
    import type { ChangeEventHandler } from "svelte/elements";
    import type { Inventory, Item } from "./types";
    import { onMount } from "svelte";
    import { inventory } from "./Data";
    import { writable, type Writable } from "svelte/store";
    import changeDisplayedObjects from "./changeDisplayedItems";

    let inputElement: HTMLInputElement;
    let displayedItems = writable<Item[]>();

    onMount(() => {
        displayedItems.set($inventory.items);
    });
</script>

<div class="items">
    <div class="search">
        <input
            type="text"
            bind:this={inputElement}
            on:input={changeDisplayedObjects({
                inputElement,
                listToChange: displayedItems,
                listToLookUp: $inventory.items,
                elementsToLookInto: [
                    "name",
                    "id",
                    "state"
                ],
            })}
        />
    </div>
    <ul class="items--list">
        <!-- svelte-ignore empty-block -->
        {#if $displayedItems}
            {#each $displayedItems as displayedItem}
                <li class="items--list-item">
                    <b class="items--list-item">{displayedItem.name}</b>
                </li>
            {/each}
        {/if}
    </ul>
</div>
