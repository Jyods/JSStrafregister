<script setup>
import { onMounted, ref } from 'vue'
import { useRoute} from 'vue-router'

//get the params from route
const route = useRoute()
const { id } = route.params

onMounted(() => {
  console.log("ID: ",id)
})
</script>

<template>
    <div>
        <h1>Test</h1>
    </div>
</template>