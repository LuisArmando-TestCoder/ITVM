<script lang="ts">
    import { searchQuery, searchType } from "./store";
</script>

<!-- Header Section with Search Bar -->
<header>
    <h1 class="container__title">Inventory Management</h1>
    <div class="search-container">
        <select bind:value={$searchType} class="search-type">
            <option value="items">Search Items</option>
            <option value="users">Search Users</option>
        </select>
        <input
            type="text"
            class="search-bar"
            placeholder="Search..."
            bind:value={$searchQuery}
        />
    </div>
</header>

<style style="scss">
    @import "./styles.scss";
</style>