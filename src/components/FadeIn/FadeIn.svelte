<script lang="ts">
  import { onMount } from "svelte";
  import { type Effects } from "./Effects";
  import effects from "./Effects"
  import { setScrollingEffects } from "./ScrollingEffects";
  import { viewport } from "../SmoothScroll/store";
  import { get } from "svelte/store";

  const SA: HTMLElement[] = [];
  export let _effects: (Effects)[];

  onMount(() => {
    viewport.subscribe((node) => {
      if (!node) return;
      setEffects();
    });
  });

  function setEffects() {
    const e = ((x: HTMLElement) => x);
    setScrollingEffects(SA.filter(e), _effects.map(effect => effects[effect]), get(viewport));
  }
</script>

<div class="wrapper-fade" bind:this={SA[SA.length]}>
  <slot />
</div>

<style lang="scss">
  :global(.wrapper-fade) {
    transition: opacity 1s, clip-path 2s;

    :global(.wrapper-letter) {
      color: var(--color-foreground);
    }

    :global(li) {
      list-style: none;
    }
  }

  :global(.show) {
    // color: var(--color-background);

    :global(.wrapper-letter) {
      color: var(--color-background);
    }
  }
</style>
