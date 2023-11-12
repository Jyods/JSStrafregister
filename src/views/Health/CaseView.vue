<script setup>
import { ref, onMounted } from 'vue'
import {useRouter, RouterLink} from 'vue-router'
import { getHealthCase } from '../../api/health.js'

const router = useRouter()

const param = router.currentRoute.value.params.id

const result = ref({})

onMounted(async() => {
    console.log(router)
    let healthCase = await getHealthCase(param)
    result.value = healthCase.data
    console.log(result.value)
})

</script>

<template>
    {{ result.patient_id }}
    {{ result.user_id }}
    {{ result.type }}
    {{ result.status }}
    {{ result.description }}
    Health Case
</template>