<script setup>
import { onMounted, ref, computed } from 'vue'

const message = ref([])

const id = ref(0)

const props = defineProps({
    message: {
        type: Object,
        required: true
    }
})

onMounted (() => {
    id.value = props.message.id
    message.value = props.message.message
    console.warn(message.value.length)
})

const emit = defineEmits(['removeItem'])

function removeItem() {
    emit('removeItem',message.value.id)
}

const longerThanFive = computed(() => {
    return message.value.length > 20
})

const messagePreview = computed(() => {
    return message.value.substring(0, 20) + "..."
})

const showAll = ref(false)

</script>

<template>
    <div class="wrapper" @click.prevent="showAll = !showAll">
        <div class="message_preview" v-if="longerThanFive && !showAll">
            <p>{{ messagePreview }}</p>
        </div>
        <div class="message" v-else>
            <p>{{ message }}</p>
        </div>
        <div class="button">
            <button class="xButton" @click="$emit('removeItem', id)">x</button>
        </div>
    </div>
</template>

<style scoped>

.wrapper {
    min-width: 160px;
    max-width: 160px;
    background-color: red;
    padding: 10px;
    width: max-content;
    height: max-content;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    border-style: outset;
    border-color: black;
    margin: 5px;
    /* smooth edges */
    
}
.xButton {
    background-color: transparent;
    border: none;
    justify-content: center;
    font-size: 20px;
    cursor: pointer;
    color: black;
    padding: 0px;
    margin: 0px;
}

.message {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 100%;
    margin: 0px;
    padding: 0px;
}

button {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
</style>
