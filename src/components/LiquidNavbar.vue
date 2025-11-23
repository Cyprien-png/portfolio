<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { useScrollContext } from '@/composables/useScrollContext';
import CustomA from '@/components/CustomA.vue';
import { AnimatedComponent } from '@/services/AnimatedComponent';

const { containerRef, sections, contentRef, getSectionById } = useScrollContext();

const component = ref();
const navContainerRef = ref();

const scroll = (e, section) => {
    e.preventDefault();
    const sectionY = section.getBoundingClientRect().top - contentRef.value.getBoundingClientRect().top;
    containerRef.value.scrollTo({ top: sectionY, behavior: 'smooth' });
}

const computeIndicator = () => {
    const navChildren = navContainerRef.value.children

    for (let i = 0; i <= navChildren.length - 1; i++) {
        const sectionRect = sections.value[i].el.getBoundingClientRect()
        const relativeRelScroll = -1 * Math.round(sectionRect.top - window.innerHeight)
        const sectionHeight = Math.round(sectionRect.height)

        let percent = 0

        if (relativeRelScroll >= 0 && relativeRelScroll <= sectionHeight) {
            percent = relativeRelScroll * 100 / sectionHeight
        } else if (relativeRelScroll > sectionHeight) {
            percent = 100
        }

        navChildren[i].style.setProperty('--after-width', `${percent}%`);
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
        class="text-neutral-300 fixed flex-col p-4 top-[4dvw] z-50 rounded-3xl backdrop-filter-[url('#liquidFilter')] before:content-[''] before:rounded-3xl before:absolute before:inset-0 before:shadow-[inset_0_0_8px_1px_rgba(100,100,100,0.6)]">
        <div ref="navContainerRef" class="flex gap-4 relative">
            <CustomA v-for="(s, si) in sections" :text="s.id" href="" @click="(e) => scroll(e, s.el)"
                class="navLink relative after:content-[''] after:h-[1px] after:left-0 after:bottom-0 after:absolute after:bg-neutral-300" />
        </div>
    </nav>
</template>

<style scoped>
.navLink::after {
    width: var(--after-width);
}
</style>
