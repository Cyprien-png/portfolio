<script setup>
import Background from './components/Background.vue';
</script>

<template>
  <section
    class="h-dvh w-dvw relative text-white font-custom-code flex justify-center items-center overflow-hidden">
    <Background class="h-dvh w-dvw absolute inset-0 -z-10" />
    <div class="flex flex-col p-8 text-justify">
      <h1 class="text-3xl uppercase">H3ll0 th3r3!</h1>
      <span>
        I'm currently developing this portfolio
        <a href="https://github.com/Cyprien-png/portfolio" class="underline">(feel free to read the code).</a>
      </span>
      <span>Check back soon for updates!</span>
      <span class="pt-4">Cyprien Jaquier.</span>
    </div>
  </section>
</template>
