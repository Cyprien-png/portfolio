<script setup>
import { onMounted, computed } from 'vue'

const props = defineProps({
  texts: {
    type: Array,
    required: true
  },
  duration: {
    type: Number,
    default: 2
  }
})

onMounted(() => {
  const container = document.querySelector('.alt-container')
  const words = container.querySelectorAll('.word')
  const letters = container.querySelectorAll('.letter')
  const stepCount = words.length - 1

  if (stepCount <= 0) return
  const stepPercentage = 100 / (stepCount * 2)

  let keyframes = `@keyframes slide-steps {\n  0% { transform: translateY(0%); }\n`

  for (let i = 0; i <= stepCount - 1; i++) {
    const startPercent = stepPercentage + stepPercentage * i * 2
    const endPercent = (stepPercentage + stepPercentage * i) * 2
    const position = (i + 1) * -100
    keyframes += `${startPercent}% { transform: translateY(${position}%); }\n`
    keyframes += `${endPercent}% { transform: translateY(${position}%); }\n`
  }

  keyframes += `}`

  const style = document.createElement('style')
  style.textContent = keyframes
  document.head.appendChild(style)

  const duration = `${stepCount * props.duration}s`

  letters.forEach((l) => {
    l.style.animationDuration = duration
  })
})

const splitTexts = computed(() => {
  return [...props.texts, props.texts[0]].map(text => text.split(''))
})
</script>

<template>
    <div class="alt-container ">
      <p
        v-for="(letters, wi) in splitTexts"
        :key="wi"
        class="word flex"
      >
        <span
          v-for="(letter, li) in letters"
          :key="li"
          class="letter"
          :style="{ '--i': li }"
        >
          {{ letter }}
        </span>
      </p>
    </div>
</template>

<style scoped>
.alt-container .word .letter {
  animation: slide-steps cubic-bezier(0.25, 0.1, 0.25, 1.4) infinite;
  animation-delay: calc(var(--i)*100ms);
}
</style>
