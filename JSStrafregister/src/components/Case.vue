<script setup>
import { onMounted, ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'

const router = useRouter()

const props = defineProps({
    case: {
        type: Object,
        required: true
    }
})

const isRestricted = ref(false)
const caseEntry = ref('')
const extended = ref(false)

onMounted(() => {
    caseEntry.value = props.case
    console.log(caseEntry.value)
    if (caseEntry.value.isRestricted == 1)
    isRestricted.value = true
    else
    isRestricted.value = false
})

function call() {
    console.log(props.case)
    if(isRestricted.value == true)
    {
        //TODO: Check if User is permitted to enter
        alert("Dieser Eintrag ist nicht öffentlich zugänglich!")
        return
    }
    else {
    extended.value = !extended.value
    }
}

function redirect() {
    console.log("Ben")
    router.push({ name: 'Case', query: { CaseID: props.case.id }})
}
</script>

<template>
    <div class="casewrapper">
        <div class="case" :class="{restricted : isRestricted}" @click="call">
            <div class="info">
                <p>{{caseEntry.definition}}</p>
                <p>Datum des Eintrags: {{  caseEntry.date }}</p>
            </div>
        </div>
        <div class="extendet" v-if="extended">
                <p>{{props.case.description}}</p>
                <p>Haftzeit: {{ caseEntry.fine }} Jahre</p>
                <p>Paragrafen: §{{  caseEntry.article }}</p>
                <RouterLink :to="{ name: 'Case', query: { CaseID: props.case.id }}" :case="caseEntry">Redirect</RouterLink>
            </div>
    </div>
</template>

<style scoped>
.case {
    height: fit-content;
    background-color: grey;
    border-color: rgb(99, 99, 99);
    border-style: solid;
}
.restricted {
    background-color: red;
}
.case:hover {
    background-color: aqua;
    cursor: pointer;
}

.info {
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.extendet {
    height: max-content;
    border-color: rgb(109, 109, 109);
    border-style: solid;
}
</style>