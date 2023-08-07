<script setup>
    import { ref, onMounted } from 'vue'
    import PublicChat from '../components/PublicChat.vue';
    import { getAllchat, storeAllchat } from '../api/requests.js'

    const data = ref({});

    const text = ref("");

    import Pusher from 'pusher-js';

    const pusher = new Pusher('2510f8aea0961630d9af', {
        cluster: 'eu'
    });

    const channel = pusher.subscribe('message-channel');

    channel.bind('allchat-event', function(banane) {
        console.error(banane)
        data.value.push(banane.data)
        console.log(data.value)
        //sortiere data nach id absteigend
        data.value.sort((a, b) => b.id - a.id)
    });


    onMounted(async () => {
        let response = await getAllchat()
        data.value = response.data
    })

    async function get10more() {
        let response = await getAllchat(data.value[data.value.length - 1].id)
        data.value = data.value.concat(response.data)
    }

    async function store() {
        let data = {
            message: text.value
        }
        let response = await storeAllchat(data)
        console.log(response)
        text.value = ""
    }
</script>
<template>
    <div class="center">
        <button @click="get10more">Get 10 more</button>
        <div class="chat__wrapper">
            <PublicChat v-for="chat in data" :chatdata="chat"/>
        </div>
        <div class="newMessage">
            <input type="text" placeholder="Message" v-model="text" />
            <button @click="store">Send</button>
        </div>
    </div>
</template>
<style scoped>
.chat__wrapper {
    display: flex;
    flex-direction: column-reverse;
    gap: 10px;
    max-height: 300px;
    width: 50%;
    overflow-y: scroll;
    font-size: 13px;
}
.newMessage {
    display: flex;
    gap: 10px;
}
.center {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
