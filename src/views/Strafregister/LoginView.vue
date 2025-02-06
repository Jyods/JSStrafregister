<script setup>
import { ref, onMounted, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { authenticateUser, auth } from '../../api/requests.js'

const router = useRouter()
const isLoading = ref(false)

onBeforeMount(async() => {
    //checks if the backend is online, if not then redirect to error page
    let response = null
    try {
        // response = await fetch('https://home-5013253951.app-ionos.space/public/api/auth')
    }
    catch (error) {
        console.warn("Backend is offline")
        router.push({ name: 'Error', params: { code: 500 }})
    }
    
    console.log(response)
    //checks if auth has status 200, if true then redirect to home
    isLoading.value = true
    document.title = 'Loading'
    if (await auth() == true) {
        router.push({ name: 'Index'})
    }
    document.title = 'Strafregister'
    isLoading.value = false
})

async function submitForm() {
    console.log("Login")
    isLoading.value = true
    document.title = 'Loading'
    let identification = document.getElementById("identification").value
    let password = document.getElementById("password").value
    let response = await authenticateUser(identification, password)
    if (localStorage.getItem("token") != undefined || localStorage.getItem("token" != null)) {
        let audio = new Audio('../../src/assets/sounds/success.mp3')
        try {
            await audio.play()
        }
        catch(error) {
            console.log(error)
        }
        console.warn("Login successful")
        document.title = 'Redirect...'
        router.push({ name: 'Index'})
    }
    else {
        //play sound ../../assets/sounds/error.mp3
        let audio = new Audio('../../src/assets/sounds/error.mp3')
        try {
            await audio.play()
        }
        catch(error) {
            console.log(error)
        }
        addToArray(response.message)
        console.warn("Login failed")
    }
    isLoading.value = false
}

const emit = defineEmits(['add-to-array'])

function addToArray(message) {
    emit('add-to-array', message)
    console.log(message)
}
</script>

<template>
    <!--Login Form with username and password-->
    <div class="flex items-center justify-center min-h-screen bg-neutral-900 bg-cover bg-center" style="background-image: url('../../assets/republic.jpg');">
        <div v-if="isLoading" class="fixed z-50 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-75">
            <img src="../../assets/Loading.svg" alt="loading" class="w-16 h-16"/>
        </div>
        <div class="relative z-10 flex flex-col items-center justify-center w-full max-w-md p-8 bg-white rounded-lg shadow-lg bg-opacity-90">
            <div class="mb-6">
                <img src="../../assets/Strafregister.png" alt="Strafregister" class="w-48 h-auto"/>
            </div>
            <form class="w-full" @submit.prevent="submitForm">
                <div class="mb-4">
                    <label for="identification" class="block mb-2 text-sm font-medium text-gray-700">Identification</label>
                    <input type="text" id="identification" name="identification" placeholder="CT-0000" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                </div>
                <div class="mb-6">
                    <label for="password" class="block mb-2 text-sm font-medium text-gray-700">Password</label>
                    <input type="password" id="password" name="password" placeholder="*******" required class=" text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                </div>
                <button type="submit" :disabled="isLoading" class="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Login
                </button>
            </form>
        </div>
    </div>
</template>