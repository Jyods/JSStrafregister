<script setup>
import { onMounted, ref, computed } from 'vue'
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

</script>

<template>
    <div class="law_wrapper">
        <div class="law__mega">
            <div class="info">
                <div v-if="!mode" v-for="law in laws" class="law">
                    <p>{{law.Title}}</p>
                    <p>{{law.Category}}</p>
                </div>
                <div v-else>
                    <p>{{laws.Title}}</p>
                    <p>{{laws.Category}}</p>
                </div>  
        </div>
        </div>
    </div>
</template>

<style scoped>
.law {
    background-color: #2c2c2c;
    border-radius: 10px;
    padding: 20px;
    margin: 50px 100px 50px 100px;
    box-shadow: 1px 1px 10px 5px rgba(0, 0, 0, 0.75);
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}
.info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
}
</style>
