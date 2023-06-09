<script setup>
  import { ref, onMounted } from 'vue'
  import { RouterLink, RouterView } from 'vue-router'
  import messageHandler from './components/messageHandler.vue'

  const messages = ref([])

  function deleteFromArray(id) {
    let index = messages.value.findIndex(message => message.id == id)
    messages.value.splice(index, 1)
  }

  function addToArray(message) {
    messages.value.push({id: messages.value.length, message: message})
  }

</script>

<template>
    <messageHandler class="notifications" :messages="messages" @remove-item="deleteFromArray"/>
    <RouterView  @add-to-array="addToArray" />
</template>

<style scoped>
.viewContent {
  padding-left: 200px;
}
.notifications {
  position: fixed;
  top: 0;
  right: 0;
  margin: 10px;
  z-index: 100;
}
</style>
