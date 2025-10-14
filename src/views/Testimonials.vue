<script setup>
import FramedMainSection from '@/layouts/FramedMainSection.vue'
import testimonials from '@/data/testimonials.json'
import RotateOnScroll from '@/components/RotateOnScroll.vue'
</script>

<template>
    <FramedMainSection id="testimonials" class="min-h-[100dvh] flex relative">
        <RotateOnScroll>
            <!-- Frame -->
            <template #highlight="{ registerHighLight, registerFollowingFrame }">
                <div :ref="registerFollowingFrame"
                    class="h-dvh w-full absolute z-20 top-0 left-0 border-white border-[3dvw] pointer-events-none">
                    <div
                        class="h-full w-full overflow-hidden rounded-4xl flex flex-col justify-center items-center p-[3dvw] z-20">
                        <div :ref="registerHighLight"
                            class="rounded-full z-20 transition-all duration-500 outline-[50dvw] outline-sky-500 relative">
                            <div
                                class="h-full w-full top-0 left-0 bg-linear-[white_2%,transparent_25%,transparent_75%,white_98%] ">
                            </div>
                        </div>
                    </div>
                </div>
            </template>

            <!-- Scrollable content -->
            <template #content="{ registerContainer }">
                <div class="h-full w-full bg-cover rounded-4xl text-center flex items-start relative">
                    <div :ref="registerContainer"
                        class="flex flex-col items-center gap-[6dvh] w-fit z-10 perspective-distant text-black"
                        style="height:auto;">
                        <div v-for="(testimonial, i) in testimonials" :key="i"
                            class="testimonial-item w-1/2 text-justify flex items-center p-4">
                            {{ testimonial.description }}
                        </div>
                    </div>
                </div>
            </template>
        </RotateOnScroll>
    </FramedMainSection>
</template>
