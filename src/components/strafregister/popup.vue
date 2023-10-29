S<script setup>
import { ref, onMounted, computed, onBeforeMount } from 'vue'

const props = defineProps({
    header: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    footer: {
        type: String,
        required: true
    },
})
</script>

<template>
    <div class="popup">
        <div class="popup__header">
            <h1>{{ header }}</h1>
        </div>
        <div class="popup__body">
            <p>{{ body }}</p>
        </div>
        <div class="popup__footer">
            <button>{{ footer }}</button>
        </div>
    </div>
</template>

<style scoped>
.popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: max-content;
    height: max-content;
    background-color: white;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    margin-left:100px;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
}
.popup__header {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.popup__body {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.popup__footer {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
button {
    width: 100%;
    height: 100%;
    border: none;
    background-color: #1E90FF;
    color: white;
    border-radius: 10px;
    padding: 10px;
    font-size: 1.2rem;
    font-weight: bold;
    cursor: pointer;
}
</style>