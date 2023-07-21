<script setup>
  import { ref, onMounted } from 'vue'
  import { RouterLink, RouterView } from 'vue-router'
  import messageHandler from './components/messageHandler.vue'
  import MajorMessage from './components/MajorMessage.vue'
  import MinorMessage from './components/message.vue'

  const minorMessages = ref([
    {
      id: 1,
      message: "Test Nachricht 1"
    },
    {
      id: 2,
      message: "Dies ist eine mega lange Text Nachricht. Omg wie lange ist die bitte?!"
    }
  ])

  const majorMessages = ref([
    {
      id: 1,
      message: "Hier kommt eine wichtige Nachricht hin"
    },
    {
      id: 2,
      message: "Die Passwörter wurden geändert, bitte wenden Sie sich an Ihren Supervisor."
    }
  ])

  function deleteFromMinorMessages(id) {
    console.warn("Delete from array APP")
    minorMessages.value = minorMessages.value.filter(item => item.id !== id);
  }

  function addToArray(message) {
    console.warn("Add toe array APP")
    minorMessages.value.push({id: minorMessages.value.length + 1, message: message})
  }

  function removeMajorMessage(id) {
    let index = majorMessages.value.findIndex(majorMessages => majorMessages.id == id)
    majorMessages.value.splice(index, 1)
  }

  onMounted(() => {
    //add a console log with fancy colors
    console.log("%cApp.vue", "color: green; font-size: 20px")
    console.log(minorMessages.value)
  })

</script>

<template>
    <div class="messageHandler">
      <MinorMessage class="notification_item" v-for="message in minorMessages" :key="message.id" :message="message" @removeItem="deleteFromMinorMessages"/>
    </div>
    <MajorMessage class="majorMessages" v-for="message in majorMessages" :message="message" @remove-message="removeMajorMessage" />
    <RouterView  @add-to-array="addToArray" />
</template>

<style scoped>
.viewContent {
  padding-left: 200px;
}
.notification_item {
  margin: 10px;
}
.messageHandler {
  position: fixed;
  top: 0;
  right: 0;
  margin: 10px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: max-content;
  height: max-content;
}
</style>
