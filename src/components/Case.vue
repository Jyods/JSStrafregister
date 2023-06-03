<script setup>
import { onMounted, ref, onBeforeMount } from 'vue'
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

onBeforeMount(() => {
    caseEntry.value = props.case
    console.log(caseEntry.value)
    if (caseEntry.value.isRestricted == 1)
    isRestricted.value = true
    else
    isRestricted.value = false
})

function call() {
    console.log("clicked")
    console.log(props.case)
    if(isRestricted.value == true)
    {
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
    <div class="casewrapper" >
        <div class="case" @click.prevent="call" :class="{restricted : isRestricted}" >
            <div class="info">
                <p>{{caseEntry.definition}}</p>
                <p>Datum des Eintrags: {{  caseEntry.date }}</p>
            </div>
        </div>
        <div class="extendet" v-if="extended">
                <p>{{props.case.description}}</p>
                <p>Haftzeit: {{ caseEntry.fine }} Jahre</p>
                <div class="laws">
                <p>Paragrafen:                 </p>
                    <p v-for="law in props.case.laws">
                        <RouterLink 
                        :to="{  name: 'Law', 
                                query: { ArticleID: law.law.id }}"
                                :law = "law"
                                >
                                §{{ law.law.Paragraph }}
                        </RouterLink>
                    </p>
                </div>
                <RouterLink :to="{ name: 'Case', query: { CaseID: props.case.id }}" :case="caseEntry" class="link">
                    <img src="../assets/Arrow.svg" alt="loading" height="15" width="15"/>
                    Redirect
                </RouterLink>
            </div>
    </div>
</template>

<style scoped>
.laws {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
    width: 100%;
    height: fit-content;
    /*Add a Gap between the Elements*/
    gap: 10px;
}
.case {
    height: fit-content;
    background-color: grey;
    border-color: rgb(99, 99, 99);
    border-style: solid;
    padding-left: 20px;
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
    padding-left: 30px;
}

.link {
    color: black;
    text-decoration: none;
}

.link:hover {
    color: rgb(131, 0, 0);
    cursor: pointer;
}
</style>