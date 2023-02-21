<template>
  <div>
    <canvas id="lava-lamp" />
  </div>
</template>

<script setup lang="ts">
import { Cube } from '@/utils/three/Cube';

onMounted(() => {
  const cube = new Cube('lava-lamp');
  cube.renderScene();
});

</script>
