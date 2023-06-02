<script setup>
import { onMounted, ref, computed } from 'vue'

const props = defineProps({
    law: {
        type: Object,
        required: true
    }
})


    const searchParams = new URLSearchParams(window.location.search);
    const lawID = searchParams.get('LawID');
    const mode = computed(() => lawID != null ? "True" : "False")

onMounted(() => {
console.log(props.law)
console.log(lawID)
if (!mode) {
    console.log("LawID: " + lawID)
}
else {
    console.log("All")
}
})

</script>

<template>
    <div class="law_wrapper">
        <div class="law">
            <div class="info">
                SPECIAL MEGA LAW
            </div>
        </div>
    </div>
</template>