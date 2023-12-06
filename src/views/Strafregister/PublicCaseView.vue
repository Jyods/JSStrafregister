<script setup>
import { onBeforeMount, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getPublishedCase } from '../../api/requests.js';

const router = useRouter();

const id = router.currentRoute.value.params.id;

const data = ref({});

const rank = ref({});

const publisher = ref({});

const publisherRank = ref({});

const published_on = ref({});

onBeforeMount(async () => {

    data.value = {
      type: "Loading...",
      definition: "Loading...",
      description: "Loading...",
      fine: "Loading...",
      updated_at: "Loading...",
      laws: [
        {
          law: {
            id: "Loading...",
            name: "Loading...",
            Title: "Loading...",
            Category: "Loading...",
            description: "Loading...",
            Paragraph: "Loading...",
            updated_at: "Loading...",
          }
        },
      ],
    };

    publisher.value = {
      identification: "Loading...",
      rank: {
        rank: "Loading...",
      },
    };

    publisherRank.value = "Loading...";

    published_on.value = "Loading...";

    rank.value = "Loading...";
    
    let response = await getPublishedCase(id);

    //check if the response status is 404, if so, redirect to 404 page
    if (response.message == "Publish not found") {
        console.log("Publish not found")
        router.push("/error");
        return;
    }

    data.value = response.message;

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
    <div class="holopad-wrapper">
      <div class="holopad-content">
        <div class="holopad-header">{{ data.type }}</div>
        <div class="holopad-data">
          <p>{{ data.definition }}</p>
          <p>{{ data.description }}</p>
          <p>Strafe: {{ data.fine }} Hafteinheiten</p>
          <p>Paragrafen:</p>
          <ul>
            <li v-for="law in data.laws" class="law_item">
              §{{ law.law.Paragraph }} {{ law.law.Title }} {{ law.law.Category }}
            </li>
          </ul>
          <p>Rang: {{ rank }}</p>
        </div>
        <div class="holopad-published_by">
          <p>
            Veröffentlicht von: {{ publisher.identification }} ({{ publisherRank }})
          </p>
          <p>Veröffentlicht am: {{ published_on }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .holopad-wrapper {
    margin: 50px;
    border-radius: 5px;
    background-color: black;
    color: #00eaff;
    font-family: "Lucida Console", Monaco, monospace;
    padding: 20px;
    border: 3px solid #00eaff;
  }
  
  .holopad-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .holopad-header {
    font-size: 24px;
    text-decoration: underline;
  }
  
  .holopad-data {
    margin-top: 50px;
  }
  
  .holopad-data p {
    margin-bottom: 10px;
  }
  
  .holopad-data ul {
    list-style-type: none;
    padding: 0;
  }
  
  .holopad-data li {
    margin-bottom: 5px;
  }
  
  .holopad-published_by {
    margin-top: 50px;
    font-size: 12px;
  }
  
  /* Optional: Add animation for the Holopad effect */
  @keyframes flicker {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.8;
    }
    100% {
      opacity: 1;
    }
  }
  
  .holopad-wrapper {
    animation: flicker 1.5s infinite;
  }

  .law_item {
    margin-left: 20px;
    }
  </style>
  