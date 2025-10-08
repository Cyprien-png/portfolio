import { ref, provide, inject, onMounted, onBeforeUnmount } from 'vue'

const key = Symbol('scrollContext')

export function provideScrollContext() {
  const containerRef = ref(null)
  const contentRef = ref(null)
  const sections = ref([])

  const registerSection = (id, el) => {
    if (!sections.value.find(s => s.id === id)) {
      sections.value.push({ id, el })
    }
  }

  const unregisterSection = (id) => {
    sections.value = sections.value.filter(s => s.id !== id)
  }

  provide(key, {
    containerRef,
    contentRef,
    sections,
    registerSection,
    unregisterSection,
  })

  return { containerRef, contentRef, sections }
}

export function useScrollContext() {
  return inject(key, {
    containerRef: ref(null),
    contentRef: ref(null),
    sections: ref([]),
    registerSection: () => {},
    unregisterSection: () => {},
  })
}
