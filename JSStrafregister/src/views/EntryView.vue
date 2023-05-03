<script setup>
    import { onMounted, ref, computed } from 'vue'
    import { getEntry,getFiles } from '../api/requests';
  
    const searchParams = new URLSearchParams(window.location.search);
    const entryID = searchParams.get('EntryID');

    const isLoading = ref(true)

    const entries = ref([])

    const activeEntry = ref('');
</script>
<template>
    <h1>Banane</h1>
</template>
<style scoped></style>