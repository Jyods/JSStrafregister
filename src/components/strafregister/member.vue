<script setup>
import { ref, onMounted, computed, onBeforeMount } from 'vue'
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { editUser, getCurrentUser } from '../../api/requests.js'

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

const units = computed(() => {
    let units = []
    props.ranks.forEach(rank => {
        if(!units.includes(rank.unit))
        {
            units.push(rank.unit)
        }
    });
    console.log(units)
    return units
})

const ranksOfUnit = computed(() => {
    let ranksOfUnit = []
    props.ranks.forEach(rank => {
        if(rank.unit == props.member.rank.unit)
        {
            ranksOfUnit.push(rank)
        }
    });
    console.log(ranksOfUnit)
    return ranksOfUnit
})

const editMember = ref(false)

const emit = defineEmits(['changeActiv'])

const changedSomething = ref(false)

const isLoading = ref(false)

const showPermissions = ref(false)

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
    <div class="star-wars-container">
      <div v-if="changedSomething" class="star-wars-changed">
        <h1>Es wurden Änderungen vorgenommen</h1>
        <button @click="save">Speichern</button>
      </div>
  
      <div v-if="!editMember" class="star-wars-member">
        <div class="star-wars-card">
          <h1>{{ member.type }}</h1>
          <p class="star-wars-info">Identifikation: {{ member.identification }}</p>
          <p class="star-wars-info">Email: {{ member.email }}</p>
          <p class="star-wars-info">RestrictionClass: {{ member.restrictionClass }}</p>
          <p class="star-wars-info">Aktives Mitglied: {{ member.isActive }}</p>
          <p class="star-wars-info">Einheit: {{ member.rank.unit }}</p>
          <p class="star-wars-info">Rank: {{ member.rank.rank }}</p>
          <p class="star-wars-info">Eintritt: {{ member.entry }}</p>
          <p @click="showPermissions = !showPermissions" v-if="!showPermissions">Permissions [Ausklappen]</p>
          <p @click="showPermissions = !showPermissions" v-else>Permissions [Einklappen]</p>
          <div class="star-wars-permissions" v-if="showPermissions">
            <p class="star-wars-info">Allchat: {{ member.permissions.permission_allchat }}</p>
            <p class="star-wars-info">Brodcaster: {{ member.permissions.permission_broadcaster }}</p>
            <p class="star-wars-info">Creator: {{ member.permissions.permission_creator }}</p>
            <p class="star-wars-info">Recruiter: {{ member.permissions.permission_recruiter }}</p>
            <p class="star-wars-info">Register: {{ member.permissions.permission_register }}</p>
          </div>
          <div class="star-wars-btn">
            <button @click="editMember = true">Edit</button>
          </div>
        </div>
      </div>
  
      <div v-else class="star-wars-edit-member star-wars-member">
        <div class="star-wars-card">
          <img src="../../assets/data_loading.svg" alt="loading" v-if="isLoading" class="loading">
          <h1>{{ member.type }}</h1>
          <p class="star-wars-info">Identifikation: <input type="text" v-model="member.identification"></p>
          <p class="star-wars-info">Email: <input type="email" v-model="member.email"></p>
          <p class="star-wars-info">RestrictionClass: <input type="number" v-model="member.restrictionClass"></p>
          <p class="star-wars-info">Aktives Mitglied: <input type="checkbox" v-model="member.isActive"></p>
          <p class="star-wars-info">Einheit: <input type="text" v-model="member.rank.unit" disabled> </p>
          <p class="star-wars-info">Rank: <select v-model="member.rank">
              <option v-for="rank in ranksOfUnit" :key="rank.id" :value="rank">{{ rank.rank }}</option>
            </select></p>
          <p class="star-wars-info">Eintritt: <input type="date" v-model="member.entry" disabled></p>
          <p @click="showPermissions = !showPermissions" v-if="!showPermissions">Permissions [Ausklappen]</p>
          <p @click="showPermissions = !showPermissions" v-else>Permissions [Einklappen]</p>
          <div class="star-wars-permissions" v-if="showPermissions">
            <p class="star-wars-info">Allchat: <input type="checkbox" v-model="member.permissions.permission_allchat"> </p>
            <p class="star-wars-info">Brodcaster: <input type="checkbox" v-model="member.permissions.permission_broadcaster"></p>
            <p class="star-wars-info">Creator: <input type="checkbox" v-model="member.permissions.permission_creator"></p>
            <p class="star-wars-info">Recruiter: <input type="checkbox" v-model="member.permissions.permission_recruiter"></p>
            <p class="star-wars-info">Register: <input type="checkbox" v-model="member.permissions.permission_register"></p>
          </div>
          <div class="star-wars-btn">
            <button @click="editMember = false">Abort</button>
            <button :disabled="isLoading" @click="save">Save</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
    /* Star Wars Color Scheme */
    :root {
      --main-bg-color: #0e101c; /* Dark Blue */
      --main-text-color: #fff; /* White */
      --btn-bg-color: #ffbf00; /* Yellow */
    }
  
    .star-wars-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex-basis: 50%;
      height: 100%;
      padding: 20px;
      background-color: var(--main-bg-color);
      font-family: "Roboto", sans-serif;
    }
  
    .star-wars-member,
    .star-wars-edit-member {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  
    .star-wars-card {
      padding: 20px;
      width: 300px;
      background-color: rgba(255, 255, 255, 0.1); /* Slightly transparent white */
      border-radius: 10px;
      box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.2);
    }
  
    .loading {
      width: 40px;
      height: 40px;
      animation: spin 1s linear infinite;
      margin-bottom: 10px;
    }
  
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  
    .star-wars-info {
      margin: 5px 0;
      color: var(--main-text-color);
    }
  
    .star-wars-btn {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  
    .star-wars-btn button {
      background-color: var(--btn-bg-color);
      color: var(--main-text-color);
      border: none;
      padding: 10px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 14px;
      transition: background-color 0.2s;
    }
  
    .star-wars-btn button:hover {
      background-color: #ffd300; /* Brighter Yellow on hover */
    }

    .star-wars-permissions {
      margin: 5px;
      color: var(--main-text-color);
    }
  </style>
  