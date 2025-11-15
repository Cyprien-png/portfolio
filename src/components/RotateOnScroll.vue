<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
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
    const translation = scrollableSectionRef.value.getBoundingClientRect().top

    if (translation < 0 && scrollableSectionRef.value.getBoundingClientRect().bottom - window.innerHeight + scrollableSectionPadding.value > 0) {
        contentContainerRef.value.style.transform = `translateY(${translation}px)`;
    }

    Array.from(contentContainerRef.value.children).forEach((el) => {
        // const scroll = scrollPos.value ?? containerPos;
        // const centerY = window.innerHeight / 2 - (el.offsetHeight / 2);
        // const rotation = Math.round((scroll + el.offsetTop - centerY) * 10) / 10;

        // el.style.transform = `rotateX(${(rotation / -6) % 180}deg) translateZ(${-Math.abs(rotation) / 2}px)`;
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
        <div ref="followingFrameInnerAreaRef"
            class="relative h-dvh w-full top-0 left-0 border-[3dvw] border-white pointer-events-none">
            <div class="absolute w-full h-full rounded-4xl outline-[3dvw] outline-white">
                <div
                    class="h-full w-full overflow-hidden rounded-4xl flex flex-col justify-center items-center p-[3dvw] z-20">
                    <div ref="highlightEl" class="rounded-full w-3/4 z-20 relative bg-green-400 overflow-visible">

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
