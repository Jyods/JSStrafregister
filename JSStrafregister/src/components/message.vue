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
    console.log(props.kabum)
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
            <button @click="removeItem">X</button>
        </div>
    </div>
</template>

<style scoped>

.wrapper {
    width: max-content;
    height: max-content;
    background-color: red;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.message {
    background-color: red;
}

button {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
</style>
