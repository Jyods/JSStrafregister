<script setup>
  import navbar from '../components/navbar.vue'
  import sidebar from '../components/sidebar.vue'
  import Entry from '../components/Entry.vue'
  import { onMounted, ref, computed } from 'vue'

  const entries = ref([
    {id: 1, CloneID: 'CT-6659', age: 20, cases:[
    {
      id: 1, name: 'Mord', date: '01.01.2021', description: 'Mord an einer Person', haftzeit: '10 Jahre', artikel: '§ 123'
    },
    {
      id: 2, name: 'Diebstahl', date: '01.01.2021', description: 'Diebstahl von einem Auto', haftzeit: '10 Jahre', artikel: '§ 123'
    },
    {
      id: 3, name: 'Beleidigung', date: '01.01.2021', description: 'Beleidigung einer Person', haftzeit: '10 Jahre', artikel: '§ 123'
    }
  ]},
    {id: 2, CloneID: 'CT-8321', age: 19, cases:[
    {
      id: 4, name: 'Raub', date: '01.01.2021', description: 'Mord an einer Person', haftzeit: '10 Jahre', artikel: '§ 123'
    },
    {
      id: 5, name: 'Körperverletzung', date: '01.01.2021', description: 'Diebstahl von einem Auto', haftzeit: '10 Jahre', artikel: '§ 123'
    },
  ]},
    {id: 3, CloneID: 'CC-2132', age: 21, cases:[
    {
      id: 6, name: 'Hetzrede', date: '01.01.2021', description: 'Mord an einer Person', haftzeit: '10 Jahre', artikel: '§ 123'
    },
    {
      id: 7, name: 'Diebstahl', date: '01.01.2021', description: 'Diebstahl von einem Auto', haftzeit: '10 Jahre', artikel: '§ 123'
    },
    {
      id: 8, name: 'Beleidigung', date: '01.01.2021', description: 'Beleidigung einer Person', haftzeit: '10 Jahre', artikel: '§ 123'
    }
  ]},
  {
    id: 4, CloneID: 'CT-2312', age: 20, cases:[
    {
      id: 9, name: 'Mord', date: '01.01.2021', description: 'Mord an einer Person', haftzeit: '10 Jahre', artikel: '§ 123'
    },
    {
      id: 10, name: 'Diebstahl', date: '01.01.2021', description: 'Diebstahl von einem Auto', haftzeit: '10 Jahre', artikel: '§ 123'
    },
    {
      id: 11, name: 'Beleidigung', date: '01.01.2021', description: 'Beleidigung einer Person', haftzeit: '10 Jahre', artikel: '§ 123'
    },
  ]},
  ])

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
    console.log(entries)
  })
</script>

<template>
  <navbar class="fg"/>
  <sidebar class="bg"/>
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
  margin-left: 200px;
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

</style>