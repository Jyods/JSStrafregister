<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { getCurrentUser, logout } from '../../api/requests.js'

  const userInfo = ref([])

  const rank = ref([])

  const formattedDate = ref([])

  const loading = ref(true)

onMounted(async() => {
    //checks if auth has status 200, if true then redirect to home
    const request = await getCurrentUser()
    console.log(request)
    userInfo.value = request.data
    // rank.value = userInfo.value.rank
    userInfo.value.isActive = userInfo.value.isActive == 1 ? "Ja" : "Nein"
    // formattedDate.value = userInfo.value.entry.split("-").reverse().join(".")
    formattedDate.value = userInfo.value.entry
    if (userInfo.value.isActive == "Nein")
    {
      await logout()
    }
    console.warn(userInfo.value)
    loading.value = false
})

</script>
<template>
  <el-menu mode="horizontal" v-if="!loading">
    <el-menu-item index="0">
      <img
        style="width: 150px"
        src="../../assets/Strafregister.png"
        alt="Strafregister"
      />
    </el-menu-item>
    <div class="flex-grow justify-center" />
    <el-menu-item>Identification: {{ userInfo.identification }}</el-menu-item>
    <el-menu-item>Rank: {{ userInfo.rank.rank || "loading" }} ({{ userInfo.rank.level || "loading" }})</el-menu-item>
    <el-menu-item>Entry: {{ formattedDate }}</el-menu-item>
    <el-menu-item>Security Level: {{ userInfo.rank.securityLevel.abbreviation || "loading" }} ({{ userInfo.rank.securityLevel.level || "loading" }})</el-menu-item>
  </el-menu>
</template>