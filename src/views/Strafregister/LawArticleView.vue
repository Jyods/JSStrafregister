<script setup>
import { onMounted, ref, computed } from 'vue'
import { getLawID, getPermissions } from '../../api/requests.js'
import { Button } from '@/components/ui/button'
import { useRouter } from 'vue-router'

const router = useRouter()

const searchParams = new URLSearchParams(window.location.search);
const lawID = searchParams.get('ArticleID');
const mode = computed(() => lawID != null ? "True" : "False");

const title = ref("")
const paragraph = ref("")
const category = ref("")
const severity = ref("")
const description = ref("")
const isAdmin = ref(false) // Beispielwert, passe dies an deine Authentifizierungslogik an

const isLoading = ref(true)

onMounted(async () => {

    let data = await getPermissions()
    if (data.data.restrictionClass >= 10) {
        isAdmin.value = true
    }

    console.log(lawID)
    data = await getLawID(lawID)
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
    <div class="flex flex-col items-center w-full h-screen p-4" v-else>
        <div class="w-full mb-4 pb-4 border-b border-gray-300">
            <h2 class="text-2xl font-bold">{{ title }}</h2>
        </div>
        <div class="w-full md:w-2/3 p-4 rounded-lg shadow-md dark:bg-neutral-900">
            <p><strong>Paragraph:</strong> §{{ paragraph }} {{ category }}</p>
            <p><strong>Kategorie:</strong> {{ severity }}</p>
            <p><strong>Beschreibung:</strong> {{ description }}</p>
            <Button class="mt-4 bg-primary" @click="$router.push({name: 'Law'})">Zurück</Button>
            <Button v-if="isAdmin" class="mt-4 bg-secondary" @click="$router.push({name: 'CreateLaw', params: { ArticleID: lawID }})">Bearbeiten</Button>
        </div>
    </div>
</template>

<style scoped>
</style>