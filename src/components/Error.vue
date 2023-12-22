<script setup>
import { ref, onMounted, onUpdated } from 'vue'

const props = defineProps({
    bodyText: {
        type: String,
        default: 'Oops, something went wrong'
    },
    error: {
        type: Number,
        default: 404,
    },
    buttonText: {
        type: String,
        default: 'Go back'
    },
    buttonLink: {
        type: String,
        default: '/'
    },
})


const errorText = ref("")

const errors = {
    404: "Die Seite konnte nicht gefunden werden",
    403: "Sie haben keine Berechtigung diese Seite zu sehen",
    500: "Es ist ein Serverfehler aufgetreten",
    503: "Der Service ist nicht verfügbar"
}

onMounted(() => {
    console.log(props.error)
    errorText.value = errors[props.error]
})

onUpdated(() => {
    console.log(props.error)
    errorText.value = errors[props.error]
})



</script>

<template>
    <div>
        <div class="wrapper">
            <div class="error_header">

            </div>
            <div class="error_body">
                <h1>{{ props.bodyText }}</h1>
                <p>{{ errorText }} ({{ props.error }})</p>
            </div>
            <div class="error_footer">
                <RouterLink :to="props.buttonLink" class="link">
                    {{ props.buttonText }}
                </RouterLink>
                <p>If the error persists, please contact  <a href="mailto:jyods.engagement@gmx.net">jyods.engagement@gmx.net</a></p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 90vh;
}
.error_header {
    background-image: url("../../assets/Strafregister.png");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    width: 150%;
    height: 70px;
    /*background-color: blue;*/
}
.error_body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: larger;
    padding-top: 20px;
}
.error_footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: smaller;
    padding-top: 20px;
}
.link {
    background-color: rgb(0, 0, 0);
    color: white;
    padding: 10px 20px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    margin: 10px;

}
a {
    text-decoration: none;
    color: rgb(0, 0, 0);
}

</style>