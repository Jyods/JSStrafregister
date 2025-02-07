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
    },
    companies: {
        type: Array,
        required: true
    }
})

const member = ref(props.member)

const pickedCompany = computed(() => {
    let company = props.companies.find(company => company.id == member.value.company_id)
    console.log(company)
    return company.id
})

const units = computed(() => {
    let units = []
    props.ranks.forEach(rank => {
        if(!units.includes(rank.unit))
        {
            units.push(rank.unit)
        }
    });
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
        emit('pushNewMember', member)
    }
    else {
        alert("Bitte alle Felder ausfüllen")
    }
}

function abort(memberID) {
    emit('abortMember', memberID)
}

function checkIfAllFieldsFilled() {
    member.value.restrictionClass ? member.value.restrictionClass : member.value.restrictionClass = 1
    if (member.value.identification != "" && member.value.email != "" && member.value.password != "" && member.value.restrictionClass != "" && member.value.rank != "" && member.value.company_id != "") {
      return true
    }
    else {
      return false
    }

}

onMounted(() => {
    console.log("Mounted")
})

</script>
<template>
    <div class="star-wars-edit-member star-wars-member">
      <div class="star-wars-card">
        <img src="../../assets/data_loading.svg" alt="loading" v-if="isLoading" class="loading">
        <h1>{{ member.type }}</h1>
        <p class="star-wars-info">Identifikation: <input type="text" v-model="member.identification"></p>
        <p class="star-wars-info">Email: <input type="email" v-model="member.email"></p>
        <Info info="Der Benutzer erhält ein Passwort über die Email.">
          <p class="star-wars-info">Passwort: <input type="password" v-model="member.password" disabled></p>
        </Info>
        <p class="star-wars-info">RestrictionClass: <input type="number" v-model="member.restrictionClass"></p>
        <p class="star-wars-info">Aktives Mitglied: <input type="checkbox" v-model="member.isActive"></p>
        <p class="star-wars-info">Rang Einheit: 
          <select v-model="activeUnit">
            <option v-for="unit in units" :value="unit">{{ unit }}</option>
          </select> </p>
        <p class="star-wars-info">Rank: <select v-model="member.rank">
            <option v-for="rank in ranksOfUnit" :key="rank.rank.id" :value="rank">{{ rank.rank }}</option>
          </select></p>
          <p class="star-wars-info">Einheit: <select v-model="member.company_id">
            <option v-for="company in companies" :key="company.id" :value="company.id">{{ company.abbreviation }}</option>
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
        background-color: #576957; /* Weißer Hintergrund */
        border-radius: 10px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); /* Leichter Schatten */
    }
    
    .star-wars-info {
        margin: 5px 0;
        color: #333; /* Dunklerer Text */
    }
    
    .star-wars-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
    }
    
    .star-wars-btn button {
        background-color: #4CAF50; /* Grüner Hintergrund */
        border: none;
        padding: 12px 24px; /* Mehr Innenabstand */
        border-radius: 5px; /* Abgerundete Ecken */
        cursor: pointer; /* Zeiger-Cursor */
        font-size: 14px;
        transition: background-color 0.3s ease; /* Übergangseffekt */
        width: 100px;
        margin: 0 5px;
    }
    
    .star-wars-btn button:hover {
        background-color: #45a049; /* Dunkleres Grün beim Hover */
    }
    
    .star-wars-abort-btn {
        background-color: #f44336; /* Roter Hintergrund */
    }
    
    .star-wars-save-btn {
        background-color: #4CAF50; /* Grüner Hintergrund */
    }
    
    .star-wars-abort-btn:hover {
        background-color: #d32f2f; /* Dunkleres Rot beim Hover */
    }
    
    .star-wars-save-btn:hover {
        background-color: #388E3C; /* Dunkleres Grün beim Hover */
    }

    input[type="text"], input[type="email"], input[type="password"], input[type="number"], input[type="date"], select {
        width: 100%;
        padding: 2px 4px;
        margin: 1px 0;
        box-sizing: border-box;
        border: 2px solid #ccc;
        border-radius: 4px;
    }
  </style>
  