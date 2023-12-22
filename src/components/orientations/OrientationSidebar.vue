<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { getPermissions } from '../../api/requests.js'
import { logout } from '../../api/requests.js'

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
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item index="1">
            <RouterLink @click="playsound" to="/orientation">Dokumente</RouterLink>
        </el-menu-item>
        <el-menu-item index="2">
          <RouterLink @click="playsound" to="/orientation/new">Neuer Eintrag</RouterLink>
        </el-menu-item>
        <el-menu-item index="3">
          <RouterLink @click="playsound" to="/orientation/permission">Permissions</RouterLink>
        </el-menu-item>
        <el-menu-item index="4">
            <span @click.prevent="logoutUser">Logout</span>
        </el-menu-item>
      </el-menu>
</template>