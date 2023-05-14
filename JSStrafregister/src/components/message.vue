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

</script>

<template>
    <div class="wrapper">
        <div class="message">
            <p>{{ message.message }}</p>
        </div>
    </div>
</template>

<style scoped>
.wrapper {
    width: max-content;
    height: max-content;
    background-color: red;
}
.message {
    background-color: red;
}
</style>
