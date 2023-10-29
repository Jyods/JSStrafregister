<script setup>
import message from './Smessage.vue'
import { ref, onMounted, onBeforeMount } from 'vue'

const props = defineProps({
    messages: {
        type: Array,
        required: true
    }
})

const testMessages = ref([
    {
        id: 1,
        message: 'test1'
    },
    {
        id: 2,
        message: 'test2'
    },
    {
        id: 3,
        message: 'test3'
    }
])

const emit = defineEmits(['removeItem'])

function removeItem (index) {
    emit('removeItem', index)
}

onBeforeMount(() => {
    console.log(props.messages)
})

</script>

<template>
    <div class="container">
        <div class="wrapper">
            <div class="messageWrapper">
                <message v-for="message in testMessages" :message="message" @removeItem="removeItem" />
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