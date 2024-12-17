<script lang="ts">
    import Items from "./Items.svelte";
    import { errorDisclaimer } from "./store";
    import Users from "./Users.svelte";
    import WhoBringsMoreBrokenOnesProportionallyFromNonBrokenStates from "./stats/WhoBringsMoreBrokenOnesProportionallyFromNonBrokenStates/WhoBringsMoreBrokenOnesProportionallyFromNonBrokenStates.svelte";
    import { inventory, users } from "./Data";
    import MoreDemandedItems from "./stats/MoreDemandedItems/MoreDemandedItems.svelte";
</script>

<h1>ITVM / Inventory Management</h1>
<p class="error">{$errorDisclaimer || ""}</p>
<div class="container">
    <Items />
    <Users />
</div>
<div class="container">
    <WhoBringsMoreBrokenOnesProportionallyFromNonBrokenStates />
    <MoreDemandedItems/>
</div>
<style lang="scss">
    .error {
        color: red;
        padding: 0 100px;
        font-family: var(--font-subtitle);
    }

    :global(*:not(span,strong)) {
        user-select: none;
        box-sizing: border-box;
        color: var(--color-background);
        background: transparent;
    }

    h1 {
        font-size: 24px;
        font-family: var(--font-title);
        padding: 100px 100px 0;
    }

    .container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        grid-gap: 25px;
        padding: 100px;
    }
</style>
