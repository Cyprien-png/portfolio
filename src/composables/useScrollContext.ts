import { ref, provide, inject, computed, onMounted, onBeforeUnmount } from 'vue'

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

  const getSectionById = (id) => computed(() => {
    const section = sections.value.find(s => s.id === id)
    return section ? section.el : null
  })

  const scroll = (section) => {
    const sectionY = section.getBoundingClientRect().top - contentRef.value.getBoundingClientRect().top;
    containerRef.value.scrollTo({ top: sectionY, behavior: 'smooth' });
  }

  provide(key, {
    containerRef,
    contentRef,
    sections,
    getSectionById,
    scroll,
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
    getSectionById: () => { },
    scroll: () => { },
    registerSection: () => { },
    unregisterSection: () => { },
  })
}
