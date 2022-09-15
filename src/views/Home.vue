<template>
  <div class="error" v-if="error">Could not fetch the data</div>
  <div>
    <ListView :playlists="documents" />
  </div>
</template>

<script setup lang="ts">
import { getCollection } from '../composables/getCollection';
import ListView from '../components/ListView.vue'

const { error, documents } = getCollection('playlists')


</script>

<style scoped>

</style>