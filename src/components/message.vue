<script setup>
import { onMounted, ref, computed } from 'vue'

const message = ref([])

const id = ref(0)

const props = defineProps({
    message: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(['removeItem'])

onMounted (() => {
    id.value = props.message.id
    message.value = props.message.message
    console.warn(message.value.length)
    setTimeout(() => {
        emit('removeItem', id.value)
    }, 10000)
})


function removeItem() {
    emit('removeItem',id.value)
}

const longerThanFive = computed(() => {
    return message.value.length > 18
})

const messagePreview = computed(() => {
    return message.value.substring(0, 18) + "..."
})

const showAll = ref(false)

</script>

<template>
    <transition name="slide-in-out">
        <div class="wrapper" @click.prevent="showAll = !showAll">
            <div class="message_preview center" v-if="longerThanFive && !showAll">
                <p>{{ messagePreview }}</p>
            </div>
            <div class="message center" v-else>
                <p>{{ message }}</p>
            </div>
            <div class="button">
                <button class="xButton" @click="$emit('removeItem', id)">x</button>
            </div>
        </div>
    </transition>
  </template>
  
<style scoped>

.wrapper {
  min-width: 160px;
  max-width: 160px;
  background-color: #000;
  padding: 10px;
  width: max-content;
  height: max-content;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  border-style: solid;
  border-width: 2px;
  border-color: yellow;
  box-shadow: 0 0 10px rgba(255, 255, 0, 0.5);
  margin: 5px;
  font-family: 'Helvetica', sans-serif;
  color: #fff;
  text-align: center;
}
/*.wrapper {
  background-image: url('star-wars-logo.png');
  background-size: cover;
  background-position: center;
}*/

.wrapper:hover {
    /*Wenn der Benutzer mit der Maus über das Element fährt, wird die Border Farbe geändert. Diese änderung soll animiert dass sich die Farbe von oben links nach unten rechts ändert*/
}


.xButton {
    background-color: transparent;
    border: none;
    justify-content: center;
    font-size: 20px;
    cursor: pointer;
    color: rgb(255, 255, 255);
    padding: 0px;
    margin: 0px;
}

.message {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    margin: 0px;
    padding: 0px;
}

.message_preview {
  cursor: pointer;
}

button {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

button:hover {
    color: rgb(255, 0, 0);
}

.slide-in-out-enter-active,
.slide-in-out-leave-active {
  transition: transform 0.5s;
}

.slide-in-out-enter, .slide-in-out-leave-to /* .slide-in-out-leave-active in <2.1.8 */ {
  transform: translateX(100%); /* Initially off to the right */
}
</style>
