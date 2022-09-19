<template>
  <div>
    <h2>My playlists</h2>
    <div v-if="documents">
      <ListView :playlists='documents'/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCollection } from '../../composables/getCollection'
import { getUser } from '../../composables/getUser'
import ListView from '../../components/ListView.vue';

const { user } = getUser()
const { documents } = getCollection(
  'playlists', 
  ['userId', '==', user.value?.uid]
)

console.log(documents)
</script>