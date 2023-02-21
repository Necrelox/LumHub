<template>
  <div>
    <h1>Index</h1>
  </div>
</template>

<script>
export default {
  name: 'index'
};
</script>

<script setup>
definePageMeta({
  middleware: ['AuthChecker']
});
</script>

<style scoped>

</style>
