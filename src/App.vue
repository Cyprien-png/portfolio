<script setup>
import Navbar from '@/components/Navbar.vue';
import Home from '@/views/Home.vue'
import AboutMe from '@/views/AboutMe.vue';
import Projects from '@/views/Projects.vue';
import Awards from '@/views/Awards.vue';
import Testimonials from './views/Testimonials.vue';
import Contact from './views/Contact.vue';
import { provideScrollContext } from '@/composables/useScrollContext'

const { containerRef, contentRef } = provideScrollContext()
</script>

<template>
  <div ref="containerRef" id="container" class="overflow-auto h-dvh font-cantarell">
    <Navbar />
    <div ref="contentRef" id="content" class="w-full flex flex-col">
      <Home />
      <AboutMe />
      <Projects />
      <Awards />
      <Testimonials />
      <Contact />
    </div>
  </div>
</template>

<style scoped></style>
