<script setup>
import { onMounted, ref } from 'vue';
import { getCase, publishCase, deletePublishedCase } from '../../api/requests.js';
import { useRouter, RouterLink } from 'vue-router';

const searchParams = new URLSearchParams(window.location.search);
const caseID = searchParams.get('CaseID');

const isLoading = ref(true);
const entries = ref([]);
const activeCase = ref('');
const router = useRouter();

onMounted(async () => {
    isLoading.value = true;
    let files = await getCase(caseID);
    entries.value = files.data;
    console.log(entries.value);
    isLoading.value = false;
});

async function createPublicCopy() {
    const response = await publishCase(caseID);
    console.log(response.route);
    router.push({ name: 'Public', params: { id: response.route } });
}

async function deletePublicCopy(publish_id) {
    if (await askIfSure("Sind Sie sicher, dass Sie diese öffentliche Kopie löschen wollen?")) {
        console.log("Lösche öffentliche Kopie");
        console.log(publish_id);
        const response = await deletePublishedCase(publish_id);
        console.log(response);
        router.go();
    }
}

async function askIfSure(message) {
    return confirm(message);
}

function formatDate(date) {
    if (date == "Restricted") {
        return "Kein Datum";
    }
    return new Date(date).toLocaleDateString('de-DE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    });
}
</script>

<template>
    <div v-if="isLoading" class="flex justify-center items-center h-screen">
        <img src="../../assets/Loading.svg" alt="loading" />
    </div>
    <div v-else class="flex flex-col items-center w-full h-screen p-4 ">
        <div class="w-full mb-4 pb-4 border-b border-gray-300">
            <p class="text-xl font-semibold">
                Akte {{ entries.id }}: {{ entries.definition }}
            </p>
        </div>

        <div class="flex flex-col md:flex-row justify-around items-start w-full h-full gap-4">
            <div class="w-full md:w-1/3 p-4 dark:bg-neutral-900 rounded-lg shadow-md">
                <div class="text-lg font-bold mb-4 border-b pb-2">Beschreibung</div>
                <textarea class="w-full h-64 p-2 bg-gray-100 dark:bg-neutral-800 dark:border-neutral-950 rounded-lg border border-gray-300" readonly>{{ entries.description }}</textarea>
            </div>

            <div class="w-full md:w-1/3 p-4 dark:bg-neutral-900 rounded-lg shadow-md">
                <div class="text-lg font-bold mb-4 border-b pb-2">Straftaten</div>
                <div v-if="entries.laws != 'Restricted'" class="flex flex-col gap-2">
                    <div v-for="law in entries.laws" :key="law.law.id" class="p-2 bg-gray-100 dark:bg-neutral-800 dark:border-neutral-950 rounded-lg">
                        <p class="font-semibold">
                            <RouterLink :to="{ name: 'LawArticle', query: { ArticleID: law.law.id } }">
                                §{{ law.law.Paragraph }}
                            </RouterLink>
                            {{ law.law.Title }}
                        </p>
                        <p>{{ law.law.Description }}</p>
                    </div>
                </div>
                <div v-else class="p-2 bg-red-100 rounded-lg">
                    <p>RESTRICTED</p>
                </div>
            </div>

            <div class="w-full md:w-1/3 p-4 dark:bg-neutral-900 rounded-lg shadow-md">
                <div class="text-lg font-bold mb-4 border-b pb-2">Metadaten</div>
                <div class="flex flex-col gap-2">
                    <p><b>Erstellt am:</b> {{ formatDate(entries.created_at) }}</p>
                    <p v-if="entries.user != 'Restricted'">
                        <b>Erstellt von:</b>
                        <RouterLink :to="{ name: 'Member', query: { MemberID: entries.user.id } }">
                            {{ entries.user.rank.abbreviation }} {{ entries.user.name }}
                        </RouterLink>
                    </p>
                    <p v-else>
                        <b>Erstellt von:</b> RESTRICTED {{ entries.user.name }}
                    </p>
                    <p>
                        <b>Sicherheitsstufe:</b>
                        <span v-if="entries.isRestricted">{{ entries.restrictionClass }}</span>
                        <span v-else>Keine Einschränkung</span>
                    </p>
                </div>
            </div>

            <div class="w-full md:w-1/3 p-4 dark:bg-neutral-900 rounded-lg shadow-md">
                <div class="text-lg font-bold mb-4 border-b pb-2">Zieldaten</div>
                <div class="flex flex-col gap-2">
                    <p><b>Verdächtiger:</b> {{ entries.user != 'Restricted' ? entries.entry[0].identification : entries.user }}</p>
                    <p><b>Tatzeit:</b> {{ entries.user != 'Restricted' ? formatDate(entries.date) : entries.user }}</p>
                    <p><b>Strafe:</b> {{ entries.user != 'Restricted' ? entries.fine : entries.user }} Hafteinheiten</p>
                    <p><b>Rang zur Tatzeit:</b> {{ entries.user != 'Restricted' ? entries.rank[0].abbreviation : entries.user }}</p>
                </div>
            </div>
        </div>
    </div>
</template>