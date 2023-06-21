<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
    message: {
        type: Object,
        required: true
    }
})
</script>

<template>
        <div class="majorMessage__container">
            <div class="majorMessage__content">
                <div class="majorMessage__header">
                    Information
                </div>
                <div class="majorMessage__body">
                    {{ message.message }}
                </div>
                <div class="majorMessage__Button">
                    <button @click="$emit('remove-message', message.id)">X</button>
                </div>
            </div>
        </div>
</template>

<style>
.majorMessage__container {
    position: fixed;
    width: 750px;
    height: 500px;
    inset: 0;
    margin: auto;
    z-index: 200;
}
.majorMessage__content {
    background-color: rgba(255, 255, 255, 0.841);
    border-style: groove;
    border-radius: 5px;
    
    border-width: 20px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}
button {
    background-color: red;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: 30px;
    color: white;
    cursor: pointer;
}
.majorMessage__header {
    font-size: 30px;
    font-weight: bold;
}
</style>