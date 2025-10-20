<script setup>
import Navbar from '@/components/Navbar.vue';
import Home from '@/views/Home.vue'
import AboutMe from '@/views/AboutMe.vue';
import AboutMeMobile from './views/AboutMeMobile.vue';
import Projects from '@/views/Projects.vue';
import Awards from '@/views/Awards.vue';
import Testimonials from './views/Testimonials.vue';
import TestimonialsMobile from './views/TestimonialsMobile.vue';
import Contact from './views/Contact.vue';
import { provideScrollContext } from '@/composables/useScrollContext'
import { md } from '@/utils/deviceSize'

const { containerRef, contentRef } = provideScrollContext()
</script>

<template>
  <div ref="containerRef" id="container" class="overflow-auto h-dvh flex flex-col items-center font-cantarell">
    <Navbar />
    <div ref="contentRef" id="content" class="w-full flex flex-col">
      <Home />
      <AboutMe v-if="md()"/>
      <AboutMeMobile v-else />
      <Projects />
      <Awards />
      <Testimonials v-if="md()" />
      <TestimonialsMobile v-else />
      <Contact />
    </div>
  </div>
</template>

<style scoped></style>
