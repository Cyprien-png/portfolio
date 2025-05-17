<script setup>
import Background from './components/Background.vue';
import Navbar from './components/Navbar.vue';
import Cursor from './components/Cursor.vue';
</script>

<template>
  <div class="h-dvh w-dvw relative text-white font-custom-code flex justify-center items-center overflow-hidden">
    <div id="cursor-container">
      <Cursor />
    </div>
    <Background class="h-dvh w-dvw absolute inset-0 -z-10" />

    <div class="w-full min-h-full flex flex-col border-[1rem] border-white">
      <Navbar />
    </div>
  </div>
</template>
