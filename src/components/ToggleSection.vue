<script setup>
import ArrowIcon from '@/icons/ArrowIcon.vue'

const props = defineProps({
  open: { type: Boolean, default: false }
})

const emit = defineEmits(['toggle', 'hover', 'leave'])

</script>

<template>
  <div
    class="flex-none group relative p-4 w-full items-center font-rubik cursor-pointer text-[2dvw] bg-white overflow-hidden transition-all"
    @click="emit('toggle')"
    @mouseover="emit('hover')"
    @mouseleave="emit('leave')">
    <!-- black overlay -->
    <div
      class="absolute inset-0 bg-black pointer-events-none group-hover:translate-y-0 transition-transform duration-500"
      :class="props.open ? 'translate-y-0' : 'translate-y-[98%]'">
    </div>

    <!-- content -->
    <div class="relative z-10 w-full h-full grid grid-cols-3 items-center text-white mix-blend-difference">
      <slot name="header"></slot>
      <div class="h-full flex justify-center items-center">
        <ArrowIcon class="h-[2dvw] block transition-all" :class="props.open ? 'rotate-90' : 'rotate-0'" />
      </div>
    </div>
  </div>

  <div class="w-full overflow-hidden bg-black text-white"
    :class="props.open ? 'h-full p-6 transition-none' : 'h-0 transition-none'">
    <slot name="content"></slot>
  </div>
</template>

<style>
@keyframes bg-move {
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: 1.5rem -1.5rem;
  }
}
</style>
