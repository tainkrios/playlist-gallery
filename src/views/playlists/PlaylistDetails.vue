<template>
  <div class="error" v-if="error">{{ error }}</div>
  <div v-if="document"  class="grid grid-cols-3 gap-20">
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
        <p>song list here</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed }    from '@vue/reactivity';
import { useRouter } from 'vue-router';
import { getDocument } from '../../composables/getDocument';
import { getUser }     from '../../composables/getUser';
import { useDocument } from '../../composables/useDocument';

const props               = defineProps(['id']),
      router              = useRouter(),
      { error, document } = getDocument('playlists', props.id),
      { user }            = getUser(),
      { deleteDocument }  = useDocument('playlists', props.id)

const handleDelete = async () => { 
  await deleteDocument()
  router.push({name: 'createPlaylist'})
  }

const ownership = computed(() => { 
  return document.value && user.value && user.value.uid == document.value.userId
})

</script>

<style scoped>

</style>