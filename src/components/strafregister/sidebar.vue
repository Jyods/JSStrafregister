<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { getPermissions } from '../../api/requests.js'
import {logout } from '../../api/requests.js'
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
    <el-row class="tac">
    <el-col :span="3">
      <img src="../../assets/Strafregister.png" width="160" class="header_image"/>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-sub-menu index="1">
          <template #title>
            <span>ODT</span>
          </template>
            <el-menu-item index="1-1">New ODT</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="2">
          <span>Register</span>
          <RouterLink @click="playsound" to="/justice" v-if="permissions.permission_register || permissions.permission_superadmin"></RouterLink>
        </el-menu-item>
        <el-menu-item index="3">
          <span>Neuer Eintrag</span>
        </el-menu-item>
        <el-menu-item index="4">
          <span>Gesetzesartikel</span>
        </el-menu-item>
        <el-menu-item index="5">
            <span>Mitglieder</span>
        </el-menu-item>
        <el-menu-item index="6">
            <span>Broadcast System</span>
        </el-menu-item>
        <el-menu-item index="7">
            <span>Chat</span>
        </el-menu-item>
        <el-menu-item index="8">
            <span>Logout</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
    <div class="title"></div>
    <div class="sidebar">
        <div class="sidebar-header">
        <!--<h2>Strafregister</h2>-->
        </div>
        <ul class="sidebar-list">
        <RouterLink @click="playsound" to="/justice" v-if="permissions.permission_register || permissions.permission_superadmin">
        <li class="sidebar-list-item">
            <p>Register</p>
        </li>
        </RouterLink>
        <RouterLink @click="playsound" to="/justice/create/entry" v-if="permissions.permission_creator || permissions.permission_superadmin">
        <li class="sidebar-list-item">
            <p>Neuer Eintrag</p>
        </li>
        </RouterLink>
        <RouterLink @click="playsound" to="/justice/articles">
        <li class="sidebar-list-item">
            <p>Gesetzesartikel</p>
        </li>
        </RouterLink>
        <RouterLink @click="playsound" to="/justice/AdminMember" v-if="permissions.permission_recruiter || permissions.permission_superadmin">
        <li class="sidebar-list-item">
            <p>Mitglieder</p>
        </li>
        </RouterLink>
        <RouterLink @click="playsound" to="/justice/brodcast" v-if="permissions.permission_brodcaster || permissions.permission_superadmin">
        <li class="sidebar-list-item">
            <p>Brodcast System</p>
        </li>
        </RouterLink>
        <RouterLink @click="playsound" to="/justice/odt" v-if="permissions.permission_superadmin">
        <li class="sidebar-list-item">
            <p>ODT</p>
        </li>
        </RouterLink>
        <RouterLink @click="playsound" to="/justice/odt/new" v-if="permissions.permission_superadmin">
        <li class="sidebar-list-item">
            <p>New ODT</p>
        </li>
        </RouterLink>
        <RouterLink @click="playsound" to="/justice/chat" v-if="permissions.permission_superadmin">
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