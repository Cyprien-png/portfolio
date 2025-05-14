<script setup>
import { onMounted } from 'vue'
import particlesConfig from '../assets/particles.config.json';

onMounted(() => {
  const particlesScript = document.createElement('script')
  particlesScript.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js'
  particlesScript.onload = initializeParticles
  document.head.appendChild(particlesScript)

  const statsScript = document.createElement('script')
  statsScript.src = 'https://threejs.org/examples/js/libs/stats.min.js'
  document.head.appendChild(statsScript)
})

const initializeParticles = () => {particlesJS("particles-js", particlesConfig)};
</script>

<template>
  <div id="particles-js" class="h-full overflow-hidden"></div>
</template>
