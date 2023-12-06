<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { getCurrentUser, logout } from '../../api/requests.js'

  const userInfo = ref([])

  const rank = ref([])

  const formattedDate = ref([])

onMounted(async() => {
    //checks if auth has status 200, if true then redirect to home
    const request = await getCurrentUser()
    userInfo.value = request
    rank.value = userInfo.value.rank
    userInfo.value.isActive = userInfo.value.isActive ? "Ja" : "Nein"
    formattedDate.value = userInfo.value.entry.split("-").reverse().join(".")
    if (userInfo.value.isActive == "Nein")
    {
      await logout()
    }
    console.log(userInfo.value)
})
//import getUser from 'src/api/.js'
</script>
<template>
  <el-menu mode="horizontal">
    <el-menu-item index="0">
      <img
        style="width: 150px"
        src="../../assets/Strafregister.png"
        alt="Strafregister"
      />
    </el-menu-item>
    <div class="flex-grow justify-center" />
    <el-menu-item>Identification: {{ userInfo.identification }}</el-menu-item>
    <el-menu-item>Rank: {{ rank.rank }} ({{ rank.id }})</el-menu-item>
    <el-menu-item>Entry: {{ formattedDate }}</el-menu-item>
    <el-menu-item>Permission-Level: {{ userInfo.restrictionClass }}</el-menu-item>
  </el-menu>
</template>