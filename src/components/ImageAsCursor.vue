<script setup>
import { ref, onMounted, onUnmounted, defineProps } from 'vue'
import { useImageAsCursor } from '@/composables/useImageAsCursor'
import { AnimatedComponent } from '@/services/AnimatedComponent'

const props = defineProps({
    contentSection: {
        type: HTMLElement,
        required: true
    }
})

const { imageUrl, isOpen } = useImageAsCursor();
const component = ref();
const loopComponent = ref();
const x = ref(window.innerWidth / 2);
const y = ref(window.innerHeight / 2);
const imagePositions = ref({x: x.value, y: y.value});

const updatePosition = (e) => {
  imagePositions.value.x = e.clientX;
  imagePositions.value.y = e.clientY;
}

const shouldMove = (position, targetPosition) => {
  return Math.round(position.value * 100) / 100 != targetPosition && !!isOpen.value
}

const animatePos = (currentPos, newPos) => {
  if (!shouldMove(currentPos.value, newPos)) return;
  currentPos.value += (newPos - currentPos.value) * 0.2;
}

const animate = () => {
  animatePos(x, imagePositions.value.x);
  animatePos(y, imagePositions.value.y);
}

onMounted(() => {
  component.value = new AnimatedComponent(props.contentSection);
  component.value.tick = updatePosition;
  component.value.addAnimationTrigger(window, "mousemove");

  loopComponent.value = new AnimatedComponent(props.contentSection);
  loopComponent.value.tick = animate;
  loopComponent.value.autoAnimate();
})
</script>

<template>
  <div
    class="aspect-video absolute shadow-[#0003] shadow-lg z-40 -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full overflow-hidden transition-all duration-75"
    :class="isOpen ? 'w-[30dvh]' : 'w-0'" :style="`left: ${x}px; top: ${y}px`">
    <img :src="imageUrl" alt="" class="w-full h-full object-cover bg-white" />
  </div>
</template>
