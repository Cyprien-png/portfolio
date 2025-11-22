<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { useScrollContext } from '@/composables/useScrollContext';
import CustomA from './CustomA.vue';
import { AnimatedComponent } from '@/services/AnimatedComponent';

const { containerRef, sections, contentRef, getSectionById } = useScrollContext();

const component = ref();
const navContainerRef = ref();
const virtualScrollRef = ref();

const scroll = (e, section) => {
  e.preventDefault();
  const sectionY = section.getBoundingClientRect().top - contentRef.value.getBoundingClientRect().top;
  containerRef.value.scrollTo({ top: sectionY, behavior: 'smooth' });
}

const computeIndicator = () => {
    const navChildren = navContainerRef.value.children

    for (let i = 0; i <= navChildren.length - 1; i++) {
        const sectionRect = sections.value[i].el.getBoundingClientRect()
        const minRealScroll = sectionRect.top
        const maxRelativeScrollValue = sectionRect.bottom;

        if (minRealScroll <= window.innerWidth && sectionRect.bottom >= window.innerWidth) {
            const minVirtualPx = (i == 0)? 0 : navChildren[i-1].offsetLeft;
            const maxVirtualPx = navChildren[i].offsetLeft;

            const relativeRelScroll = sectionRect.height - (maxRelativeScrollValue - window.innerHeight)
            const sectionVirtualPx = (relativeRelScroll / sectionRect.height) * (maxVirtualPx - minVirtualPx)

            virtualScrollRef.value.style.width = `${sectionVirtualPx + minVirtualPx}px`;
        }
        virtualScrollRef.value.style.marginLeft = `${navChildren[0].getBoundingClientRect().width * 0.5}px`
    }
}

onMounted(async () => {
    component.value = new AnimatedComponent();
    component.value.tick = computeIndicator;
    component.value.addAnimationTrigger(containerRef.value, "scroll");
    component.value.addAnimationTrigger(containerRef.value, "wheel");
    component.value.addAnimationTrigger(containerRef.value, "touchmove");
     await nextTick();
    computeIndicator()
})
</script>

<template>
    <nav ref="nav"
        class="text-white fixed flex-col p-4 top-[4dvw] z-50 rounded-xl backdrop-filter-[url('#liquidFilter')] backdrop-brightness-125 before:content-[''] before:rounded-xl before:absolute before:inset-0 before:shadow-[inset_0_0_8px_1px_rgba(255,255,255,0.7)]">
        <div ref="navContainerRef" class="flex gap-4 relative">
            <CustomA v-for="s in sections" :text="s.id" href="" @click="(e) => scroll(e, s.el)" />
        </div>
        <div ref="virtualScrollRef" class="h-[2px] rounded-full bg-white"></div>
    </nav>
</template>
