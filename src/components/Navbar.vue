<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import { useScrollContext } from '@/composables/useScrollContext'
import ArrowIcon from '@/icons/ArrowIcon.vue'
import { AnimatedComponent } from '@/services/AnimatedComponent'

const { containerRef, sections, contentRef, getSectionById } = useScrollContext();

const component = ref()
const currentSection = ref('home');
const isProgrammaticScroll = ref(false);
const nav = ref();
const indicator = ref();
const linkRefs = ref(new Map())
let scrollTimeout;

const setLinkRef = (id, el) => {
  linkRefs.value.set(id, el)
}

const selectSection = async (sectionId) => {
  currentSection.value = sectionId;
  moveIndicator();
  scroll(sectionId);
}

const moveIndicator = () => {
  const activeEl = linkRefs.value.get(currentSection.value);
  if (!activeEl || !indicator.value || !nav.value) return;

  const width = activeEl.offsetWidth;
  const position = activeEl.getBoundingClientRect().left - nav.value.getBoundingClientRect().left;

  indicator.value.style.width = `${width}px`;
  indicator.value.style.transform = `translateX(${position}px)`;
}

const scroll = (sectionId) => {
  isProgrammaticScroll.value = true;
  const section = getSectionById(sectionId);
  const sectionY = section.value.getBoundingClientRect().top - contentRef.value.getBoundingClientRect().top;

  clearTimeout(scrollTimeout)
  containerRef.value.scrollTo({ top: sectionY, behavior: 'smooth' });
  scrollTimeout = setTimeout(() => {
    isProgrammaticScroll.value = false
  }, 1000);
}


const handleScroll = () => {
  if (isProgrammaticScroll.value) return;
  let current = sections.value[0].el;
  const isAtBottom = Math.ceil(containerRef.value.scrollTop + containerRef.value.clientHeight) >= containerRef.value.scrollHeight

  if (isAtBottom) {
    current = sections.value[sections.value.length - 1].el
  } else {

    sections.value.forEach((s) => {
      const sectionPos = s.el.getBoundingClientRect().top;
      const isBelowCurrent = sectionPos - containerRef.value.getBoundingClientRect().top <= 0;
      const isAboveCurrent = current.getBoundingClientRect().top < sectionPos

      if (isBelowCurrent && isAboveCurrent) current = s.el;
    })
  }

  currentSection.value = current.id;
}

onMounted(() => {
  component.value = new AnimatedComponent();
  component.value.tick = moveIndicator;
  component.value.prepareForAnimations = handleScroll
  component.value.addAnimationTrigger(containerRef.value, "scroll");
  component.value.addAnimationTrigger(containerRef.value, "wheel");
  component.value.addAnimationTrigger(containerRef.value, "touchmove");

  watch(
    () => sections.value.length,
    async (len) => {
      if (len > 0) {
        await nextTick();
        moveIndicator();
      }
    },
    { immediate: true }
  );
})

onBeforeUnmount(() => {
  component.value.removeAnimationTriggers();
})
</script>

<template>
  <nav ref="nav" class="fixed flex rounded-full top-[4dvw] z-50 bg-[#0004] outline-2 outline-[#aaa8] backdrop-blur-sm">
    <div ref="indicator" id="indicator" class="bg-white absolute inset-0 rounded-full h-full"></div>

    <a v-for="section in sections" :key="section.id" :ref="el => setLinkRef(section.id, el)"
      class="nav-element cursor-pointer px-4 py-2 h-10 relative text-white mix-blend-difference first-letter:capitalize"
      :data-section="section.id" @click="selectSection(section.id)">
      <ArrowIcon v-if="section.id == 'home'" class="translate-y-0.5 transition-all"
        :class="currentSection == 'home' ? 'rotate-90' : '-rotate-90'" />
      <span v-else>{{ section.id.replace('-', ' ') }}</span>
    </a>
  </nav>
</template>

<style scoped>
#indicator {
  transition:
    transform .2s ease-out,
    width .2s ease-out;
}
</style>
