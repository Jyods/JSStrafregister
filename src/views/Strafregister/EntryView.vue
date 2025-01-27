<script setup>
    import { onMounted, ref, computed } from 'vue';
    import { getEntry,getFiles } from '../../api/requests.js';
    import FileLink from '../../components/strafregister/fileLink.vue';
    import { switchWarrentState } from '../../api/requests.js'
  
    const searchParams = new URLSearchParams(window.location.search);
    const entryID = searchParams.get('EntryID');

    const isLoading = ref(true)

    const entries = ref([])

    const activeEntry = ref('');

    const filesCount = ref('')

    // const lastRank = computed(() => {
    //     let latestEntry = null;

    //     console.log(entries.value.files)

    //     if (entries.value.files == undefined) {
    //         return "Keine Einträge vorhanden";
    //     }

    //     if (entries.value.files.length == 0) {
    //         return "Keine Einträge vorhanden";
    //     }

    //     entries.value.files.forEach(file => {
    //         if (!latestEntry || new Date(file.created_at) > new Date(latestEntry.created_at)) {
    //             latestEntry = file;
    //         }
    //     });

    //     console.log("Banane", latestEntry)

    //     return latestEntry ? latestEntry.company.company : null;
    // });

    onMounted(async() => {
        isLoading.value = true
        let files = await getEntry(entryID) 
        entries.value = files.data
        filesCount.value = entries.value.files.length
        isLoading.value = false
    })

    const switching = ref(false)

    async function switchWarrent() {
        switching.value = true
        const res = await switchWarrentState(entryID)
        entries.value.isWanted = res.data.isWanted  
        switching.value = false
    }
</script>
<template>
    <div class="entry_wrapper" v-loading="isLoading">
        <!-- <div class="wanted_toolbar">
            <p :class="{gesucht : entries.isWanted}">{{ entries.isWanted ? "DAS SUBJEKT WIRD GESUCHT!!" : "Kein Haftbefehl" }}</p>
            <el-popconfirm
                title="Wollen sie den Haftbefehl wirklich ändern?"
                confirmButtonText="Ja"
                cancelButtonText="Nein"
                :icon="InfoFilled"
                icon-color="#626AEF"
                width="220"
                @confirm="switchWarrent"
            >
            <template #reference>
                <el-button v-if="entries.isWanted" :disabled="switching">Haftbefehl entfernen</el-button>
                <el-button v-else :disabled="switching">Haftbefehl hinzufügen</el-button>
            </template>
            </el-popconfirm>
        </div>
        <h1>Typ: {{ entries.type }}</h1>
        <h2>Identifikation: {{ entries.identification }}</h2>
        <h3>Verbrechen: {{ filesCount }}</h3>
        <FileLink v-for="file in entries.files" :file="file" /> -->

        <div class="entry_info_wrapper">
            <p class="entry_info">
                Straftäter: {{ entries.identification }}
            </p>
        </div>

        <div class="entry_content_wrapper">

            <div class="entry_criminal_info">
                <div class="entry_title">
                    Informationen
                </div>
                <div class="entry_criminal_info_content">
                    <p class="small_title">Status</p>
                    <p :class="{gesucht : entries.isWanted}">{{ entries.isWanted ? "DAS SUBJEKT WIRD GESUCHT!!" : "Kein Haftbefehl" }}</p>
                    <p class="small_title">Typ</p>
                    <p>{{ entries.type }}</p>
                    <p class="small_title">Identifikation</p>
                    <p>{{ entries.identification }}</p>
                    <p class="small_title">Verbrechen</p>
                    <p>{{ filesCount }} </p>
                    <!-- <p class="small_title">Rang des letzten Eintrags</p>
                    <p>{{ lastRank }}</p> -->
                </div>
            </div>

            <div class="entry_criminal_files_content">
                <div class="entry_title">
                    Straftaten
                </div>
                <FileLink v-for="file in entries.files" :file="file" class="entry_criminal_files" />
            </div>

        </div>


        
    </div>
</template>
<style scoped>
.entry_wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: calc(100vh - 100px);
}

.entry_info { 
  align-self: flex-start;
  padding: 0.5rem 1rem;
  color: #008ab0;
}

.entry_info_wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    border-bottom: 1px solid gray;
    margin-bottom: 1rem;
}

.entry_content_wrapper {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100%;
}

.entry_criminal_info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* background-color: red; */
    width: 40%;
    height: 100%;
}

.entry_criminal_files_content {
    display: flex;
    flex-direction: column;
    /* background-color: blue; */
    width: 40%;
    height: 100%;
}

.gesucht {
    color: red;
    font-weight: bold;
}

.wanted_toolbar {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;

}

.entry_title {
  /* padding-top: 1rem; */
  color: white;
  border-bottom: 1px solid gray;
  width: 100%;
  align-self: center;
  display: flex;
  justify-content: center;
  font-weight: bold;
}

.entry_criminal_info_content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 1rem;
    /* background-color: green; */
}

.entry_criminal_info_content p {
    padding: 0.5rem;
    color: white;
    align-self: start;
    margin-bottom: 10px;
}

.small_title {
    border-bottom: 1px solid gray;
    width: 60%;
    align-self: flex-start;
    display: flex;
    justify-content: flex-start;
    color: white;
    font-weight: 700;
    padding: 0.5rem;
}
</style>