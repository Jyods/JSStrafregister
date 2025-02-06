<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { getPermissions, logout } from '../../api/requests.js';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const permissions = ref({});
const router = useRouter();
const emit = defineEmits(['add-to-array']);

onMounted(async () => {
    let data = await getPermissions();
    data = data.data;
    for (const [key, value] of Object.entries(data.permissions)) {
        data.permissions[key] = value === 1;
    }
    permissions.value = data.permissions;
    console.error(permissions.value);
});

async function logoutUser() {
    let data = await logout();
    if (data.message === 'Logged out') {
        console.warn('Logout successful');
        emit('add-to-array', data.message);
        router.push({ name: 'Login' });
    } else {
        console.log('Logout failed');
    }
}
</script>

<template>
    <div class="w-52 p-4 h-screen flex flex-col space-y-10 shadow-md">
        <nav class="flex flex-col space-y-2">
            <RouterLink v-if="permissions.permission_register || permissions.permission_superadmin" 
                to="/justice" class="px-4 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800">
                Register
            </RouterLink>
            <RouterLink v-if="permissions.permission_creator || permissions.permission_superadmin" 
                to="/justice/create/entry" class="px-4 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800">
                Neuer Eintrag
            </RouterLink>
            <RouterLink to="/justice/articles" class="px-4 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800">
                Gesetzesartikel
            </RouterLink>
            <RouterLink v-if="permissions.permission_recruiter || permissions.permission_superadmin" 
                to="/justice/AdminMember" class="px-4 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800">
                Mitglieder
            </RouterLink>
        </nav>

        <Separator class="bg-gray-700" />

        <Button variant="destructive" class="w-full" @click.prevent="logoutUser">
            Logout
        </Button>
    </div>
</template>