import { ref } from 'vue'

const openIndex = ref(null)

export function useSingleToggle() {
  const isOpen = (index) => openIndex.value === index

  const toggle = (index) => {
    openIndex.value = openIndex.value === index ? null : index
  }

  return { openIndex, isOpen, toggle }
}