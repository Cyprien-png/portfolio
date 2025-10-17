<script setup>
import FramedMainSection from '@/layouts/FramedMainSection.vue'
import testimonials from '@/data/testimonials.json'
</script>

<template>
    <FramedMainSection id="testimonials" class="min-h-[100dvh] flex relative">
        <div class="h-full w-full rounded-4xl bg-yellow-950 text-white flex justify-center items-end text-center p-4">
            <div class="flex flex-col md:flex-row">

                <div v-for="(testimonial, i) in testimonials" :key="i"
                    class="h-fit flex-1 p-4 flex flex-col items-start cursor-default text-left">
                    <h1 class="font-rubik text-2xl">{{ testimonial.field }}</h1>
                    <p class="text-justify">{{ testimonial.description }}</p>
                </div>
            </div>
        </div>
    </FramedMainSection>
</template>
