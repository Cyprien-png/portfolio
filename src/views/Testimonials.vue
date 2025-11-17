<script setup>
import { ref, onMounted } from 'vue';
import FramedMainSection from '@/layouts/FramedMainSection.vue'
import testimonials from '@/data/testimonials.json'
import RotateOnScroll from '@/components/RotateOnScroll.vue'
import starIcon from '@/icons/starIcon.vue';

const frameRef = ref(null);
const frameSectionRef = ref(null);

onMounted(async () => {
    frameSectionRef.value = frameRef.value.sectionRef;
})
</script>

<template>
    <FramedMainSection ref="frameRef" id="testimonials" class="min-h-[100dvh] flex relative">
        <RotateOnScroll v-if="frameSectionRef" :contentSection="frameSectionRef">
            <!-- Frame -->

            <!-- Scrollable content -->
            <template #content="{ registerContainer }">
                <div class="h-full w-full bg-cover rounded-4xl text-center flex items-start relative">
                    <div :ref="registerContainer"
                        class="flex flex-col relative items-center w-fit z-30 perspective-distant text-black" style="height: auto;">
                        <div v-for="(testimonial, i) in testimonials" :key="i"
                            class="testimonial-item w-full text-justify flex flex-col gap-2 py-8 px-20">
                            <header class="flex">
                                <img :src="testimonial.writer_image" alt="" class="h-12 w-12 rounded-full">
                                <div class="pl-2"> 
                                    <div class="flex"> 
                                        <starIcon v-for="i in 5" :class="i <= testimonial.stars ? 'text-black' : 'text-white'"/>
                                    </div>
                                    <span class="text-gray-600 text-sm">{{testimonial.writer_position}}</span>
                                </div>
                            </header>
                            <p>
                                {{ testimonial.description }}
                            </p>
                        </div>
                    </div>
                </div>
            </template>
            <template #background>
                <img src="/backgrounds/sky.png" class="h-full w-full"/>
            </template>
        </RotateOnScroll>
    </FramedMainSection>
</template>
