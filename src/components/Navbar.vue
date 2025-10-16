<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useScrollContext } from '@/composables/useScrollContext'
import ArrowIcon from '@/icons/ArrowIcon.vue'

const { containerRef, sections, contentRef } = useScrollContext()

const currentSection = ref('home')
const isProgrammaticScroll = ref(false)

const nav = ref(null)
const indicator = ref(null)

let scrollTimeout

const selectSection = async (sectionId) => {
  currentSection.value = sectionId
  await nextTick()
  updateNav()
  updateScroll(sectionId)
}

const updateNav = () => {
  const navEl = nav.value

  const activeEl = navEl.querySelector(`[data-section="${currentSection.value}"]`)
  if (!activeEl || !indicator.value || !navEl) return

  const width = activeEl.offsetWidth
  const position = activeEl.getBoundingClientRect().left - navEl.getBoundingClientRect().left

  indicator.value.style.width = `${width}px`
  indicator.value.style.transform = `translateX(${position}px)`
}

const updateScroll = (sectionId) => {
  const section = document.getElementById(sectionId)
  const sectionY = section.getBoundingClientRect().top - contentRef.value.getBoundingClientRect().top

  isProgrammaticScroll.value = true
  containerRef.value.scrollTo({ top: sectionY, left: 0, behavior: 'smooth' })

  clearTimeout(scrollTimeout)
  scrollTimeout = setTimeout(() => {
    isProgrammaticScroll.value = false
  }, 1000)
}

const handleScroll = () => {
  if (isProgrammaticScroll.value) return
  const sectionsEls = Array.from(document.querySelectorAll('.window'))
  let current = sectionsEls[0]
  const isAtBottom =
    Math.ceil(containerRef.value.scrollTop + containerRef.value.clientHeight) >= containerRef.value.scrollHeight


  sectionsEls.forEach((section) => {
    const rect = section.getBoundingClientRect()
    const containerRect = containerRef.value.getBoundingClientRect()
    const offsetTop = rect.top - containerRect.top
    if (offsetTop <= 0 && current.getBoundingClientRect().top < section.getBoundingClientRect().top) {
      current = section
    }
  })

  const matchedSection = sections.value.find((s) => s.id === current.id)
  if (matchedSection) currentSection.value = matchedSection.id
  updateNav()
}

onMounted(() => {
  containerRef.value.addEventListener('scroll', handleScroll, { passive: true })
  containerRef.value.addEventListener('wheel', handleScroll)
  containerRef.value.addEventListener('touchmove', handleScroll, { passive: true })

  nextTick(updateNav)
})

onBeforeUnmount(() => {
  containerRef.value?.removeEventListener('scroll', handleScroll)
  containerRef.value?.removeEventListener('wheel', handleScroll)
  containerRef.value?.removeEventListener('touchmove', handleScroll)
})
</script>

<template>
  <nav ref="nav"
    class="fixed flex rounded-full top-[4dvw] z-50 bg-[#0004] outline-2 outline-[#aaa8] backdrop-blur-sm">
    <div ref="indicator" id="indicator" class="bg-white absolute inset-0 rounded-full h-full"></div>

    <a v-for="section in sections" :key="section.id"
      class="nav-element cursor-pointer px-4 py-2 h-10 relative text-white mix-blend-difference first-letter:capitalize"
      :data-section="section.id" @click="selectSection(section.id)">
      <ArrowIcon v-if="section.id == 'home'" class="translate-y-0.5 transition-all" :class="currentSection=='home'? 'rotate-90':'-rotate-90'" />
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
