<script setup>
import { ref } from 'vue';

const listOfWebhooks = ref([
    {
        "id": "https://discord.com/api/webhooks/1147273438571012136/Ad1YRkfY-r3SA7o-dIeBNPv3m0KLQpcDS3xxPgs1AN1SGDT0TlRax_HZHYX18KMpNBRA",
        "name": "Jyods",
    },
    {
        "id": "1147273438571012136",
        "name": "OOC2",
    },
    {
        "id": "1147273438571012136",
        "name": "OOC3",
    }
]);
const templates = ref([
    {
    "name": "promote", 
    "data": 
            {
            "content": null,
            "embeds": [
                {
                "title": "Beförderung",
                "description": "Hiermit wird xx zum xx befördert. Herzlichen Glückwunsch!",
                "color": 1634328,
                "footer": {
                    "text": "Mit freundlichen Grüßen\nDie Projektleitung"
                }
                }
            ],
            "attachments": []
            }
    },
    {
    "name": "recruit",
    "data": 
            {
            "content": null,
            "embeds": [
                {
                "title": "Einstellung",
                "description": "Hiermit wird xx als xx in unser Team aufgenommen. Herzlichen Glückwunsch!",
                "color": 1539547,
                "footer": {
                    "text": "Mit freundlichen Grüßen\nDie Projektleitung"
                }
                }
            ],
            "attachments": []
            }
    },
    {
    "name": "retire",
    "data":
            {
            "content": null,
            "embeds": [
                {
                "title": "Entlassung",
                "description": "Hiermit verlässt xx das Team. Der letzte Teamposten, den xx bekleidete, war xx.",
                "color": 16388369,
                "footer": {
                    "text": "Mit freundlichen Grüßen\nDie Projektleitung"
                }
                }
            ],
            "attachments": []
            }
}]);

const template = ref("");

const webhook = ref("");

const sendWebhook = () => {

        console.log(webhook.value)

    //suche die Webhook ID aus der listOfWebhooks anhand des webhook namen
    const webhookID = listOfWebhooks.value.find((webhook1) => webhook1.name === webhook.value).id;
    console.log(webhookID)

    const data = JSON.stringify(template.value);
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            console.log(this.responseText);
        }
    });

    let toJSON = JSON.stringify(template.value);
    
    //check if toJSON is valid JSON
    try {
        JSON.parse(toJSON);
    } catch (e) {
        console.log("not valid JSON")
        return;
    }

    console.log()

    xhr.open("POST", webhookID);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(template.value);
}





</script>

<template>
    <div>
        <h1>OOC</h1>
        <select v-model="webhook">
            <option v-for="webhook in listOfWebhooks" :key="webhook.id">{{ webhook.name }}</option>
        </select>
        <select v-model="template">
            <option v-for="a in templates" :key="a.name">{{ a.data }}</option>
        </select>
        <!--Zeige den ganzen Inhalt des ausgewählten Templates an, der User soll den ganzen inhalt bearbeiten können-->
        <textarea v-model="template"></textarea>
        <button @click="sendWebhook">Send</button>
    </div>
</template>