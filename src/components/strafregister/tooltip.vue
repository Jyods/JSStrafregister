<script setup>

import { ref } from 'vue'

const props = defineProps({
    info: {
        type: String,
        required: true
    },
    show: {
        type: Boolean,
        required: false,
        default: true
    }
})

const hover = ref(false)

</script>

<template>
    <div class="info">
        <slot></slot>
        <img v-if="show" src="../../assets/info.svg" alt="Das ist eine Info" class="arrow" height="25" width="25" @mouseover="hover = true" @mouseleave="hover = false">
        <div v-if="hover" class="info__text">
            {{ info }}
        </div>
    </div>
</template>

<style scoped>

.info {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

.info:hover {
        cursor: pointer;
    }

.info__text {
        position: absolute;
        background-color: white;
        border-radius: 10px;
        padding: 10px;
        width: calc(max-content + 20px);
        height: calc(max-content + 20px);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
        left: calc(50% + 250px);
    }
</style>