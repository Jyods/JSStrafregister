<script setup>
import {RouterView} from 'vue-router'
</script>

<template>
    <div class="center columns full-screen">
        <RouterView />
    </div>
</template>

<style scoped>
.full-screen {
    width: 100vw;
    height: 100vh;
    background-color: #ff98f6 !important;
    overflow: hidden;
}
</style>