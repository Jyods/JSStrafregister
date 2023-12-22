<script setup>
import { ref, onMounted, computed } from 'vue'
import { getPatients } from '../../api/health.js'

import { RouterLink, RouterView } from 'vue-router'

const results = ref([])

const search = ref("")

const filteredResults = computed(() => {
    if (!search.value) {
        return null
    }
    return results.value.filter((result) => {
        return result.identification.includes(search.value)
    })
})

onMounted(async() => {
    console.log("Hello World")
    let patients = await getPatients()
    results.value = patients.data
    console.log(results.value)
})

</script>

<template>
    <h1> Patientenverzeichnis </h1>
    <h3> Patienten Identifikation </h3>
    <el-input type="text" placeholder="Patienten Identifikation" v-model="search" />
    <div class="results">
        <Result v-for="result in filteredResults" :key="result.id" :result="result" />
    </div>
</template>

<style scoped>

</style>
