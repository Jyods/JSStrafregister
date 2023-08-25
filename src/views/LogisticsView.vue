<script setup>
import { onMounted, ref } from 'vue'
import LogisticItem from '../components/LogisticItem.vue';

const items = ref([
    {
        title: "Titel",
        description: "Lorem ipsum",
        image: "Test",
        inStock: "5",
        ordered: "1",
        inUse: "9",
        price: "Test"
    },
    {
        title: "Titel",
        description: "Lorem ipsum",
        image: "Test",
        inStock: "2",
        ordered: "5",
        inUse: "4",
        price: "Test"
    },
    {
        title: "Titel",
        description: "Lorem ipsum",
        image: "Test",
        inStock: "0",
        ordered: "7",
        inUse: "6",
        price: "Test"
    },
    {
        title: "Titel",
        description: "Lorem ipsum",
        image: "Test",
        inStock: "10",
        ordered: "0",
        inUse: "1",
        price: "Test"
    },
    {
        title: "Titel",
        description: "Lorem ipsum",
        image: "Test",
        inStock: "10",
        ordered: "20",
        inUse: "2",
        price: "Test"
    },
    {
        title: "Titel",
        description: "Lorem ipsum",
        image: "Test",
        inStock: "4",
        ordered: "2",
        inUse: "2",
        price: "Test"
    },
    {
        title: "Titel",
        description: "Lorem ipsum",
        image: "Test",
        inStock: "7",
        ordered: "13",
        inUse: "2",
        price: "Test"
    },
    {
        title: "Titel",
        description: "Lorem ipsum",
        image: "Test",
        inStock: "7",
        ordered: "13",
        inUse: "2",
        price: "Test"
    },
    {
        title: "Titel",
        description: "Lorem ipsum",
        image: "Test",
        inStock: "7",
        ordered: "13",
        inUse: "2",
        price: "Test"
    },
    {
        title: "Titel",
        description: "Lorem ipsum",
        image: "Test",
        inStock: "7",
        ordered: "13",
        inUse: "2",
        price: "Test"
    },
    {
        title: "Titel",
        description: "Lorem ipsum",
        image: "Test",
        inStock: "7",
        ordered: "13",
        inUse: "2",
        price: "Test"
    },
    {
        title: "Titel",
        description: "Lorem ipsum",
        image: "Test",
        inStock: "7",
        ordered: "13",
        inUse: "2",
        price: "Test"
    },
    {
        title: "Titel",
        description: "Lorem ipsum",
        image: "Test",
        inStock: "2",
        ordered: "33",
        inUse: "90",
        price: "Test"
    }
]);



</script>

<template>
    <div class="flex main-margin rows">
    <div class="banane center">Logistics</div>
        <LogisticItem 
        v-for="item in items"
        :title="item.title"
        :description="item.description"
        :image="item.image"
        :inStock="item.inStock"
        :ordered="item.ordered"
        :inUse="item.inUse"
        :price="item.price"
        />
    </div>
</template>

<style template>

.banane {
    width: 100%;
    height: 50px;
    overflow: hidden;
    cursor: pointer;
    background-color: rgba(0, 247, 255, 0.6);
    color:aliceblue;
    border-color: rgb(24, 24, 24);
    border-style: solid;
    margin: 2px;
    padding: 10px;
    transition: background-color 0.5s ease;
    font-size: xx-large;
}
</style>