<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { getPermissions } from '../api/requests.js'
import {logout } from '../api/requests.js'
import Navbar from './navbar.vue'

const permissions = ref([])

onMounted(async () => {
    let data = await getPermissions()
    
    data = data.data;
    //alle props in data kommen mit 0 oder 1, ändere diese in true oder false
    for (const [key, value] of Object.entries(data.permissions)) {
        if (value == 1) {
            data.permissions[key] = true
        }
        else {
            data.permissions[key] = false
        }
    }
    permissions.value = data.permissions
    console.error(permissions.value)
})

const router = useRouter()

const emit = defineEmits(['add-to-array'])

async function logoutUser() {
    let data = await logout()
    if (data.message == "Logged out")
    {
        console.warn("Logout successful")
        emit('add-to-array', data.message)
        router.push({ name: 'Login'})
    }
    else {
        console.log("Logout failed")
    }
}

function playsound() {
    let audio = new Audio('../src/assets/sounds/click.mp3')
    try {
        audio.play()
    }
    catch(error) {
        console.log(error)
    }
}
</script>
<template>
    <Navbar class="navbar" />
    <div class="title"><img src="../assets/Strafregister.png" width="160" class="header_image"/></div>
    <div class="sidebar">
        <div class="sidebar-header">
        <!--<h2>Strafregister</h2>-->
        </div>
        <ul class="sidebar-list">
        <RouterLink @click="playsound" to="/" v-if="permissions.permission_register || permissions.permission_superadmin">
        <li class="sidebar-list-item">
            <p>Register</p>
        </li>
        </RouterLink>
        <RouterLink @click="playsound" to="/create/entry" v-if="permissions.permission_creator || permissions.permission_superadmin">
        <li class="sidebar-list-item">
            <p>Neuer Eintrag</p>
        </li>
        </RouterLink>
        <RouterLink @click="playsound" to="/articles">
        <li class="sidebar-list-item">
            <p>Gesetzesartikel</p>
        </li>
        </RouterLink>
        <RouterLink @click="playsound" to="/AdminMember" v-if="permissions.permission_recruiter || permissions.permission_superadmin">
        <li class="sidebar-list-item">
            <p>Mitglieder</p>
        </li>
        </RouterLink>
        <RouterLink @click="playsound" to="/brodcast" v-if="permissions.permission_brodcaster || permissions.permission_superadmin">
        <li class="sidebar-list-item">
            <p>Brodcast System</p>
        </li>
        </RouterLink>
        <RouterLink @click="playsound" to="/odt" v-if="permissions.permission_superadmin">
        <li class="sidebar-list-item">
            <p>ODT</p>
        </li>
        </RouterLink>
        <RouterLink @click="playsound" to="/odt/new" v-if="permissions.permission_superadmin">
        <li class="sidebar-list-item">
            <p>New ODT</p>
        </li>
        </RouterLink>
        <RouterLink @click="playsound" to="/chat" v-if="permissions.permission_superadmin">
        <li class="sidebar-list-item">
            <p>Chat</p>
        </li>
        </RouterLink>
        <li class="sidebar-list-item" @click.prevent="logoutUser">
            <p>Logout</p>
        </li>
        </ul>
    </div>
</template>
<style scoped>
.title {
    padding-left: 20px;
}
.header_image {
    position: fixed;
    height: 50px;
    z-index: 3;
}
.navbar {
    position: fixed;
    margin-left: 0px;
    width: 100%;    
}
.sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 200px;
    /*background-color: grey;*/
    background-color: rgba(0, 247, 255, 0.7);
    box-shadow: 1px 55px 10px 5px rgba(54, 198, 255, 0.584);
    color: red;
    padding-top: 50px;
}

.sidebar-list-item {
    list-style-type: none;
    padding: 10px;
    background-color: rgb(224, 224, 224);
    border-color: black;
    color: black;
    border-style: solid;
    border-width: 1px;
    margin-bottom: 3px;
    display: flex;
    justify-content: center;
}

.sidebar-list-item:hover {
    background-color: rgb(187, 187, 187);
    cursor: pointer;
}

a {
    text-decoration: none;
    color: black;
}

</style>