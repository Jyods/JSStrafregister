<script setup>
import { ref, onMounted, computed } from 'vue'
import { storeODT, getInstitutions, getAllNeedReply } from '../../../api/requests.js'

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

const answers = ref([])

//speichere in einer variable die answer die der user anhand der data.answer_id ausgewählt hat
const answer = computed(() => {
    let answer = null
    for (let i = 0; i < answers.value.length; i++) {
        if (answers.value[i].id == data.value.official_document_id) {
            answer = answers.value[i]
        }
    }

    console.error(answer)

    if(answer == null){
        return null
    }

    return answer.message
})

onMounted(async () => {
    let response = await getInstitutions()
    institutions.value = response.data

    response = await getAllNeedReply()
    answers.value = response.data

    console.error(answers.value)
});

async function submit() {

    //check if all needed data is there
    for (let i = 0; i < neededData.value.length; i++) {
        if (data.value[neededData.value[i]] == "") {
            console.log("Missing Data: " + neededData.value[i])
            return
        }
    }
    if (data.answer_id == "") {
        data.answer_id = null
    }
    //gib in der console das Feld mit der File aus
    console.log(data.value)
    let response = await storeODT(data.value)
    console.log(response)
    //setze alle Felder zurück
    data.value = {
        name: "",
        description: "",
        institution_id: "",
        isanswer: false,
        file: null,
        file_type: null,
    }
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

    //überprüfe ob die Datei nicht zu groß ist, 10MB
    if (event.target.files[0].size > 10000000) {
        alert("Datei zu groß")
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
        <div class="isanswer" v-if="answers.length != 0">
            <label for="isanswer">Ist Antwort</label>
            <input type="checkbox" id="isanswer" v-model="data.isanswer">
            {{ data.isanswer }}
        </div>
        <div class="answer_id" v-if="answers.length != 0">
            <label for="answer_id">Antwort an </label>
            <select id="answer_id" v-model="data.official_document_id" :disabled="!data.isanswer">
                <option value="">Keine</option>
                <option v-for="answer in answers" :key="answer.id" :value="answer.id">
                    {{ answer.title }}
                </option>
            </select>
        </div>
        <div class="already_replied warning small" v-if="answer != null">
            There is already a reply to this document!
        </div>

        <!--<div class="answer_id" v-if="answers.length != 0">
            <label for="answer_id">Antwort ID</label>
            <input type="text" id="answer_id" v-model="data.answer_id" :disabled="!data.isanswer">
        </div>-->
        <button type="submit" v-if="institutions">Submit</button>
    </form>
</template>