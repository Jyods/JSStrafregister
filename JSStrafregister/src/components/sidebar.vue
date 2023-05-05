<script setup>
</script>
<template>
    <div class="sidebar">
        <div class="sidebar-header">
        <h3>Strafregister</h3>
        </div>
        <ul class="sidebar-list">
        <li class="sidebar-list-item">
            <a href="/">Register</a>
        </li>
        <li class="sidebar-list-item">
            <a href="/create/entry">Neuer Eintrag</a>
        </li>
        <li class="sidebar-list-item">
            <a href="/articles">Gesetzesartikel</a>
        </li>
        </ul>
    </div>
</template>
<style scoped>
.sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 200px;
    background-color: grey;;
    color: red;
    padding-top: 50px;
}

</style>