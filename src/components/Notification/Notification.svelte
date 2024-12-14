<script lang="ts">
  import { notificationStore } from "./store";
</script>

<div class="notification modal {$notificationStore.current !== 'off' ? 'active' : ''}">
  <div class="modal-content">
    {#if $notificationStore.current === "loading"}
      <p class="animated-dots">{$notificationStore.content}</p>
      <slot />
    {:else if $notificationStore.current === "success"}
      <p class="animated-dots">{$notificationStore.content}</p>
    {/if}
  </div>
</div>

<style lang="scss">
  .animated-dots {
    position: relative;
    padding: 20rem;

    &::after {
      --dot-width: 4.5rem;
      content: "";
      display: inline-block;
      animation: dots 1.5s steps(1, end) infinite;
      margin-left: -5rem;
    }
  }
  @keyframes dots {
    0% {
      content: ".";
      margin-right: calc(var(--dot-width) * -1);
    }
    33% {
      content: "..";
      margin-right: calc(var(--dot-width) * -2);
    }
    66% {
      content: "...";
      margin-right: calc(var(--dot-width) * -3);
    }
    100% {
      content: "";
      margin-right: 0;
    }
  }

  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    visibility: hidden;
    opacity: 0;
    transition:
      visibility 0s,
      opacity 0.3s ease;
      display: none;

    &.active {
      visibility: visible;
      opacity: 1;
      display: flex;
    }
  }

  .modal-content {
    background: white;
    border-radius: 8rem;
    box-shadow: 0 4rem 6rem rgba(0, 0, 0, 0.1);
    text-align: center;
    width: min(100%, 800rem);
    height: min(100%, 400rem);

    h2 {
      margin-bottom: 10rem;
      font-size: 1.5rem;
    }

    p {
      margin-bottom: 20rem;
    }

    button {
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4rem;
      padding: 10rem 20rem;
      font-size: 1rem;
      cursor: pointer;

      &:hover {
        background: #0056b3;
      }
    }
  }
</style>
