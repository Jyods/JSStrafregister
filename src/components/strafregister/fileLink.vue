<script setup>
import { onMounted, ref } from 'vue'
import {RouterLink} from 'vue-router'

const props = defineProps({
    file: {
        type: Object,
        required: true
    }
})
</script>
<template>
    <RouterLink :to="{ name: 'Case', query: { CaseID: props.file.id }}" class="link">
    <img src="../../assets/Arrow.svg" alt="loading" height="15" width="15"/>
    {{ props.file.definition }} 
    {{ props.file.date }}
    </RouterLink>
</template>
<style scoped>
.link {
    text-decoration: none;
    color: black;
    padding: 6px;
    border-radius: 10px;
    margin: 3px;
    background-color: rgb(150, 150, 150);
}
.link:hover {
    background-color: rgb(200, 200, 200);
}
</style>