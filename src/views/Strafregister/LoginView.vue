<script setup>
import { ref, onMounted, onBeforeMount } from 'vue'
import { RouterLink, RouterView, useRouter } from 'vue-router'
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
    }
    )

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
    <div class="login">
        <div class="loading" v-if="isLoading">
            <img src="../../assets/Loading.svg" alt="loading"/>
        </div>
        <div class="background_image">
            <div class="login_wrapper">
            <div class="header_image"></div>
            <form class="wrapper" @submit.prevent="submitForm">
                <label for="identification"><img src="../../assets/Identification.png" /> </label>
                <input type="text" id="identification" name="identification" placeholder="CT-0000" required>
                <label for="password"><img src="../../assets/Password.png" /></label>
                <input type="password" id="password" name="password" placeholder="*******" required>
                <button type="submit" :disabled="isLoading"><img src="../../assets/Login.png" width="120" height="20" /> </button>
            </form>
            </div>
        </div>
    </div>
</template>

<style scoped>
.background_image {
    background-image: url("../../assets/guard-logo.svg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    position: fixed;
    z-index: 1;
    padding: 40px;
}
.header_image {
    background-image: url("../../assets/Strafregister.png");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    width: 150%;
    height: 70px;
    /*background-color: blue;*/
}
.loading {
        position:fixed;
        z-index: 2;
}
    .login {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        flex-direction: column;
        background-color: rgb(255, 255, 255);
    }

    .wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: larger;
        padding-top: 20px;
    }

    .login_wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 247, 255, 0.7);
        border-radius: 10px;
        padding: 50px 100px 50px 100px;
        box-shadow: 1px 1px 10px 5px rgba(54, 198, 255, 0.584);
    }

    .login_wrapper::before {
        content: "";
        position: absolute;
        width: 85.3%;
        height: 20px;
        background: linear-gradient(1deg, transparent, rgba(254, 254, 254, 0.2), transparent);
        animation: hologram-animation 3s linear infinite;
    }

    .login_wrapper::after {
        content: "";
        position: absolute;
        width: 85.3%;
        height: 20px;
        background: linear-gradient(1deg, transparent, rgba(254, 254, 254, 0.2), transparent);
        animation: hologram-animation 4s linear infinite;
    }

    input {
        margin: 10px;
        padding: 10px;
        border-radius: 5px;
        border: none;
        width: 200px;
        background-color: rgba(15, 0, 128, 0.201);
        color: white;
        z-index: 100;
    }

    input:hover {
        background-color:  rgba(15, 0, 128, 0.104);
    }

    input:focus {
        background-color: rgba(15, 0, 128, 0.104);
    }

    ::placeholder {
        color: white;
    }

    button {
        margin: 10px;
        padding: 10px;
        border-radius: 5px;
        border: none;
        width: 200px;
        background-color: rgb(50, 105, 255, 0.742);
        color: white;
        z-index: 100;
    }

    button:hover {
        background-color: rgba(50, 105, 255);
    }

    @keyframes hologram-animation {
        0% {
            transform: translateY(-1000%);
        }
        50% {
            transform: translateY(1000%);
        }
        100% {
            transform: translateY(-1000%);
        }
    }
</style>