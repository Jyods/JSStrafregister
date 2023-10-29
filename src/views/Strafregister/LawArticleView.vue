<script setup>
    import { onMounted, ref, computed } from 'vue'
    import {getLawID, getLaws} from '../../api/requests.js'

    const searchParams = new URLSearchParams(window.location.search);
    const lawID = searchParams.get('ArticleID');
    const mode = computed(() => lawID != null ? "True" : "False")

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
    <div class="loading" v-if="isLoading">
        <img src="../../assets/Loading.svg" alt="loading"/>
    </div>
    <div class="law_wrapper" v-else>
        <div class="law">
            <div class="info">
                <div class="law__solo">
                    <h2>{{title}}</h2>
                    <p>Paragraph: §{{ paragraph }} {{category}}</p>
                    <p>Kategorie: {{severity}}</p>
                    <p class="desc">Beschreibung: {{description}}</p>
                    <button class="btn_back" @click="$router.push({name: 'Law'})">Zurück</button>
                </div>  
            </div>
        </div>
    </div>
</template>