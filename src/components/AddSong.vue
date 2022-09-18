<template>
  <div class="text-center  mt-10">
    <button @click="showForm = true" v-if="!showForm">Add Songs</button>
    <form v-if="showForm" @submit.prevent="handleSubmit" class="max-w-full text-left">
      <h4>Add a New Song</h4>
      <input type="text" placeholder="Song title" required v-model="title">
      <input type="text" placeholder="Artist" required v-model="artist">
      <button>Add</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from '@vue/reactivity'
import { useDocument } from '../composables/useDocument';
import { v4 as uuidv4 } from 'uuid'

const title = ref(''),
  artist = ref(''),
  showForm = ref(false),
  props = defineProps(['playlist']),
  { updateDocument } = useDocument('playlists', props.playlist.id)



const handleSubmit = async () => {
  const newSong = {
    title: title.value,
    artist: artist.value,
    id: uuidv4()
  }
  await updateDocument({
    songs: [...props.playlist.songs, newSong]
  })
  title.value = ''
  artist.value = ''
  // console.log(newSong)
}
</script>