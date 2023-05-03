<script setup>
    import { onMounted, ref, computed } from 'vue';
    import { getEntry,getFiles } from '../api/requests';
    import FileLink from '../components/FileLink.vue';
  
    const searchParams = new URLSearchParams(window.location.search);
    const entryID = searchParams.get('EntryID');

    const isLoading = ref(true)

    const entries = ref([])

    const activeEntry = ref('');

    const filesCount = ref('')

    onMounted(async() => {
        isLoading.value = true
        let files = await getEntry(entryID) 
        entries.value = files.data
        console.error("Entry View")
        console.log(entries.value)
        filesCount.value = entries.value.files.length
        isLoading.value = false
    })
</script>
<template>
    <h1>{{ entries.type }}</h1>
    <h2>{{ entries.identification }}</h2>
    <h3>Verbrechen: {{ filesCount }}</h3>
    <FileLink v-for="file in entries.files" :file="file" />
</template>
<style scoped></style>