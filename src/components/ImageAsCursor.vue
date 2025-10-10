<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useImageAsCursor } from '@/composables/useImageAsCursor'

const { imageUrl, isOpen } = useImageAsCursor()

// reactive cursor position
const x = ref(0)
const y = ref(0)

// smooth interpolation
let targetX = 0
let targetY = 0
let rafId = null

const updatePosition = (e) => {
  targetX = e.clientX
  targetY = e.clientY
}

const animate = () => {
  // smooth easing (adjust 0.1 for faster/slower follow)
  x.value += (targetX - x.value) * 0.1
  y.value += (targetY - y.value) * 0.1

  rafId = requestAnimationFrame(animate)
}

onMounted(() => {
  window.addEventListener('mousemove', updatePosition)
  animate()
})

onUnmounted(() => {
  window.removeEventListener('mousemove', updatePosition)
  cancelAnimationFrame(rafId)
})
</script>

<template>
  <div
    class="aspect-[16/9] absolute z-40 -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full overflow-hidden transition-all duration-75"
    :class="isOpen ? 'w-1/6' : 'w-0'"
    :style="{ left: `${x}px`, top: `${y}px` }"
  >
    <img :src="imageUrl" alt="" class="w-full h-full object-cover" />
  </div>
</template>
