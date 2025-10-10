<script setup>
import FramedMainSection from '@/layouts/FramedMainSection.vue';
import ToggleSection from '@/components/ToggleSection.vue';

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
        <div class="flex-1 w-full bg-fit flex flex-col text-center pt-18">
            <div class="w-full h-full flex flex-col">
                <ToggleSection v-for="(project, pi) in projects">
                    <template v-slot:header>
                        <h1 class="tracking-[-0.3dvw]">
                            00-{{ (pi + 1).toLocaleString('en-US', { minimumIntegerDigits: 2 }) }}
                        </h1>
                        <h1>{{ project.title }}</h1>
                    </template>
                    <template v-slot:content>
                        <div class="h-full w-full bg-white text-black rounded-2xl overflow-hidden flex">
                            <img src="/placeholder.png" alt="" class="h-full w-1/3 object-cover">
                            <div class="h-full w-full flex flex-col border-l-8 border-black text-justify">
                                <p class="p-6 flex-1">{{ project.description }}</p>
                                <a :href="project.link" target="_blank"
                                    class="flex justify-center border-t-8 h-12 bg-[url('/external-link.svg')] bg-[length:1.5rem] animate-[bg-move_3s_linear_infinite]">
                                </a>
                            </div>
                        </div>
                    </template>
                </ToggleSection>
            </div>
        </div>
    </FramedMainSection>
</template>
