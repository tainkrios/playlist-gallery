<template>
  <div>
    <h2>My playlists</h2>
  </div>
</template>

<script setup lang="ts">
import { getCollection } from '../../composables/getCollection'
import { getUser } from '../../composables/getUser'

const { user } = getUser()
const { documents } = getCollection(
  'playlists', ['userId', '==', (user.value?.uid as string)]
)

console.log(documents)
</script>