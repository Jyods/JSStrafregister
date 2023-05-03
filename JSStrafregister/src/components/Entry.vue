<script setup>
import { onMounted, ref } from 'vue'
import Case from './Case.vue'

const props = defineProps({
    entry: {
        type: Object,
        required: true
    }
})

const extended = ref(false)

onMounted(() => {
})

function extend() {
    extended.value = !extended.value
}
</script>

<template>
    <div class="wrapper" >
        <div class="entry" @click="extend">
            <h3>{{props.entry.identification}}</h3>
            <div class="extendet" v-if="extended">
                <p><RouterLink :to="{ name: 'Entry', query: { EntryID: props.entry.id }}">Redirect</RouterLink></p>
            </div>
        </div>
        <Case v-if="extended" v-for="Case in props.entry.files" :case="Case" :key="Case.id"/>
    </div>
</template>

<style scoped>
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

.entry:hover {
    cursor: pointer;
}

.extendet {
    height: fit-content;
    border-color: aqua;
}
</style>