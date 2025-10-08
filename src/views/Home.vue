<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import TextAnim from '@/components/TextAnim.vue'
import { useScrollContext } from '@/composables/useScrollContext'

const sectionRef = ref(null)
const { registerSection, unregisterSection } = useScrollContext()

onMounted(() => registerSection('home', sectionRef.value))
onBeforeUnmount(() => unregisterSection('home'))
</script>

<template>
    <section ref="sectionRef" id="home" class="window w-full h-dvh overflow-hidden p-[3dvw]">
        <div class="h-full w-full bg-fit bg-cover bg-position-[center_40%] rounded-4xl bg-[url('/placeholder.png')] flex flex-col justify-center items-center text-center">
            <div class="text-[#fff] font-rubik uppercase text-[10dvw] xl:text-[13dvh] leading-none flex flex-col justify-center items-center ">
               <p class="flex h-[8.4dvw] xl:h-[11dvh] ">Here</p>
               <p class="flex h-[8.4dvw] xl:h-[11dvh] overflow-hidden">
                   <span class="standard-text">to </span>
                   <TextAnim :texts="['Build', 'Develop', 'Impact', 'Change', 'Design']" :duration="2.5" :class="'text-[#DE2E2E]'" />
                </p>
                <p class="flex h-[8.4dvw] xl:h-[11dvh] ">the future</p>
                <p class="flex h-[8.4dvw] xl:h-[11dvh] ">one line</p>
                <p class="flex h-[8.4dvw] xl:h-[11dvh] ">at a time.</p>
            </div>
        </div>
    </section>
</template>
