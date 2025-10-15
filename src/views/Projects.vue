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
        <div class="flex-1 w-full bg-fit flex flex-col text-center pt-20">
            <div class="w-full h-full flex flex-col">
                <ToggleSection v-for="(project, pi) in projects" :key="pi" :open="isOpen(pi)" @toggle="toggle(pi)"
                    @hover="setImage(project.image), open()" @leave="close()">
                    <template v-slot:header>
                        <h1 class="tracking-[-0.3dvw]">
                            00-{{ (pi + 1).toLocaleString('en-US', { minimumIntegerDigits: 2 }) }}
                        </h1>
                        <h1>{{ project.title }}</h1>
                    </template>
                    <template v-slot:content>
                        <div class="px-6 pb-6">
                            <div class="h-full w-full text-black overflow-hidden flex flex-col gap-6">
                                <div class="flex gap-6 flex-col md:flex-row">
                                    <img :src="project.image" :alt="project.title"
                                    class="object-cover rounded-xl border-2 border-white h-[20dvh]">
                                    <p class="rounded-xl text-justify text-white">{{ project.description }}</p>
                                </div>
                                    
                                <a :href="project.link" target="_blank"
                                    class="border-2 border-white h-[5dvh] flex justify-center rounded-xl bg-[url('/external-link.svg')] bg-[length:3dvh] bg-blend-difference animate-[bg-move_5s_linear_infinite]">
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
        background-position: 3dvh -3dvh;
    }
}
</style>