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

    <div class="w-screen h-screen flex flex-col border-x-[1rem] border-white overflow-auto no-scrollbar">
      <div id="scrollable-screen" class="flex-1 flex flex-col">
        <Scrollbar />
        <Navbar class="border-t-[1rem] border-white" />

        <div class="px-12 lg:px-24 flex-1 border-b-[1rem] border-white">
          <AnimatedBanner :isReverse="true">
            Welcome on my portfolio!
          </AnimatedBanner>
          <h1
            class="flex flex-col uppercase font-custom-anton font-extrabold text-center mb-4 mt-12 text-[8dvw] highlight animate-slides-from-top">
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
