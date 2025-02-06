<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { getCurrentUser, logout } from '../../api/requests.js'
import { Button } from '../ui/button/index.js'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import themeSwitch from './themeSwitch.vue';

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
    <nav v-if="!loading" class=" p-4 shadow-md">
      <div class="container mx-auto flex items-center justify-between">
        <RouterLink to="/"><h1 class="text-xl">Strafregister</h1></RouterLink>
        <themeSwitch />
        <div class="flex items-center space-x-6">
          <span>Identification: {{ userInfo?.identification }}</span>
          <span>Rank: {{ userInfo?.rank?.rank || 'loading' }} ({{ userInfo?.rank?.level || 'loading' }})</span>
          <span>Entry: {{ formattedDate }}</span>
          <span>Security Level: {{ userInfo?.rank?.securityLevel?.abbreviation || 'loading' }} ({{ userInfo?.rank?.securityLevel?.level || 'loading' }})</span>
              <Avatar>
                <AvatarImage src="/placeholder-avatar.png" alt="User Avatar" />
                <AvatarFallback>{{ userInfo?.identification?.charAt(0) }}</AvatarFallback>
              </Avatar>
        </div>
      </div>
    </nav>
  </template>

<style scoped>
.el-menu {
  background-color: var(--main-color);
  color: white;
}
.el-menu-item {
  color: white;
}
</style>