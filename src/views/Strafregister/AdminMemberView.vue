<script setup>
    import { ref, onMounted, computed } from 'vue'
    import { RouterLink, RouterView, useRouter } from 'vue-router'
    import { getMembers, createUser, getPermissions, switchActive, getRanks, getCurrentUser } from '../../api/requests.js'
    import Member from '../../components/strafregister/member.vue'
    import CreateMember from '../../components/strafregister/createMember.vue'

    const isLoading = ref(true)
    const members = ref([])
    const onlyActive = ref(false)
    const newMembers = ref([])
    const editMembers = ref([])
    const ranks = ref([])
    const addingMember = ref(false)

    const showPopup = ref(false)

    const newPassword = ref("")


    const router = useRouter()    

onMounted(async() => {
    isLoading.value = true
    let data = await getPermissions()
    console.log(data)
    if (data.data.restrictionClass >= 10)
    {
        console.log("Member View")
        let fetch = await getMembers()
        members.value = fetch.data
        console.log(members.value)
        let fetchRanks = await getRanks()
        ranks.value = fetchRanks.data
        isLoading.value = false
    }
    else {
        router.push({ name: 'Home'})
    }
    console.log(ranks.value)
})

const search = ref('')

const filteredMembers = computed(() => {
    if (!search.value) {
      return members.value;
    }
    const searchLower = search.value.toLowerCase();
    return members.value.filter((member) => {
      return (
        member.identification.toLowerCase().includes(searchLower) &&
        (onlyActive.value ? member.isActive : true)
      );
    });
  });

function addMember() {
    console.log("Add Member")
    if(!addingMember.value) {
    addingMember.value = true
    //push member to top of list newMembers
    let password = generatePassword()
    newMembers.value.push({
        id: members.value.length + 1,
        type: "Neuer Beamter",
        identification: "CT-0000",
        isActive: true,
        password: password,
        restrictionClass: 0,
        email: "max@gmail.com",
        entry: new Date().toISOString().slice(0, 10),
        rank: {
            id: 1,
            rank: "Private",
            unit: "Clone Army"
        },
        permissions: {
            'permission_register': true,
            'permission_creator': true,
            'permission_recruiter': true,
            'permission_broadcaster': true,
            'permission_admin': true,
            'permission_superadmin': true,
            'permission_allchat': true,
        }
    })
    }
    else {
        console.warn("You can't add a new member while you are adding a new member")
    }

    /*members.value.unshift({
        id: members.value.length + 1,
        type: "Mitglied",
        identification: "123456789",
        age: 18,
        isActive: true,
        entry: "01.01.2021"
    })*/
}

function generatePassword() {
    console.log("Generate Password")
    let password = ""
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    for (let i = 0; i < 8; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return password
}

async function pushMember(member) {
    isLoading.value = true
    console.log("Push Member")
    //Alert user with the new password
    alert("Das Passwort für " + member.identification + " lautet: " + member.password)
    member.rank_id = member.rank.id
    let currentUser = await getCurrentUser()
    console.log(currentUser)
    member.creator_name = currentUser.identification
    console.log(member)
    let fetch = await createUser(member)
    console.log("Return",fetch)
    members.value.unshift(member)
    newMembers.value = newMembers.value.filter((newMember) => {
        return newMember.id != member.id
    })
    addingMember.value = false
    isLoading.value = false
}

function abortEntry(memberID) {
    newMembers.value = newMembers.value.filter((newMember) => {
        return newMember.id != memberID
    })
    addingMember.value = false
}

//create function editMember where the member is set to newMembers and the old member is hidden, when user aborts the edit the old member is shown again and the newMember is deleted
function changeActive(memberID) {
    console.log("Change Active")
    switchActive(memberID)
    members.value = members.value.map((member) => {
        if (member.id == memberID) {
            member.isActive = !member.isActive
        }
        return member
    })
}



</script>


<template>
<div class="loading" v-if="isLoading">
    <img src="../../assets/Loading.svg" alt="loading"/>
</div>
<div v-else>
    <div class="members">
        <div class="">
            <input type="text" placeholder="Suche" class="search" v-model="search"/>
            <button class="add" @click="addMember">Neuer Benutzer</button>
        </div>
        <CreateMember v-for="member in newMembers" :member="member" :ranks="ranks" :key="members.id" @pushNewMember="pushMember" @abortMember="abortEntry"/>
        <Member class="item" v-for="member in filteredMembers" :member="member" :ranks="ranks" :key="members.id" @changeActiv="changeActive"/>
    </div>
</div>

</template>

<style scoped>
.members {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #6d6d6d;
    padding: 20px;
    margin: 20px;
    border-radius: 10px;
}
/* Star Wars-style button */
button {
  border: none;
  background-color: #1b1b1b; /* Dark background color */
  color: #ffc93c; /* Yellow text color */
  font-size: 20px;
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
  cursor: pointer;
  width: max-content;
  /* Optional box-shadow for a 3D effect */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}
button:hover {
  background-color: #272727; /* Slightly darker on hover */
  /* Optional box-shadow on hover for more depth */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
}

/* Star Wars-style input field */
input {
  border: none;
  background-color: #1b1b1b; /* Dark background color */
  color: #ffc93c; /* Yellow text color */
  font-size: 20px;
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
  border-bottom: 2px solid #ffc93c; /* Yellow underline */
}
input:focus {
  outline: none;
  /* Optional box-shadow on focus for highlighting */
  box-shadow: 0 0 6px #ffc93c;
}

</style>