<script setup>
import FramedMainSection from '@/layouts/FramedMainSection.vue'
import stories from '@/data/about-me.json'
</script>

<template>
    <FramedMainSection id="about-me" class="min-h-[100dvh] flex relative">
        <div class="h-full w-full rounded-4xl bg-yellow-950 text-white flex justify-center items-end text-center p-4">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

                <div v-for="(story, i) in stories" :key="i"
                    class="h-fit flex-1 p-4 flex flex-col items-start cursor-default text-left gap-2">
                    <img :src="story.image" class="rounded-2xl object-contain aspect-video md:w-full" />
                    <p class="text-justify">{{ story.description }}</p>
                </div>
            </div>
        </div>
    </FramedMainSection>
</template>
