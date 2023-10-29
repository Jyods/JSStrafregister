<script setup>
    import { ref, onMounted } from 'vue'
    import { RouterLink, RouterView } from 'vue-router'
    import { getMember } from '../../api/requests.js'

    const isLoading = ref(true)
    const member = ref([])

    const searchParams = new URLSearchParams(window.location.search);
    const memberID = searchParams.get('MemberID');

    const left = ref(false)

onMounted(async() => {
    isLoading.value = true
    console.log("Member View")
    console.log(memberID)
    let fetch = await getMember(memberID)
    member.value = fetch.data
    console.log(member.value)
    left.value = member.value.isActive == 1 ? true : false
    isLoading.value = false
    console.log(left.value)
})

</script>


<template>

<div class="loading" v-if="isLoading">
    <img src="../../assets/Loading.svg" alt="loading"/>
</div>
<div v-else>
    <div class="members">
        <div class="member">
            <h1>Members</h1>
            <h2>Typ: {{ member.type }}</h2>
            <h3>Identifikation: {{ member.identification }}</h3>
            <h3>Einheit: {{ member.rank.unit }}</h3>
            <h3>Rang: {{ member.rank.rank }}</h3>
            <h3>Aktives Mitglied: {{ left }}</h3>
            <h3>Beitritt: {{ member.entry }}</h3>
            <h3 v-if="member.left == false">Austritt: {{ member.departure }}</h3>
            <h3 v-if="member.left == false">Grund: {{ member.reason }}</h3>
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