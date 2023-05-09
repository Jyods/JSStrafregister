<script setup>
    import { ref, onMounted, computed } from 'vue'
    import { RouterLink, RouterView, useRouter } from 'vue-router'
    import { getMembers, createUser, getPermissions } from '../api/requests.js'
    import Member from '../components/Member.vue'
    import CreateMember from '../components/CreateMember.vue'

    const isLoading = ref(true)
    const members = ref([])
    const onlyActive = ref(false)
    const newMembers = ref([])


    const router = useRouter()    

onMounted(async() => {
    isLoading.value = true
    let data = await getPermissions()
    if (data.data >= 10)
    {
        console.log("Member View")
        let fetch = await getMembers()
        members.value = fetch.data
        console.log(members.value)
        isLoading.value = false
    }
    else {
        router.push({ name: 'Home'})
    }
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
    //push member to top of list newMembers
    newMembers.value.push({
        id: members.value.length + 1,
        type: "Mitglied",
        identification: "123456789",
        age: 18,
        isActive: true,
        entry: "01.01.2021",
        email: "test@banana.com"
    })


    /*members.value.unshift({
        id: members.value.length + 1,
        type: "Mitglied",
        identification: "123456789",
        age: 18,
        isActive: true,
        entry: "01.01.2021"
    })*/
}

async function pushMember(member) {
    isLoading.value = true
    console.log("Push Member")
    console.log(member)
    let fetch = await createUser(member)
    console.log("Return",fetch)
    members.value.unshift(member)
    newMembers.value = newMembers.value.filter((newMember) => {
        return newMember.id != member.id
    })
    isLoading.value = false
}

function abortEntry(memberID) {
    newMembers.value = newMembers.value.filter((newMember) => {
        return newMember.id != memberID
    })

}

</script>


<template>

<div class="loading" v-if="isLoading">
    <img src="../assets/Loading.svg" alt="loading"/>
</div>
<div v-else>
    <div class="members">
        <input type="checkbox" v-model="onlyActive"/>
        <input type="text" placeholder="Suche" class="search" v-model="search"/>
        <button class="add" @click="addMember">+</button>
        <CreateMember v-for="member in newMembers" :member="member" :key="members.id" @pushNewMember="pushMember" @abortMember="abortEntry"/>
        <Member v-for="member in filteredMembers" :member="member" :key="members.id"/>
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
</style>