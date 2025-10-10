import { ref } from 'vue'

const imageUrl = ref(null)
const isOpen = ref(false)

export function useImageAsCursor() {
  const open = () => {
    isOpen.value = true;
  }

  const close = () => {
    isOpen.value = false;
  }

  const setImage = (url) => {
    imageUrl.value = url;
  }

  return { imageUrl, isOpen, open, close, setImage }
}