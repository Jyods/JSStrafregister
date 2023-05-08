<script setup>
import { RouterLink } from 'vue-router'
import { onMounted, ref } from 'vue'
import { getPermissions } from '../api/requests.js'

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
</script>
<template>
    <div class="sidebar">
        <div class="sidebar-header">
        <h2>Strafregister</h2>
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
        <RouterLink to="/member" v-if="permissions">
        <li class="sidebar-list-item">
            <p>Mitglieder</p>
        </li>
        </RouterLink>
        </ul>
    </div>
</template>
<style scoped>
.sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 200px;
    background-color: grey;;
    color: red;
    padding-top: 50px;
}

.sidebar-list-item {
    list-style-type: none;
    padding: 10px;
    background-color: rgb(224, 224, 224);
    border-color: black;
    border-style: solid;
    border-width: 1px;
    margin-bottom: 3px;
    display: flex;
    justify-content: center;
}

.sidebar-list-item:hover {
    background-color: rgb(187, 187, 187);
}

a {
    text-decoration: none;
    color: black;
}

</style>