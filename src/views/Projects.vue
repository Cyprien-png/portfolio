<script setup>
import { ref, onMounted } from 'vue';
import FramedMainSection from '@/layouts/FramedMainSection.vue';
import ToggleSection from '@/components/ToggleSection.vue';
import { useSingleToggle } from '@/composables/useSingleToggle.js'
import ImageAsCursor from '@/components/ImageAsCursor.vue';
import { useImageAsCursor } from '@/composables/useImageAsCursor'
import projects from '@/data/projects.json'
import CustomA from '@/components/CustomA.vue';

const { setImage, setIsUrl, setIsOpen, setIsSmall } = useImageAsCursor()
const { isOpen, toggle, openIndex } = useSingleToggle()
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
                    @hover="setImage(project.background), setIsOpen(true), openIndex == pi ? setIsSmall(true) : setIsSmall(false)" @leave="setIsOpen(false), setIsSmall(false)">
                    <template v-slot:header>
                        <img :src="project.background" class="absolute h-full w-full top-0 left-0 -z-20 brightness-50 object-cover"/>
                        <h1 class="tracking-[-0.3dvw] hidden md:flex">
                            00-{{ (pi + 1).toLocaleString('en-US', { minimumIntegerDigits: 2 }) }}
                        </h1>
                        <h1>{{ project.title }}</h1>
                    </template>
                    <template v-slot:content>

                        <div class="px-6 pb-6">
                            <div
                                class="relative w-full text-black overflow-hidden flex flex-col items-start gap-6 h-fit">
                                <div class="gap-4 flex items-center">

                                    <img :src="project.desktop_pic" class="h-52 object-contain"/>
                                    <p class="z-20 min-h-full w-full text-white p-4 text-left">{{ project.description }}</p>
                                    <img :src="project.mobile_pic" class="h-52 aspect-[9/16]"/>
                                </div>
                                <a @mouseenter="setIsUrl(true)" @mouseleave="setIsUrl(false)" :href="project.link" class="relative w-full flex bg-center bg-cover bg-white" target="_blank">
                                    <CustomA text="View more" :href="project.link" target="_blank" class="z-10 h-full w-full p-4"/>
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