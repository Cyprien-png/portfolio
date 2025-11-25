<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue';
import FramedMainSection from '@/layouts/FramedMainSection.vue';
import { useScrollContext } from '@/composables/useScrollContext'
import { AnimatedComponent } from '@/services/AnimatedComponent';
import contact from '@/data/contact.json'
import CustomA from '@/components/CustomA.vue';
import Parallax from '@/components/Parallax.vue';

const component = ref(null)
const frameRef = ref(null)
const { containerRef } = useScrollContext()
const contactSectionRef = ref(null)
const translationRef = ref(0)
const paddingTopRef = ref(0)

const handleScroll = () => {
    const relativeScrollPosition = frameRef.value.sectionRef.getBoundingClientRect().top;
    translationRef.value = Math.round(relativeScrollPosition + paddingTopRef.value * 1.5)
}

onMounted(() => {
    paddingTopRef.value = parseFloat(getComputedStyle(contactSectionRef.value).paddingTop)
    component.value = new AnimatedComponent(frameRef.value.sectionRef);
    component.value.tick = handleScroll;
    component.value.addAnimationTrigger(containerRef.value, "scroll");
});

onBeforeUnmount(() => {
    component.value.reset();
})
</script>

<template>
    <FramedMainSection ref="frameRef" id="contact" class="h-dvh">
        <Parallax>
            <div ref="contactSectionRef" class="h-full w-full relative rounded-4xl flex flex-col pt-24">
                <div class="absolute h-full w-full top-0 left-0 rounded-4xl brightness-[.85] bg-[url('/backgrounds/city.jpg')] bg-cover -z-10"></div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-8 px-8 text-white">
                    <div v-for="(value, key) in contact" :key="key" class="h-full w-full">
                        <h2 class="font-rubik border-b-2 border-dashed border-neutral-400 text-xl">{{ key }}</h2>
                        <ul class="pt-4 text-2xl flex flex-col gap-2">
                            <li v-for="(h, index) in value" :key="index" class="w-fit"><CustomA v-if="!h.hidden" :text="h.text" :href="h.href" :target="h.target"/></li>
                        </ul>
                    </div>
                </div>

                <div class="flex flex-col justify-center items-center text-[10dvw] leading-none w-full h-full font-rubik">
                    <h1 class="text-white">Let's work</h1>
                    <h1 class="text-red-custom z-10">together</h1>
                </div>

                <div class="h-full w-full flex justify-center items-end absolute pointer-events-none bg-red-400a" :style="`transform: translateY(${translationRef}px)`">
                    <div class="max-h-full relative w-2/3 md:w-full aspect-[9/16]">

                        <img src="/contact/body.png" data-parallax-value=".1" class="absolute h-full w-full top-0 left-0 object-contain parallax"/>
                        <img src="/contact/arm.png" data-parallax-value=".13" class="absolute h-full w-full top-0 left-0 object-contain parallax"/>
                    </div>
                </div>
            </div>
        </Parallax>
    </FramedMainSection>
</template>
