<script lang="ts">
    import { whoBringsMoreStateProportionallyFromOtherStates } from "./WhoBringsMoreBrokenOnesProportionallyFromNonBrokenStates";
    import { inventory, users } from "../../Data";
    import Stat from "../Stat.svelte";
</script>

<Stat
    xText="Usuarios"
    yText="Devolución dañada proporcional"
    dataCallback={() => {
        return whoBringsMoreStateProportionallyFromOtherStates(
            "dañado",
            $inventory,
            $users,
        );
    }}
    HEXColor={"#4bc0c0"}
/>
