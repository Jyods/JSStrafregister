<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
    message: {
        type: Object,
        required: true
    }
})

onMounted(() => {
    setTimeout(() => {
        //add a auto remove function
    }, 5000)
})
</script>

<template>
        <div class="majorMessage__container">
            <div class="majorMessage__content">
                <div class="majorMessage__header">
                    Information
                </div>
                <div class="majorMessage__body">
                    {{ message.message }}
                </div>
                <div class="majorMessage__Button">
                    <button class="mm_button" @click="$emit('remove-message', message.id)">X</button>
                </div>
            </div>
        </div>
</template>

<style>
.majorMessage__container {
  position: fixed;
  width: 750px;
  height: 500px;
  inset: 0;
  margin: auto;
  z-index: 200;
  perspective: 1000px; /* Fügt eine 3D-Perspektive hinzu */
}

.majorMessage__content {
  background-color: rgba(0, 0, 0, 0.5); /* Transparenz reduziert, um den Hologramm-Effekt zu erzielen */
  color: #FFD700; /* Goldene Textfarbe für den Star Wars-Look */
  border-color: #FFD700; /* Goldener Rahmen für den Star Wars-Look */
  backdrop-filter: blur(10px); /* Hinzufügen eines leichten Blur-Effekts für das Hologramm-Gefühl */
  border-style: groove;
  border-radius: 10px; /* Erhöhen der Rundung für einen glatteren Look */
  border-width: 5px; /* Reduzieren der Rahmenbreite */
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  transform: translateZ(-50px); /* Bewegt das Element etwas nach hinten, um 3D-Effekt zu erzeugen */
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.5); /* Fügt einen leichten Glüheffekt hinzu */
}

/* Füge eine Animation für den Schwebeflügel-Effekt hinzu */
@keyframes float {
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(0);
  }
}

/* Wende die Animation auf das Element an */
.majorMessage__content:hover {
  animation: float 2s infinite;
}

.mm_button {
  background-color: #000; /* Schwarzer Hintergrund für den Star Wars-Look */
  border: 2px solid #FFD700; /* Goldenen Rand beibehalten */
  border-radius: 8px; /* Geringfügig abgerundete Ecken für einen moderneren Look */
  padding: 12px 24px; /* Etwas mehr Padding, um den Button zu vergrößern */
  font-size: 24px; /* Leicht verkleinerte Schriftgröße für eine bessere Proportion */
  font-weight: bold; /* Fetter Text */
  color: #FFD700; /* Goldene Textfarbe für Kontrast */
  cursor: pointer;
  display: inline-block; /* Buttons sind nun inline, nicht mehr flex */
  transition: background-color 0.3s, color 0.3s; /* Sanfter Übergang für Hover-Effekt */
}

/* Button Hover-Effekt */
.mm_button:hover {
  background-color: #FFD700; /* Farben umgekehrt beim Hover-Effekt */
  color: #000;
}


.majorMessage__header {
  font-size: 36px; /* Größere Schriftgröße für den Header */
  font-weight: bold;
  color: #FFD700; /* Goldenen Textfarbe für den Star Wars-Look */
  text-align: center; /* Zentrierte Ausrichtung */
  text-transform: uppercase; /* Header-Text in Großbuchstaben umwandeln */
  margin-bottom: 10px; /* Füge etwas Abstand nach unten hinzu */
  text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.3); /* Füge einen leichten Schatteneffekt hinzu */
}


</style>