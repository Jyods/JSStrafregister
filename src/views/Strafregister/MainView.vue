<script setup>
  import { ref, onMounted } from 'vue'
  import sidebar from '../../components/strafregister/sidebar.vue'
  import { RouterLink, RouterView } from 'vue-router'

  const emit = defineEmits(['add-to-array'])

  function addToArray(message) {
    console.warn("Add toe array MAINVIEW")
    emit('add-to-array', message)
  }

</script>

<template>
  <sidebar class="bg" @add-to-array="addToArray"/>
  <div class="viewContent">
    <div class="background_image"></div>
    <RouterView @add-to-array="addToArray"/>
  </div>
</template>

<style scoped>
.background_image {
  background-image: url("../../assets/Background.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  position: absolute;
  width: 77%;
  height: 100%;
  z-index: -1;
}
.viewContent {
  padding-left: 200px;
  padding-top: 50px;
}
</style>
