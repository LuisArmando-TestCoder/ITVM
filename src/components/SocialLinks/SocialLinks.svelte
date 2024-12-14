<script lang="ts">
  import { onMount } from "svelte";
  import { playTick } from "../audioInteractions";

  const items: HTMLElement[] = [];

  onMount(() => {
    window.addEventListener("mouseover", () => {
      items.forEach((item) => {
        if (item?.matches(":hover") || item?.matches(":focus")) {
          playTick();
        }
      });
    });

    items.forEach((item) => {
      item.addEventListener("focus", () => {
        playTick();
      });
      item.addEventListener("click", () => {
        playTick();
        item.blur();
      });
    });
  });
</script>

<ul class="icons">
  <li class="icon-list-item">
    <a
      bind:this={items[items.length]}
      target="_blank"
      class="icon-anchor"
      href="https://www.facebook.com/share/17qmD6W4ja/"
      ><img src="./icons/facebook-brands-solid.svg" alt="" class="icon" /></a
    >
  </li>
  <li class="icon-list-item">
    <a
      bind:this={items[items.length]}
      target="_blank"
      class="icon-anchor"
      href="https://www.tiktok.com/@protectia.legal?_t=8rHSjwliVoF&_r=1"
      ><img src="./icons/tiktok-brands-solid.svg" alt="" class="icon" /></a
    >
  </li>
  <li class="icon-list-item">
    <a
      bind:this={items[items.length]}
      target="_blank"
      class="icon-anchor"
      href="https://www.instagram.com/protectialegal/profilecard/?igsh=dGQ2MGk5Ynoyb2Ji"
      ><img
        src="./icons/square-instagram-brands-solid.svg"
        alt=""
        class="icon"
      /></a
    >
  </li>
  <li class="icon-list-item">
    <a
      bind:this={items[items.length]}
      target="_blank"
      class="icon-anchor"
      href="https://www.linkedin.com/in/benigna-baltodano-0a2433a8/"
      ><img src="./icons/linkedin-brands-solid.svg" alt="" class="icon" /></a
    >
  </li>
</ul>

<style lang="scss">
  .icons {
    display: flex;
    justify-content: space-between;
    margin: 0;
    padding: 0 0 100rem 25rem;
    list-style: none;

    @media screen and (min-width: 440px) {
      padding: 0 0 100rem 100rem;
    }

    @media screen and (min-width: 1024px) {
      padding: 0 0 100rem 200rem;
    }
  }

  .icon {
    width: 25rem;
    cursor: pointer;

    &:hover {
      transform: scale(1.1);
    }
  }
</style>
