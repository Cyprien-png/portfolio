<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useScrollContext } from '@/composables/useScrollContext'

const sectionRef = ref(null)
const { registerSection, unregisterSection } = useScrollContext()

onMounted(() => registerSection('about', sectionRef.value))
onBeforeUnmount(() => unregisterSection('about'))
</script>

<template>
    <section ref="sectiondRef" id="about" class="window w-full h-dvh overflow-hidden p-[3dvw]">
        <div class="h-full w-full bg-fit bg-cover bg-position-[center_40%] rounded-4xl bg-[url('/placeholder.png')] flex flex-col justify-center items-center text-center">
           
        </div>
    </section>
</template>
