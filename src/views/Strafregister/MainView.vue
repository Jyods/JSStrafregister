<script setup>
import { ref } from 'vue';
import Sidebar from '../../components/strafregister/sidebar.vue';
import Navbar from '../../components/strafregister/navbar.vue';
import CreateEntry from '../../components/strafregister/createEntry.vue';

import { RouterView } from 'vue-router';

const emit = defineEmits(['add-to-array']);

function addToArray(message) {
  console.warn("Add to array MAINVIEW");
  emit('add-to-array', message);
}
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <!-- Navbar at the top -->
    <Navbar class="w-full" />
    <div class="flex flex-1">
      <!-- Sidebar -->
    <Sidebar @add-to-array="addToArray" />
      <!-- Main Content -->
      <main class="flex-1">
        <!-- Main Router View -->
        <div>
          <RouterView @add-to-array="addToArray" />
        </div>
      </main>
    </div>
    <footer class=" text-primary text-center py-4 text-sm">
      <span>Redesign by <a class=" hover:underline text-blue-600" target="_blank" href="https://github.com/TheRealDzox">Dzox</a></span>
    </footer>
  </div>
</template>
