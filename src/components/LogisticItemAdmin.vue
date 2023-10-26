<script setup>
import { onMounted, ref, computed } from 'vue'
import IconArrowDown from './icons/IconArrowDown.vue';
import IconArrowUp from './icons/IconArrowUp.vue';

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
        required: false
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

const logistic = ref({
    name: props.title,
    description: props.description,
    image: props.image,
    stock: props.inStock,
    ordered: props.ordered,
    inuse: props.inUse,
    price: props.price
});

let storeValues = {
    name: logistic.value.name,
    description: logistic.value.description,
    image: logistic.value.image,
    stock: logistic.value.stock,
    ordered: logistic.value.ordered,
    inuse: logistic.value.inuse,
    price: logistic.value.price
}

const checkIfSomeValuesAreDifferent = computed(() => {
    console.log(storeValues)
    console.log(logistic.value)
    if(storeValues.name != logistic.value.name) {
        return true;
    }
    if(storeValues.description != logistic.value.description) {
        return true;
    }
    if(storeValues.image != logistic.value.image) {
        return true;
    }
    if(storeValues.stock != logistic.value.stock) {
        return true;
    }
    if(storeValues.ordered != logistic.value.ordered) {
        return true;
    }
    if(storeValues.inuse != logistic.value.inuse) {
        return true;
    }
    if(storeValues.price != logistic.value.price) {
        return true;
    }
    return false;
});

const realStock = computed(() => {
    if(logistic.inStock - logistic.inUse < 0) {
        return 0;
    }
    return props.inStock - props.inUse;
});

const shortendDescription = computed(() => {
    if(props.description.length > 20) {
        return props.description.substring(0, 20) + "...";
    }
    return props.description;
});

const expanded = ref(false);

onMounted(() => {
    storeValues.name = logistic.value.name;
    storeValues.description = logistic.value.description;
    storeValues.image = logistic.value.image;
    storeValues.stock = logistic.value.stock;
    storeValues.ordered = logistic.value.ordered;
    storeValues.inuse = logistic.value.inuse;
    storeValues.price = logistic.value.price;
});



</script>


<template>
    <div class="cool">
        <div class="expanded" v-if="expanded">
            <div class="header-grid pointer"  @click="expanded = !expanded">
                <p class="title nice grid-1-1">
                    {{ props.title }}
                </p>
                <p class="arrowDown grid-3-1">
                    <IconArrowUp class="grid-3-1"/>
                </p>
            </div>
                <p class="description">
                    {{ props.description }}
                </p>
                <p class="inStock">
                    In Stock: 
                    <input type="number" v-model="realStock" min="0" step="1" />
                     ({{ props.inStock }})
                </p>
                <p class="ordered">
                    In Order: {{ props.ordered }}
                </p>
                <p class="inUse">
                    In Use: 
                <input type="number" v-model="logistic.inuse" min="0" step="1" />
                </p>
                <p class="price">
                    Preis pro Stück: 
                <input type="number" v-model="logistic.price" min="0" step="1" />
                </p>

                <button class="saveButton" @click="save" v-if="checkIfSomeValuesAreDifferent">Save</button>

                <p class="changed">
                    {{ checkIfSomeValuesAreDifferent }}
                </p>
        </div>
        <div class="unexpanded grid pointer" v-else  @click="expanded = !expanded">
            <p class="title grid-1-1">
                {{ props.title }} 
            </p>
            <p class="description grid-1-2">
                {{ shortendDescription }}
            </p>
            <p class="arrowDown grid-3-1">
                <IconArrowDown class="grid-3-1"/>
            </p>
            <div class="row grid-3-2">
                <p class="inStock black">
                    {{realStock}}
                </p>
                <p class="inUse red">
                    {{ props.inUse }}
                </p>
                <p class="ordered yellow">
                    ({{ props.ordered }})
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.cool {
    width: 100%;
    overflow: hidden;
    background-color: rgba(0, 247, 255, 0.6);
    color:aliceblue;
    border-color: rgb(24, 24, 24);
    border-style: solid;
    border-radius: 10px;
    margin: 2px;
    padding: 10px;
    transition: background-color 0.5s ease;
}

.nice {
    font-size: larger;
    /*font-weight: bold;
    text-align: center;
    align-self: center;
    justify-self: center;*/
}

.grid {
    display: grid;
    grid-template-columns: max-content auto max-content;
    grid-template-rows: 15px 30px;
    grid-gap: 10px;
}

.expanded-grid {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 25px auto;
    grid-gap: 10px;
}

.header-grid {
    display: grid;
    grid-template-columns: 50px auto max-content ;
    grid-template-rows: 25px;
    grid-gap: 10px;
}

.grid-1-1 {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
}

.grid-1-2 {
    grid-column: 1 / 2;
    grid-row: 2 / 3;
    font-size: medium;
}

.grid-3-1 {
    grid-column: 3 / 4;
    grid-row: 1 / 2;
    font-size: medium;
    height: 15px;
    width: 15px;
    text-align: right;
    align-self: center;
    justify-self: right;
}

.grid-3-2 {
    grid-column: 3 / 4;
    grid-row: 2 / 3;
    font-size: medium;
    /*Der text ist am Rand und soll nach links aus verlängert werden */
    text-align: right;
}

.grid-3-2 p {
    margin: 0px 2px;
    padding: 0;
}



.unexpanded {
    color: white;
    height: 50px;
    font-size: larger;
    overflow: hidden;
    transition: height 0.5s ease;
}

.expanded {
    color: white;
    height: max-content !important;
    transition: height 0.5s ease !important;
    overflow: visible;
}

input {
    width: auto;
    height: 20px;
    border-radius: 5px;
    border: 1px solid black;
    text-align: center;
    margin: 0 5px;
    z-index: 100;
}

</style>
