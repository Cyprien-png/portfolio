<script setup>
import { ref, onMounted } from 'vue';
import FramedMainSection from '@/layouts/FramedMainSection.vue';
import ToggleSection from '@/components/ToggleSection.vue';
import { useSingleToggle } from '@/composables/useSingleToggle.js'
import ImageAsCursor from '@/components/ImageAsCursor.vue';
import { useImageAsCursor } from '@/composables/useImageAsCursor'
import ExternalLinkIcon from '@/icons/ExternalLinkIcon.vue';
import projects from '@/data/projects.json'

const { setImage, open, close } = useImageAsCursor()
const { isOpen, toggle } = useSingleToggle()
const frameRef = ref()
const containerRef = ref();

onMounted(() => {
    containerRef.value = frameRef.value.sectionRef;
})
</script>

<template>
    <ImageAsCursor v-if="containerRef" :contentSection="containerRef" />
    <FramedMainSection ref="frameRef" id="projects" :class="'min-h-[100dvh] flex h-auto'">
        <div class="flex-1 w-full bg-fit flex flex-col text-center pt-20">
            <div class="w-full h-full flex flex-col">
                <ToggleSection v-for="(project, pi) in projects" :key="pi" :open="isOpen(pi)" @toggle="toggle(pi)"
                    @hover="setImage(project.image), open()" @leave="close()">
                    <template v-slot:header>
                        <img :src="project.image" class="absolute h-full w-full top-0 left-0 -z-20 brightness-50 object-cover"/>
                        <h1 class="tracking-[-0.3dvw] hidden md:flex">
                            00-{{ (pi + 1).toLocaleString('en-US', { minimumIntegerDigits: 2 }) }}
                        </h1>
                        <h1>{{ project.title }}</h1>
                    </template>
                    <template v-slot:content>

                        <div class="px-6 pb-6">
                            <div
                                class="relative w-full text-black overflow-hidden flex flex-col items-start gap-6 h-fit">
                                <p class="z-20 min-h-[24dvh] w-full text-white p-4 text-justify">{{ project.description
                                    }}</p>
                                <a :href="project.link" class="group relative w-full flex p-4 bg-center bg-neutral-800 text-white" target="_blank">
                                    <span class="z-30 flex gap-1 mix-blend-difference">
                                        View more
                                        <ExternalLinkIcon class="p-1" />
                                    </span>
                                    <img :src="project.image" class="left-0 -translate-x-full ease-in duration-200 group-hover:-translate-x-0 transition-all absolute object-cover w-full h-full top-1/2 -translate-y-1/2"/>
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