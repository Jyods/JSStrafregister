<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const message = ref([])

const props = defineProps({
    kabum: {
        type: Object,
        required: true
    }
})

onMounted (() => {
    console.log(props.kabum)
})

</script>

<template>
    <div class="wrapper">
        <div class="message">
            <p>{{ prop.kabum.message }}</p>
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
