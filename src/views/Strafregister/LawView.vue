<script setup>
import { onMounted, ref, onUpdated, computed, onBeforeMount } from 'vue'
import {getLawID, getLaws} from '../../api/requests.js'
import { RouterLink, RouterView, useRouter } from 'vue-router'

const router = useRouter()

/* const props = defineProps({
    law: {
        type: Object,
        required: true
    }
}) */

const laws = ref(undefined)

const title = ref("")
const paragraph = ref("")
const category = ref("")
const severity = ref("")
const description = ref("")

const isLoading = ref(true)

const sortedLaws = computed(() => {
    return laws.value.sort((a, b) => parseFloat(a.Paragraph) - parseFloat(b.Paragraph))
})



const searchParams = new URLSearchParams(window.location.search);
const lawID = searchParams.get('ArticleID');
const mode = ref(false)

onMounted(async() => {
    mode.value = lawID != null ? true : false
    await getLaw()
    isLoading.value = false
})

async function getLaw() {
    if(mode.value) {
        let data = await getLawID(lawID)
        console.log(data)
        title.value = data.data.Title
        paragraph.value = data.data.Paragraph
        category.value = data.data.Category
        severity.value = data.data.Severity
        description.value = data.data.Description
    }
    else {
        console.log("getting laws")
        let data = await getLaws()
        console.log(data)
        laws.value = data.data
    }
    console.warn(laws.value)
}

function gotoLaw(id) {
    mode.value = true
    router.push({name: 'LawArticle', query: {ArticleID: id}})
}

function truncateDescription(desc) {
    return desc.length > 20 ? desc.substring(0, 20) + "..." : desc
}

</script>

<template>
    <div class="loading" v-if="isLoading">
        <img src="../../assets/Loading.svg" alt="loading"/>
    </div>
    <div class="law_wrapper" v-else>
            <div class="info">
                <div v-for="law in sortedLaws" class="law__wrapper">
                    <div class="law__content">
                        <h2>{{law.Title}}</h2>
                        <p>Paragraph: §{{ law.Paragraph }} {{law.Category}}</p>
                        <p>Kategorie: {{law.Severity}}</p>
                        <!-- <p>Beschreibung: {{truncateDescription(law.ShortDescription)}}</p> -->
                        <button @click="gotoLaw(law.id)" class="button_goto">Mehr</button>
                    </div>
                </div>
        </div>
    </div>
</template>

<style scoped>
.button_goto {
    background-color: #4CAF50; /* Grüner Hintergrund */
    color: white; /* Weißer Text */
    border: none;
    padding: 12px 24px; /* Mehr Innenabstand */
    border-radius: 5px; /* Abgerundete Ecken */
    cursor: pointer; /* Zeiger-Cursor */
    transition: background-color 0.3s ease; /* Übergangseffekt */
}
.law__content > h2 {
    margin-bottom: 10px; /* Abstand zum nächsten Element */
    text-align: center;
}
.button_goto:hover {
    background-color: #45a049; /* Dunkleres Grün beim Hover */
    color: white;
}
.desc {
    width: 80%;
    text-align: center;
    margin: 20px auto; /* Zentrierung und Abstand */
    font-size: 1.2em; /* Größere Schrift */
    color: #555; /* Dunklerer Text */
}
.law__wrapper {
    background-color: #ffffff; /* Weißer Hintergrund */
    width: 320px; /* Etwas breiter */
    height: 320px; /* Etwas höher */
    margin: 10px;
    border-radius: 10px; /* Abgerundete Ecken */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Schatten für Tiefe */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 24px; /* Mehr Innenabstand */
}
.law__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #333; /* Dunklerer Text für besseren Kontrast */
    height: 100%;
    width: 100%;
    padding: 24px; /* Mehr Innenabstand */
}
.info {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px; /* Abstand zwischen den Elementen */
}
.law__solo {
    background-color: #2c2c2c;
    width: 50%; /* Maximal 50% der Bildschirmbreite */
    height: auto; /* Automatische Höhe */
    margin: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    border-radius: 10px; /* Abgerundete Ecken */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Schatten für Tiefe */
    padding: 24px; /* Mehr Innenabstand */
}
</style>
