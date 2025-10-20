<script setup>
import FramedMainSection from '@/layouts/FramedMainSection.vue'
import stories from '@/data/about-me.json'
import { useScrollContext } from '@/composables/useScrollContext';
import { ref, onMounted } from 'vue';
import FollowingFrame from '@/components/FollowingFrame.vue';

const { containerRef } = useScrollContext()
const contentRef = ref(null)
const triggerSectionRef = ref(null)
const triggerSections = ref([])

const handleScroll = () => {
    let triggerCount = 0;

    triggerSections.value.forEach((el) => {
        if (el.getBoundingClientRect().top <= 0) triggerCount++;
    });

    if (triggerCount == stories.length) {
        triggerCount--;
    }

    contentRef.value.style.transform = `translateY(-${100 * triggerCount}%)`
}

onMounted(async () => {
    triggerSections.value = Array.from(triggerSectionRef.value.children);
    containerRef.value.addEventListener('scroll', handleScroll)
})

</script>

<template>
    <FramedMainSection id="about-me" class="min-h-[100dvh] h-[200dvh] flex items-center relative">
        <!-- Frame -->
        <FollowingFrame sectionId="about-me">
            <div class="h-full w-full bg-white p-[3dvw]">
                <div class="h-full w-full flex justify-center items-center bg-gray-200 rounded-4xl">

                    <div class="h-1/2 w-full overflow-hidden px-[3dvw]">
                        <div ref="contentRef" class="h-full w-full transition-transform duration-400">
                            <div v-for="story in stories" class="h-full w-full aspect-square flex items-center gap-6">
                                <img :src="story.image" class="w-1/4 aspect-[9/16] max-h-full bg-green-400 object-cover"/>
                                <p class="flex-1 h-fit">{{ story.description }}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </FollowingFrame>


        <div ref="triggerSectionRef" class="w-full flex flex-col justify-between py-[3dvw]">
            <div v-for="story in [...stories]" class="h-[50dvh] border-2"></div>
        </div>

    </FramedMainSection>
</template>
