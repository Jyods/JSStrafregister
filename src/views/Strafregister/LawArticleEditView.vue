<script setup>
import { onMounted, ref, computed } from 'vue'
import { getLawID, deleteLaw, editLaw, postLaw, getPermissions } from '../../api/requests.js'
import { Button } from '@/components/ui/button'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const lawID = route.params.ArticleID
const isEditMode = computed(() => lawID != "" && lawID != undefined && lawID != null)

const title = ref("")
const paragraph = ref("")
const category = ref("")
const severity = ref("")
const shortDescription = ref("")
const description = ref("")
const minJail = ref("")
const maxJail = ref("")

const isLoading = ref(true)

onMounted(async () => {

    let data = await getPermissions()
    if (data.data.restrictionClass < 10) {
        router.push({ name: 'Home' })
        return
    }

    if (isEditMode.value) {
        let data = await getLawID(lawID)

        if (!data) {
            router.push({ name: 'Law' })
            return
        }

        title.value = data.data.Title
        paragraph.value = data.data.Paragraph
        category.value = data.data.Category
        severity.value = data.data.Severity
        shortDescription.value = data.data.ShortDescription
        description.value = data.data.Description
        minJail.value = data.data.minJail
        maxJail.value = data.data.maxJail
    }
    isLoading.value = false
})

async function handleSave() {

    const lawData = {
        title: title.value,
        paragraph: paragraph.value,
        category: category.value,
        severity: severity.value,
        shortDescription: shortDescription.value,
        description: description.value,
        minJail: minJail.value,
        maxJail: maxJail.value
    }

    if (isEditMode.value) {
        await editLaw(lawID, lawData)
    } else {
        await postLaw(lawData)
    }
    router.push({ name: 'Law' })
}

async function handleDelete() {
    if (isEditMode.value) {
        await deleteLaw(lawID)
        router.push({ name: 'Law' })
    }
}
</script>

<template>
    <div class="flex justify-center items-center h-screen" v-if="isLoading">
        <img src="../../assets/Loading.svg" alt="loading"/>
    </div>
    <div class="flex flex-col items-center w-full h-screen p-4" v-else>
        <div class="w-full mb-4 pb-4 border-b border-gray-300">
            <h2 class="text-2xl font-bold">{{ isEditMode ? 'Gesetz bearbeiten' : 'Neues Gesetz erstellen' }}</h2>
        </div>
        <div class="w-full md:w-2/3 p-4 rounded-lg shadow-md dark:bg-neutral-900">
            <div class="mb-4">
                <label class="block text-sm font-medium">Titel</label>
                <input v-model="title" type="text" class="w-full p-2 border rounded" />
            </div>
            <div class="mb-4">
                <label class="block text-sm font-medium">Paragraph</label>
                <input v-model="paragraph" type="text" class="w-full p-2 border rounded" />
            </div>
            <div class="mb-4">
                <label class="block text-sm font-medium">Kategorie</label>
                <input v-model="category" type="text" class="w-full p-2 border rounded" />
            </div>
            <div class="mb-4">
                <label class="block text-sm font-medium">Schweregrad</label>
                <input v-model="severity" type="text" class="w-full p-2 border rounded" />
            </div>
            <div class="mb-4">
                <label class="block text-sm font-medium">Kurzbeschreibung</label>
                <input v-model="shortDescription" type="text" class="w-full p-2 border rounded" />
            </div>
            <div class="mb-4">
                <label class="block text-sm font-medium">Beschreibung</label>
                <textarea v-model="description" class="w-full p-2 border rounded"></textarea>
            </div>
            <div class="mb-4">
                <label class="block text-sm font-medium">Minimale Haftzeit</label>
                <input v-model="minJail" type="number" class="w-full p-2 border rounded" />
            </div>
            <div class="mb-4">
                <label class="block text-sm font-medium">Maximale Haftzeit</label>
                <input v-model="maxJail" type="number" class="w-full p-2 border rounded" />
            </div>
            <div class="flex space-x-4">
                <Button class="bg-primary" @click="handleSave">{{ isEditMode ? 'Speichern' : 'Erstellen' }}</Button>
                <Button v-if="isEditMode" variant="destructive" @click="handleDelete">Löschen</Button>
                <Button @click="$router.push({name: 'Law'})">Zurück</Button>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>