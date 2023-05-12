<script setup>
import message from './message.vue'
import { ref, onMounted } from 'vue'

const banane = ref([
    {
        message: "Test"
    },
    {
        message: "Test2"
    }
])
</script>

<template>
    <div class="wrapper">
        <div class="messageWrapper">
            <message v-for="banan in banane" :kabum="banan" />
        </div>
    </div> 
</template>

<style scoped>
.wrapper {
    position: fixed;
    top: 20;
    right: 0;
}

.messageWrapper {

}
</style>