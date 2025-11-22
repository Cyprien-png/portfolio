import { ref } from 'vue'

const imageUrl = ref(null)
const isOpen = ref(false)
const isUrl = ref(false)

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

  const setIsUrl = (value) => {
    isUrl.value = value;
  }

  return { imageUrl, isOpen, isUrl, open, close, setImage, setIsUrl }
}