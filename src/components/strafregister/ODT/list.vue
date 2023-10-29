<script setup>
import { ref, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { getODT } from '../../../api/requests.js'
import ODTItem from './item.vue'; 

const odts = ref(null);

const isloading = ref(true)

onMounted(() => {
    console.log("ODTList mounted")
    isloading.value = true
    console.log("Start")
    getODT().then((response) => {
        odts.value = response.data;
    });
    console.log("Finish")
    isloading.value = false
});


</script>

<template>
    <div class="loading" v-if="isloading">
        <img src="../../../assets/Loading.svg" alt="loading"/>
    </div>
    <div class="" v-else>
        Hier sieht man alle Aufträge der ODT
        <br />
        <ODTItem v-for="odt in odts" :key="odt.id" :thing="odt" />
    </div>
</template>