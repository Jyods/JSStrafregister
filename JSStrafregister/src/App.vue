<script setup>
  import navbar from './components/navbar.vue'
  import sidebar from './components/sidebar.vue'
  import { ref } from 'vue'
  import { RouterLink, RouterView } from 'vue-router'
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
</script>

<template>
  <navbar class="fg"/>
  <sidebar class="bg"/>
  <div class="viewContent">
    <RouterView :entries="entries" />
  </div>
</template>

<style scoped>
.viewContent {
  padding-left: 200px;
}
</style>
