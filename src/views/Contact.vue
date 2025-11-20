<script setup>
import { onMounted, ref } from 'vue';
import FramedMainSection from '@/layouts/FramedMainSection.vue';
import { useScrollContext } from '@/composables/useScrollContext'
import { AnimatedComponent } from '@/services/AnimatedComponent';
import Parallax from '@/components/Parallax.vue';

const component = ref(null)
const frameRef = ref(null)
const { containerRef } = useScrollContext()
const contactSectionRef = ref(null)
const translationRef = ref(0)
const paddingTopRef = ref(0)


// Compute an action based on the scroll
const handleScroll = () => {
    const relativeScrollPosition = frameRef.value.sectionRef.getBoundingClientRect().top;
    translationRef.value = Math.round(relativeScrollPosition + paddingTopRef.value * 1.5)
}

onMounted(async () => {
    paddingTopRef.value = parseFloat(getComputedStyle(contactSectionRef.value).paddingTop)

    component.value = new AnimatedComponent(frameRef.value.sectionRef);
    component.value.tick = handleScroll;
    component.value.addAnimationTrigger(containerRef.value, "scroll");
});
</script>

<template>
    <FramedMainSection ref="frameRef" id="contact" class="h-dvh">
        <Parallax>
            <div ref="contactSectionRef" class="h-full w-full relative rounded-4xl flex flex-col pt-20">
                <div class="absolute h-full w-full top-0 left-0 rounded-4xl brightness-[.85] bg-[url('/backgrounds/forest.png')] bg-cover -z-10"></div>
                <div class="grid grid-cols-1 md:grid-cols-3 w-full gap-8 px-8 text-white">
                    <div class="h-full w-full">
                        <h2 class="font-rubik border-b-3 border-dashed">Hire me</h2>
                        <ul class="pt-4 text-2xl flex flex-col gap-2">
                            <li class="w-fit hover:underline"><a href="mailto:cyprien@jaquier.dev">cyprien@jaquier.dev</a></li>
                        </ul>
                    </div>
                    <div class="h-full w-full">
                        <h2 class="font-rubik border-b-3 border-dashed">Social</h2>
                        <ul class="pt-4 text-2xl flex flex-col gap-2">
                            <li class="w-fit hover:underline"><a target="_blank" href="https://www.linkedin.com/in/cyprien-jaquier">LinkedIn</a></li>
                        </ul>
                    </div>
                    <div class="h-full w-full">
                        <h2 class="font-rubik border-b-3 border-dashed">Open source</h2>
                        <ul class="pt-4 text-2xl flex flex-col gap-2">
                            <li class="w-fit hover:underline"><a target="_blank" href="https://github.com/Cyprien-png">GitHub</a></li>
                            <li class="w-fit hover:underline"><a target="_blank" href="https://codepen.io/R0kkxRyuk">CodePen</a></li>
                        </ul>
                    </div>
                </div>

                <div class="flex flex-col justify-center items-center text-[10dvw] leading-none w-full h-full font-rubik">
                    <h1 class="text-white">Let's work</h1>
                    <h1 class="text-red-custom z-10">together</h1>
                </div>

                <div class="h-full w-full flex justify-center items-end absolute pointer-events-none bg-red-400a" :style="`transform: translateY(${translationRef}px)`">
                    <div class="max-h-full relative w-1/2 md:w-full aspect-[9/16]">

                        <img src="/contact/body.png" data-parallax-value=".1" class="absolute h-full w-full top-0 left-0 object-contain parallax"/>
                        <img src="/contact/arm.png" data-parallax-value=".13" class="absolute h-full w-full top-0 left-0 object-contain parallax"/>
                    </div>
                </div>
            </div>
        </Parallax>
    </FramedMainSection>
</template>
