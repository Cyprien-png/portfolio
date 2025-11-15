<script setup>
import { ref, onMounted } from 'vue';
import FramedMainSection from '@/layouts/FramedMainSection.vue'
import testimonials from '@/data/testimonials.json'
import RotateOnScroll from '@/components/RotateOnScroll.vue'

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
                <div class="h-full w-full bg-cover rounded-4xl text-center flex items-start relative bg-red-500">
                    <div :ref="registerContainer"
                        class="flex flex-col items-center gap-[6dvh] w-fit z-10 perspective-distant text-black" style="height: auto;">
                        <div v-for="(testimonial, i) in testimonials" :key="i"
                            class="testimonial-item w-full text-justify flex items-center p-4">
                            {{ testimonial.description }}
                        </div>
                    </div>
                </div>
            </template>
        </RotateOnScroll>
    </FramedMainSection>
</template>
