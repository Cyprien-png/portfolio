<script setup>
import { ref, onMounted } from 'vue'
import { AnimatedComponent } from '@/services/AnimatedComponent'
import { useScrollContext } from '@/composables/useScrollContext';
import { useCursorContext } from '@/composables/useCursorContext';

const { containerRef} = useScrollContext();
const { getPositions } = useCursorContext();

const rootRef = ref();
const component = ref();
const parallaxItems = ref([]);

const updatePosition = () => {
  const rootRect = rootRef.value.getBoundingClientRect();
  const relativeCursorX = rootRect.width / 2 + rootRect.left;
  const relativeCursorY = rootRect.height / 2 + rootRect.top;
  const cur = getPositions();

  parallaxItems.value.forEach(el => {
    const multiplicator = el.dataset.parallaxValue;
    const x = (relativeCursorX - cur.x) * multiplicator;
    const y = (relativeCursorY - cur.y) * multiplicator;

    el.style.transform = `translateX(${x}px) translateY(${y}px)`;
  })
}

onMounted(() => {
  parallaxItems.value = Array.from(rootRef.value.getElementsByClassName("parallax")) ;
  component.value = new AnimatedComponent(rootRef.value);
  component.value.tick = updatePosition;
  component.value.addAnimationTrigger(window, "mousemove");
  component.value.addAnimationTrigger(containerRef.value, "scroll");
})
</script>

<template>
  <div ref="rootRef" class="parallax-wrapper h-full w-full">
    <slot></slot>
  </div>
</template>

