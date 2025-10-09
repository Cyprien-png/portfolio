<script setup>
import FramedMainSection from '@/layouts/FramedMainSection.vue';
import ArrowIcon from '@/icons/ArrowIcon.vue';

const projects = [
    {
        title: "Game Engine",
        description: "A lightweight, modular TypeScript game engine designed for modern browsers. Only 50kb when minified, but packed with powerful features for creating impressive 2D and 3D games.",
        link: "https://sprunk-engine.com/"
    },
    {
        title: "Portfolio",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        link: "#"
    },
    {
        title: "Find your tribe",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        link: "#"
    },
    {
        title: "Flappy Bot",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        link: "#"
    },
    {
        title: "SeaCracker",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        link: "#"
    }
]
</script>

<template>
    <FramedMainSection id="projects" :class="'min-h-[100dvh] flex h-auto'">
        <div class="flex-1 w-full bg-fit flex flex-col text-center pt-12">
            <div class="w-full h-full flex flex-col">
                <div v-for="(project, pi) in projects"
                    class="group relative h-full w-full flex-1 items-center font-rubik cursor-pointer text-[2dvw] bg-white overflow-hidden transition-all">
                    <!-- black overlay -->
                    <div
                        class="absolute inset-0 bg-black translate-y-[90%] group-hover:translate-y-0 transition-transform duration-500">
                    </div>

                    <!-- content -->
                    <div
                        class="relative z-10 w-full h-full grid grid-cols-3 items-center text-white mix-blend-difference">
                        <h1 class="tracking-[-0.3dvw]">
                            00-{{ (pi + 1).toLocaleString('en-US', { minimumIntegerDigits: 2 }) }}
                        </h1>
                        <h1>{{ project.title }}</h1>
                        <div class="h-full flex justify-center items-center">
                            <ArrowIcon class="h-[3dvw] block" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </FramedMainSection>
</template>
