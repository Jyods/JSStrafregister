<script setup>
import { onMounted, ref } from 'vue'
import Fall from './case.vue'
import { switchWarrentState } from '../../api/requests.js'
import { Files } from '@element-plus/icons-vue';

const props = defineProps({
    entry: {
        type: Object,
        required: true
    }
})

const extended = ref(false)

const emit = defineEmits(['changeWarrent'])

onMounted(() => {
    console.log(props.entry)
    newIsWanted.value = props.entry.isWanted
})

function extend() {
    extended.value = !extended.value
}

const newIsWanted = ref(null)

const inProgress = ref(false)

async function switchWarrent() {
    if (inProgress.value) {
        return
    }
    //frage den User ob er es wirklich machen will
    const result = confirm("Wollen sie den Haftbefehl wirklich ändern?")
    if (!result) {
        return
    }
    inProgress.value = true
    console.log("Switch")
    await switchWarrentState(props.entry.id)
    newIsWanted.value = !newIsWanted.value
    console.log(newIsWanted.value)
    emit('changeWarrent', props.entry.id)
    inProgress.value = false
}
</script>

<template>
    <div class="wrapper" >
        <div class="entry flex" @click.prevent="extend">
            <h3>{{props.entry.identification}}</h3>
            <p :class="{isWanted : newIsWanted}">Gesucht: {{ newIsWanted ? "Ja" : "Nein" }}
            <!-- <input type="checkbox" v-if="extended" v-model="newIsWanted" @click="switchWarrent" />
            <input type="checkbox" v-else v-model="newIsWanted" disabled/> -->
            <el-popconfirm
                title="Wollen sie den Haftbefehl wirklich ändern?"
                confirmButtonText="Ja"
                cancelButtonText="Nein"
                @confirm="switchWarrent"
                @cancel=""
                >
                <template #reference>
                    <!-- <el-button type="danger" slot="reference" v-if="extended" v-model="newIsWanted" :disabled="inProgress">Switch</el-button> -->
                    <!-- <el-button type="danger" slot="reference" v-else v-model="newIsWanted" :disabled="inProgress">Switch</el-button> -->
                </template>
            </el-popconfirm>
            </p>
            <p>
            <RouterLink :to="{ name: 'Entry', query: { EntryID: props.entry.id }}" class="redirect">
                <img src="../../assets/Arrow.svg" alt="loading" height="15" width="15"/>
                Einsehen
            </RouterLink>
            </p>
        </div>
        <el-divider class="divider" />
        <Fall v-if="extended" v-for="Case in entry.files" :case="Case" :key="Case.id"/>
        <p class="noEntry" v-if="extended && entry.files.length == 0">Keine Einträge</p>
    </div>
</template>

<style scoped>

.divider {
    margin: 5px;
}
.noEntry {
    display: flex;
    justify-content: center;
    align-items: center;
    color:rgb(0, 0, 0);
    text-decoration: underline;
    font-weight: bold;
    padding: 50px;
}
.right {
    display: flex;
    align-items: center;
}
.wrapper {
    border-color: rgb(0, 0, 0);
    border-radius: 5px;
    border-style: solid;
    margin-bottom: 5px;
    padding-right: 10px;
    padding-bottom: 8px;
}
.restricted {
    background-color: red;
}

.redirect {
    color: black;
}

.redirect:hover {
    text-decoration: underline;
}
.entry {
    height: fit-content;
}

.flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 10px;
    padding-left: 10px;
}

.entry:hover {
    cursor: pointer;
}

.extendet {
    height: fit-content;
    border-color: aqua;
}

.link {
    color: black;
    text-decoration: none;
}

.link:hover {
    text-decoration: underline;
}

.isWanted {
    color: red;
}
</style>