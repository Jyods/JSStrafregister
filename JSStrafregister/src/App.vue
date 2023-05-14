<script setup>
  import { ref, onMounted } from 'vue'
  import { RouterLink, RouterView } from 'vue-router'
  import messageHandler from './components/messageHandler.vue'

  const messages = ref([])

  function deleteFromArray(id) {
    messages.value = messages.value.filter(message => message.id != id)
  }

  function addToArray(message) {
    messages.value.push({id: messages.value.length, message: message})
  }

</script>

<template>
    <messageHandler :messages="messages" @delete-from-array="deleteFromArray"/>
    <RouterView  @add-to-array="addToArray" />
</template>

<style scoped>
.viewContent {
  padding-left: 200px;
}
</style>
