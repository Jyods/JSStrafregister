<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { getCurrentUser, logout } from '../api/requests.js'

  const userInfo = ref([])

onMounted(async() => {
    //checks if auth has status 200, if true then redirect to home
    const request = await getCurrentUser()
    userInfo.value = request
    userInfo.value.isActive = userInfo.value.isActive ? "Ja" : "Nein"
    if (userInfo.value.isActive == "Nein")
    {
      await logout()
    }
    console.log(userInfo.value)
})
//import getUser from '../api/requests.js'
</script>
<template>
        <main>
          <body>
            <div class="nav">
              <!--ADD USER INFOS-->
              <p>Identifikation: {{ userInfo.name }}</p>
              <p>Alter: {{ userInfo.age }}</p>
              <p>Aktives Mitglied: {{ userInfo.isActive}}</p>
              <p>Eintritt: {{ userInfo.entry }}</p>
              <p>Berechtigungsstufe: {{ userInfo.restrictionClass }}</p>
            </div>
          </body>
        </main>
</template>
<style scoped>
  .nav {
    margin-left: 200px;
    /*background-color: #6d6d6d;*/
    background-color: rgba(0, 247, 255, 0.7);
    box-shadow: 1px 1px 10px 5px rgba(54, 198, 255, 0.3);
    overflow: hidden;
    height: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    }
</style>