<template>
  <form @submit.prevent="handleSubmit">
    <h3>Sign up</h3>
    <input type="text" placeholder="Display name" v-model="displayName">
    <input type="email" placeholder="Email" v-model="email">
    <input type="password" placeholder="Password" v-model="password">
    <div class="error" v-if="error">{{ error }}</div>
    <button v-if="!isPending">Sign up</button>
    <button v-if="isPending" disabled>Loading...</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from '@vue/reactivity';
import { useRouter } from 'vue-router';
import { useSignup } from '../../composables/useSignup';

const { error, signup, isPending } = useSignup(),
      email                        = ref(''),
      password                     = ref(''),
      displayName                  = ref(''),
      router = useRouter(),
      handleSubmit = async () => {
        await signup(email.value, password.value, displayName.value)
        if (!error.value) {
          console.log('user signed up')
          router.push({ name: 'userPlaylists'})
        }
      }

</script>

<style scoped>

</style>