<script setup>
import { onMounted, ref, computed } from 'vue'
import { getLawID, getLaws, getPermissions } from '../../api/requests.js'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'

const router = useRouter()

const laws = ref(undefined)
const title = ref("")
const paragraph = ref("")
const category = ref("")
const severity = ref("")
const description = ref("")
const isAdmin = ref(false) // Beispielwert, passe dies an deine Authentifizierungslogik an

const isLoading = ref(true)

const sortedLaws = computed(() => {
    return laws.value.sort((a, b) => parseFloat(a.Paragraph) - parseFloat(b.Paragraph))
})

const searchParams = new URLSearchParams(window.location.search);
const lawID = searchParams.get('ArticleID');
const mode = ref(false)

onMounted(async () => {
    mode.value = lawID != null ? true : false

    let data = await getPermissions()
    if (data.data.restrictionClass >= 10) {
        isAdmin.value = true
    }

    await getLaw()
    isLoading.value = false
})

async function getLaw() {
    if (mode.value) {
        let data = await getLawID(lawID)
        title.value = data.data.Title
        paragraph.value = data.data.Paragraph
        category.value = data.data.Category
        severity.value = data.data.Severity
        description.value = data.data.Description
    } else {
        let data = await getLaws()
        laws.value = data.data
    }
}

function gotoLaw(id) {
    mode.value = true
    router.push({ name: 'LawArticle', query: { ArticleID: id } })
}

function truncateDescription(desc) {
    return desc.length > 20 ? desc.substring(0, 20) + "..." : desc
}
</script>

<template>
    <div class="flex justify-center items-center h-screen" v-if="isLoading">
        <img src="../../assets/Loading.svg" alt="loading"/>
    </div>
    <div class="flex flex-col items-center w-full h-fill p-4" v-else>
        <div class="w-full mb-4 pb-4 border-b border-gray-300">
            <h2 class="text-2xl font-bold">Gesetzesartikel</h2>
        </div>
        <div class="flex flex-wrap justify-center gap-4">
            <div v-for="law in sortedLaws" :key="law.id" class="w-full md:w-1/3 p-4 rounded-lg shadow-md dark:bg-neutral-900">
                <div class="text-lg font-bold mb-2">{{ law.Title }}</div>
                <p>Paragraph: §{{ law.Paragraph }} {{ law.Category }}</p>
                <p>Kategorie: {{ law.Severity }}</p>
                <p>Beschreibung: {{ truncateDescription(law.ShortDescription) }}</p>
                <Button @click="gotoLaw(law.id)" class="bg-primary mt-4">Mehr</Button>
            </div>
            <div v-if="isAdmin" class="w-full md:w-1/3 p-4 rounded-lg shadow-md dark:bg-neutral-900 flex justify-center items-center cursor-pointer" @click="$router.push({ name: 'CreateLaw' })">
                <div class="text-4xl text-gray-500">+</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>