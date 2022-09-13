<template>
  <form class="bg-white" @submit.prevent="handleSubmit">
    <h4>Create new Playlist</h4>
    <input type="text" required placeholder="Playlist title" v-model="title">
    <textarea required placeholder="Playlist description" v-model="description"></textarea>
    <label class="text-xs block mt-7">Upload playlist cover image</label>
    <input class="border-0 padding-0" type="file" @change="handleChange">
    <div v-if="fileError" class="error">{{ fileError }}</div>
    <button class="mt-5">Create</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from '@vue/reactivity';
import { useStorage } from '../../composables/useStorage';

const title = ref(''),
      description = ref(''),
      file = ref(),
      fileError = ref(),
      { url, filePath, uploadImage} = useStorage()

const handleSubmit = async () => {
  if (file.value) {
    await uploadImage(file.value)
    console.log('image upload, url', url.value)

    console.log(title.value, description.value, file.value)
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