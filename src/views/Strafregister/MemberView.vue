<script setup>
import { ref, onMounted } from 'vue'
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
    <div class="flex justify-center items-center h-screen" v-if="isLoading">
        <img src="../../assets/Loading.svg" alt="loading"/>
    </div>
    <div v-else class="container mx-auto p-4">
        <div class="member-card p-6 dark:bg-neutral-900 rounded-lg shadow-md">
            <h1 class="text-2xl font-bold mb-4">Member Details</h1>
            <p class="mb-2"><strong>Typ:</strong> {{ member.type }}</p>
            <p class="mb-2"><strong>Identifikation:</strong> {{ member.identification }}</p>
            <p class="mb-2"><strong>Einheit:</strong> {{ member.rank.unit }}</p>
            <p class="mb-2"><strong>Rang:</strong> {{ member.rank.rank }}</p>
            <p class="mb-2"><strong>Aktives Mitglied:</strong> {{ left }}</p>
            <p class="mb-2"><strong>Beitritt:</strong> {{ member.entry }}</p>
            <p v-if="member.left == false" class="mb-2"><strong>Austritt:</strong> {{ member.departure }}</p>
            <p v-if="member.left == false" class="mb-2"><strong>Grund:</strong> {{ member.reason }}</p>
        </div>
    </div>
</template>

<style scoped>
</style>