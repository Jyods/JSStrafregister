<script setup>
    import { onMounted, ref, computed } from 'vue'
    import { getCase,getFiles } from '../api/requests';
  
    const searchParams = new URLSearchParams(window.location.search);
    const caseID = searchParams.get('CaseID');

    const isLoading = ref(true)

    const entries = ref([])

    const activeCase = ref('');


    onMounted(async() => {
        isLoading.value = true
        let files = await getFiles() 
        entries.value = files.data
        const usedID = parseInt(caseID)
        activeCase.value = entries.value.find(entry => entry.files.some(c => c.id === usedID)).files.find(c => c.id === usedID)
        console.log(activeCase.value);
        isLoading.value = false
    })

</script>
<template>
    <div class="loading" v-if="isLoading">
        <img src="../assets/Loading.svg" alt="loading"/>
    </div>
        <div class="CaseContent" v-else>
        <h1>Definition: {{ activeCase.definition }}</h1>
        <h2>Created At: {{ activeCase.date }}</h2>
        <h3>Articles: {{ activeCase.article }}</h3>
        <h3>Imprisonment: {{ activeCase.fine }}</h3>
        <br>
        <h2>{{ activeCase.member.type }}</h2>
        <h3>{{ activeCase.member.identification }}</h3>
    </div>
</template>
<style scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
