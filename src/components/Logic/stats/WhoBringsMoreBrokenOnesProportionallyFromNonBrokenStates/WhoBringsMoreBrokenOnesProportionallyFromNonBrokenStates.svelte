<script lang="ts">
    import { whoBringsMoreStateProportionallyFromOtherStates } from "./WhoBringsMoreBrokenOnesProportionallyFromNonBrokenStates";
    import { inventory, users } from "../../Data";
    import Stat from "../Stat.svelte";
</script>

<Stat
    xText="Users"
    yText="Proportional Broken Items"
    dataCallback={() => {
        return whoBringsMoreStateProportionallyFromOtherStates(
            "broken",
            $inventory,
            $users,
        );
    }}
    HEXColor={"#4bc0c0"}
/>
