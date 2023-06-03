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
        <div class="entry flex" @click.native="extend">
            <h3>{{props.entry.identification}}</h3>
                <p><RouterLink :to="{ name: 'Entry', query: { EntryID: props.entry.id }}" class="link">
                    <img src="../assets/Arrow.svg" alt="loading" height="15" width="15"/>
                    Redirect
                </RouterLink></p>
        </div>
        <Case v-if="extended" v-for="Case in props.entry.files" :case="Case" :key="Case.id"/>
    </div>
</template>

<style scoped>
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