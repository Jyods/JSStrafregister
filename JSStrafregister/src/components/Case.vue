<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
    case: {
        type: Object,
        required: true
    }
})

const extended = ref(false)

onMounted(() => {
    console.log(props.case)
})

function call() {
    console.log(props.case)
    extended.value = !extended.value
}

function redirect() {
    console.log("Ben")
    router.push({ name: 'Case', query: { CaseID: props.case.id }})
}
</script>

<template>
    <div class="casewrapper">
        <div class="case" @click="call">
            <div class="info">
                <p>{{props.case.name}}</p>
                <p>Datum des Eintrags: {{  props.case.date }}</p>
            </div>
        </div>
        <div class="extendet" v-if="extended">
                <p>{{props.case.description}}</p>
                <p>Haftzeit: {{ props.case.haftzeit }}</p>
                <p>Paragrafen: {{  props.case.artikel }}</p>
                <button :to="{ name: 'Case', query: { CaseID: props.case.id }}" @click="redirect">Redirect</button>
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