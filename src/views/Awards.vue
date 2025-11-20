<script setup>
import FramedMainSection from '@/layouts/FramedMainSection.vue';
import awards from '@/data/awards.json';
import Parallax from '@/components/Parallax.vue';
</script>

<template>
     <FramedMainSection id="awards" class="h-dvh">
        <Parallax>
        <div class="h-full w-full relative overflow-hidden rounded-4xl text-white flex justify-center items-end text-center p-4">
            <div class="absolute h-full w-full bg-[url('/awards/sky.png')] bg-cover top-0 left-0 -z-10 overflow-visible">
                <div data-parallax-value=".02" class="parallax absolute top-2/5 left-1/2 -translate-x-1/2 -translate-y-1/2 aspect-video w-[130dvw] bg-center bg-cover bg-[url('/awards/clouds.png')]"></div>
                <img src="/awards/trophy.png" alt="" data-parallax-value=".15" class="parallax w-full absolute -bottom-1/6">
            </div>
            <div class="flex flex-col md:flex-row">
                <div v-for="award in awards" class="h-fit flex-1 p-4 flex flex-col items-start cursor-default text-left">
                    <span class="font-rubik">*{{award.date}}</span>
                    <h1 class="font-rubik text-2xl">{{award.title}}</h1>
                    <p class="text-justify">{{award.description}}</p>
                </div>
            </div>
        </div>
    </Parallax>
    </FramedMainSection>
</template>
