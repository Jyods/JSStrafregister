<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { auth } from '../api/requests.js'

const props = defineProps({
    member: {
        type: Object,
        required: true
    }
})

const member = ref(props.member)

//create a event 
const emit = defineEmits(['pushNewMember'])

function pushMember(member) {
    console.log("Push Member")
    emit('pushNewMember', member)
}

</script>
<template>
    <div class="member">
            <h1>{{ member.type }}</h1>
            <h3>Identifikation:
                <input type="text" v-model="member.identification">
            </h3>
            <h3>Alter: <input type="number" v-model="member.age"></h3>
            <h3>Aktives Mitglied: {{ member.isActive }} <input type="checkbox" v-model="member.isActive"></h3>
            <h3>Email <input type="email" v-model="member.email"></h3>
            <h3>Password: 
                <input type="text" v-model="member.password">
            </h3>
            <h3>Restriction:
                <input type="number" v-model="member.restrictionClass">
            </h3>
            <h3>Eintritt: {{ member.entry }}</h3>
            <button @click="pushMember(member)">Speichern</button>
        </div>
</template>
<style scoped>
    .member {
        display: flex;
        width: 50%;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: green;
        padding: 20px;
        margin: 20px;
        border-radius: 10px;
    }
</style>