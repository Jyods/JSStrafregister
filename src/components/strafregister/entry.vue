<script setup>
import { onMounted, ref } from 'vue'
import Fall from './case.vue'
import { switchWarrentState } from '../../api/requests.js'
import { Files } from '@element-plus/icons-vue';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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
    <Card class="p-4">
        <CardContent class="p-4 flex justify-between items-center">
            <div class="flex flex-col gap-2">
                <h3 class="text-lg font-semibold">{{ props.entry.identification }}</h3>
                <p :class="{'text-red-500 font-bold': newIsWanted}">
                    Gesucht: {{ newIsWanted ? "Ja" : "Nein" }}
                </p>
                <Button @click.prevent="switchWarrent" :disabled="inProgress" variant="destructive">
                    Status wechseln
                </Button>
                <RouterLink 
                    :to="{ name: 'Entry', query: { EntryID: props.entry.id }}" 
                    class="text-blue-500 hover:underline">
                    Einsehen →
                </RouterLink>
            </div>
            <Button @click.prevent="extend" variant="outline">
                {{ extended ? "Weniger anzeigen" : "Mehr anzeigen" }}
            </Button>
        </CardContent>
        <div v-if="extended" class="p-4 border-t">
            <Fall v-for="Case in entry.files" :case="Case" :key="Case.id" />
            <p v-if="entry.files.length === 0" class="text-center text-gray-500">Keine Einträge</p>
        </div>
    </Card>
</template>

<style scoped>

.divider {
    margin: 5px;
}
.noEntry {
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: underline;
    font-weight: bold;
    padding: 50px;
}
.right {
    display: flex;
    align-items: center;
}

.restricted {
    background-color: red;
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
    text-decoration: none;
}

.link:hover {
    text-decoration: underline;
}

.isWanted {
    color: red;
}
</style>