<script setup>

  import Entry from '../../components/strafregister/entry.vue'
  import { onMounted, ref, computed } from 'vue'
  import {RouterView} from 'vue-router'
  import { getEntries } from '../../api/requests.js'

  /*const props = defineProps({
    entries: {
        type: Object,
        required: true
    }
})*/

  const isLoading = ref(true)

  const entries = ref([])

  const search = ref('')

  const isWarrent = ref(false)

  //Filtere die Einträge nach dem Suchbegriff und ob isWarrent true ist

  const filteredEntries = computed(() => {
    if (!search.value) {

      if (!isWarrent.value) {
        return entries.value;
      }
      //gib alle Einträge zurück die isWarrent true sind
      return entries.value.filter((entry) => {
        return entry.isWanted;
      });
    }
    const searchLower = search.value.toLowerCase();
    return entries.value.filter((entry) => {
      return entry.identification.toLowerCase().includes(searchLower) && (!isWarrent.value || entry.isWanted);
    });
  });


  onMounted(async() => {
    document.title = 'Strafregister'
    isLoading.value = true
    console.log("Home View")
    //entries.value = props.entries
    let files = await getEntries() 
    entries.value = files.data
    console.log(entries.value)
    isLoading.value = false
  })

  function changewarrent(id) {
    console.log("Change Warrent")
    let index = entries.value.findIndex(entries => entries.id == id)
    entries.value[index].isWanted = !entries.value[index].isWanted
  }

</script>

<template>
  <div class="loading" v-if="isLoading">
    <img src="../../assets/Loading.svg" alt="loading"/>
  </div>
  <div v-else>
    <el-input type="text" placeholder="Suche" class="search" v-model="search" />
    <!-- Erstelle ein dropdown bei dem der user auswählen kann ob nach isWarrent gefiltert werden kann-->
    <div class="filter flex" style="justify-content: left;">
      <!--<p>Filter</p>--> 
      <el-checkbox type="checkbox" v-model="isWarrent" size="large" />
      {{ isWarrent ? "Gesucht" : "Nicht Gesucht" }}
    </div>
    <Entry class="entries" v-for="entry in filteredEntries" :entry="entry" :key="entry.id" @changeWarrent="changewarrent"/>
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
  z-index: -1;
}
.bg {
  z-index: -1;
}
.search {
  height: 40px;
  width: 200px;
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