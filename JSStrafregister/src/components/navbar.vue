<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { getCurrentUser } from '../api/requests.js'

  const userInfo = ref([])

onMounted(async() => {
    //checks if auth has status 200, if true then redirect to home
    const request = await getCurrentUser()
    userInfo.value = request
    userInfo.value.isActive = userInfo.value.isActive ? "Ja" : "Nein"
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
    padding-left: 200px;
    background-color: #6d6d6d;
    overflow: hidden;
    height: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
</style>