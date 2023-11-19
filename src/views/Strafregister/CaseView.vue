<script setup>
    import { onMounted, ref, computed } from 'vue'
    import { getCase, publishCase, deletePublishedCase } from '../../api/requests.js';
    import { useRouter, RouterLink } from 'vue-router';

  
    const searchParams = new URLSearchParams(window.location.search);
    const caseID = searchParams.get('CaseID');

    const isLoading = ref(true)

    const entries = ref([])

    const activeCase = ref('');

    const router = useRouter()


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

    async function createPublicCopy() {
        //erstelle eine neue route die öffentlich zugänglich ist mit dem selben inhalt

        const response = await publishCase(caseID)

        console.log(response.route)

        router.push({ name: 'Public', params: { id: response.route }})

    }

    async function deletePublicCopy(publish_id) {
        //lösche die öffentliche kopie
        if (await askIfSure("Sind Sie sicher, dass Sie diese öffentliche Kopie löschen wollen?")) {
            console.log("Lösche öffentliche Kopie")
            console.log(publish_id)
            const response = await deletePublishedCase(publish_id)
            console.log(response)
            router.go()
        }
    }

    async function askIfSure(message) {
        if (confirm(message)) {
            return true;
        } else {
            return false;
        }
    }

</script>
<template>
    <div class="loading" v-if="isLoading">
        <img src="../../assets/Loading.svg" alt="loading"/>
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
        <h3>Veröffentlichungen:</h3>
        <li v-if="entries.publishes != 'Restricted'" v-for="publish in entries.publishes">
            <RouterLink 
            :to="{  name: 'Public', 
                    params: { id: publish.route }}"
                    :publish = "publish"
                    >
                    {{ publish.route }} ({{ publish.publisher[0].identification }}) {{  }}
                    <button class="del_btn" @click="deletePublicCopy(publish.id)">Löschen</button>
            </RouterLink>
        </li>
        <h3 class="punishment item">Haftzeit: {{ entries.fine }} Einheiten</h3>
        <h3 class="rank item">Rang: {{ entries.rank[0].rank }}</h3>
        <br>
        <h2>{{ entries.user.type }}</h2>
        <RouterLink :to="{ name: 'Member', query: { MemberID: entries.user.id }}">{{ entries.user.identification }}</RouterLink>
        <el-button @click="createPublicCopy" type="primary">öffentliche Kopie erstellen</el-button>
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
  gap: 5px;
}

.CaseContent {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #d8d8d8; /* Dark background like space */
  border-radius: 10px;
  padding: 20px;
  box-shadow: 1px 1px 10px 5px rgba(175, 175, 175, 0.75);
}

.item {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  font-family: 'Arial', sans-serif; /* Choose a suitable font */
}

h1 {
  font-size: 2.2rem;
  margin-bottom: 15px;
  font-family: 'Star Jedi', cursive; /* Use Star Jedi font for the title */
}

h2 {
  font-size: 1.7rem;
  margin-bottom: 10px;
}

h3 {
  font-size: 1.4rem;
  margin-bottom: 5px;
}

.router-link-active {
  color: #FFE81F; /* Yellow color for active links */
  text-decoration: underline;
}

.copy_btn {
  background-color: #FFE81F; /* Yellow color for buttons */
}

.copy_btn:hover {
  background-color: #FFC107; /* Slightly lighter yellow on hover */
}

.del_btn {
    background-color: #ff0d00; /* Red color for buttons */
}

.del_btn:hover {
    background-color: rgba(243, 30, 19, 0.808); /* Slightly lighter red on hover */
}

/* Add other Star Wars-themed styles as needed */

</style>
