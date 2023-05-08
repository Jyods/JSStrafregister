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
        let files = await getCase(caseID) 
        entries.value = files.data
        console.log(entries.value)
        /*const usedID = parseInt(caseID)
        activeCase.value = entries.value.find(entry => entry.files.some(c => c.id === usedID)).files.find(c => c.id === usedID)*/
        console.log(activeCase.value);
        isLoading.value = false
    })

</script>
<template>
    <div class="loading" v-if="isLoading">
        <img src="../assets/Loading.svg" alt="loading"/>
    </div>
        <div class="CaseContent" v-else>
        <h1>Definition: {{ entries.definition }}</h1>
        <h3>Beschreibung: {{ entries.description }}</h3>
        <h2>Created At: {{ entries.date }}</h2>
        <h3>Articles: {{ entries.article }}</h3>
        <h3>Imprisonment: {{ entries.fine }}</h3>
        <br>
        <h2>{{ entries.user.type }}</h2>
        <RouterLink :to="{ name: 'Member', query: { MemberID: entries.user.id }}">{{ entries.user.identification }}</RouterLink>
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
