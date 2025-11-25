import { ref } from 'vue'

const imageUrl = ref(null);
const isOpen = ref(false);
const isUrl = ref(false);
const isSmall = ref(false);

export function useImageAsCursor() {
  const setIsOpen = (value) => {
    isOpen.value = value;
  }

  const setIsSmall = (value) => {
    isSmall.value = value;
  }

  const setImage = (url) => {
    imageUrl.value = url;
  }

  const setIsUrl = (value) => {
    isUrl.value = value;
  }

  return { imageUrl, isOpen, isUrl, isSmall, setIsOpen, setImage, setIsUrl, setIsSmall }
}