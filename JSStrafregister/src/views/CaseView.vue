<script setup>
import { onMounted, ref, computed } from 'vue'
import { getCase,getFiles } from '../api/requests';
  
  const searchParams = new URLSearchParams(window.location.search);
  const caseID = searchParams.get('CaseID');

  const entries = ref([])

  const activeCase = ref('');


  onMounted(async() => {
    let files = await getFiles() 
    entries.value = files.data
    const usedID = parseInt(caseID)
    activeCase.value = entries.value.find(entry => entry.files.some(c => c.id === usedID)).files.find(c => c.id === usedID)
    console.log(activeCase.value);
})

</script>
<template>
    <h1>{{ activeCase.definition }}</h1>
    <h2>{{ activeCase.date }}</h2>
</template>
<style scoped>
</style>
