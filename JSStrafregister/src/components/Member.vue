<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, RouterView, useRouter } from 'vue-router'

const props = defineProps({
    member: {
        type: Object,
        required: true
    }
})

</script>
<template>
    <div class="member">
            <h1>{{ member.type }}</h1>
            <h3>Identifikation: {{ member.identification }}</h3>
            <h3>Email: {{ member.email }}</h3>
            <h3>Alter: {{ member.age }}</h3>
            <h3>RestrictionClass: {{ member.restrictionClass }}</h3>
            <h3>Aktives Mitglied: {{ member.isActive }}</h3>
            <h3>Eintritt: {{ member.entry }}</h3>
        </div>
</template>
<style scoped>
    .member {
        display: flex;
        width: 50%;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #d80000;
        padding: 20px;
        margin: 20px;
        border-radius: 10px;
    }
</style>