<template>
  <form class="bg-white" @submit.prevent="handleSubmit">
    <h4>Create new Playlist</h4>
    <input type="text" required placeholder="Playlist title" v-model="title">
    <textarea required placeholder="Playlist description" v-model="description"></textarea>
    <label class="text-xs block mt-7">Upload playlist cover image</label>
    <input class="border-0 padding-0" type="file" @change="handleChange">
    <div v-if="fileError" class="error">{{ fileError }}</div>
    <button v-if="!isPending" class="mt-5">Create</button>
    <button v-else="isPending" disabled class="mt-5">Saving...</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from '@vue/reactivity';
import { useStorage } from '../../composables/useStorage';
import { useCollection } from '../../composables/useCollection';
import { getUser } from '../../composables/getUser';
import { timestamp } from '../../firebase/config';

const title = ref(''),
      description = ref(''),
      file = ref(),
      fileError = ref(),
      { url, filePath, uploadImage} = useStorage(),
      { error, docRef } = useCollection('playlists'),
      { user } = getUser(),
      isPending = ref(false)

const handleSubmit = async () => {
  if (file.value) {
    isPending.value = true
    await uploadImage(file.value)
    await docRef({
      title: title.value,
      description: description.value,
      userId: user.value?.uid,
      userName: user.value?.displayName,
      coverUrl: url.value,
      filePath: filePath.value,
      songs: [],
      createdAt: timestamp
    })
    isPending.value = false
    if (!error.value) {
      console.log('playlist added')
    }
    
  }
}

const types = ['image/png', 'image/jpeg']

const handleChange = (e: Event) => {
  if (e.target) {
    const selected = e.target.files[0]
    if (selected && types.includes(selected.type)) {
      file.value = selected
      fileError.value = null
    } else {
      file.value = null
      fileError.value = 'Please select an image file (png or jpeg)'
    }
  }
}

</script>