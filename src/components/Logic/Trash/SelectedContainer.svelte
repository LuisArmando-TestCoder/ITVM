<script lang="ts">
    import { selectedItem, selectedUser } from "./store";

    // Remove selected user or item
    const removeSelectedUser = () => selectedUser.set(null);
    const removeSelectedItem = () => selectedItem.set(null);
</script>

<!-- Selected User Container -->
<section class="selected-container">
    <span class="container__subtitle">Selected User</span>
    {#if $selectedUser}
        <span class="tag">
            <span>{$selectedUser.name}</span>
            <button class="tag-remove" on:click={removeSelectedUser}>
                &times;
            </button>
        </span>
    {:else}
        <p>No user selected.</p>
    {/if}
</section>

<!-- Selected Item Container -->
<section class="selected-container">
    <span class="container__subtitle">Selected Item</span>
    {#if $selectedItem}
        <span class="tag">
            <span>{$selectedItem.name}</span>
            <button class="tag-remove" on:click={removeSelectedItem}>
                &times;
            </button>
        </span>
    {:else}
        <p>No item selected.</p>
    {/if}
</section>

<style lang="scss">
    @import "./styles.scss";
</style>
