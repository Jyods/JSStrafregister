<script setup>
import { ref, onMounted } from 'vue'
import Result from '../../components/health/Result.vue'
import { getPatients } from '../../api/health.js'

const results = ref([
    {
        "id": "1",
        "name": "Max Mustermann",
    },
    {
        "id": "2",
        "name": "Max Mustermann",
    },
    {
        "id": "3",
        "name": "Max Mustermann",
    }
])

onMounted(async() => {
    console.log("Hello World")
    let patients = await getPatients()
    results.value = patients.data
    console.log(results.value)
})

</script>

<template>
    <h1> Patientenverzeichnis </h1>
    <div class="container">
        <h3> Patienten Identifikation </h3>
        <input type="text" placeholder="Patienten Identifikation" />
    </div>
    <div class="results">
        <Result v-for="result in results" :key="result.id" :result="result" />
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #ff98f6;
    width: 30%;
    height: 10%;
    margin: 0;
    padding: 0;
    overflow: hidden;
}


</style>