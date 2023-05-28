<script setup>
import { onMounted, ref, computed, onBeforeMount } from 'vue'
import {getLawID, getLaws} from '../api/requests.js'

const props = defineProps({
    law: {
        type: Object,
        required: true
    }
})

const laws = ref(undefined)

    const searchParams = new URLSearchParams(window.location.search);
    const lawID = searchParams.get('ArticleID');
    const mode = ref(false)

    onMounted(async() => {
    mode.value = lawID != null ? true : false
    await getLaw()
    })

    async function getLaw() {
        if(mode.value) {
            let data = await getLawID(lawID)
            console.log(data)
            laws.value = data.data
        }
        else {
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
                <div v-if="!mode" v-for="law in laws" class="law__wrapper">
                    <div class="law__content">
                        <h2>{{law.Title}}</h2>
                        <p>Gesetz: {{law.Category}}</p>
                        <p>Kategorie: {{law.Severity}}</p>
                        <p>Beschreibung: {{law.ShortDescription}}</p>
                        <button @click="gotoLaw(law.id)">Mehr</button>
                    </div>
                </div>
                <div v-else class="law__solo">
                    <h2>{{laws.Title}}</h2>
                    <p>Gesetz: {{laws.Category}}</p>
                    <p>Kategorie: {{laws.Severity}}</p>
                    <p class="desc">Beschreibung: {{laws.Description}}</p>
                </div>  
        </div>
    </div>
</template>

<style scoped>
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
