<script lang="ts">
    import { getMoreDemandedItems } from "./MoreDemandedItems";
    import { inventory } from "../../Data";
    import Stat from "../Stat.svelte";
</script>

<Stat
    xText="Objetos"
    yText="Demanda de objeto"
    dataCallback={() => getMoreDemandedItems($inventory)}
    HEXColor={"#4caf50"}
/>
