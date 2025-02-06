<script setup>
import { onMounted, ref, computed } from 'vue'
import { getLawID } from '../../api/requests.js'
import { Button } from '@/components/ui/button'

const searchParams = new URLSearchParams(window.location.search);
const lawID = searchParams.get('ArticleID');
const mode = computed(() => lawID != null ? "True" : "False");

const title = ref("")
const paragraph = ref("")
const category = ref("")
const severity = ref("")
const description = ref("")
    
const isLoading = ref(true)

onMounted(async () => {
    console.log(lawID)
    let data = await getLawID(lawID)
    console.log(data)
    title.value = data.data.Title
    paragraph.value = data.data.Paragraph
    category.value = data.data.Category
    severity.value = data.data.Severity
    description.value = data.data.Description
    isLoading.value = false
})
</script>

<template>
    <div class="flex justify-center items-center h-screen" v-if="isLoading">
        <img src="../../assets/Loading.svg" alt="loading"/>
    </div>
    <div class="flex flex-col items-center w-full h-screen p-4 " v-else>
        <div class="w-full mb-4 pb-4 border-b border-gray-300">
            <h2 class="text-2xl font-bold">{{ title }}</h2>
        </div>
        <div class="w-full md:w-2/3 p-4  rounded-lg shadow-md dark:bg-neutral-900">
            <p><strong>Paragraph:</strong> §{{ paragraph }} {{ category }}</p>
            <p><strong>Kategorie:</strong> {{ severity }}</p>
            <p><strong>Beschreibung:</strong> {{ description }}</p>
            <Button class="mt-4 bg-primary" @click="$router.push({name: 'Law'})">Zurück</Button>
        </div>
    </div>
</template>

<style scoped>
</style>