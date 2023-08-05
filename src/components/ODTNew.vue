<script setup>
import { ref, onMounted } from 'vue'

const neededData = ref([
    "name",
    "description",
    "institution_id",
    "file",
    "file_type",
    "isanswer",
    "answer_id",
])

const data = ref({
    name: "",
    description: "",
    institution_id: "",
    file: "",
    file_type: "",
})

</script>

<template>
    <!--Erstelle ein Formular für alle neededData-->
    <h1>Neuer Eintrag</h1>
    <form>
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
            <input type="number" id="institution_id" v-model="data.institution_id">
        </div>
        <div class="file">
            <label for="file">Datei</label>
            <input type="file" id="file" v-on:change="data.file">
        </div>
        <div class="file_type">
            <label for="file_type">Dateityp</label>
            <input type="text" id="file_type" v-model="data.file_type">
        </div>
        <div class="isanswer">
            <label for="isanswer">Ist Antwort</label>
            <input type="text" id="isanswer" v-model="data.isanswer">
        </div>
        <div class="answer_id">
            <label for="answer_id">Antwort ID</label>
            <input type="text" id="answer_id" v-model="data.answer_id">
        </div>
        <button type="submit">Submit</button>
    </form>
</template>