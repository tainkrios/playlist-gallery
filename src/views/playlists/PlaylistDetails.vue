<template>
  <div class="error" v-if="error">{{ error }}</div>
  <div v-if="document" class="grid grid-cols-3 gap-20">
    <div class="col-span-1 text-center">
      <div class="overflow-hidden	rounded-2xl relative p-40">
        <img class="block absolute top-0 left-0 min-w-full min-h-full" :src="document.coverUrl">
      </div>
      <h2 class="capitalize text-3xl font-semibold mt-5">{{ document.title }}</h2>
      <p class="mb-5 text-slate-400">Created by {{ document.userName }}</p>
      <p class="mb-5 text-left">{{ document.description }}</p>
      <button @click="handleDelete" v-if="ownership">Delete playlist</button>
    </div>
    <div class="col-span-2">
      <div>
        <div v-if="!document.songs.length">No songs has been added to this playlist yet</div>
        <div class="py-3 px-0 flex justify-between items-center mb-5 border-dashed border-secondary border-b"
          v-for="song in document.songs" :key="song.id">
          <div>
            <h3>{{ song.title }}</h3>
            <p>{{ song.artist }}</p>
          </div>
          <button @click="handleClick(song.id)" class="fa-solid fa-trash" v-if="ownership"></button>
        </div>
        <AddSong v-if="ownership" :playlist='document' />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { useRouter } from 'vue-router';
import { getDocument } from '../../composables/getDocument';
import { getUser } from '../../composables/getUser';
import { useDocument } from '../../composables/useDocument';
import { useStorage } from '../../composables/useStorage';
import AddSong from '../../components/AddSong.vue';

const props = defineProps(['id']),
  { user } = getUser(),
  { error, document } = getDocument('playlists', props.id),
  { deleteDocument, updateDocument } = useDocument('playlists', props.id),
  router = useRouter(),
  { deleteImage } = useStorage()

const handleDelete = async () => {
  await deleteImage(document.value.filePath)
  await deleteDocument()
  router.push({ name: 'home' })
}

const handleClick = async (id: string) => {
  const songs = document.value.songs.filter((song: { id: string }) => {
    song.id != id
  })
  await updateDocument({ songs })
}

const ownership = computed(() => {
  return document.value && user.value && user.value.uid == document.value.userId
})

</script>

<style scoped>

</style>