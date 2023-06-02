<script setup>
import { ref, onMounted, computed, onBeforeMount } from 'vue'
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { editUser, getCurrentUser } from '../api/requests.js'

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

const editMember = ref(false)

const emit = defineEmits(['changeActiv'])

const changedSomething = ref(false)

const isLoading = ref(false)

function changeActiv(memberID) {
    emit('changeActiv', memberID)
}

async function save() {
    isLoading.value = true
    if(await checkIfIEditMyself())
    {
        //create a alert that you can't edit yourself
        alert("Du kannst dich nicht selber bearbeiten")
        editMember.value = false
        isLoading.value = false
        return
    }
    console.log(props.member)
    console.log("Save")
    await setRankToRankID(props.member.rank.rank)
    let response = await editUser(props.member)
    console.log(response)
    editMember.value = false
    isLoading.value = false
}

async function checkIfIEditMyself(){
    console.log("Check if I edit myself")
    let response = await getCurrentUser()
    console.log(response)
    if (response.id == props.member.id)
    {
        console.log("I edit myself")
        return true
    }
    else {
        console.log("I don't edit myself")
        return false
    }

}

//get the rank_id from the rank and set it to the member
async function setRankToRankID(rank) {
    console.log("Set Rank to RankID")
    console.log(rank)
    for (let i = 0; i < props.ranks.length; i++) {
        if (props.ranks[i].rank == rank) {
            console.log(props.ranks[i].rank)
            let newRankID = props.ranks[i].id
            console.log(newRankID)
            props.member.rank_id = newRankID
            console.log(props.member.rank_id)
        }
    }
}

onBeforeMount(() => {
    if (props.member.isActive)
    {
        props.member.isActive = true
    }
    else {
        props.member.isActive = false
    }
})

onMounted(() => {
    isLoading.value = false
    console.log(props.member)
})

</script>
<template>
    <div class="changed">
        <div v-if="changedSomething" class="changed__text">
            <h1>Es wurden Änderungen vorgenommen</h1>
            <button @click="save">Speichern</button>
        </div>
    </div>
    <div v-if="!editMember" class="member">
            <h1>{{ member.type }}</h1>
            <h3>Identifikation: {{ member.identification }}</h3>
            <h3>Email: {{ member.email }}</h3>
            <h3>RestrictionClass: {{ member.restrictionClass }}</h3>
            <h3>Aktives Mitglied: {{ member.isActive }}</h3>
            <h3>Rank: {{ member.rank.rank }}</h3>
            <h3>Eintritt: {{ member.entry }}</h3>
            <div class="btn">
                <!--<button @click="changeActiv(member.id)">Switch Active</button>-->
                <button @click="editMember = true">Edit</button>
            </div>
        </div>
        <div v-else class="edit__member member">
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
.loading {
    position: absolute;
}
.btn {
    display: flex;
    justify-content: center;
    align-items: center;
}
input{
    width: max-content;
}
    .member {
        display: flex;
        width: 50%;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #d9d9d9;
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