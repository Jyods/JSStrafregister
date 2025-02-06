<script setup>
import { onMounted, ref } from 'vue';
import { getEntry, switchWarrentState } from '../../api/requests.js';
import FileLink from '../../components/strafregister/fileLink.vue';

const searchParams = new URLSearchParams(window.location.search);
const entryID = searchParams.get('EntryID');

const isLoading = ref(true);
const entries = ref([]);
const filesCount = ref('');
const switching = ref(false);

onMounted(async () => {
    isLoading.value = true;
    let files = await getEntry(entryID);
    entries.value = files.data;
    filesCount.value = entries.value.files.length;
    isLoading.value = false;
});

async function switchWarrent() {
    switching.value = true;
    const res = await switchWarrentState(entryID);
    entries.value.isWanted = res.data.isWanted;
    switching.value = false;
}
</script>

<template>
    <div class="flex flex-col items-center w-full h-screen p-4">
        <div class="w-full mb-4 pb-4 border-b border-gray-300">
            <p class="text-xl font-semibold">
                Straftäter: {{ entries.identification }}
            </p>
        </div>

        <div class="flex  justify-around items-start w-full h-full gap-4">
            <div class="w-1/2 p-4 dark:bg-neutral-900 rounded-lg shadow-md">
                <div class="text-lg font-bold mb-4 border-b pb-2">Informationen</div>
                <div class="flex flex-col gap-2">
                    <p>Status</p>
                    <p :class="{ 'text-red-500 font-bold': entries.isWanted }">{{ entries.isWanted ? "DAS SUBJEKT WIRD GESUCHT!!" : "Kein Haftbefehl" }}</p>
                    <p>Typ</p>
                    <p>{{ entries.type }}</p>
                    <p>Identifikation</p>
                    <p>{{ entries.identification }}</p>
                    <p>Verbrechen</p>
                    <p>{{ filesCount }}</p>
                </div>
                <div class="mt-4">
                    <button @click="switchWarrent" :disabled="switching" class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                        {{ entries.isWanted ? "Haftbefehl entfernen" : "Haftbefehl hinzufügen" }}
                    </button>
                </div>
            </div>

            <div class="w-1/2 p-4 rounded-lg shadow-md dark:bg-neutral-900">
                <div class="text-lg font-bold mb-4 border-b pb-2">Straftaten</div>
                <div class="flex flex-col gap-2">
                    <FileLink v-for="file in entries.files" :file="file" :key="file.id" class="mb-2" />
                </div>
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