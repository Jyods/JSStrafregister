<script setup>
import { ref, onMounted } from 'vue'

import {RouterLink, useRouter} from 'vue-router'

const router = useRouter()

const user = ref(null)

const isloading = ref(true)


const props = defineProps({
    result: {
        type: Object,
        required: true
    },
    user_id: {
        type: Number,
        required: true
    }
})

onMounted(async () => {
    console.log("Result")
    console.log(props.result)
    isloading.value = false
})

function redirect() {
    isloading.value = true
    console.log("Redirect")
    router.push({ name: 'OrientationID', params: { id: props.result.id }})
    isloading.value = false
}

</script>

<template>
    
    <div v-loading="isloading" class="file_wrapper">
        <div class="header_wrapper">
            <div class="name1">
                {{ result.name }}
            </div>
            <RouterLink v-if="result.user_id == user_id" :to="{ name: 'OrientationEdit', params: { id: props.result.id }}">
                <img src="../../assets/edit.svg" alt="loading" height="15" width="15"/>
            </RouterLink>
        </div>
        <div class="webframe_preview" @click="redirect">
            <iframe :src="result.path" width="90%" height="100%"></iframe>
        </div>
    </div>
    
</template>

<style scoped>
    .file_wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 300px;
        height: 400px;
        padding: 5px;
        border: 1px solid black;
    }
    .header_wrapper {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 50px;
        border-bottom: 1px solid black;
    }
    .name1 {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 50px;
        border-bottom: 1px solid black;
    }
    .webframe_preview {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
    }
    .webframe_preview:hover {
        cursor: pointer;
    }
    iframe {
        border: none;
    }
    /* Mache den IFrame grau, der user soll nur ein preview sehen */
    iframe {
        filter: grayscale(100%);
        pointer-events: none;
    }
</style>