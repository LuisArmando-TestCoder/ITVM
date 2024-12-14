<script lang="ts">
  //   import X from "../X/X.svelte";
  //   import { onMount } from "svelte";
  import { componentState } from "../../store";
  import X from "../X/X.svelte";

  let isChecked: boolean = true;

  export let id: number;
  let isModalOpen: boolean = false;

  // Subscribe to the global store
  componentState.subscribe((value) => {
    id = value.id as number;
    isModalOpen = value.isOpen;
  });

  function triggerModal(isOpen: boolean) {
    componentState.update(() => ({ id, isOpen }));
  }

  // You can react to state changes, e.g., do something when the state changes
  $: console.log("State updated: ", { id, isModalOpen });

  //   onMount(() => {
  //     // Listen for changes to sessionStorage to dynamically open/close the modal
  //     // Listen to URL parameters to control modal visibility
  //     const urlParams = new URLSearchParams(window.location.search);
  //     const storedState = Boolean(sessionStorage.getItem("modalOpen"));
  //     isModalOpen = storedState || Boolean(urlParams.get("modal"));
  //   });
</script>

<div
  class="modal-backdrop {isModalOpen}"
  on:click={() => {
    triggerModal(false);
  }}
></div>
<div class="modal {isModalOpen}">
  <div class="menu-x">
    <X
      isChecked={true}
      trigger={() => {
        triggerModal(false);

        return true;
      }}
    />
  </div>
  <div class="modal-content">
    <slot></slot>
  </div>
</div>

<style lang="scss">
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 100vh;
    margin: 0;
    object-fit: cover;
    box-sizing: border-box;
    background: #0004;
    z-index: 2;
    opacity: 0;
    pointer-events: none;
    user-select: none;
    display: none;
    transition: var(--transition-shortest-duration);

    &.true {
      opacity: 1;
      pointer-events: all;
      user-select: auto;
      display: block;
    }
  }

  .menu-x {
    position: absolute;
    top: calc(var(--ham-size));
    right: calc(var(--ham-size));
    --color-foreground: var(--color-background);
    --ham-size: 25rem;
  }

  .modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: min(100vw, 575rem);
    z-index: 2;
    border-radius: 15rem;
    font-family: var(--font-subtitle);
    background: var(--color-background);
    height: 75vh;
    display: grid;
    place-items: center;
    place-self: center;
    opacity: 0;
    pointer-events: none;
    user-select: none;
    display: none;
    transition: var(--transition-shortest-duration) opacity;

    &.true {
      opacity: 1;
      pointer-events: all;
      user-select: auto;
      display: block;
    }

    @media screen and (max-width: 1024px) {
      height: 100vh;
      border-radius: 0;
      width: 100vw;
    }
  }

  .modal-content {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding: calc(var(--ham-size));
    display: grid;
    grid-template-rows: 1fr;
  }
  /* Same SCSS as the previous version */
</style>
