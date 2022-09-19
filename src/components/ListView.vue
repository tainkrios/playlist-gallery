<template>
  <div v-for="playlist in playlists" :key="playlist.id">
    <router-link :to="{name: 'playlistDetails', params: { id: playlist.id }}">
      <div class="flex items-center p-5 rounded-lg bg-white my-4 transition-all duration-200 hover:transition-all hover:duration-200 hover:shadow-md">
        <div class="max-w-[100px] max-h-24 overflow-hidden rounded-xl">
          <img class="block" :src="playlist.coverUrl">
        </div>
        <div class="mx-7">
          <h3>{{ playlist.title }}</h3>
          <p>Created by {{ playlist.userName }}</p>
        </div>
        <div class="ml-auto">
          <p>{{ playlist.songs.length }}</p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script setup lang="ts">

defineProps(['playlists'])

</script>

<style scoped>

</style>