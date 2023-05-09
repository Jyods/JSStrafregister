<script setup>
    import { ref, onMounted } from 'vue'
    import { RouterLink, RouterView } from 'vue-router'
    import { getMember } from '../api/requests.js'

    const isLoading = ref(true)
    const member = ref([])

    const searchParams = new URLSearchParams(window.location.search);
    const memberID = searchParams.get('MemberID');

    const isActive = ref(false)

onMounted(async() => {
    isLoading.value = true
    console.log("Member View")
    console.log(memberID)
    let fetch = await getMember(memberID)
    member.value = fetch.data
    console.log(member.value)
    isActive.value = member.value.is_active
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
            <h1>Members</h1>
            <h2>Typ: {{ member.type }}</h2>
            <h3>Identifikation: {{ member.identification }}</h3>
            <h3>Alter: {{ member.age }}</h3>
            <h3>Aktives Mitglied: {{ member.is_active }}</h3>
            <h3>Beitritt: {{ member.entry }}</h3>
            <h3 v-if="!isActive">Austritt: {{ member.departure }}</h3>
            <h3 v-if="!isActive">Grund: {{ member.reason }}</h3>
        </div>
    </div>
</div>

</template>

<style scoped>
.member {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: rgb(117, 117, 117);
    border-radius: 10px;
    padding: 20px;
    margin: 50px 100px 50px 100px;
    box-shadow: 1px 1px 10px 5px rgba(0, 0, 0, 0.75);
}
</style>