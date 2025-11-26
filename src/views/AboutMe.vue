<script setup>
import FramedMainSection from '@/layouts/FramedMainSection.vue'
import stories from '@/data/about-me.json'
import { useScrollContext } from '@/composables/useScrollContext';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import FollowingFrame from '@/components/FollowingFrame.vue';
import { AnimatedComponent } from '@/services/AnimatedComponent';

const component = ref(null)
const frameRef = ref(null)
const frameSectionRef = ref(null)
const { containerRef } = useScrollContext()
const contentRef = ref(null)
const triggerSectionRef = ref(null)
const triggerSections = ref([])
const translationY = ref(0)


const prepareAnimation = () => {
    let triggerCount = 0;

    triggerSections.value.forEach((el) => {
        if (el.getBoundingClientRect().top <= 0) triggerCount++;
    });

    if (triggerCount == stories.length) triggerCount--;
    translationY.value = -100 * triggerCount
} 

const tick = () => {
    contentRef.value.style.transform = `translateY(${translationY.value}%)`
}

onMounted(async () => {
    frameSectionRef.value = frameRef.value.sectionRef;
    triggerSections.value = Array.from(triggerSectionRef.value.children);
    component.value = new AnimatedComponent(frameRef.value.sectionRef);
    component.value.prepareForAnimations = prepareAnimation;
    component.value.tick = tick;
    component.value.addAnimationTrigger(containerRef.value, "scroll")
})

onBeforeUnmount(() => {
    component.value.reset();
})


</script>

<template>
    <FramedMainSection ref="frameRef" id="about-me" class="min-h-[100dvh] flex items-center relative">
        <!-- Frame -->
        <FollowingFrame v-if="frameSectionRef" :contentSection="frameSectionRef">
            <div class="h-full w-full bg-white p-[3dvw]">
                <div class="h-full w-full relative flex justify-center items-center rounded-4xl overflow-hidden">
                    <div class="absolute h-full w-full top-0 left-0 bg-[url('/backgrounds/room.jpg')] bg-cover bg-bottom"></div>
                    <div class="h-1/2 w-full overflow-hidden px-[3dvw] z-10">
                        <div ref="contentRef" class="h-full w-full transition-transform duration-400 text-white">
                            <div v-for="story in stories" class="h-full w-full aspect-square flex items-end justify-end gap-6">
                                <div class="flex gap-2 flex-col">
                                    <h1 class="font-bold text-xl leading-none font-rubik">{{ story.when }}</h1>
                                    <p class="flex-1 h-fit">
                                        {{ story.description }}
                                    </p>
                                </div>
                                <img :src="story.image" class="mr-0 md:mr-[6dvw] lg:mr-[12dvw] w-fit aspect-[9/16] max-h-full object-contain object-bottom"/>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </FollowingFrame>

        <div ref="triggerSectionRef" class="w-full flex flex-col justify-between py-[40dvh]">
            <div v-for="story in [...stories]" class="h-[60dvh]"></div>
        </div>
    </FramedMainSection>
</template>
