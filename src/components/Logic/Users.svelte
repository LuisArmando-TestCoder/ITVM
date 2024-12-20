<script lang="ts">
    import type { ChangeEventHandler } from "svelte/elements";
    import type { Item, User, UserTypeName } from "./types";
    import { onMount } from "svelte";
    import { inventory, users, userTypeNames } from "./Data";
    import { writable, type Writable } from "svelte/store";
    import changeDisplayedObjects from "./changeDisplayedObjects";
    import toggleObjects from "./toggleObjects";
    import moveItem from "./moveItem";
    import { errorDisclaimer, takenItem, takenUser } from "./store";
    import Items from "./Items.svelte";
    import forceReRender from "./forceReRender";
    import CopyToClipboard from "./CopyToClipboard/CopyToClipboard.svelte";

    let inputElement: HTMLInputElement;
    let displayedUsers = writable<User[]>();
    let usersToggles = writable<{
        [index: string]: boolean;
    }>();

    onMount(() => {
        displayedUsers.set($users);
        usersToggles.set(
            Object.fromEntries($users.map((user) => [user.id, false])),
        );
    });

    function handleItemDropOut(displayedUser: User): any {
        takenUser.set(displayedUser);

        const result = moveItem({
            itemId: $takenItem.id,
            movementType: "out",
            state: $takenItem.movements.slice(-1)[0]?.state || $takenItem.state,
            userId: $takenUser?.id,
        });

        if (result instanceof Error) {
            errorDisclaimer.set(result);

            return;
        }

        errorDisclaimer.set();

        forceReRender();
    }

    function handleDragStart(displayedItem: Item, displayedUser: User) {
        takenItem.set(displayedItem);
        takenUser.set(displayedUser);
    }

    function getItem(currentItemsId: string): Item {
        return $inventory.items.find(({ id }) => currentItemsId === id) as Item;
    }

    function getElementById(elements: User[], elementId: string): User {
        return elements.find(({ id }) => elementId === id) as User;
    }

    // function handleUserStateChange({
    //     userId,
    //     event,
    // }: {
    //     userId: string;
    //     event: { currentTarget: HTMLSelectElement };
    // }) {
    //     users.set(
    //         $users.map((user) => {
    //             const name = (
    //                 user.id === userId
    //                     ? event.currentTarget.value
    //                     : user.userType.name
    //             ) as UserTypeName;

    //             return {
    //                 ...user,
    //                 userType: {
    //                     ...user.userType,
    //                     name,
    //                 },
    //             } as User;
    //         }),
    //     );
    // }
</script>

<div class="objects">
    <div class="search">
        <input
            placeholder="Usuario a buscar (nombre, id, tipo)"
            type="text"
            bind:this={inputElement}
            on:input={changeDisplayedObjects({
                inputElement,
                listToChange: displayedUsers,
                listToLookUp: $users,
                elementsToLookInto: ["name", "id", "userType.name"],
            })}
        />
    </div>
    <ul class="objects--list">
        <!-- svelte-ignore empty-block -->
        {#if $displayedUsers}
            {#each $displayedUsers as displayedUser}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                <li
                    on:dragover|preventDefault
                    on:drop={() => handleItemDropOut(displayedUser)}
                    class="objects--list-item"
                    on:click={() => {
                        toggleObjects(usersToggles, displayedUser.id);
                    }}
                >
                    <!-- <select
                        on:click|stopPropagation
                        on:change={(event) =>
                            handleUserStateChange({
                                userId: getElementById($users, displayedUser.id).id,
                                event,
                            })}
                        class="objects--special"
                    >
                        {#each userTypeNames as value}
                            <option
                                {value}
                                selected={value === displayedUser.userType.name}
                                >{value}</option
                            >
                        {/each}
                    </select> -->
                    <strong class="objects--special"
                        >{getElementById($users, displayedUser.id).userType
                            .name}</strong
                    >
                    <CopyToClipboard>
                        <b class="objects--list-item-name"
                            >{displayedUser.name}</b
                        >
                        {#if getElementById($users, displayedUser.id).currentItemsIds.length}
                            <span class="objects--special-copy"
                                >(posee {getElementById($users, displayedUser.id)
                                    .currentItemsIds.length} objeto{getElementById(
                                    $users,
                                    displayedUser.id,
                                ).currentItemsIds.length - 1
                                    ? "s"
                                    : ""})</span
                            >
                        {/if}
                    </CopyToClipboard>
                    <div
                        class="objects--info {$usersToggles[displayedUser.id]}"
                    >
                        <ul class="secondary">
                            <li class="objects--list-item no-shadow">
                                <ul>
                                    <li>
                                        Identificación: <strong
                                            class="objects--special-copy"
                                            ><CopyToClipboard
                                                >{displayedUser.id}</CopyToClipboard
                                            ></strong
                                        >
                                    </li>
                                </ul>
                            </li>

                            {#if getElementById($users, displayedUser.id).currentItemsIds.length}
                                <li class="objects--list-item no-shadow">
                                    <h4>Actualmente posee los siguientes objetos</h4>
                                    <ul class="secondary">
                                        {#each getElementById($users, displayedUser.id).currentItemsIds as currentItemsId}
                                            <li
                                                draggable="true"
                                                on:dragstart={() =>
                                                    handleDragStart(
                                                        getItem(currentItemsId),
                                                        displayedUser,
                                                    )}
                                                class="objects--list-item"
                                            >
                                                <span
                                                    class="objects--special-copy"
                                                    ><CopyToClipboard
                                                        >{getItem(
                                                            currentItemsId,
                                                        ).name}</CopyToClipboard
                                                    ></span
                                                >
                                                con la identificación
                                                <strong
                                                    class="objects--special-copy"
                                                    ><CopyToClipboard
                                                        >{currentItemsId}</CopyToClipboard
                                                    ></strong
                                                >
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
