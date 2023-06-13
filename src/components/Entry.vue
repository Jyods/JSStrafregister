<script setup>
import { onMounted, ref } from 'vue'
import Fall from './Case.vue'

const props = defineProps({
    entry: {
        type: Object,
        required: true
    }
})

const extended = ref(false)

onMounted(() => {
    console.log(props.entry)
})

function extend() {
    extended.value = !extended.value
}
</script>

<template>
    <div class="wrapper" >
        <div class="entry flex" @click.prevent="extend">
            <h3>{{props.entry.identification}}</h3>
                <p><RouterLink :to="{ name: 'Entry', query: { EntryID: props.entry.id }}" class="link">
                    <img src="../assets/Arrow.svg" alt="loading" height="15" width="15"/>
                    Redirect
                </RouterLink></p>
        </div>
        <Fall v-if="extended" v-for="Case in entry.files" :case="Case" :key="Case.id"/>
        <p class="noEntry" v-if="extended && entry.files.length == 0">Keine Einträge</p>
    </div>
</template>

<style scoped>
.noEntry {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    color:rgb(133, 0, 0);
    text-decoration: underline;
}
.right {
    display: flex;
    align-items: center;
}
.wrapper {
    background-color: grey;
    border-color: rgb(99, 99, 99);
    border-style: solid;
}
.restricted {
    background-color: red;
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
    color: red;
    text-decoration: underline;
}
</style>