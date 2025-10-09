<script setup>
import Navbar from './components/Navbar.vue';
import Home from './views/Home.vue'
import AboutMe from './views/AboutMe.vue';
import Projects from './views/Projects.vue';
import { provideScrollContext } from '@/composables/useScrollContext'

const { containerRef, contentRef } = provideScrollContext()
</script>

<template>
  <div ref="containerRef" id="container" class="overflow-auto h-dvh">
    <Navbar />
    <div ref="contentRef" id="content" class="w-full flex flex-col">
      <Home />
      <AboutMe />
      <Projects />
    </div>
  </div>
</template>

<style scoped></style>
