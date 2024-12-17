<script lang="ts">
    import { getMoreDemandedItems } from "./MoreDemandedItems";
    import { inventory } from "../../Data";
    import Stat from "../Stat.svelte";
</script>

<Stat
    xText="Items"
    yText="More demanded items"
    dataCallback={() => getMoreDemandedItems($inventory)}
    HEXColor={"#4caf50"}
/>
