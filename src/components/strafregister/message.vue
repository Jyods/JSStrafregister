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

const emit = defineEmits(['removeItem'])

onMounted(() => {
    id.value = props.message.id
    message.value = props.message.message
    console.warn(message.value.length)
    setTimeout(() => {
        emit('removeItem', id.value)
    }, 10000)
})

function removeItem() {
    emit('removeItem', id.value)
}
</script>

<template>
    <transition name="slide-in-out">
        <div class="wrapper bg-white text-gray-800 p-4 rounded-lg border border-gray-300 shadow-lg m-2">
            <div class="message text-center">
                <p>{{ message }}</p>
            </div>
            <div class="button flex justify-end mt-2">
                <button class="xButton text-gray-500 hover:text-red-500" @click.stop="removeItem">x</button>
            </div>
        </div>
    </transition>
</template>

<style scoped>
.slide-in-out-enter-active,
.slide-in-out-leave-active {
  transition: transform 0.5s;
}

.slide-in-out-enter, .slide-in-out-leave-to /* .slide-in-out-leave-active in <2.1.8 */ {
  transform: translateX(100%); /* Initially off to the right */
}
</style>