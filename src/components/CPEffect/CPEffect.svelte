<script lang="ts">
    import { onMount } from "svelte";

    let cpcanvas: HTMLCanvasElement;
    export let effectFunction: () => void;

    if (effectFunction) {
        onMount(effectFunction);
    }
</script>
<canvas class="cpcanvas" bind:this={cpcanvas} />
<style lang="scss">
    .cpcanvas {
        pointer-events: none;
        filter: blur(5px) contrast(10);
    }    
</style>