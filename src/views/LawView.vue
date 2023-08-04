<script setup>
import { onMounted, ref, onUpdated, computed, onBeforeMount } from 'vue'
import {getLawID, getLaws} from '../api/requests.js'
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

const searchParams = new URLSearchParams(window.location.search);
const lawID = searchParams.get('ArticleID');
const mode = ref(false)

onMounted(async() => {

    console.log(router)

mode.value = lawID != null ? true : false
console.error(mode.value)
await getLaw()
})

onUpdated(async() => {
    console.log("updated")
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
    window.location.href = "/articles?ArticleID=" + id
}

</script>

<template>
    <div class="law_wrapper">
            <div class="info">
                <div class="" v-if="!mode">
                <div v-for="law in laws" class="law__wrapper">
                    <div class="law__content">
                        <h2>{{law.Title}}</h2>
                        <p>Paragraph: §{{ law.Paragraph }} {{law.Category}}</p>
                        <p>Kategorie: {{law.Severity}}</p>
                        <p>Beschreibung: {{law.ShortDescription}}</p>
                        <button @click="gotoLaw(law.id)" class="button_goto">Mehr</button>
                    </div>
                </div>
                </div>
                <div v-else class="law__solo">
                    <h2>{{title}}</h2>
                    <p>Paragraph: §{{ paragraph }} {{category}}</p>
                    <p>Kategorie: {{severity}}</p>
                    <p class="desc">Beschreibung: {{description}}</p>
                </div>  
        </div>
    </div>
</template>

<style scoped>
.button_goto {
    background-color: #2c2c2c;
    color: red;
    border: none;   
}
.button_goto:hover {
    color: orange;

}
.desc {
    width: 80%;
    text-align: center;
}
.law__wrapper {
    background-color: #2c2c2c;
    width: 300px;
    height: 300px;
    margin: 10px;
}
.law__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    height: 100%;
    width: 100%;
}
.info {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}
.law__solo {
    background-color: #2c2c2c;
    width: 500px;
    height: 500px;
    margin: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
}
</style>
