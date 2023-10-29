<script setup>
    import { onMounted, ref, computed } from 'vue';
    import { getEntry,getFiles } from '../../api/requests.js';
    import FileLink from '../../components/strafregister/fileLink.vue';
  
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
        console.log(entries.value)
        filesCount.value = entries.value.files.length
        isLoading.value = false
    })
</script>
<template>
    <div class="entry_wrapper">
        <h1>Typ: {{ entries.type }}</h1>
        <h2>Identifikation: {{ entries.identification }}</h2>
        <h3>Verbrechen: {{ filesCount }}</h3>
        <FileLink v-for="file in entries.files" :file="file" />
    </div>
</template>
<style scoped>
.entry_wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: rgb(117, 117, 117);
    border-radius: 10px;
    padding: 20px;
    margin: 50px 100px 50px 100px;
    box-shadow: 1px 1px 10px 5px rgba(0, 0, 0, 0.75);
}
</style>