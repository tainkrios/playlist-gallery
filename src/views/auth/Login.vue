<template>
  <form @submit.prevent="handleSubmit">
    <h3>Login</h3>
    <input type="email" placeholder="Email" v-model="email">
    <input type="password" placeholder="Password" v-model="password">
    <div class="error" v-if="error">{{ error }}</div>
    <button v-if="!isPending">Log in</button>
    <button v-if="isPending" disabled>Loading...</button>
  </form>
</template>

<script setup lang="ts">
import { useLogin } from '../../composables/useLogin';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const { error, login, isPending } = useLogin(),
      email                       = ref(''),
      password                    = ref(''),
      router                      = useRouter(),
      handleSubmit                = async () => {
        await login(email.value, password.value)
        if (!error.value) {
          console.log('user logged in')
          router.push({ name: 'userPlaylists' })
        }
      }
</script>

<style scoped>
</style>