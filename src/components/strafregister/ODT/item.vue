<script setup>

import { onMounted, ref, computed } from 'vue'

const testdata = 
{
    "id": 1,
    "title": "test",
    "description": "Dies ist ein test",
    "isdeleted": 0,
    "isarchived": 0,
    "wasredirected": 0,
    "shouldReply": 1,
    "status": {
        "user": 1,
        "process": 1,
        "sendup": 1,
        "company": 1,
        "redirected": 0,
        "senddown": 1,
        "delivery": 1
    },
    "error": {
        "missing": 0,
        "missingReason": null
    }
}

const statusTitle = computed(() => {
    //überprüfe von hinten nach vorne jeden status und speichere den namen des ersten status mit dem wert 1
    //wenn kein status den wert 1 hat, dann speichere "none"

    let status = props.thing.status
    let statusname = "none"

    if (status.delivery == 1) {
        statusname = "Zustellung"
    }
    else if (status.senddown == 1) {
        statusname = "Zurücksenden"
    }
    else if (status.redirected == 1) {
        statusname = "Weitergeleitet"
    }
    else if (status.company == 1) {
        statusname = "Bei Unternehmen"
    }
    else if (status.sendup == 1) {
        statusname = "Schicken"
    }
    else if (status.process == 1) {
        statusname = "Verarbeiten"
    }
    else if (status.user == 1) {
        statusname = "Bei Benutzer"
    }
    else if (status.delivery == 2) {
        statusname = "Zugestellt"
    }
    else if (status.shouldReply == 1)
    {
        statusname = "Antwort benötigt"
    }
    else if (error.missing == 1) {
        statusname = "missing"
    }


    return statusname
})

const props = defineProps({
    thing: {
        type: Object,
        required: true
    }
})

//Importiere alle ODT SVGs
import IconBranching from '../../icons/IconBranching.vue';
import IconCompany from '../../icons/IconCompany.vue';
import IconEmail from '../../icons/IconEmail.vue';
import IconEmailInfo from '../../icons/IconEmailInfo.vue';
import IconError from '../../icons/IconError.vue';
import IconMissing from '../../icons/IconMissing.vue';
import IconProcess from '../../icons/IconProcess.vue';
import IconUsercheck from '../../icons/IconUsercheck.vue';
import IconArrowLeft from '../../icons/IconArrowLeft.vue';
import IconSendDown from '../../icons/IconSendDown.vue';
import IconSendUp from '../../icons/IconSendUp.vue';

const needReply = ref(false);
const wasRedirected = ref(false);
const isExpandet = ref(false);

const usercheckstatus = ref(0);
const processstatus = ref(0);
const sendupstatus = ref(0);
const companystatus = ref(0);
const branchingstatus = ref(0);
const senddownstatus = ref(0);
const emailstatus = ref(0);
const errorstatus = ref(0);
const missingstatus = ref(0);

onMounted(() => {
    console.log("ODTItem mounted")
    console.log(props.thing)
    wasRedirected.value = props.thing.wasredirected == 1 ? true : false;
    checkStatus();
    //animation();
});

function checkStatus() {
    //checke ob der Auftrag eine Antwort braucht
    if(props.thing.shouldReply == 1 && props.thing.status.senddown == 2 && props.thing.status.delivery == 2) {
        needReply.value = true;
    }
    //checke ob der Auftrag weitergeleitet wurde
    if(props.thing.wasredirected == 1) {
        wasRedirected.value = true;
    }
    //checke den Status des Auftrags
    usercheckstatus.value = props.thing.status.user;
    processstatus.value = props.thing.status.process;
    sendupstatus.value = props.thing.status.sendup;
    companystatus.value = props.thing.status.company;
    branchingstatus.value = props.thing.status.redirected;
    senddownstatus.value = props.thing.status.senddown;
    emailstatus.value = props.thing.status.delivery;
    errorstatus.value = props.thing.error.missing;
    missingstatus.value = props.thing.error.missingReason;
}


