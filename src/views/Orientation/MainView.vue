<script setup>

import { ref, onMounted, computed } from 'vue'
import {getPermittetOrientations} from '../../api/orientation.js'
import Result from '../../components/orientations/OrientationResult.vue'

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
    let patients = await getPermittetOrientations()
    results.value = patients.data
    console.log(results.value)
})

</script>

<template>
    <h1> Files </h1>
    <el-input type="text" placeholder="Suche Files" v-model="search" />
    <div class="file_results">
        <Result v-for="result in results" :key="result.id" :result="result" />
    </div>
</template>

<style scoped>
.file_results {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-top: 20px;
    gap: 20px;
}
</style>
