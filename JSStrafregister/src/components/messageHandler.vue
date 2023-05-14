<script setup>
import message from './message.vue'
import { ref, onMounted } from 'vue'

const props = defineProps({
    messages: {
        type: Array,
        required: true
    }
})
</script>

<template>
    <div class="wrapper">
        <div class="messageWrapper">
            <message v-for="message in messages" :message="message" />
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