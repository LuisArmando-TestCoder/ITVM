<script lang="ts">
    import Items from "./Items.svelte";
    import Users from "./Users.svelte";

</script>

<div class="container">
    <Items/>
    <Users/>
</div>

<style lang="scss">
    :global(*) {
        color: var(--color-background);
        background: transparent;
    }
</style>
