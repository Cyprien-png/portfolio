<script setup>
import { ref, onMounted } from 'vue'
import { useScrollContext } from '@/composables/useScrollContext'
import FollowingFrame from './FollowingFrame.vue'
import { AnimatedComponent } from '@/services/AnimatedComponent'

const props = defineProps({
    contentSection: {
        type: HTMLElement,
        required: true
    }
})

const { containerRef } = useScrollContext();

const component = ref();
const contentContainerRef = ref();
const scrollableSectionRef = ref();
const scrollableSectionPadding = ref()
const highlightEl = ref();
const followingFrameInnerAreaRef = ref();
const scrollPos = ref();

const registerContainer = (el) => {
    contentContainerRef.value = el;
}

// Set the base positions
const computeLayout = () => {
    const items = contentContainerRef.value.children;
    if (!items.length) return;

    const maxHeight = Array.from(items).reduce(
        (max, el) => Math.max(max, el.offsetHeight),
        items[0].offsetHeight
    );

    highlightEl.value.style.height = `${maxHeight}px`;

    const padding = window.innerHeight - (items[0].offsetHeight + items[items.length - 1].offsetHeight) / 2
    scrollableSectionPadding.value = parseFloat(getComputedStyle(highlightEl.value.parentElement).padding)
    scrollableSectionRef.value.style.height = `${contentContainerRef.value.offsetHeight + padding - scrollableSectionPadding.value}px`
}

// Apply the transformations
const tick = () => {
    let translation = scrollableSectionRef.value.getBoundingClientRect().top;
    const bottomLimit = scrollableSectionRef.value.getBoundingClientRect().bottom - window.innerHeight + scrollableSectionPadding.value;

    if (translation >= 0) {
        translation = 0
    } else if (bottomLimit < 0) {
        translation = highlightEl.value.offsetHeight - contentContainerRef.value.offsetHeight;
    }
    
    contentContainerRef.value.style.transform = `translateY(${translation}px)`;

    const relativeScroll = highlightEl.value.getBoundingClientRect().top

    Array.from(contentContainerRef.value.children).forEach((el) => {
        const rotation = Math.round(relativeScroll - el.getBoundingClientRect().top)
        el.style.transform = `rotateX(${rotation / 3}deg) translateZ(${-Math.abs(rotation  / 2)}px)`;
    })
}

// Compute an action based on the scroll
const prepareAnimation = () => {
    if (!contentContainerRef.value) return;

    const scrollPositionStart = 0;
    const scrollPositionEnd = -contentContainerRef.value.getBoundingClientRect().height;
    const scrollPositionCurrent = scrollableSectionRef.value.getBoundingClientRect().top;
    scrollPos.value = undefined;

    if (scrollPositionCurrent > scrollPositionStart) {
        scrollPos.value = scrollPositionStart;
    } else if (scrollPositionCurrent < scrollPositionEnd) {
        scrollPos.value = scrollPositionEnd;
    }
}

onMounted(async () => {
    computeLayout()
    component.value = new AnimatedComponent(props.contentSection);
    // component.value.prepareForAnimations = prepareAnimation;
    component.value.tick = tick;
    component.value.addAnimationTrigger(containerRef.value, "scroll");
})
</script>

<template>
    <!-- Frame -->
    <FollowingFrame :contentSection="contentSection">
        <div ref="followingFrameInnerAreaRef" class="relative h-dvh w-full top-0 left-0 pointer-events-none">
                <div class="h-full w-full overflow-hidden z-20 p-[3dvw]">
                    <div class="h-full w-full flex flex-row justify-center items-center rounded-4xl outline-[6dvw] outline-white">
                        <div ref="highlightEl" class="rounded-full w-3/4 z-20 relative overflow-visible">
                            <slot name="content" :registerContainer="registerContainer"></slot>
                            <!-- <div class="h-full w-full top-0 left-0 bg-linear-[white_2%,transparent_25%,transparent_75%,white_98%] "> </div> -->
                        </div>
                    </div>
                </div>
        </div>
    </FollowingFrame>

    <!-- Scrollable content -->
    <div ref="scrollableSectionRef" class="w-full bg-linear-to-b from-violet-500 to-yellow-500">
    </div>
</template>
