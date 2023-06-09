<script setup>
import message from './message.vue'
import { ref, onMounted } from 'vue'

const props = defineProps({
    messages: {
        type: Array,
        required: true
    }
})

const emit = defineEmits(['removeItem'])

function removeItem (index) {
    emit('removeItem', index)
}

</script>

<template>
    <div class="container">
        <div class="wrapper">
            <div class="messageWrapper">
                <message v-for="message in messages" :message="message" @removeItem="removeItem" />
            </div>
        </div> 
    </div>
</template>

<style scoped>
.container {
    position: absolute;
    top: 0;
    right: 0;
}
.wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: max-content;
    height: max-content;
}

.messageWrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: max-content;
    height: max-content;
}
</style>