<script setup>
  import { ref, onMounted } from 'vue'
  import navbar from '../components/navbar.vue'
  import sidebar from '../components/sidebar.vue'
  import { RouterLink, RouterView } from 'vue-router'
  import { auth } from '../api/requests.js'

</script>

<template>
  <sidebar class="bg"/>
  <navbar class="fg"/>
  <div class="viewContent">
    <RouterView />
  </div>
</template>

<style scoped>
.viewContent {
  padding-left: 200px;
}
</style>
