import { ref } from 'vue'

const screenWidth = ref(0);

export function useWindowContext() {

  const resetWidth = () => {
    screenWidth.value = window.innerWidth;
  }

  const lg = () => {
    return window.innerWidth >= 768;
  }

  return { resetWidth, lg };
}
