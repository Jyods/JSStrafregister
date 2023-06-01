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
const emit = defineEmits(['pushNewMember', 'abortMember'])

function pushMember(member) {
    let response = checkIfAllFieldsFilled()
    console.log(response)
    if(response)
    {
        console.log("Push Member")
        emit('pushNewMember', member)
    }
    else {
        alert("Bitte alle Felder ausfüllen")
    }
}

function abort(memberID) {
    console.log("Abort")
    emit('abortMember', memberID)
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
     <div class="edit__member member">
            <img src="../assets/data_loading.svg" alt="loading" v-if="isLoading" class="loading">
            <h1>{{ member.type }}</h1>
            <h3>Identifikation: <input type="text" v-model="member.identification"></h3>
            <h3>Email: <input type="email" v-model="member.email"></h3>
            <h3>RestrictionClass: <input type="number" v-model="member.restrictionClass"></h3>
            <h3>Aktives Mitglied: <input type="checkbox" v-model="member.isActive"></h3>
            <h3>Rank: <select v-model="member.rank">
                <option v-for="rank in ranks" :key="rank.id" :value="rank">{{ rank.rank }}</option>
            </select> </h3>
            <h3>Eintritt: <input type="date" v-model="member.entry" disabled> </h3>
            <div class="btn">
                <button @click="editMember = false">Abort</button>
                <button :disabled="isLoading" @click="save">Save</button>
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