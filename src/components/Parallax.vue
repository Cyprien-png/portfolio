<script setup>
import { ref, onMounted } from 'vue'
import { AnimatedComponent } from '@/services/AnimatedComponent'
import { useCursorContext } from '@/composables/useCursorContext';

const { getPositions } = useCursorContext();

const rootRef = ref();
const component = ref();
const parallaxItems = ref([]);
const autoAnimDegree = ref(0);

const updatePosition = () => {
  let cur = getPositions();

  if (window.innerWidth < 768) {
    autoAnimDegree.value = (autoAnimDegree.value + 0.005)%360;
    const hyp = 300;

    cur.x = hyp * Math.cos(autoAnimDegree.value * 1.5)
    cur.y = hyp * Math.sin(autoAnimDegree.value)    
  };

  const rootRect = rootRef.value.getBoundingClientRect();
  const relativeCursorX = rootRect.width / 2 + rootRect.left;
  const relativeCursorY = rootRect.height / 2 + rootRect.top;

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
  component.value.autoAnimate();
})
</script>

<template>
  <div ref="rootRef" class="parallax-wrapper h-full w-full">
    <slot></slot>
  </div>
</template>

