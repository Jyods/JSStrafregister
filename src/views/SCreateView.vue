<script setup>
    import { RouterView } from 'vue-router';

    const emit = defineEmits(['add-to-array'])

    function addToArray(message) {
        console.log("Add to array CreateView", message)
        emit('add-to-array', message)
    }

</script>

<template>
    <RouterView @add-to-array="addToArray"/>
</template>