<script setup>
import { ref, onMounted } from 'vue'

import {RouterLink} from 'vue-router'


const props = defineProps({
    result: {
        type: Object,
        required: true
    }
})

</script>

<template>
    <p>{{ result.id }} {{ result.identification }}</p><RouterLink
    :to="{ name: 'PatientID', params: { id: result.id }}"
    class="link"
    >
    <img src="../../assets/Arrow.svg" alt="loading" height="15" width="15"/>
    {{ result.name }}
    </RouterLink>
    
</template>