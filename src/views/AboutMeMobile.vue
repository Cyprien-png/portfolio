<script setup>
import FramedMainSection from '@/layouts/FramedMainSection.vue'
import stories from '@/data/about-me.json'
</script>

<template>
    <FramedMainSection id="about-me" class="min-h-[100dvh] flex relative">
        <div class="h-full w-full rounded-4xl bg-gray-800 text-white flex justify-center items-end text-center p-4">
            <div class="grid grid-cols-1 md:grid-cols-3">

                <div v-for="(story, i) in stories" :key="i"
                    class="h-fit flex-1 p-4 flex flex-col items-start cursor-default text-left gap-2">
                    <div class="rounded-2xl object-contain aspect-video w-full overflow-hidden">
                        <img :src="story.image" class="h-full w-full" />
                    </div>
                    <p class="text-justify">{{ story.description }}</p>
                </div>
            </div>
        </div>
    </FramedMainSection>
</template>
