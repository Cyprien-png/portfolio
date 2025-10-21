<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useScrollContext } from '@/composables/useScrollContext'
import FollowingFrame from './FollowingFrame.vue'

defineProps({
    sectionId: {
        type: String,
        required: true
    }
})

const { containerRef } = useScrollContext()

// Internal refs
const contentContainerRef = ref(null)
const highlightEl = ref(null)
const followingFrameInnerAreaRef = ref(null)
const followingFramePaddingRef = ref(0)

// Refs auto setters
const registerHighlight = (el) => {
    highlightEl.value = el
}

const registerContainer = (el) => {
    contentContainerRef.value = el
}

const registerFollowingFrame = (el) => {
    followingFrameInnerAreaRef.value = el.firstChild
}

// Set the base positions
const computeLayout = () => {
    if (!contentContainerRef.value) return

    const items = contentContainerRef.value.children;
    if (!items.length) return

    const frameStyle = followingFrameInnerAreaRef.value ? getComputedStyle(followingFrameInnerAreaRef.value) : null
    const offset = followingFrameInnerAreaRef.value.offsetHeight / 2 - (items[0].offsetHeight / 2)
    followingFramePaddingRef.value = frameStyle ? parseFloat(frameStyle.paddingTop) || 0 : 0

    contentContainerRef.value.style.paddingTop = `${offset}px`
    contentContainerRef.value.style.paddingBottom = `${offset}px`

    if (highlightEl.value) {
        let maxHeight = items[0].offsetHeight;
        let maxWidth = items[0].offsetWidth;

        Array.from(items).forEach((i) => {
            if (i.offsetHeight > maxHeight) maxHeight = i.offsetHeight;
            if (i.offsetWidth > maxWidth) maxWidth = i.offsetWidth;
        })

        highlightEl.value.style.height = `${maxHeight * 2}px`
        highlightEl.value.style.width = `${maxWidth * 1.2}px`
    }
}

// Apply the transformations
const setRotation = (container, scro) => {
    const containerPos = contentContainerRef.value.getBoundingClientRect().top

    Array.from(container.children).forEach((el) => {
        const scroll = scro ?? containerPos;
        const centerY = window.innerHeight / 2 - (el.offsetHeight / 2);
        const rotation = Math.round((scroll + el.offsetTop - centerY) * 10) / 10

        el.style.transform = `rotateX(${(rotation / -6) % 180}deg) translateZ(${-Math.abs(rotation) / 2}px)`
    })
}

// Compute an action based on the scroll
const handleScroll = () => {
    if (!contentContainerRef.value) return

    const scrollPositionStart = 0
    const scrollPositionEnd = -contentContainerRef.value.getBoundingClientRect().height + followingFrameInnerAreaRef.value.offsetHeight
    const scrollPositionCurrent = contentContainerRef.value.getBoundingClientRect().top - followingFramePaddingRef.value
    let scrollValue = undefined;

    if (scrollPositionCurrent > scrollPositionStart) {
        scrollValue = scrollPositionStart + followingFramePaddingRef.value;
    } else if (scrollPositionCurrent < scrollPositionEnd) {
        scrollValue = scrollPositionEnd + followingFramePaddingRef.value;
    }

    setRotation(contentContainerRef.value, scrollValue)
}

onMounted(async () => {
    computeLayout()
    containerRef.value.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
    containerRef.value?.removeEventListener('scroll', handleScroll)
})
</script>

<template>
    <!-- Frame -->
    <FollowingFrame :sectionId>
        <slot name="highlight" :registerFollowingFrame="registerFollowingFrame" :registerHighLight="registerHighlight">
        </slot>
    </FollowingFrame>

    <!-- Scrollable content -->
    <slot name="content" :registerContainer="registerContainer">
    </slot>
</template>
