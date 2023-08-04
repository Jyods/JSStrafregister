<script setup>
import { ref, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { getODT } from '../api/requests.js'
import ODTItem from './ODTItem.vue'; 

const odts = ref(null);

onMounted(() => {
    console.log("ODTList mounted")
    getODT().then((response) => {
        odts.value = response.data;
    });
});


</script>

<template>
    Hier sieht man alle Aufträge der ODT
    <br />
    <ODTItem v-for="odt in odts" :key="odt.id" :thing="odt" />
</template>