async function animation() {
    while(true) {
        //gehe durch alle Status und erhöhe sie um 1 bis 3 und setze sie dann wieder auf 0
        for(let i = 0; i < 4; i++) {
            usercheckstatus.value = i;
            processstatus.value = i;
            sendupstatus.value = i;
            companystatus.value = i;
            branchingstatus.value = i;
            senddownstatus.value = i;
            emailstatus.value = i;
            errorstatus.value = i;
            missingstatus.value = i;
            await new Promise(r => setTimeout(r, 1000));
        }
    }
}


</script>

<template>
    <div class="column" @click="isExpandet = !isExpandet">
        <p class="warning small" v-if="props.thing.isanswer == 1">Dieses Dokument ist eine Antwort</p>
        <p><strong>{{ props.thing.title }}</strong></p>
        <p>{{ props.thing.description }}</p>
        <p>{{ props.thing.file }}</p>
        <p>Der Auftrag hat die ID: <strong>{{ props.thing.id }}</strong></p>
        <p>Nach: <strong>{{ props.thing.institution.abbreviation }}</strong></p>
        <p>Derzeitig: {{ statusTitle }}</p>
        <div class="row" v-if="isExpandet">
            <IconUsercheck :class="{activestroke : usercheckstatus == 1, donestroke : usercheckstatus == 2, errorstroke : usercheckstatus == 3}" height="50px" width="50px" />
            <IconArrowLeft height="50px" width="50px" />
            <IconProcess :class="{active : processstatus == 1, done : processstatus == 2, error : processstatus == 3}" height="50px" width="50px" />
            <IconArrowLeft height="50px" width="50px" />
            <IconSendUp :class="{active : sendupstatus == 1, done : sendupstatus == 2, error : sendupstatus == 3 }" height="50px" width="50px" />
            <IconArrowLeft height="50px" width="50px" />
            <IconCompany :class="{active : companystatus == 1, done : companystatus == 2, error : companystatus == 3}" height="50px" width="50px" /> 
            <IconArrowLeft height="50px" width="50px" /> 
            <IconBranching v-if="wasRedirected" :class="{activestroke : branchingstatus == 1, donestroke : branchingstatus == 2, errorstroke : branchingstatus == 3}" height="50px" width="50px" />
            <IconArrowLeft v-if="wasRedirected" height="50px" width="50px" />
            <IconSendDown :class="{active : senddownstatus == 1, done : senddownstatus == 2, error : senddownstatus == 3}" height="50px" width="50px" />
            <IconArrowLeft height="50px" width="50px" />
            <IconEmail v-if="!needReply" :class="{active : emailstatus == 1, done : emailstatus == 2, error : emailstatus == 3}" height="50px" width="50px" />  
            <IconEmailInfo v-if="needReply" :class="{active : emailstatus == 1, info : emailstatus == 2, error : emailstatus == 3}" height="50px" width="50px" />
            <!--
            <IconArrowLeft height="50px" width="50px" />
            <IconError :class="{active : errorstatus == 1, done : errorstatus == 2, error : errorstatus == 3}" height="50px" width="50px" />
            <IconMissing :class="{active : missingstatus == 1, done : missingstatus == 2, error : missingstatus == 3}" height="50px" width="50px" />
            -->
        </div>
        <br />
    </div>
</template>

<style scoped>

.wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    border-top: 1px solid #eaeaea;
    height: 300px;
}
.row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    border-top: 1px solid #eaeaea;
    height: max-content;
}
.column {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    border-top: 1px solid #eaeaea;
    height: max-content;
}

.done {
    fill: #00ff00 !important;
}

.donestroke{
    stroke: #00ff00 !important;
}

.active {
    fill: #0070f3 !important;
}

.activestroke {
    stroke: #0070f3 !important;
}

.error {
    fill: #ff0000 !important;
}

.errorstroke {
    stroke: #ff0000 !important;
}

.info {
    fill: #ffaa00 !important;
}

</style>