<script setup>
    import { onMounted, ref, computed } from 'vue'
    import { getCase,getFiles } from '../api/requests';
  
    const searchParams = new URLSearchParams(window.location.search);
    const caseID = searchParams.get('CaseID');

    const isLoading = ref(true)

    const entries = ref([])

    const activeCase = ref('');


    onMounted(async() => {
        isLoading.value = true
        let files = await getCase(caseID) 
        entries.value = files.data
        console.log(entries.value)
        /*const usedID = parseInt(caseID)
        activeCase.value = entries.value.find(entry => entry.files.some(c => c.id === usedID)).files.find(c => c.id === usedID)*/
        console.log(activeCase.value);
        isLoading.value = false
    })

</script>
<template>
    <div class="loading" v-if="isLoading">
        <img src="../assets/Loading.svg" alt="loading"/>
    </div>
        <div class="CaseContent" v-else>
        <h3 class="item">Akte: {{ entries.id }}</h3>
        <h1 class="title item">Titel: {{ entries.definition }}</h1>
        <h3 class="description item">Beschreibung: {{ entries.description }}</h3>
        <h2 class="creation item">Datum: {{ entries.date }}</h2>
        <h3 v-if="entries.laws != 'Restricted'" class="article item">StGB:  
            <p v-for="law in entries.laws">
                        <RouterLink 
                        :to="{  name: 'Law', 
                                query: { ArticleID: law.law.id }}"
                                :law = "law"
                                >
                                §{{ law.law.Paragraph }}
                        </RouterLink>
                    </p>
        </h3>
        <h3 v-else>StGB: {{ entries.laws }}</h3>
        <h3 class="punishment item">Haftzeit: {{ entries.fine }} Einheiten</h3>
        <h3 class="rank item">Rang: {{ entries.rank[0].rank }}</h3>
        <br>
        <h2>{{ entries.user.type }}</h2>
        <RouterLink :to="{ name: 'Member', query: { MemberID: entries.user.id }}">{{ entries.user.identification }}</RouterLink>
    </div>
</template>
<style scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.article {
    gap:5px;
}
.CaseContent {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: rgb(117, 117, 117);
    border-radius: 10px;
    padding: 20px;
    margin: 50px 100px 50px 100px;
    box-shadow: 1px 1px 10px 5px rgba(0, 0, 0, 0.75);
    min-height: 500px;
}

.item {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
}

</style>
