<script setup>

import { ref, onMounted, computed } from 'vue'
import {getPermittetOrientations} from '../../api/orientation.js'
import { getCurrentUser } from '../../api/requests';
import Result from '../../components/orientations/OrientationResult.vue'

const results = ref([])

const search = ref("")

const loading = ref(true)

const user = ref(null)

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

    let currentUser = await getCurrentUser()
    user.value = currentUser.data

    loading.value = false
})

</script>

<template>
    <h1> Files </h1>
    <el-input type="text" placeholder="Suche Files" v-model="search" v-loading="loading" />
    <div class="file_results" v-loading="loading">
        <Result v-for="result in results" :key="result.id" :result="result" :user_id="user.id" />
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
