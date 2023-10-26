<script setup>
import { onMounted, ref, computed } from 'vue'
import router from '../router/index.js';



</script>

<template>
    Wähle eine Seite aus

    <div class="">
        <ul>
            <li>
                <router-link to="/justice">Strafen</router-link>
            </li>
            <li>
                <router-link to="/logistics">Logistik</router-link>
            </li>
        </ul>
    </div>

</template>