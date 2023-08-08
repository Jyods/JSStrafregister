<script setup>
import { ref, onMounted } from 'vue'
import { storeODT, getInstitutions } from '../api/requests.js'

const neededData = ref([
    "name",
    "description",
    "institution_id",
])

const optinalData = ref([
    "file",
    "file_type",
    "isanswer",
    "answer_id",
    "isanswer",
    "answer_id",
])

const data = ref({
    name: "",
    description: "",
    institution_id: "",
    isanswer: false,
    file: null,
    file_type: null,
})

const institutions = ref(null)

onMounted(async () => {
    let response = await getInstitutions()
    institutions.value = response.data
});

async function submit() {

    //check if all needed data is there
    for (let i = 0; i < neededData.value.length; i++) {
        if (data.value[neededData.value[i]] == "") {
            console.log("Missing Data: " + neededData.value[i])
            return
        }
    }
    //gib in der console das Feld mit der File aus
    console.log(data.value)
    let response = await storeODT(data.value)
    console.log(response)
}

function makeFileToBinary(event) {

    const allowed = ["application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/msword", "text/plain", "image/png", "image/jpeg", "image/gif"]

    //Überprüfe ob die Datei erlaubt ist
    if (!allowed.includes(event.target.files[0].type)) {
        console.log(event.target.files[0].type)
        alert("Dateityp nicht erlaubt")
        event.target.value = null
        return
    }

    data.value.file = event.target.files[0]

    // setzte den Dateityp
    try {
        data.value.file_type = event.target.files[0].type
    }
    catch (e) {
        data.value.file = null
        data.value.file_type = null
        return
    }

    //mache aus der Datei ein Base64 String
    let reader = new FileReader();
    reader.readAsDataURL(data.value.file);
    reader.onload = function () {
        data.value.file = reader.result
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };

}

</script>

<template>
    <!--Erstelle ein Formular für alle neededData-->
    <h1>Neuer Eintrag</h1>
    <form @submit.prevent="submit">
        <div class="name">
            <label for="name">Name</label>
            <input type="text" id="name" v-model="data.name">
        </div>
        <div class="description">
            <label for="description">Beschreibung</label>
            <textarea type="text" id="description" v-model="data.description" />
        </div>
        <div class="institution_id">
            <label for="institution_id">Institution</label>
            <!--<input type="number" id="institution_id" v-model="data.institution_id">-->
            <select id="institution_id" v-model="data.institution_id" v-if="institutions">
                <option v-for="institution in institutions" :key="institution.id" :value="institution.id">
                    {{ institution.abbreviation }}
                </option>
            </select>
        </div>
        <div class="file">
            <label for="file">Datei</label>
            <input type="file" id="file" v-on:change="makeFileToBinary($event)" accept=".docx,.doc,.txt,image/png, image/jpeg, image/gif" multiple>
        </div>
        <div class="file_type">
            <label for="file_type">Dateityp</label>
            <input type="text" id="file_type" v-model="data.file_type" disabled>
        </div>
        <div class="isanswer">
            <label for="isanswer">Ist Antwort</label>
            <input type="checkbox" id="isanswer" v-model="data.isanswer">
            {{ data.isanswer }}
        </div>
        <div class="answer_id">
            <label for="answer_id">Antwort ID</label>
            <input type="text" id="answer_id" v-model="data.answer_id" :disabled="!data.isanswer">
        </div>
        <button type="submit" v-if="institutions">Submit</button>
    </form>
</template>