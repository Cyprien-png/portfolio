<script setup>
import FramedMainSection from '@/layouts/FramedMainSection.vue';
import awards from '@/data/awards.json'

import Parallax from '@/components/Parallax.vue';
</script>

<template>
     <FramedMainSection id="awards" class="h-dvh">
        <Parallax>
        <div class="h-full w-full rounded-4xl bg-yellow-950 text-white flex justify-center items-end text-center p-4">
            <div class="flex flex-col md:flex-row">
                <div v-for="award in awards" data-parallax-value=".1" class="parallax h-fit flex-1 p-4 flex flex-col items-start cursor-default text-left">
                    <span class="font-rubik">*{{award.date}}</span>
                    <h1 class="font-rubik text-2xl">{{award.title}}</h1>
                    <p class="text-justify">{{award.description}}</p>
                </div>
            </div>
        </div>
    </Parallax>
    </FramedMainSection>
</template>
