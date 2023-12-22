<script setup>
import { onMounted, ref } from 'vue'
import { useRoute} from 'vue-router'
import { getPermittetOrientations } from '../api/orientation';

//get the params from route
const route = useRoute()
const { id } = route.params

const orientations = ref([])

const selectedOrientation = ref(null)

onMounted(() => {
  console.log("ID: ",id)
  getPermittetOrientations(id).then((response) => {
    console.log(response.data)
    orientations.value = response.data
  })
})



</script>

<template>
  <select v-model="selectedOrientation">
      <option v-for="orientation in orientations" :key="orientation.id" :value="orientation">
          {{ orientation.name }}
      </option>
  </select>
    <div>
        <iframe v-if="selectedOrientation" :src="selectedOrientation.path" width="100%" height="900px"></iframe>
    </div>
</template>

<style scoped>
    iframe {
        border: none;
    }

    select {
        width: 100%;
        height: 50px;
        font-size: 20px;
        margin-bottom: 20px;
    }
</style>