<script setup>
import { ref, onMounted, computed } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { sendMinorMessage, sendMajorMessage } from '../../api/requests.js'

const messageType = ref(0)
const messageContent = ref("")

function sendMessage() {
    let formattedJSON = {
        "message": messageContent.value
    }
    if(messageType.value == 0)
    {
        sendMinorMessage(formattedJSON)
    }
    else {
        sendMajorMessage(formattedJSON)
    }
}

onMounted(async() => {
    console.log("Broadcast View")
})

</script>

<template>
    <div class="broadcast-container">
      <h1 class="title">Brodcast System</h1>
      <div class="message-type">
        <label>Minor Message</label>
        <input type="range" min="0" max="1" v-model="messageType" class="slider" />
        <label>Major Message</label>
      </div>
      <textarea
        v-model="messageContent"
        placeholder="Type your message here..."
        class="message-input"
      ></textarea>
      <button @click="sendMessage" class="send-button">Send Message</button>
    </div>
  </template>
  
  <style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Arial', sans-serif;
  background-color: #111;
  color: #fff;
}

.broadcast-container {
  width: 80%;
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background-color: #222;
  border-radius: 10px;
  border: 1px solid #444;
}

.title {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
  color: #f0a30a; /* Gold */
}

.message-type {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  font-size: 16px;
}

.slider {
  width: 100px;
}

.message-input {
  width: 100%;
  height: 150px;
  padding: 10px;
  margin-bottom: 20px;
  resize: none;
  border: 1px solid #444;
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.send-button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #007bff; /* Blue */
  border: none;
  border-radius: 5px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.send-button:hover {
  background-color: #0056b3; /* Darker Blue */
}

label {
    font-size: 16px;
    margin-right: 10px;
    color: #fff;
}

input[type="range"] {
  -webkit-appearance: none;
  width: 100%;
  height: 10px;
  margin: 15px 0;
  padding: 0 30px;
  background-color: transparent;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 25px;
  height: 25px;
  background-color: #f0a30a; /* Gold für den Slider-Thumb */
  border-radius: 50%;
  border: 2px solid #000;
  cursor: pointer;
  box-shadow: 0 0 5px rgba(240, 163, 10, 0.8); /* Leichter Glow-Effekt für den Slider-Thumb */
  margin-top: -8px; /* Verschiebung des Thumb, um es in der Mitte des Tracks zu positionieren */
}

input[type="range"]::-webkit-slider-runnable-track {
  width: 100%;
  height: 5px;
  background-color: #555; /* Dunkelgrau für den Slider-Track */
  border-radius: 5px;
}

/* Styling für den Slider, wenn er aktiv ist */
input[type="range"]:focus {
  outline: none;
}

input[type="range"]:focus::-webkit-slider-thumb {
  border-color: #f0a30a; /* Gold */
  box-shadow: 0 0 8px rgba(240, 163, 10, 0.8); /* Stärkerer Glow-Effekt für den Slider-Thumb */
}



</style>