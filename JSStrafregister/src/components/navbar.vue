<script setup>
import { ref } from 'vue'
</script>
<template>
        <main>
          <body>
            <div class="nav">
              <a href="#home">Home</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
            </div>
          </body>
        </main>
</template>
<style scoped>
  .nav {
  background-color: #333;
  overflow: hidden;
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>