<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, RouterView, useRouter } from 'vue-router'

const props = defineProps({
    member: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(['changeActiv'])

function changeActiv(memberID) {
    emit('changeActiv', memberID)
}

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
            <button @click="changeActiv(member.id)">Switch Active</button>
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
    button {
        background-color: #939393;
        color: white;
        border-radius: 10px;
        padding: 10px;
        border: none;
        margin: 10px;
    }
    button:hover {
        background-color: #727272;
        cursor: pointer;
    }
</style>