<script setup>
import { ref, onBeforeMount, onUpdated } from 'vue'
import Error from '../components/Error.vue'

const param = ref("")

const loading = ref(true)

onBeforeMount(() => {
    loading.value = true
    param.value = window.location.pathname
    //wenn kein /error/ im Pfad ist, dann ist es ein 404

    if (param.value.includes("/error/")) {
        param.value = param.value.replace("/error/", "")
        param.value = parseInt(param.value)
    }
    else {
        param.value = 404
    }
    console.log(param.value)
    loading.value = false
})

onUpdated(() => {
    loading.value = true
    param.value = window.location.pathname
    //wenn kein /error/ im Pfad ist, dann ist es ein 404

    if (param.value.includes("/error/")) {
        param.value = param.value.replace("/error/", "")
        param.value = parseInt(param.value)
    }
    else {
        param.value = 404
    }
    console.log(param.value)
    loading.value = false
})



</script>

<template>
    <Error :error="param" v-if="!loading"/>
</template>