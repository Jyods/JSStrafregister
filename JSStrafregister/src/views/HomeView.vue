<script setup>
  import navbar from '../components/navbar.vue'
  import sidebar from '../components/sidebar.vue'
</script>

<template>
  <navbar class="fg"/>
  <sidebar class="bg"/>
</template>

<style scoped>
.fg {
  z-index: 1;
}
.bg {
  z-index: 100;
}


</style>