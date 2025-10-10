<script setup>
import FramedMainSection from '@/layouts/FramedMainSection.vue';
import ToggleSection from '@/components/ToggleSection.vue';
import { useSingleToggle } from '@/composables/useSingleToggle.js'
import ImageAsCursor from '@/components/ImageAsCursor.vue';
import { useImageAsCursor } from '@/composables/useImageAsCursor'
import projects from '@/data/projects.json'

const { setImage, open, close } = useImageAsCursor()
const { isOpen, toggle } = useSingleToggle()
</script>

<template>
    <ImageAsCursor />
    <FramedMainSection id="projects" :class="'min-h-[100dvh] flex h-auto'">
        <div class="flex-1 w-full bg-fit flex flex-col text-center pt-18">
            <div class="w-full h-full flex flex-col">
                <ToggleSection v-for="(project, pi) in projects" :key="pi" :open="isOpen(pi)" @toggle="toggle(pi)" @hover="setImage(project.image), open()" @leave="close()">
                    <template v-slot:header>
                        <h1 class="tracking-[-0.3dvw]">
                            00-{{ (pi + 1).toLocaleString('en-US', { minimumIntegerDigits: 2 }) }}
                        </h1>
                        <h1>{{ project.title }}</h1>
                    </template>
                    <template v-slot:content>
                        <div class="h-full w-full bg-white text-black rounded-2xl overflow-hidden flex">
                            <img :src="project.image" alt="" class="h-full w-1/3 object-cover">
                            <div class="h-full w-full flex flex-col border-l-8 border-black text-justify">
                                <p class="p-6 flex-1">{{ project.description }}</p>
                                <a :href="project.link" target="_blank"
                                    class="flex justify-center border-t-8 h-12 bg-[url('/external-link.svg')] bg-[length:1.5rem] bg-blend-difference animate-[bg-move_3s_linear_infinite]">
                                </a>
                            </div>
                        </div>
                    </template>
                </ToggleSection>
            </div>
        </div>
    </FramedMainSection>
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