<script setup>
import LiquidNavbar from '@/components/LiquidNavbar.vue';
import LiquidFilter from '@/filter/LiquidFilter.vue';
import LiquidTexturedFilter from '@/filter/LiquidTexturedFilter.vue';
import Home from '@/views/Home.vue';
import AboutMe from '@/views/AboutMe.vue';
import AboutMeMobile from '@/views/AboutMeMobile.vue';
import Projects from '@/views/Projects.vue';
import Awards from '@/views/Awards.vue';
import Testimonials from '@/views/Testimonials.vue';
import TestimonialsMobile from '@/views/TestimonialsMobile.vue';
import Contact from '@/views/Contact.vue';
import { provideScrollContext } from '@/composables/useScrollContext';
import { useCursorContext } from '@/composables/useCursorContext';
import { useWindowContext } from '@/composables/useWindowContext';
import { ref, onMounted } from 'vue';
import { AnimatedComponent } from '@/services/AnimatedComponent';

const { containerRef, contentRef } = provideScrollContext();
const { setPositions } = useCursorContext();
const { resetWidth, lg } = useWindowContext();

const component = ref();
const windowComponent = ref();

const setCursorPos = (e) => {
  if (e instanceof MouseEvent) setPositions(e.screenX, e.screenY);
}

onMounted(() => {
  component.value = new AnimatedComponent();
  component.value.tick = setCursorPos;
  component.value.addAnimationTrigger(window, "mousemove");

  windowComponent.value = new AnimatedComponent();
  windowComponent.value.tick = resetWidth;
  windowComponent.value.addAnimationTrigger(window, "resize");
})
</script>

<template>
  <LiquidFilter />
  <LiquidTexturedFilter />
  <div ref="containerRef" id="container" class="overflow-auto h-dvh flex flex-col items-center font-ledger">
    <LiquidNavbar />
    <div ref="contentRef" id="content" class="relative w-full flex flex-col">
      <Home />
      <AboutMe v-if="lg()"/>
      <AboutMeMobile v-else />
      <Projects />
      <Awards />
      <Testimonials v-if="lg()" />
      <TestimonialsMobile v-else  />
      <Contact />
      <span class="absolute bottom-0 text-sm p-[4dvw] opacity-35 text-white">© {{ new Date().getFullYear() }} Cyprien Jaquier. All rights reserved.</span>
    </div>
  </div>
</template>

<style scoped></style>
