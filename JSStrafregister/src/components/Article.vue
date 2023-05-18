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
        <button @click="removeArticle">Remove Article</button>
    </div>
</template>