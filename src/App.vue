<script setup>
  import { ref, onMounted } from 'vue'
  import { RouterLink, RouterView } from 'vue-router'
  import messageHandler from './components/messageHandler.vue'
  import MajorMessage from './components/MajorMessage.vue'

  const messages = ref([])

  const majorMessages = ref([
    {
      id: 1,
      message: "Hier kommt eine wichtige Nachricht hin"
    },
  ])

  function deleteFromArray(id) {
    let index = messages.value.findIndex(message => message.id == id)
    messages.value.splice(index, 1)
  }

  function addToArray(message) {
    console.warn("Add toe array APP")
    messages.value.push({id: messages.value.length, message: message})
  }

  function removeMajorMessage(id) {
    let index = majorMessages.value.findIndex(majorMessages => majorMessages.id == id)
    majorMessages.value.splice(index, 1)
  }

</script>

<template>
    <messageHandler class="notifications" :messages="messages" @remove-item="deleteFromArray"/>
    <MajorMessage class="majorMessages" v-for="message in majorMessages" :message="message" @remove-message="removeMajorMessage" />
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
