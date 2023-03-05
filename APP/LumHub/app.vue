<template>
  <div>
    <VitePwaManifest />
    <BackgroundComponent />
    <NuxtLoadingIndicator />
    <NuxtLayout class="base-layer">
      <NuxtPage class="base-layer" />
    </NuxtLayout>
  </div>
</template>

<style>
  .base-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 2;
  }
</style>
