<script setup>
  import { ref, onMounted } from 'vue'
  import sidebar from '../../components/strafregister/sidebar.vue'
  import { RouterLink, RouterView } from 'vue-router'
import Navbar from '../../components/strafregister/navbar.vue';

  const emit = defineEmits(['add-to-array'])

  function addToArray(message) {
    console.warn("Add toe array MAINVIEW")
    emit('add-to-array', message)
  }

</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Navbar />
      </el-header>
      <el-container>
        <el-aside width="210px">
            <sidebar class="bg" @add-to-array="addToArray"/>
        </el-aside>
        <el-main>
            <RouterView @add-to-array="addToArray"/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>