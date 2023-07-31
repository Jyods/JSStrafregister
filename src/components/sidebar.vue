<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { getPermissions } from '../api/requests.js'
import {logout } from '../api/requests.js'
import Navbar from './navbar.vue'

const permissions = ref(false)

onMounted(async () => {
    let data = await getPermissions()
    if (data.data >= 10)
    {
        permissions.value = true
    }
    else {
        permissions.value = false
    }
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
</script>
<template>
    <Navbar class="navbar" />
    <div class="title"><img src="../assets/Strafregister.png" width="160" class="header_image"/></div>
    <div class="sidebar">
        <div class="sidebar-header">
        <!--<h2>Strafregister</h2>-->
        </div>
        <ul class="sidebar-list">
        <RouterLink to="/">
        <li class="sidebar-list-item">
            <p>Register</p>
        </li>
        </RouterLink>
        <RouterLink to="/create/entry">
        <li class="sidebar-list-item">
            <p>Neuer Eintrag</p>
        </li>
        </RouterLink>
        <RouterLink to="/articles">
        <li class="sidebar-list-item">
            <p>Gesetzesartikel</p>
        </li>
        </RouterLink>
        <RouterLink to="/AdminMember" v-if="permissions">
        <li class="sidebar-list-item">
            <p>Mitglieder</p>
        </li>
        </RouterLink>
        <RouterLink to="/brodcast" v-if="permissions">
        <li class="sidebar-list-item">
            <p>Brodcast System</p>
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