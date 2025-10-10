<script setup>
import FramedMainSection from '@/layouts/FramedMainSection.vue';
import awards from '@/data/awards.json'
</script>

<template>
     <FramedMainSection id="awards" class="h-dvh">
        <div class="h-full w-full rounded-4xl bg-yellow-950 text-white flex justify-center items-end text-center p-4">
            <div v-for="award in awards" class="h-1/2 flex-1 p-4 flex flex-col items-start cursor-default">
                <span class="font-rubik">*{{award.date}}</span>
                <h1 class="font-rubik text-2xl">{{award.title}}</h1>
                <p class="text-justify">{{award.description}}</p>
            </div>
        </div>
    </FramedMainSection>
</template>
