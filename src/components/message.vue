<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const message = ref([])

const props = defineProps({
    message: {
        type: Object,
        required: true
    }
})

onMounted (() => {
    message.value = props.message
    console.log(props.message)
})

const emit = defineEmits(['removeItem'])

function removeItem() {
    emit('removeItem',message.value.id)
}

</script>

<template>
    <div class="wrapper">
        <div class="message">
            <p>{{ message.message }}</p>
        </div>
        <div class="button">
            <button class="xButton" @click="removeItem">x</button>
        </div>
    </div>
</template>

<style scoped>

.wrapper {
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
