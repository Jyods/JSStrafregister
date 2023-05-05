<script setup>
    import { ref, onMounted } from 'vue'
    import { RouterLink, RouterView } from 'vue-router'
    import { getMember } from '../api/requests.js'

    const isLoading = ref(true)
    const member = ref([])

    const searchParams = new URLSearchParams(window.location.search);
    const memberID = searchParams.get('MemberID');

onMounted(async() => {
    isLoading.value = true
    console.log("Member View")
    console.log(memberID)
    let fetch = await getMember(memberID)
    member.value = fetch.data
    console.log(member.value)
    isLoading.value = false
})

</script>


<template>

<div class="loading" v-if="isLoading">
    <img src="../assets/Loading.svg" alt="loading"/>
</div>
<div v-else>
    <div class="members">
        <div class="member">
            <h1>{{ member.type }}</h1>
            <h3>Identifikation: {{ member.identification }}</h3>
            <h3>Alter: {{ member.age }}</h3>
            <h3>Aktives Mitglied: {{ member.isActive }}</h3>
            <h3>Eintritt: {{ member.entry }}</h3>
        </div>
    </div>
</div>

</template>