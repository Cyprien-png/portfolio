<script setup>
import { onMounted, ref } from 'vue';
import FramedMainSection from '@/layouts/FramedMainSection.vue';
import { useScrollContext } from '@/composables/useScrollContext'
import { AnimatedComponent } from '@/services/AnimatedComponent';

const component = ref(null)
const frameRef = ref(null)
const { containerRef } = useScrollContext()
const contactSectionRef = ref(null)
const translationRef = ref(0)
const paddingTopRef = ref(0)


// Compute an action based on the scroll
const handleScroll = () => {
    const relativeScrollPosition = frameRef.value.sectionRef.getBoundingClientRect().top;
    translationRef.value = Math.round(relativeScrollPosition + paddingTopRef.value * .75)
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
        <div ref="contactSectionRef" class="h-full w-full rounded-4xl flex flex-col pt-20 bg-gray-200">
            <div class="grid grid-cols-1 md:grid-cols-3 w-full gap-8 px-8">
                <div class="h-full w-full">
                    <h2 class="font-rubik border-b-3 border-dashed">Hire me</h2>
                    <ul class="pt-4 text-2xl flex flex-col gap-2 text-gray-600">
                        <li class="hover:text-black transition-colors duration-400 w-fit"><a href="mailto:cyprien@jaquier.dev">cyprien@jaquier.dev</a></li>
                    </ul>
                </div>
                <div class="h-full w-full">
                    <h2 class="font-rubik border-b-3 border-dashed">Social</h2>
                    <ul class="pt-4 text-2xl flex flex-col gap-2 text-gray-600">
                        <li class="hover:text-black transition-colors duration-400 w-fit"><a target="_blank" href="https://www.linkedin.com/in/cyprien-jaquier">LinkedIn</a></li>
                    </ul>
                </div>
                <div class="h-full w-full">
                    <h2 class="font-rubik border-b-3 border-dashed">Open source</h2>
                    <ul class="pt-4 text-2xl flex flex-col gap-2 text-gray-600">
                        <li class="hover:text-black transition-colors duration-400 w-fit"><a target="_blank" href="https://github.com/Cyprien-png">GitHub</a></li>
                        <li class="hover:text-black transition-colors duration-400 w-fit"><a target="_blank" href="https://codepen.io/R0kkxRyuk">CodePen</a></li>
                    </ul>
                </div>
            </div>

            <div class="h-full w-full bg-sky-400 transition-transform duration-75" :style="`transform: translateY(${translationRef}px)`"></div>
        </div>
    </FramedMainSection>
</template>
