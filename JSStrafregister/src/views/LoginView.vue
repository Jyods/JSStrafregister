<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { authenticateUser, auth } from '../api/requests.js'

    const router = useRouter()

    const isLoading = ref(false)

    onMounted(async() => {
        //checks if auth has status 200, if true then redirect to home
        isLoading.value = true
        if (await auth() == true) {
            router.push({ name: 'Home'})
        }
        isLoading.value = false
    }
    )

    async function submitForm() {
        console.log("Login")
        isLoading.value = true
        let email = document.getElementById("email").value
        let password = document.getElementById("password").value
        let response = await authenticateUser(email, password)
        if (response) {
            console.warn("Login successful")
            router.push({ name: 'Home'})
        }
        else {
            console.warn("Login failed")
        }
        isLoading.value = false
    }


</script>

<template>
    <!--Login Form with email and password-->
    <div class="login">
    <div class="loading" v-if="isLoading">
        <img src="../assets/Loading.svg" alt="loading"/>
    </div>
        <div class="login_wrapper">
        <h1>Identifikation</h1>
        <form class="wrapper" @submit.prevent="submitForm">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Email" required>
            <label for="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Password" required>
            <button type="submit" :disabled="isLoading">Login</button>
        </form>
    </div>
    </div>
</template>

<style scoped>
.loading {
        position:fixed;
}
    .login {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        flex-direction: column;
        background-color: rgb(72, 71, 71);
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
        background-color: rgb(117, 117, 117);
        border-radius: 10px;
        padding: 50px 100px 50px 100px;
        box-shadow: 1px 1px 10px 5px rgba(0, 0, 0, 0.75);
    }

    input {
        margin: 10px;
        padding: 10px;
        border-radius: 5px;
        border: none;
        width: 200px;
        background-color: rgb(95, 95, 95);
        color: white;
    }

    input:hover {
        background-color: rgb(72, 71, 71);
    }

    input:focus {
        background-color: rgb(247, 0, 0);
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
        background-color: rgb(95, 95, 95);
        color: white;
    }

    button:hover {
        background-color: rgb(72, 71, 71);
    }
</style>