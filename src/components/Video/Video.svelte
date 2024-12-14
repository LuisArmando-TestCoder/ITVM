<script lang="ts">
  import { onMount } from "svelte";
  import Hls from "hls.js";

  let videoElement: HTMLVideoElement;

  onMount(() => {
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(
        "https://customer-0mckfrax2nvb2oup.cloudflarestream.com/cc9846f34ac4fcdafb09b91ddb9442cf/manifest/video.m3u8",
      );
      hls.attachMedia(videoElement);
      // hls.on(Hls.Events.MANIFEST_PARSED, () => {
      //     video.play();
      // });
    } else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
      // Safari support
      videoElement.src =
        "https://customer-0mckfrax2nvb2oup.cloudflarestream.com/cc9846f34ac4fcdafb09b91ddb9442cf/manifest/video.m3u8";
      //     videoElement.addEventListener("loadedmetadata", () => {
      //       videoElement.play();
      // });
    }
  });

  let isVideoPaused: boolean;

  function setIsVideoPaused() {
    const { currentTime, paused, ended } = videoElement;

    isVideoPaused = currentTime > 0 && !paused && !ended;
  }

  function changeVideo() {
    setIsVideoPaused();
    if (!isVideoPaused) videoElement.play();
    if (isVideoPaused) videoElement.pause();
  }

  onMount(() => {
    videoElement.addEventListener("ended", () => {
      console.log(videoElement);
      isVideoPaused = true;
    });
  });
</script>

<div class="video" on:click={changeVideo}>
  <video
    bind:this={videoElement}
    class="hero-banner-video"
    id="videoPlayer"
    poster="miniatura de video 9s.png"
  />

  <button on:click={changeVideo} class="video--play-button {isVideoPaused}">
    <div class="play-container">
      <img class="ghost" src="./icons/play.svg" alt="video play button" />
      <img src="./icons/play.svg" alt="video play button" />
    </div>
  </button>
</div>

<style lang="scss">
  .video {
    position: relative;
    display: flex;
    place-items: center;
    justify-content: center;
    margin: 150px 0 100px;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: block;
      z-index: 1;
      width: 100%;
      height: 100%;
      box-shadow: inset 0 0 100px 1000px #0004;
    }

    .play-container {
      position: relative;
    }

    .ghost {
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0.875;
      filter: blur(5px);
    }

    &--play-button {
      cursor: pointer;
      border: 0;
      margin: 0;
      padding: 0;
      background: transparent;
      position: absolute;
      transition: var(--transition-shortest-duration);
      filter: invert(0);
      mix-blend-mode: difference;

      &.false {
        opacity: 0;
      }

      &:hover {
        transform: scale(1.05);
      }

      &:active {
        transform: scale(1.2);
        opacity: 0.5;

        .ghost {
          animation: fade-grow var(--transition-shortest-duration) ease-out;
        }
      }
    }
  }

  @keyframes fade-grow {
    100% {
      opacity: 0;
      transform: scale(calc(1.25 * 1.25), calc(1.35 * 1.25));
    }
  }

  .hero-banner-video {
    object-fit: cover;
    width: 100%;
    height: clamp(50vw, 100vh, min(50vh, 80vh));
  }
</style>
