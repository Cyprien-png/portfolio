<script setup>
import FramedMainSection from '@/layouts/FramedMainSection.vue'
import testimonials from '@/data/testimonials.json'
import RotateOnScroll from '@/components/RotateOnScroll.vue'
</script>

<template>
    <FramedMainSection id="testimonials" class="min-h-[100dvh] flex relative">
        <RotateOnScroll>
            <!-- Frame -->
            <template #highlight="{ registerHighLight, registerFollowingWindow, registerFollow }">
                <div :ref="registerFollow" class="h-dvh w-full absolute z-20 top-0 left-0 border-black border-[3dvw] pointer-events-none">
                    <div :ref="registerFollowingWindow"
                        class="h-full w-full outline-[#000a] outline-[2dvw] rounded-4xl flex flex-col justify-center items-center p-[3dvw]">
                        <div :ref="registerHighLight" class="rounded-full transition-all duration-500 outline-[5dvw]">
                        </div>
                    </div>
                </div>
            </template>

            <!-- Scrollable content -->
            <template #content="{ registerContainer }">
                <div class="h-full w-full bg-cover rounded-4xl text-center flex items-start bg-gray-400 relative">
                    <div :ref="registerContainer" class="flex flex-col items-center gap-[6dvh] w-fit perspective-distant"
                        style="height:auto;">
                        <div v-for="(testimonial, i) in testimonials" :key="i"
                            class="testimonial-item text-white w-1/2 text-justify flex items-center p-4">
                            {{ testimonial.description }}
                        </div>
                    </div>
                </div>
            </template>
        </RotateOnScroll>
    </FramedMainSection>
</template>
