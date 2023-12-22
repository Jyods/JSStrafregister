<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '../api/requests';

const router = useRouter()

const data = ref(null)

const redirectAbbr = ref(
    [
        {
            abbr: "ST",
            to: "/justice"
        },
        {
            abbr: "GE",
            to: "/health"
        },
        {
            abbr: "*",
            to: "/orientation"
        }
    ]
)

onMounted(async () => {
    let response = await auth(true)
    console.error(response)
    if (response == false) {
        router.push({ name: 'Login'})
    }
    else {
        data.value = response.data
    }




})


</script>

<template>
    

    <div class="common-layout">
        <el-container>
            <el-header>
                <el-text size="large" tag="b">Wahlen Sie eine DB aus</el-text>
            </el-header>
            <el-main>
                <el-button><router-link to="/justice">Strafen</router-link></el-button>
                <el-button><router-link to="/health">Gesundheit</router-link></el-button>
                <el-button><router-link to="/orientation">Orientierung</router-link></el-button>
            </el-main>
        </el-container>
    </div>
</template>