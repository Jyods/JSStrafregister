<script setup>
import { onMounted, ref, computed } from 'vue'
const props = defineProps({
    entries: {
          type: Object,
          required: true
      }
  })
  
  const searchParams = new URLSearchParams(window.location.search);
  const caseID = searchParams.get('CaseID');

  const entries = ref('')

  const activeCase = ref('');


  onMounted(() => {
    const usedID = parseInt(caseID)
    entries.value = props.entries
    activeCase.value = entries.value.find(entry => entry.cases.some(c => c.id === usedID)).cases.find(c => c.id === usedID)
    console.log(activeCase.value);
})

</script>
<template>
    <h1>{{ activeCase.name }}</h1>
    <h2>{{ activeCase.date }}</h2>
</template>
<style scoped>
</style>
