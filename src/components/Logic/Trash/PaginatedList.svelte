<script lang="ts">
    import { derived, writable } from "svelte/store";
    import {
        searchQuery,
        searchType,
        selectedItem,
        selectedUser,
    } from "./store";
    import type { Inventory, User } from "./types";
    import { inventory as defaultInventory, users as defaultUsers } from "./Data";

    // Reactive states
    let inventory = writable<Inventory>($defaultInventory as Inventory);
    let users = writable<User[]>($defaultUsers as unknown as User[]);

    // Pagination settings
    const itemsPerPage = writable(3); // Default: 3 items per page
    const currentPage = writable(1);

    // Derived stores for search
    const filteredItems = derived(
        [inventory, searchQuery, searchType],
        ([$inventory, $searchQuery, $searchType]) => {
            if ($searchType !== "items") return [];
            const query = $searchQuery.toLowerCase().trim();
            return query
                ? $inventory.items.filter(
                      (item) =>
                          item.name.toLowerCase().includes(query) ||
                          item.state.toLowerCase().includes(query),
                  )
                : $inventory.items;
        },
    );

    const filteredUsers = derived(
        [users, searchQuery, searchType],
        ([$users, $searchQuery, $searchType]) => {
            if ($searchType !== "users") return [];
            const query = $searchQuery.toLowerCase().trim();
            return query
                ? $users.filter((user) =>
                      user.name.toLowerCase().includes(query),
                  )
                : $users;
        },
    );

    // Paginated items derived from filteredItems
    const paginatedItems = derived(
        [filteredItems, currentPage, itemsPerPage],
        ([$filteredItems, $currentPage, $itemsPerPage]) => {
            const startIndex = ($currentPage - 1) * $itemsPerPage;
            const endIndex = startIndex + $itemsPerPage;
            return $filteredItems.slice(startIndex, endIndex);
        },
    );

    // Paginated users derived from filteredUsers
    const paginatedUsers = derived(
        [filteredUsers, currentPage, itemsPerPage],
        ([$filteredUsers, $currentPage, $itemsPerPage]) => {
            const startIndex = ($currentPage - 1) * $itemsPerPage;
            const endIndex = startIndex + $itemsPerPage;
            return $filteredUsers.slice(startIndex, endIndex);
        },
    );

    // Total pages
    const totalPages = derived(
        [searchType, filteredItems, filteredUsers, itemsPerPage],
        ([$searchType, $filteredItems, $filteredUsers, $itemsPerPage]) => {
            const total =
                $searchType === "items"
                    ? $filteredItems.length
                    : $filteredUsers.length;
            return Math.ceil(total / $itemsPerPage);
        },
    );

    // Visible pages for pagination (limit 5 at a time)
    const visiblePages = derived(
        [currentPage, totalPages],
        ([$currentPage, $totalPages]) => {
            const maxVisible = 5;
            const half = Math.floor(maxVisible / 2);

            let start = Math.max(1, $currentPage - half);
            let end = Math.min($totalPages, start + maxVisible - 1);

            // Adjust start if end is hitting the limit
            start = Math.max(1, end - maxVisible + 1);

            return Array.from({ length: end - start + 1 }, (_, i) => start + i);
        },
    );

    // Change page logic
    const goToPage = (page: number) => {
        currentPage.set(Math.max(1, Math.min(page, $totalPages)));
    };
</script>


<section class="container__content">
    <h2 class="container__subtitle">{$searchType}</h2>

    <ul class="list">
        {#if $searchType === "items"}
            {#each $paginatedItems as item (item.id)}
                <li>
                    <button
                        type="button"
                        on:click={() => selectedItem.set(item)}
                        class:selected={$selectedItem?.id === item.id}
                        aria-label="Select item {item.name}"
                    >
                        <strong>{item.name}</strong> (State: {item.state}) -
                        Movements: {item.movements.length}
                    </button>
                </li>
            {/each}
        {:else if $searchType === "users"}
            {#each $paginatedUsers as user (user.id)}
                <li>
                    <button
                        type="button"
                        on:click={() => selectedUser.set(user)}
                        class:selected={$selectedUser?.id === user.id}
                        aria-label="Select user {user.name}"
                    >
                        <strong>{user.name}</strong> ({user.userType.name})
                    </button>
                </li>
            {/each}
        {/if}
    </ul>

    
    <!-- Pagination Controls -->
    <div class="pagination">
        <button
            type="button"
            on:click={() => goToPage($currentPage - 1)}
            disabled={$currentPage === 1}
        >
            &laquo; Prev
        </button>
        {#each $visiblePages as page}
            <button
                type="button"
                on:click={() => goToPage(page)}
                class:selected={page === $currentPage}
            >
                {page}
            </button>
        {/each}
        <button
            type="button"
            on:click={() => goToPage($currentPage + 1)}
            disabled={$currentPage === $totalPages}
        >
            Next &raquo;
        </button>
    </div>
</section>

<style lang="scss">
    @import "./styles.scss";

    .pagination {
        display: flex;
        gap: 8px;
        justify-content: center;
        margin-top: 16px;

        button {
            padding: 8px 12px;
            border: 1px solid var(--color-outline);
            background: var(--color-background);
            color: var(--color-foreground);
            cursor: pointer;

            &.selected {
                background: var(--color-highlight);
                color: #fff;
            }

            &:disabled {
                cursor: not-allowed;
                opacity: 0.6;
            }
        }
    }
</style>
