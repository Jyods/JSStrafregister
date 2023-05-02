<script setup>
  import navbar from '../components/navbar.vue'
  import sidebar from '../components/sidebar.vue'
  import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <navbar class="fg"/>
  <sidebar class="bg"/>
  <div class="viewContent">
    <RouterView />
  </div>
</template>

<style scoped>
.viewContent {
  padding-left: 200px;
}
</style>
