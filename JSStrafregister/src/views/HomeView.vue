<script setup>

  import Entry from '../components/Entry.vue'
  import { onMounted, ref, computed } from 'vue'
  import {RouterView} from 'vue-router'
  import { getFiles } from '../api/requests.js'

  /*const props = defineProps({
    entries: {
        type: Object,
        required: true
    }
})*/

  const isLoading = ref(true)

  const entries = ref([])

  const search = ref('')

  const filteredEntries = computed(() => {
    if (!search.value) {
      return entries.value;
    }
    const searchLower = search.value.toLowerCase();
    return entries.value.filter((entry) => {
      return entry.identification.toLowerCase().includes(searchLower);
    });
  });


  onMounted(async() => {
    isLoading.value = true
    console.log("Home View")
    //entries.value = props.entries
    let files = await getFiles() 
    entries.value = files.data
    console.log(entries.value)
    isLoading.value = false
  })
</script>

<template>
  <div class="loading" v-if="isLoading">
    <img src="../assets/Loading.svg" alt="loading"/>
  </div>
  <div v-else>
    <input type="text" placeholder="Suche" class="search" v-model="search"/>
    <Entry class="entries" v-for="entry in filteredEntries" :entry="entry" :key="entry.id"/>
  </div>
</template>

<style scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.fg {
  z-index: 1;
}
.bg {
  z-index: 100;
}
.search {
  margin-top: 10px;
  width: 200px;
  height: 20px;
  border-radius: 5px;
  border-color: rgb(99, 99, 99);
  border-style: solid;
  background-color: grey;
}
.entries {
  height: fit-content;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
}

.router {
  background-color: brown;
  height: 200px;
  width: 10px;
}
</style>