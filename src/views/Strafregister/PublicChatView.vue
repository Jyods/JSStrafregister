<script setup>
    import { ref, onMounted } from 'vue'
    import PublicChat from '../../components/strafregister/publicChat.vue';
    import { getAllchat, storeAllchat } from '../../api/requests.js'

    const data = ref({});

    const text = ref("");

    const more = ref(true);

    const isLoading = ref(true);

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
        console.log(data.value.length)
        try  {
            if (data.value[data.value.length - 1].id == 1 || data.value.length < 10) {
                more.value = false
            }
        }
        catch (e) {
            more.value = false
        }
        isLoading.value = false
    })

    async function get10more() {
        let response = await getAllchat(data.value[data.value.length - 1].id)
        data.value = data.value.concat(response.data)
        if (data.value[data.value.length - 1].id == 1) {
            more.value = false
        }
    }

    const sending = ref(false)

    async function store() {
        if (sending.value || text.value.length == 0)
        {
            return
        }
        sending.value = true
        let data = {
            message: text.value
        }
        let response = await storeAllchat(data)
        console.log(response)
        text.value = ""
        sending.value = false
    }
</script>
<template>
    <div class="loading" v-if="isLoading">
        <img src="../../assets/Loading.svg" alt="loading"/>
    </div>
    <div class="center" v-else>
        <div class="chat__wrapper">
            <PublicChat v-for="chat in data" :chatdata="chat"/>
            <button @click="get10more" v-if="more" class="last_item">Get 10 more</button>
        </div>
        <div class="newMessage">
            <input type="text" placeholder="Message" v-model="text" @keyup.enter="store"/>
            <button @click="store" :class="{disable_button: sending || text.length == 0}" class="row">
            Send
            </button>
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
    padding-top: 20px;
}
.last_item {
    align-self: center;
    /*Tabstop 1*/
    order: 1;
}
input[type=text] {
    width: 100%;
    padding: 12px 20px;
    margin-top: 20px;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 4px;
    resize: none;
}
.disable_button {
    background-color: #cccccc;
    color: #666666;
    cursor: not-allowed;
}
/*Zentriere den Text im Knopf*/
button {
    align-self: center;
    /*Tabstop 2*/
    order: 2;
}
</style>
