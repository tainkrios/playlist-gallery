<template>
  <form @submit.prevent="handleSubmit">
    <h3>Login</h3>
    <input type="email" placeholder="Email" v-model="email">
    <input type="password" placeholder="Password" v-model="password">
    <div class="error" v-if="error">{{ error }}</div>
    <button>Log in</button>
  </form>
</template>

<script setup lang="ts">
import { useLogin } from '../../composables/useLogin';
import { ref } from 'vue';

const { error, login } = useLogin(),
      email            = ref(''),
      password         = ref(''),
      handleSubmit     = async () => {
        await login(email.value, password.value)
        if (!error.value) {
          console.log('user logged in')
        }
      }
</script>

<style scoped>
</style>