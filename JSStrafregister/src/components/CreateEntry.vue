<script setup>
    import { onMounted, ref } from 'vue'
    import {getEntries, createFile} from '../api/requests.js'

    const isLoading = ref(true)

    const entries = ref([])

    const isRestricted = ref(false)

    onMounted(async() => {
        isLoading.value = true
        console.log("Home View")
        //entries.value = props.entries
        let files = await getEntries() 
        entries.value = files.data
        console.log(entries.value)
        isLoading.value = false
    })

    async function submitForm() {
        //Check if the identification exists in the entries, when true then get the id
        let getID = entries.value.find(entry => entry.identification === document.getElementById("identification").value)

        if (getID === undefined) {
            alert("Die Identifikation existiert nicht!")
            return
        }

        let formattedDate = document.getElementById("timeDate").value + " " + document.getElementById("timeTime").value

        //timePlace: document.getElementById("timePlace").value,

        let data = {
            entry_id: getID.id,
            definition: document.getElementById("definition").value,
            date: document.getElementById("timeDate").value,
            description: document.getElementById("description").value,
            fine: document.getElementById("punishment").value,
            article: document.getElementById("articles").value,
            isRestricted: isRestricted.value,
            restrictionClass: document.getElementById("restrictionClass").value,
        }

        console.log(data)

        const response = await createFile(data)

        console.log(response)
    }

</script>

<template>
    <div class="loading" v-if="isLoading">
        <img src="../assets/Loading.svg" alt="loading"/>
    </div>
    <div class="wrapper" v-else>
        <div class="form">
            <h1>Neue File</h1>
            <form @submit.prevent="submitForm">
                <label for="identification">Identifikation</label>
                <input type="text" name="identification" id="identification" placeholder="Identifikation" list="entry" required>
                    <datalist id="entry">
                        <option v-for="entry in entries" :key="entry.id" :value="entry.identification" />
                    </datalist>
                <label for="definition">Definition</label>
                <input type="text" name="definition" id="definition" placeholder="Mord" required>
                <label for="timeDate">Tat Datum</label>
                <input type="date" name="timeDate" id="timeDate" placeholder="03.04.2022" required>
                <label for="timeTime">Tat Zeit</label>
                <input type="time" name="timeTime" id="timeTime" placeholder="12:00" required>
                <label for="timePlace">Tat Ort</label>
                <input type="text" name="timePlace" id="timePlace" placeholder="Zuhause" required>
                <label for="description">Beschreibung</label>
                <textarea name="description" id="description" placeholder="Beschreibung" required></textarea>
                <label for="punishment">Hafteinheiten</label>
                <div class="punishment">
                    <input type="number" name="punishment" id="punishment" placeholder="Lebenslänglich" required>
                    Einheiten
                </div>
                <!--Multicheckbox with articles-->
                <label for="articles">Artikel</label>
                <input type="description" name="articles" id="articles" placeholder="Artikel" required>
                <label for="isActive">Is Restricted</label>
                <input type="checkbox" v-model="isRestricted" name="isActive" id="isActive" placeholder="Aktives Mitglied" required>
                <div class="isRestricted" v-if="isRestricted">
                <label for="restrictionClass">Restriction Class</label>
                    <input type="number" name="restrictionClass" id="restrictionClass" placeholder="1" required>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    
    </div>
</template>

<style scoped>

.form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
}

form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

</style>