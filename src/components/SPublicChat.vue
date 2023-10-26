<script setup>
import { onMounted, ref, computed } from 'vue'

const props = defineProps({
    chatdata: {
        type: Object,
        required: true
    }
})

const erstellt = ref("")

const formatted = ref(false) 

onMounted(() => {
    console.log("Chatdata: ", props.chatdata)
    //überprüfen ob datum schon formatiert wurde
    if (formatted.value) {
        return
    }
    formatDate()
})

function formatDate() {
    
    /*if (props.chatdata.created_at.includes(".")) {
        return props.chatdata.created_at
    }*/
    
    let date = props.chatdata.created_at
    let day = date.substring(8, 10)
    let month = date.substring(5, 7)
    let year = date.substring(0, 4)
    let time = date.substring(11, 16)
    erstellt.value = day + "." + month + "." + year + " - " + time
    console.log(erstellt.value)
    formatted.value = true
}

</script>

<template>
    <div class="chat__container">
        <div class="message">
            <div class="author">
                {{ chatdata.author.name }} ({{ chatdata.author.rank.rank }})
            </div>
            <div class="text">
                {{ chatdata.message }}
            </div>
            <div class="sent-at">
                {{ erstellt }}
            </div>
        </div>
        <br />
    </div>
</template>

<style scoped>
.chat-container {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.message {
  background-color: #f0f0f0;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
}

.author {
  font-weight: bold;
  font-size: smaller;
  align-self: flex-start; /* Align to the left */
}

.text {
  margin-top: auto; /* Push to the center */
  text-align: center;
}

.sent-at {
  font-size: smaller;
  color: #888;
  align-self: flex-end; /* Align to the right */
}
</style>