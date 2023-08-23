<script setup>
import { onMounted, ref, defineProps } from 'vue'

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    inStock: {
        type: Number,
        required: true
    },
    ordered: {
        type: Number,
        required: true
    },
    inUse: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const expanded = ref(false);



</script>


<template>
    <div class="wrapper" @click="expanded = !expanded">

        <div class="expanded " v-if="expanded">
            <h1>{{ props.title }}</h1>
            {{ props.description }}
            {{ props.image }}
            <p class="inStock">
                In Stock: {{ props.inStock }}
            </p>
            <p class="ordered">
                In Order: {{ props.ordered }}
            </p>
            <p class="inUse">
                In Use: {{ props.inUse }}
            </p>
            <p class="price">
                Preis pro Strück: {{ props.price }}
            </p>
        </div>
        <div class="center flex" v-else>
            {{ props.title }}
            {{ props.description }}
            {{ props.image }}
            <div class="row">
                <p class="inStock">
                    {{ props.inStock }}
                </p>
                <p class="ordered">
                    ({{ props.ordered }})
                </p>
                <p class="inUse">
                    {{ props.inUse }}
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>

.wrapper {
    border: 1px solid black;
    margin: 10px;
    padding: 10px;
    min-width: 30%;
    max-width: 30%;
    min-height: 10vh;
    max-height: auto;
}
.expanded {
    min-width: 30%;
    max-width: 30%;
    min-height: auto;
}


</style>
