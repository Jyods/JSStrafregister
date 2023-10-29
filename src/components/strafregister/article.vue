<script setup>
import { onMounted, ref, computed } from 'vue'

const emit = defineEmits(['removeArticle'])

const prop = defineProps({
    article: {
        type: Object,
        required: true
    }
})

function removeArticle() {
    emit('removeArticle', prop.article.id)
}

</script>

<template>
    <div class="article_wrapper">
        {{article.name}}
        <button class="remove_button" @click="removeArticle"><img src="../../assets/minus.svg" height="20" width="20" /> </button>
    </div>
</template>

<style scoped>
.article_wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    align-self: center;

}
.remove_button {
    width: 20px;
    height: 20px;
    margin: 10px;
    border-radius: 10px;
    border: none;
    color: #f9f9f9;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    transition: 0.2s;
    text-align: center;
}
</style>