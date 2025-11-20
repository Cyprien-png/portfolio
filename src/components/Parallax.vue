<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { AnimatedComponent } from '@/services/AnimatedComponent'

const rootRef = ref()
const isEnabled = ref(false);
const component = ref();
const parallaxItems = ref([])

const onEnter = () => isEnabled.value = true;
const onLeave = () => isEnabled.value = false;

const updatePosition = (e) => {
  const rootRect = rootRef.value.getBoundingClientRect();
  const relativeCursorX = rootRect.width / 2 + rootRect.left
  const relativeCursorY = rootRect.height / 2 + rootRect.top

  if (!isEnabled.value) return
  parallaxItems.value.forEach(el => {
    const multiplicator = el.dataset.parallaxValue;
    const x = (relativeCursorX - e.screenX) * multiplicator;
    const y = (relativeCursorY - e.screenY) * multiplicator;

    el.style.transform = `translateX(${x}px) translateY(${y}px)`
  })
}

onMounted(() => {
  parallaxItems.value = Array.from(rootRef.value.getElementsByClassName("parallax")) ;
  component.value = new AnimatedComponent(rootRef.value);
  component.value.tick = updatePosition;
  component.value.addAnimationTrigger(window, "mousemove");
})
</script>

<template>
  <div ref="rootRef" class="parallax-wrapper h-full w-full" @pointerenter="onEnter" @pointerleave="onLeave">
    <slot></slot>
  </div>
</template>

