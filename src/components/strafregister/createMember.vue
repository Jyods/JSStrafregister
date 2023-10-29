<script setup>
import Info from './tooltip.vue'
import { ref, onMounted, computed } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

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

const activeUnit = ref(units.value[0])

const ranksOfUnit = computed(() => {
    let ranksOfUnit = []
    props.ranks.forEach(rank => {
        if(rank.unit == activeUnit.value)
        {
            ranksOfUnit.push(rank)
        }
    });
    console.log(ranksOfUnit)
    return ranksOfUnit
})

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
    <div class="star-wars-edit-member star-wars-member">
      <div class="star-wars-card">
        <img src="../../assets/data_loading.svg" alt="loading" v-if="isLoading" class="loading">
        <h1>{{ member.type }}</h1>
        <p class="star-wars-info">Identifikation: <input type="text" v-model="member.identification"></p>
        <p class="star-wars-info">Email: <input type="email" v-model="member.email"></p>
        <Info info="Das Passwort wird Ihnen nach der Erstellung einmalig bekannt gegeben.">
          <p class="star-wars-info">Passwort: <input type="password" v-model="member.password" disabled></p>
        </Info>
        <p class="star-wars-info">RestrictionClass: <input type="number" v-model="member.restrictionClass"></p>
        <p class="star-wars-info">Aktives Mitglied: <input type="checkbox" v-model="member.isActive"></p>
        <p class="star-wars-info">Einheit: 
          <select v-model="activeUnit">
            <option v-for="unit in units" :value="unit">{{ unit }}</option>
          </select> </p>
        <p class="star-wars-info">Rank: <select v-model="member.rank">
            <option v-for="rank in ranksOfUnit" :key="rank.id" :value="rank">{{ rank.rank }}</option>
          </select></p>
        <Info info="Das Eintrittsdatum kann nicht geändert werden.">
          <p class="star-wars-info">Eintritt: <input type="date" v-model="member.entry" disabled></p>
        </Info>
        <div class="star-wars-btn">
          <button class="star-wars-abort-btn" @click="abort(member.id)">Abort</button>
          <button class="star-wars-save-btn" @click="pushMember(member)">Save</button>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
    /* Rest of the Star Wars-inspired CSS from previous examples */
  
    .star-wars-card {
      padding: 20px;
      width: 300px;
      background-color: rgba(255, 255, 255, 0.1); /* Slightly transparent white */
      border-radius: 10px;
      box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.2);
    }
  
    .star-wars-info {
      margin: 5px 0;
      color: var(--main-text-color);
    }
  
    .star-wars-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 20px;
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
      width: 100px;
      margin: 0 5px;
    }
  
    .star-wars-btn button:hover {
      background-color: #ffd300; /* Brighter Yellow on hover */
    }
  
    .star-wars-abort-btn {
      background-color: #ff0000; /* Red */
    }
  
    .star-wars-save-btn {
      background-color: #00ff00; /* Green */
    }
  
    .star-wars-abort-btn:hover {
      background-color: #800000; /* Darker Red on hover */
    }
  
    .star-wars-save-btn:hover {
      background-color: #008000; /* Darker Green on hover */
    }
  </style>
  