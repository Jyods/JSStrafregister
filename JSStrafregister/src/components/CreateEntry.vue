<script setup>
    import { onMounted, ref, computed } from 'vue'
    import {getOnlyEntries, createFile, createEntry, getLaws} from '../api/requests.js'
    import Article from '../components/Article.vue'

    const isLoading = ref(true)

    const entries = ref([])

    const userEntry = ref(null)

    const isRestricted = ref(false)

    const userArticle = ref(null)

    const newRestrictionClass = ref(0)

    const laws = ref([])

    const selectedLaws = ref([])

    //checks if the identification exists in the entries when not return set own const to true, when the document isn't loaded return false
    const newEntry = computed(() => {
        if (userEntry === null) {
            console.log("Document not loaded")
            return false
        }
        let getID = entries.value.find(entry => entry.identification === userEntry.value)
        if (getID === undefined) {
            console.log("New Entry")
            return true
        }
        return false
    })

    onMounted(async() => {
        isLoading.value = true
        console.log("Home View")
        //entries.value = props.entries
        let files = await getOnlyEntries() 
        entries.value = files.data
        files = await getLaws()
        laws.value = files.data
        console.log(laws.value)
        console.log(entries.value)
        console.log(laws.value)
        isLoading.value = false
    })

    async function submitForm() {
        
        if (newEntry.value === true) {
            if(await createNewEntry() == false) {
                alert("Die Identifikation konnte nicht bearbeitet werden!")
                return
            }
        }

        let getID = entries.value.find(entry => entry.identification === document.getElementById("identification").value)

        if (getID === undefined) {
            alert("Die Identifikation existiert nicht!")
            return
        }

        let formattedDate = document.getElementById("timeDate").value + " " + document.getElementById("timeTime").value

        //timePlace: document.getElementById("timePlace").value,

        //if restrictionClass is null then set it to 0
    

        let data = {
            entry_id: getID.id,
            definition: document.getElementById("definition").value,
            date: document.getElementById("timeDate").value,
            description: document.getElementById("description").value,
            fine: document.getElementById("punishment").value,
            article: document.getElementById("articles").value,
            isRestricted: isRestricted.value,
            restrictionClass: newRestrictionClass.value,
        }

        console.log(data)

        const response = await createFile(data)

        console.log(response)
    }

    async function createNewEntry() {
        let data = {
            identification: document.getElementById("identification").value,
            age: document.getElementById("alter").value,
        }

        const response = await createEntry(data)

        entries.value.push(response.data)

        console.log(entries.value)

        return true
    }

    function addArticle() {
        //check if the article name is already in selectedLaws
        let getID = selectedLaws.value.find(entry => entry.name === document.getElementById("article").value)
        if (getID !== undefined) {
            alert("Der Artikel existiert bereits!")
            return
        }
        //add the article as a object to the selectedLaws
        let name = document.getElementById("article").value
        //split the name by ' ' and get the second part
        let Paragraph = name.split(' ')[1]
        let id = selectedLaws.value.length
        selectedLaws.value.push({id: id, name: name, paragraph: Paragraph})
        userArticle.value = ""
    }

    function removeArticle(id) {
        console.warn("id: " + id)
        //search the article by id and remove it
        let getID = selectedLaws.value.find(entry => entry.id === id)
        if (getID === undefined) {
            alert("Der Artikel existiert nicht!")
            return
        }
        selectedLaws.value.splice(selectedLaws.value.indexOf(getID), 1)
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
                <input type="text" name="identification" v-model="userEntry" id="identification" placeholder="Identifikation" list="entry" required>
                    <datalist id="entry">
                        <option v-for="entry in entries" :key="entry.id" :value="entry.identification" />
                    </datalist>
                    <label for="alter" v-if="newEntry">Alter</label>
                    <input type="number" name="alter" id="alter" placeholder="Alter" v-if="newEntry">
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
                    <div class="punishment"><input type="number" name="punishment" id="punishment" placeholder="Lebenslänglich" required>
                    Einheiten</div>
                <!--Multicheckbox with articles-->
                <div class="article__wrapper">
                <label for="articles">Artikel</label>
                <div class="article__input">
                   <Article v-for="selectedLaw in selectedLaws" :key="selectedLaw.id" :article="selectedLaw" @removeArticle="removeArticle"/>
                </div>
                <input type="text" name="articles" v-model="userArticle" id="article" placeholder="Art. 11" list="articles" required>
                    <datalist id="articles">
                        <option v-for="article in laws" :key="article.id" :value="'Art. ' + article.Paragraph + ' ' + article.Title" />
                    </datalist>
                    <button type="button" @click="addArticle">Add</button>
                </div>
                <!--<input type="description" name="articles" id="articles" placeholder="Artikel" required>-->
                <label for="isActive">Is Restricted</label>
                <input type="checkbox" v-model="isRestricted" name="isActive" id="isActive" placeholder="Aktives Mitglied" class="checkbox">
                <div class="isRestricted" v-if="isRestricted">
                <label for="restrictionClass">Restriction Class</label>
                    <input type="number" name="restrictionClass" v-model="newRestrictionClass" placeholder="1">
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    
    </div>
</template>

<style scoped>
.article__wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
button {
    width: 100%;
    height: 50px;
    margin: 10px;
    border-radius: 10px;
    border: none;
    background-color: #1e1e1e;
    color: #f9f9f9;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    transition: 0.2s;
}

button:hover {
    background-color: #3f3f3f;
}

input[type='checkbox'] {
    width: 15px;
    height: 15px;
    margin: 10px;
}
input[type='checkbox']:hover {
    cursor: pointer;
}
.isRestricted {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.punishment {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
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

input {
    width: 75%;
    padding: 10px;
    margin: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
}

.checkbox {
    width: 10%;
    padding: 10px;
    margin: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
}

textarea {
    width: 75%;
    padding: 10px;
    margin: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
}

</style>