<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
    bodyText: {
        type: String,
        default: 'Oops, something went wrong'
    },
    error: {
        type: String,
        default: 'There was an unexpected error'
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
</script>

<template>
    <div>
        <div class="wrapper">
            <div class="error_header">

            </div>
            <div class="error_body">
                <h1>{{ props.bodyText }}</h1>
                <p>{{ props.error }}</p>
            </div>
            <div class="error_footer">
                <RouterLink :to="{ name: 'Home'}" class="link">
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
    background-image: url("../assets/Strafregister.png");
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