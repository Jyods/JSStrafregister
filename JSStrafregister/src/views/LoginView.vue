<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import jwt_decode from 'jwt-decode';

const router = useRouter();
const state = ref(null);

onMounted(async () => {
  let auth = await getAuth();
  console.warn(auth);
  if (auth){
    console.warn('Pushed');
    router.push('/admin');
  }
});

async function getAuth() {
    const token = sessionStorage.getItem('token');
    if (token) {
        try {
            const decoded = jwt_decode(token);
            if (decoded.exp * 1000 > new Date().getTime()) {
                console.log('Authenticated');
                const authenticated = await fetchLoginStatus(token);
                if (authenticated) {
                    console.log('Token verified by server');
                    return true;
                }
            }
            else {
                console.log('Token expired');
            }
        } catch (error) {
            console.log('Invalid token');
        }
    }
    console.log('Not authenticated AdminView');
    return false;
} 

async function login() {
  let tries = parseInt(localStorage.getItem('tries')) || 0;
  const lastAttempt = parseInt(localStorage.getItem('lastAttempt')) || 0;

  if (tries >= 3 && Date.now() - lastAttempt < 600000) { // 10 minutes = 600000 milliseconds
    state.value = 'Too many tries, please try again later';
    return;
  }

  try {
    const token = await fetchLogin(email.value, password.value);
    sessionStorage.setItem('token', token);
    router.push('/admin');
  } catch (error) {
    tries++;
    localStorage.setItem('tries', tries);
    localStorage.setItem('lastAttempt', Date.now());
    console.warn(error);
    state.value = error.message;
  }
};


</script>

<template>
<div class="wrapper flex">
    <form @submit.prevent="login">
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" id="email" placeholder="Enter email" v-bind="{error: state != null}" />
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" placeholder="Password" />
        </div>
        <div class="flex2">
            <RouterLink to="/">Back</RouterLink>
            <button type="submit" class="btn btn-primary">Submit</button>
        </div>
        <div v-if="state != null" class="error">
            {{ state }}
        </div>
    </form>
</div>

</template>

<style scoped>
.wrapper {
    border-style: solid;
    border-width: 1px;
    border-color: #1a1a1a;
    background-color: #0d0d0d;
    width: auto;
    border-radius: 5px;
    margin: 15% 600px 600px 600px;
    padding: 15px 0px;
    font-size: 1.5em;
    min-width: 500px;
}

input {
    margin: 10px 10px;
    width: 300px;
    height: 30px;
    border-radius: 5px;
    border-style: solid;
    border-width: 1px;
    border-color: #1a1a1a;
    background-color: #0d0d0d;
    color: #ffffff;
}

.flex {
    display: flex;
    flex-flow: wrap;
    justify-content: space-around;
    /*justify-content: center; */
}

.flex2 {
    display: flex;
    flex-flow: wrap;
    justify-content: space-evenly;
    /*justify-content: center; */
}


.error {
    color: red;
    height: 70px;
    text-align: center;
    font-size: 1em;
    padding-top: 20px;
}
</style>