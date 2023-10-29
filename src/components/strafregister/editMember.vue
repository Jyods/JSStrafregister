<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { auth } from 'src/api/.js'

const props = defineProps({
    member: {
        type: Object,
        required: true
    }
})

const member = ref(props.member)

//create a event 
const emit = defineEmits(['pushEdit', 'abortEdit'])

function pushEdit(member) {
    let response = checkIfAllFieldsFilled()
    console.log(response)
    if(response)
    {
        console.log("Push Member")
        emit('pushEdit', member)
    }
    else {
        alert("Bitte alle Felder ausfüllen")
    }
}

function abortEdit(memberID) {
    console.log("Abort")
    emit('abortEdit', memberID)
}

function checkIfAllFieldsFilled() {
    if (member.value.identification != undefined && member.value.age != undefined && member.value.email != undefined && member.value.password != undefined && member.value.restrictionClass != undefined) {
        console.log(member.value.identification + " " + member.value.age + " " + member.value.email + " " + member.value.password + " " + member.value.restrictionClass)
        return true
    }
    else {
        return false
    }
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
            <div class="wrapper">
                <button @click="pushMember(member)">Speichern</button>
                <button @click="abort(member.id)">Abbrechen</button>
            </div>
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
    .wrapper {
        padding-top: 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        width: 100%;
    }
    button {
        width: 100px;
        height: 20px;
        border-radius: 10px;
        border: none;
        background-color: rgb(117, 117, 117);
        color: white;
        font-weight: bold;
        box-shadow: 1px 1px 10px 5px rgba(0, 0, 0, 0.75);
    }
    button:hover {
        background-color: rgb(0, 0, 0);
        cursor: pointer;
    }
</style>