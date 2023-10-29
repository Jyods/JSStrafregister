<script setup>
    import { onMounted, ref, computed } from 'vue'
    import {getOnlyEntries, createFile, createEntry, createFileLaw, getLaws,getPermissions, getRanks} from '../../api/requests.js'
    import Article from './article.vue'
    import Tooltip from './tooltip.vue'

    const isLoading = ref(true)

    const entries = ref([])

    const userEntry = ref(null)
    const definition = ref(null)
    const date = ref(null)
    const time = ref(null)
    const place = ref(null)
    const description = ref(null)
    const punishment = ref(null)

    const isRestricted = ref(false)

    const userArticle = ref(null)

    const newRestrictionClass = ref(0)

    const laws = ref([])

    const selectedLaws = ref([])

    const permissions = ref(false)

    const userPermissions = ref(null)

    const checkRestrictionClass = computed(() => {
        if (userPermissions.value === null) {
            return false
        }
        if (newRestrictionClass.value > userPermissions.value) {
            newRestrictionClass.value = userPermissions.value
            return true
        } else if (newRestrictionClass.value < 0) {
            newRestrictionClass.value = 0
            return true
        }
        return false
    })

    const ranks = ref([])

    const activeRank = ref(null)

    const newEntryObj = ref(false)

    const emit = defineEmits(['add-to-array'])

    function addToArray(message) {
        console.log("Add to array", message)
        emit('add-to-array', message)
    }

    
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
        let rank = await getRanks()
        ranks.value = rank.data
        console.log(laws.value)
        console.log(entries.value)
        console.log(laws.value)
        isLoading.value = false
    let data = await getPermissions()
    userPermissions.value = data.data
    if (data.data >= 10)
    {
        permissions.value = true
    }
    else {
        permissions.value = true
        //permissions.value = false
    }
    })

    async function submitForm(e) {

        console.error(e)

        let identification = document.getElementById("identification").value

        isLoading.value = true
        
        if (newEntry.value === true) {
            if(await createNewEntry(identification) == false) {
                alert("Die Identifikation konnte nicht bearbeitet werden!")
                return
            }
        }

        let getID = entries.value.find(entry => entry.identification === identification)

        if (getID === undefined) {
            alert("Die Identifikation existiert nicht!")
            return
        }

        //let formattedDate = document.getElementById("timeDate").value + " " + document.getElementById("timeTime").value

        //timePlace: document.getElementById("timePlace").value,

        //if restrictionClass is nu ll then set it to 0

        // const userEntry = ref(null)
        // const definition = ref(null)
        // const date = ref(null)
        // const time = ref(null)
        // const place = ref(null)
        // const description = ref(null)
        // const punishment = ref(null)

        let data = {
            entry_id: getID.id,
            definition: definition.value,
            date: date.value,
            description: description.value,
            fine: punishment.value,
            isRestricted: isRestricted.value,
            restrictionClass: newRestrictionClass.value === null ? 0 : newRestrictionClass.value,
            rank_id: activeRank.value.id,
        }
        
        console.warn("Data")
        console.log(data)

        newEntryObj.value = data

        const response = await createFile(data)

        await crateFileLaws(response.id)

        console.log(response)
        isLoading.value = false

        resetForm()
        addToArray("Neue Straftat hinzugefügt")

    }

    function resetForm()
    {
        userEntry.value = null
        definition.value = null
        date.value = null
        time.value = null
        place.value = null
        description.value = null
        punishment.value = null
        isRestricted.value = false
        userArticle.value = null
        newRestrictionClass.value = 0
        selectedLaws.value = []
        activeRank.value = null
    }

    async function createNewEntry(identification) {
        let data = {
            identification: identification,
        }

        const response = await createEntry(data)

        entries.value.push(response.data)

        console.log(entries.value)

        return true
    }

    function addArticle() {
        //check if the article is empty
        if (document.getElementById("article").value == "")
        {
            alert("Du kannst nicht nichts hinzufügen.")
            return
        }
        //check if the article name is already in selectedLaws
        let getID = selectedLaws.value.find(entry => entry.name === document.getElementById("article").value)
        if (getID !== undefined) {
            alert("Der Artikel existiert bereits!")
            return
        }
        //add the article as a object to the selectedLaws
        let name = document.getElementById("article").value
        //split the name by ' ' and get the second part
        let Paragraph = name.split(' ')[0]
        let Title = name.split(' ')[1]
        let id = selectedLaws.value.length
        selectedLaws.value.push({id: id, name: name, paragraph: Paragraph, title: Title})
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

    async function crateFileLaws(fileID)
    {
        console.log(selectedLaws.value) 
        //run through the selectedLaws and create a new file_law for each
        for (let i = 0; i < selectedLaws.value.length; i++) {
            let formattedParagraph = selectedLaws.value[i].paragraph.replace("§", "")
            console.log(selectedLaws.value[i])
            let data = {
                file_id: fileID,
                paragraph: parseInt(formattedParagraph),
            }
            console.log(data)
            await createFileLaw(data)
        }

        
    }
</script>

<template>
    <div class="loading" v-if="isLoading">
        <img src="../../assets/Loading.svg" alt="loading"/>
    </div>
    <div class="wrapper" v-else>
        <div class="form">
            <h1>Neue File</h1>
            <form @submit.prevent="submitForm">
                <label for="identification">Identifikation</label>
                <Tooltip info="Es wird ein neuer Straftäter erfasst" :show="newEntry">
                    <input type="text" name="identification" v-model="userEntry" id="identification" placeholder="Identifikation" list="entry" required>
                    <datalist id="entry">
                        <option v-for="entry in entries" :key="entry.id" :value="entry.identification" />
                    </datalist>
                </Tooltip>
                <label for="definition">Vergehen</label>
                <input type="text" name="definition" id="definition" placeholder="Mord" v-model="definition" required>
                <label for="timeDate">Tat Datum</label>
                <input type="date" name="timeDate" id="timeDate" placeholder="03.04.2022" v-model="date" required>
                <label for="timeTime">Tat Zeit</label>
                <input type="time" name="timeTime" id="timeTime" placeholder="12:00" v-model="time" required>
                <label for="timePlace">Tat Ort</label>
                <input type="text" name="timePlace" id="timePlace" placeholder="Zuhause" v-model="place" required>
                <label for="description">Beschreibung</label>
                <textarea name="description" id="description" placeholder="Beschreibung" v-model="description" required></textarea>
                <label for="punishment">Hafteinheiten</label>
                    <div class="punishment"><input type="number" name="punishment" id="punishment" placeholder="23" v-model="punishment" required>
                    Einheiten</div>
                <!--Multicheckbox with articles-->
                <div class="article__wrapper">
                <label for="articles">Gesetze</label>
                <div class="article__input">
                   <Article v-for="selectedLaw in selectedLaws" :key="selectedLaw.id" :article="selectedLaw" @removeArticle="removeArticle"/>
                </div>
                <div class="article">
                <select v-model="userArticle" id="article">
                    <option disabled value="">Please select one</option>
                        <option id="article_item" v-for="article in laws" :key="article.id">
                            §{{ article.Paragraph + ' ' + article.Title + ' ' + article.Category}}
                        </option>
            </select>
                    <button class="button__plus" @click.prevent="addArticle"><img src="../../assets/plus.svg" width="25" height="25" /> </button>
                </div>
            </div>
            <h3>Rank: <select v-model="activeRank" id="article">
                <option v-for="rank in ranks" :key="rank.id" :value="rank">{{ rank.rank }}</option>
            </select> </h3>
                <!--<input type="description" name="articles" id="articles" placeholder="Artikel" required>-->
                <label v-if="permissions" for="isRestricted">Is Restricted</label>
                <input v-if="permissions" type="checkbox" v-model="isRestricted" name="isRestricted" id="isRestricted" placeholder="Aktives Mitglied" class="checkbox">
                <div class="isRestricted" v-if="isRestricted">
                    <label for="restrictionClass">Restriction Class</label>
                    <p v-if="checkRestrictionClass"></p>
                        <input type="number" name="restrictionClass" v-model="newRestrictionClass" placeholder="1">
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    
    </div>
</template>

<style scoped>
.article {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
label {
    padding-top: 15px;
}
#article {
    width: max-content;
    height: auto;
    padding: 5px;
    border-radius: 10px;
    border: none;
    font-size: larger;
    cursor: pointer;
    transition: 0.2s;
}
.article__wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.button__plus {
    width: 50px;
    height: 50px;
    margin: 10px;
    border-radius: 10px;
    border: none;
    background-color: transparent;
    color: #f9f9f9;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    transition: 0.2s;
}
.button {
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

input {
    color: #6d6d6d;
}

input[type='text']:hover {
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