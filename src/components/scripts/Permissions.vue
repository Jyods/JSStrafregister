<script setup>
import { ref, onMounted, computed, onBeforeMount } from 'vue'
import { getPermissions } from '../../api/requests';
import { useStore, createStore } from 'vuex';

const store = useStore()

const permissions = ref([])

onMounted(async () => {
    permissions.value = await getPermissions()
    console.error("Permissions:")
    console.error(permissions.value)
    // speichere die permsisions im store aber committe sie nicht
    store.state.permissions = permissions.value
})

function checkPermission(permission) {
    return permissions.value.includes(permission)
}

function checkIfIEditMyself() {
    return store.state.user.id == props.member.id
}

function checkIfIEditMyselfOrHigher() {
    return store.state.user.id == props.member.id || store.state.user.rank.id < props.member.rank.id
}

//q: was ist der user Store?
//a: der user store ist der store der die daten des eingeloggten users speichert
//q: wie kann man auf den zugreifen?
//a: mit useStore() und dann store.state.user

</script>