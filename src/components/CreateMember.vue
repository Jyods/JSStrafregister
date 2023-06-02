<script setup>
import Info from './Tooltip.vue'
import { ref, onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { auth,  } from '../api/requests.js'

const props = defineProps({
    member: {
        type: Object,
        required: true
    },
    ranks: {
        type: Array,
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
    console.log("Abort", memberID)
    emit('abortMember', memberID)
}

function checkIfAllFieldsFilled() {
    if (member.value.identification != "" && member.value.email != "" && member.value.password != "" && member.value.restrictionClass != "" && member.value.rank != "")
    {
        return true
    }
    else {
        return false
    }

}

onMounted(() => {
    console.log("Mounted")
    console.log(member.value)
})

</script>
<template>
     <div class="edit__member member">
            <img src="../assets/data_loading.svg" alt="loading" v-if="isLoading" class="loading">
            <h1>{{ member.type }}</h1>
            <h3>Identifikation: <input type="text" v-model="member.identification"></h3>
            <h3>Email: <input type="email" v-model="member.email"></h3>
            <Info info="Das Passwort wird Ihnen nach der Erstellung einmalig bekannt gegeben.">
                <h3>Passwort: <input type="password" v-model="member.password" disabled></h3>
            </Info>
            <h3>RestrictionClass: <input type="number" v-model="member.restrictionClass"/></h3>
            <h3>Aktives Mitglied: <input type="checkbox" v-model="member.isActive"></h3>
            <h3>Rank: <select v-model="member.rank">
                <option v-for="rank in ranks" :key="rank.id" :value="rank">{{ rank.rank }}</option>
            </select> </h3>
            <Info info="Das Eintrittsdatum kann nicht geändert werden.">
                <h3>Eintritt: <input type="date" v-model="member.entry" disabled></h3>
            </Info>
            <div class="btn">
                <button class="abort_btn" @click="abort(member.id)">Abort</button>
                <button class="save_btn" @click="pushMember(member)">Save</button>
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
        background-color: rgb(255, 255, 255);
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
        border: 1px solid black;
        border-radius: 5px;
        padding: 5px;
        width: 100px;
    }
    .abort_btn {
        background-color: rgb(255, 0, 0);
    }
    .save_btn {
        background-color: rgb(0, 255, 0);
    }
    button:hover {
        cursor: pointer;
    }
    .abort_btn:hover {
        background-color: rgb(128, 0, 0);
    }
    .save_btn:hover {
        background-color: rgb(0, 128, 0);
    }
    .btn {
        padding-top: 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        width: 100%;
    }
    input {
        border: none;
        border-bottom: 1px solid black;
        width: 100%;
        margin-bottom: 10px;
    }
    input:focus {
        outline: none;
    }
    input[type="checkbox"] {
        width: 15px;
        height: 15px;
    }
</style>