<script setup>
import { onMounted, ref } from 'vue'
import {RouterLink} from 'vue-router'

const props = defineProps({
    file: {
        type: Object,
        required: true
    }
})
</script>
<template>
    <RouterLink :to="{ name: 'Case', query: { CaseID: props.file.id }}">{{ props.file.definition }}</RouterLink>
</template>