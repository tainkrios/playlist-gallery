<script setup lang="ts">
import Navbar from './components/Navbar.vue';

</script>

<template>
  <Navbar />
  <div class="font-Nunito text-primary my-0 mx-auto py-0 px-5 max-w-7xl">
    <RouterView />
  </div>
</template>