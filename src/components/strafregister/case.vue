<script setup>
import { onMounted, ref, onBeforeMount } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import Separator from '../ui/separator/Separator.vue'

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
    <div class="case-wrapper text-primary">
        <div class="case p-4 mb-4 dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg shadow-md  cursor-pointer" @click.prevent="call" :class="{ 'bg-red-100': isRestricted }">
            <div class="info grid grid-cols-2 gap-4">
                <p>{{ caseEntry.definition }}</p>
                <p>Datum des Eintrags: {{ caseEntry.date }}</p>
            </div>
        </div>
        <div class="text-primary p-4 rounded-b-md dark:bg-neutral-900 shadow-md" v-if="extended">
            <p>{{ props.case.description }}</p>
            <p>Haftzeit: {{ caseEntry.fine }} Jahre</p>
            <div class="laws flex flex-wrap gap-2 mt-2">
                <p>Paragrafen:</p>
                <p v-for="law in props.case.laws" :key="law.law.id">
                    <RouterLink :to="{ name: 'LawArticle', query: { ArticleID: law.law.id } }" class="text-blue-500 hover:underline">
                        §{{ law.law.Paragraph }}
                    </RouterLink>
                </p>
            </div>
            <RouterLink :to="{ name: 'Case', query: { CaseID: props.case.id } }" class="link flex items-center text-blue-500 hover:underline mt-2">
                Ansehen
            </RouterLink>
        </div>
    </div>
</template>

<style scoped>
.case-wrapper {
    width: 100%;
}
</style>