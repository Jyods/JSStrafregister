<script setup>
  import {RouterView} from 'vue-router'
  import sidebar from '../../components/orientations/OrientationSidebar.vue'
  import Navbar from '../../components/strafregister/navbar.vue'
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

<style scoped>
.full-screen {
    width: 100vw;
    height: 100vh;
    background-color: #ff98f6 !important;
    overflow: hidden;
}
</style>