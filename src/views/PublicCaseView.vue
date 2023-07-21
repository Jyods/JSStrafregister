<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getPublishedCase } from '../api/requests';

const router = useRouter();

const id = router.currentRoute.value.params.id;

const data = ref({});

const rank = ref({});

const publisher = ref({});

const publisherRank = ref({});

const published_on = ref({});

onBeforeMount(async () => {

    let response = await getPublishedCase(id);

    data.value = response.message[0];

    rank.value = data.value.rank[0].rank;

    publisher.value = data.value.publisher[0];

    publisherRank.value = publisher.value.rank.rank;

    let date = data.value.updated_at;

    //format the date to dd.mm.yyyy / hh/mm
    let day = date.substring(8, 10);
    let month = date.substring(5, 7);
    let year = date.substring(0, 4);
    let hour = date.substring(11, 13);
    hour = parseInt(hour) + 2;
    let minute = date.substring(14, 16);

    published_on.value = day + "." + month + "." + year + " / " + hour + ":" + minute;

    console.warn(publisher.value)

    console.error(data.value);

})

</script>

<template>
    <div class="wrapper">
        <h2>{{ data.type }}</h2>
        <div class="data">
            <p>{{ data.definition }}</p>
            <p>{{ data.description }}</p>
            <p>Strafe: {{ data.fine }} Hafteinheiten</p>
            <p>Paragrafen:</p>
            <li v-for="law in data.laws">{{ law.law.Title }}</li>
            <p>Rang: {{ rank }}</p>
        </div>
        <div class="published_by">
            <p>Veröffentlicht von: {{ publisher.identification }} ({{ publisherRank }})</p>
            <p>Veröffentlicht am: {{ published_on }}</p>
        </div>
    </div>
</template>

<style scoped>
.data {
    margin-top: 50px;
}
.published_by {
    margin-top: 50px;
}
</style>