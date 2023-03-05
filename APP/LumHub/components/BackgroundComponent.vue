<template>
  <canvas id="lava-lamp" />
  <div id="blur" />
</template>

<script setup lang="ts">
import { LavaBackground } from '@/utils/three/LavaBackground';

onMounted(() => {
  const lavaBackground = new LavaBackground('lava-lamp');
  lavaBackground.renderScene();
  window.addEventListener('resize', () => {
    location.reload();
  });
});

</script>

<style>
#lava-lamp {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}

#blur {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(90px);
  z-index: 1;
}
</style>
