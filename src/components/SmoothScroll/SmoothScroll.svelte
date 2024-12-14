<script lang="ts">
  import { onMount } from "svelte";
  import { viewport, Y } from "./store";
  import { get } from "svelte/store";

  let content: HTMLElement; // Contenido que queremos hacer scroll

  let scrollY = 0; // Valor de desplazamiento actual
  let targetScrollY = 0; // Valor objetivo del desplazamiento
  let easeFactor = 0.1; // Factor de suavizado

  // Función de animación
  function smoothScroll() {
    // Interpolar entre el desplazamiento actual y el objetivo
    scrollY += (targetScrollY - scrollY) * easeFactor;

    Y.set((targetScrollY - get(Y) * easeFactor));

    // console.log($Y)

    // Aplicar el desplazamiento al contenido
    if (content) {
      content.style.transform = `translateY(-${get(Y)}px)`;
    }

    // Continuar la animación en el siguiente frame
    requestAnimationFrame(smoothScroll);
  }

  onMount(() => {
    // Iniciar el smooth scroll
    smoothScroll();

    // Escuchar el scroll del navegador
    viewport.subscribe((node) => {
      if (node) {
        node.addEventListener("scroll", () => {
          // El objetivo es el desplazamiento vertical de la ventana de scroll
          targetScrollY = node.scrollTop;
        });
      }
    });
  });
</script>

<!-- Vista del componente -->
<div bind:this={$viewport} class="viewport">
  <div bind:this={content} class="content">
    <slot></slot>
    <!-- Insertar contenido -->
  </div>
</div>

<style>
  /* Estilos básicos */
  .viewport {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow-y: scroll; /* Habilitar scroll vertical */
    will-change: transform;
  }

  .content {
    position: relative;
    width: 100%;
    min-height: 200vh; /* Duplicamos la altura para poder hacer scroll */
  }
</style>
