<template>
  <div class="py-4 px-2 mb-14 bg-white">
    <nav class="flex items-center max-w-7xl my-0 mx-auto">
      <img class="max-h-14" src="../assets/playlisticon.jpeg" alt="">
      <h1 class="ml-5 text-3xl">
        <router-link :to="{ name: 'home' }">Playlist App</router-link>
      </h1>
      <div class="ml-auto">
        <router-link v-if="user" class="btn text-sm ml-4" :to="{ name: 'userPlaylists' }">My Playlist</router-link>
        <router-link v-if="user" class="btn text-sm ml-4" :to="{ name: 'createPlaylist' }">Create Playlist</router-link>
        <button v-if="user" class="text-sm ml-4" @click="handleLogout">Logout</button>
        <router-link v-if="!user" class="btn text-sm ml-4" :to="{ name: 'signup' }">Sign Up</router-link>
        <router-link v-if="!user" class="btn text-sm ml-4" :to="{ name: 'login' }">Log in</router-link>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { signOut } from '@firebase/auth';
import { useRouter } from 'vue-router';
import { getUser } from '../composables/getUser';
import { auth } from '../firebase/config';

const router   = useRouter(),
      { user } = getUser()

const handleLogout = async () => {
  await signOut(auth)
  console.log(`user log out`)
  router.push('/login')
}
</script>

<style scoped>
</style>