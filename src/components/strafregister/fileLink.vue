<script setup>
import { RouterLink } from 'vue-router'

const props = defineProps({
    file: {
        type: Object,
        required: true
    }
})
</script>

<template>
    <RouterLink :to="{ name: 'Case', query: { CaseID: props.file.id }}" class="flex items-center p-4 mb-2 rounded-lg shadow-md dark:bg-neutral-800 dark:hover:bg-neutral-600 hover:bg-gray-100">
        <img src="../../assets/Arrow.svg" alt="loading" class="mr-2" height="15" width="15"/>
        <div class="flex flex-col">
            <span class="font-semibold">{{ props.file.definition }}</span>
            <span class="text-gray-500">{{ props.file.date }}</span>
        </div>
    </RouterLink>
</template>

<style scoped>
</style>