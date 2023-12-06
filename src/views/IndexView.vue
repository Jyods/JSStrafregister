<script setup>
import { onMounted, ref, computed } from 'vue'
import router from '../router/index.js';




</script>

<template>
    

    <div class="common-layout">
        <el-container>
            <el-header>
                <el-text size="large" tag="b">Wahlen Sie eine DB aus</el-text>
            </el-header>
            <el-main>
                <el-button><router-link to="/justice">Strafen</router-link></el-button>
                <el-button><router-link to="/logistics">Logistik</router-link></el-button>
            </el-main>
        </el-container>
    </div>
</template>