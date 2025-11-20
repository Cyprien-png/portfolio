<script setup>
import { ref, onMounted, defineProps } from 'vue'
import { useImageAsCursor } from '@/composables/useImageAsCursor'
import { AnimatedComponent } from '@/services/AnimatedComponent'
import { useCursorContext } from '@/composables/useCursorContext'
import { useScrollContext } from '@/composables/useScrollContext'

const props = defineProps({
    contentSection: {
        type: HTMLElement,
        required: true
    }
})

const { getPositions } = useCursorContext();
const { imageUrl, isOpen } = useImageAsCursor();
const component = ref();
const loopComponent = ref();
const x = ref(window.innerWidth / 2);
const y = ref(window.innerHeight / 2);
const imagePositions = ref({x: x.value, y: y.value});

const updatePosition = (e) => {
  const cur = getPositions();
  imagePositions.value.x = cur.x;
  imagePositions.value.y = cur.y;
}

const shouldMove = (position, targetPosition) => {
  return Math.round(position.value * 100) / 100 != targetPosition;
}

const animatePos = (currentPos, newPos) => {
  if (!shouldMove(currentPos.value, newPos)) return;
  currentPos.value += (newPos - currentPos.value) * .08;
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
    class="aspect-video absolute shadow-[#0003] shadow-lg z-40 -translate-x-1/2 -translate-y-full pointer-events-none rounded-full overflow-hidden ease-linear transition-all duration-75"
    :class="isOpen ? 'w-[30dvh]' : 'w-0'" :style="`left: ${x}px; top: ${y}px`">
    <img :src="imageUrl" alt="" class="w-full h-full object-cover bg-white" />
  </div>
</template>
