<script setup>
import { ref, onMounted } from 'vue'
import {useRouter, RouterLink} from 'vue-router'
import { getPatient } from '../../api/health';

const router = useRouter()

const param = router.currentRoute.value.params.id

const result = ref({})

onMounted(async() => {
    console.log(router)
    let patient = await getPatient(param)
    result.value = patient.data
    console.log(result.value)
})


</script>

<template>
    <div class="container">
        <h1><b> {{ result.type  }}</b></h1>
        <h2> {{ result.name }} </h2>
        <h2> {{ result.identification }} </h2>
        <h3> {{ result.id }} </h3>
        <div class="healts">
            <RouterLink v-for="health in result.health" :key="health.id"
            :to="{ name: 'HealthCaseID', params: { id: health.id }}"
            class="link"
            >{{ health.type }}: {{ health.status }}</RouterLink>
        </div>
    </div>
</template>