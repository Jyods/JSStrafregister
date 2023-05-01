<script setup>

  import Entry from '../components/Entry.vue'
  import { onMounted, ref, computed } from 'vue'
  import {RouterView} from 'vue-router'

  const props = defineProps({
    entries: {
        type: Object,
        required: true
    }
})

  const entries = ref('')

  const search = ref('')

  const filteredEntries = computed(() => {
    if (!search.value) {
      return entries.value;
    }
    const searchLower = search.value.toLowerCase();
    return entries.value.filter((entry) => {
      return entry.CloneID.toLowerCase().includes(searchLower);
    });
  });


  onMounted(() => {
    entries.value = props.entries
    console.log(entries)
  })
</script>

<template>
  
  <input type="text" placeholder="Suche" class="search" v-model="search"/>
  <Entry class="entries" v-for="entry in filteredEntries" :entry="entry" :key="entry.id"/>
</template>

<style scoped>
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