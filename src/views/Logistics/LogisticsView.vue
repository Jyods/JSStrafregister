<script setup>
import { onMounted, ref, computed } from 'vue'
import { getLogistics } from '../../api/logistics.js';
import { auth } from '../../api/requests.js';
import LogisticItem from '../../components/LogisticItem.vue';
import LogisticItemAdmin from '../../components/LogisticItemAdmin.vue';

const items = ref([]);

const hasPermission = ref(false);

const isLoading = ref(true);

onMounted(async () => {
    if(localStorage.getItem("token"))
    {
        if(await auth(localStorage.getItem("token")) == false)
        {
            hasPermission.value = false;
            console.log("Token ungültig");
            localStorage.removeItem("token");
        }
        else
        {
            hasPermission.value = true;
            console.log("Token gültig");
        }
    }
    else
    {
        console.log("Token nicht vorhanden");
    }
    const logistics = await getLogistics();
    items.value = logistics.data;
    isLoading.value = false;
});

const search = ref("");

const filteredItems = computed(() => {
    if(search.value.length > 0)
    {
        return items.value.filter(item => item.name.toLowerCase().includes(search.value.toLowerCase()));
    }
    else
    {
        return items.value;
    }

  });

  const createItem = ref(false);

  function newItem() {
    if(createItem.value == true)
    {
        return;
    }
        createItem.value = true;

        //nimm die id des letzten items und addiere 1
        const id = items.value.length + 1;

        console.log(id)

        const data = {
            name: "Neues",
            description: "Neue Beschreibung",
            stock: 0,
            ordered: 0,
            inuse: 0,
            price: 0,
            id: id
        }
        
        items.value.unshift(data);

  }



</script>

<template>
    <div class="loading" v-if="isLoading">
        <img src="../../assets/Loading.svg" alt="loading"/>
    </div>
    <div class="flex main-margin cols" v-else>
        <div class="banane center">
            <p>Logistics</p>
            <input type="text" placeholder="Search..." v-model="search" />
        </div>
        <LogisticItem 
        v-if="!hasPermission"
        v-for="item in filteredItems"
        :title="item.name"
        :description="item.description"
        :image="item.image"
        :inStock="item.stock"
        :ordered="item.ordered"
        :inUse="item.inuse"
        :price="item.price"
        />
        <LogisticItemAdmin
        v-else
        v-for="item in filteredItems"
        :title="item.name"
        :description="item.description"
        :image="item.image"
        :inStock="item.stock"
        :ordered="item.ordered"
        :inUse="item.inuse"
        :price="item.price"
        :key="item.id"
        />
        <img class="add_icon" src="../../assets/plus.svg" width="50" height="50" @click="newItem" v-if="hasPermission"/>
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
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
}

input {
    background-color: transparent;
    border: none;
    outline: none;
    color: aliceblue;
}

input::placeholder {
    color: aliceblue;
}

.add_icon {
    position: fixed;
    bottom: 20px;
    right: 20px;
    cursor: pointer;
}

</style>