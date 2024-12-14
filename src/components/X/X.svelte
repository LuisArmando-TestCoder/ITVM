<script lang="ts">
  export let trigger: Function;
  let inputElement: HTMLInputElement;
  export let isChecked: boolean = false;
</script>

<input
  on:click={() => {
    const triggerValue = trigger(isChecked);

    if (triggerValue === undefined) {
      isChecked = !isChecked;

      return;
    }

    isChecked = !!triggerValue;
  }}
  bind:this={inputElement}
  class="x {isChecked}"
  type="checkbox"
/>

<style lang="scss">
  .x {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    cursor: pointer;
    margin: auto;
    background: transparent;
    border: 0;
    width: calc(var(--ham-size) * 1.35);
    height: calc(var(--ham-size) * 1.1);
    outline: none;

    &:after,
    &:before {
      content: "";
      width: var(--ham-size);
      height: calc(var(--ham-size) * 0.05);
      background: var(--color-background);
      mix-blend-mode: difference;
      display: block;
      position: absolute;
      transition: 0.3s;
      border-radius: 50rem;
    }

    &:after {
      top: calc(var(--ham-size) * 0.4);
    }

    &:before {
      top: calc(var(--ham-size) * 0.6);
    }

    &.true {
      cursor: pointer;

      &:before {
        transform: rotate(-45deg);
      }

      &:after {
        transform: rotate(45deg);
      }

      &:after,
      &:before {
        top: calc(var(--ham-size) * 0.5);
        background: var(--color-foreground);
      }
    }

    &:active {
      cursor: pointer;

      &:after,
      &:before {
        transform: rotate(0deg);
      }
    }
  }
</style>
