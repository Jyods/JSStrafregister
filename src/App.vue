<script setup>
  import { ref, onMounted, onBeforeUpdate, onBeforeMount } from 'vue';
  import { RouterLink, RouterView, useRouter } from 'vue-router';
  import MajorMessage from './components/strafregister/majorMessage.vue';
  import MinorMessage from './components/strafregister/message.vue';
  import Pusher from 'pusher-js';

  const isPublicRoute = ref(false)

  const router = useRouter()

  const minorMessages = ref([])

  const majorMessages = ref([])

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
    console.log("%cApp.vue", "color: green; font-size: 20px")
    console.log(minorMessages.value)
  })
  
  function checkIfPublicRoute() {
    if (router.currentRoute.value.name == "Public" || router.currentRoute.value.name == "Error" || router.currentRoute.value.name == "PathNotFound") {
      isPublicRoute.value = true
      return true
    }
    else {
      isPublicRoute.value = false
      return false
    }
    console.error(isPublicRoute.value)
  }

  const pusher = new Pusher('2510f8aea0961630d9af', {
      cluster: 'eu'
  });

  const channel = pusher.subscribe('message-channel');

  channel.bind('minor-event', function(data) {
      console.log(data.message)
      minorMessages.value.push({id: minorMessages.value.length + 1, message: data.message})
  });

  channel.bind('major-event', function(data) {
      majorMessages.value.push({id: majorMessages.value.length + 1, message: data.message})
  });

</script>

<template>
    <div v-if="!checkIfPublicRoute()" class="messageHandler">
      <MinorMessage class="notification_item" v-for="message in minorMessages" :key="message.id" :message="message" @removeItem="deleteFromMinorMessages"/>
    </div>
    <MajorMessage v-if="!checkIfPublicRoute()" class="majorMessages" v-for="message in majorMessages" :message="message" @remove-message="removeMajorMessage" />
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
