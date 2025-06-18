<script setup>
import Background from './components/Background.vue';
import Navbar from './components/Navbar.vue';
import Cursor from './components/Cursor.vue';
import Scrollbar from './components/Scrollbar.vue';
import AnimatedBanner from './components/AnimatedBanner.vue';
</script>

<template>
  <div class="h-dvh w-dvw relative text-white font-custom-code flex justify-center items-center overflow-hidden">
    <div id="cursor-container">
      <Cursor />
    </div>
    <Background class="h-dvh w-dvw absolute inset-0 -z-10" />

    <div class="w-screen h-dvh flex flex-col overflow-auto no-scrollbar scroll-smooth">
      <div id="scrollable-screen" class="flex-1 flex flex-col border-[1rem] border-white">
        <Scrollbar />
        <Navbar />

        <div class="flex-1 overflow-hidden">
          <AnimatedBanner :isReverse="true">
            Welcome on my portfolio!
          </AnimatedBanner>
          <h1
            class="flex flex-col opacity-0 uppercase font-custom-anton font-extrabold text-center my-4 text-[8dvw] highlight animate-slides-from-top">
            Full Stack Developer
          </h1>
          <AnimatedBanner>
            This website is currently under development, don't hesitate to write to me with any suggestions.
          </AnimatedBanner>
        </div>
      </div>
    </div>
  </div>
</template>
