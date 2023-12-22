<script setup>
import { ref, onMounted } from 'vue'
import { getOrientationById } from '../../api/orientation';
import { useRoute } from 'vue-router'

//get the params from route
const route = useRoute()
const { id } = route.params

const orientation = ref(null)

onMounted(() => {
  console.log("ID: ",id)
  getOrientationById(id).then((response) => {
    console.log(response.data)
    orientation.value = response.data
  })
})

</script>

<template>
  <div>
    <div class="iframe_wrapper">
      <iframe v-if="orientation" :src="orientation.path" width="100%" height="570px"></iframe>
    </div>
  </div>
</template>

<style scoped>
.iframe_wrapper {
  width: 100%;
  height: 100%;
}
</style>
