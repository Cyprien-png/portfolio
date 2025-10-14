<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useScrollContext } from '@/composables/useScrollContext'

const { containerRef } = useScrollContext()

// Internal refs
const contentContainerRef = ref(null)
const highlightEl = ref(null)
const followingFrameRef = ref(null)
const followingFrameInnerAreaRef = ref(null)
const followingFramePaddingRef = ref(0)

let resizeObserver = null
let rafId = null

// Refs auto setters
const registerHighlight = (el) => {
    highlightEl.value = el
}

const registerContainer = (el) => {
    contentContainerRef.value = el
}

const registerFollowingFrame = (el) => {
    followingFrameRef.value = el
    followingFrameInnerAreaRef.value = el.firstChild
}

// Set the base positions
const computeLayout = () => {
    if (!contentContainerRef.value) return

    const items = contentContainerRef.value.querySelectorAll('.testimonial-item')
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
    let scrollPositionCurrent = contentContainerRef.value.getBoundingClientRect().top - followingFramePaddingRef.value

    if (scrollPositionCurrent > scrollPositionStart) {
        scrollPositionCurrent = scrollPositionStart
        setRotation(contentContainerRef.value, scrollPositionStart + followingFramePaddingRef.value)
    } else if (scrollPositionCurrent < scrollPositionEnd) {
        scrollPositionCurrent = scrollPositionEnd
        setRotation(contentContainerRef.value, scrollPositionEnd + followingFramePaddingRef)
    } else {
        setRotation(contentContainerRef.value)
    }

    followingFrameRef.value.style.transform = `translateY(${-scrollPositionCurrent}px)`
}

onMounted(async () => {
    await nextTick()
    computeLayout()

    containerRef.value.addEventListener('scroll', handleScroll)

    const onResize = () => {
        if (rafId) cancelAnimationFrame(rafId)
        rafId = requestAnimationFrame(() => computeLayout())
    }

    window.addEventListener('resize', onResize)

    if (window.ResizeObserver) {
        resizeObserver = new ResizeObserver(() => {
            if (rafId) cancelAnimationFrame(rafId)
            rafId = requestAnimationFrame(() => computeLayout())
        })
        if (contentContainerRef.value) resizeObserver.observe(contentContainerRef.value)
        contentContainerRef.value.querySelectorAll('.testimonial-item').forEach(el => resizeObserver.observe(el))
    }
})

onUnmounted(() => {
    window.removeEventListener('resize', computeLayout)
    containerRef.value?.removeEventListener('scroll', handleScroll)
    if (resizeObserver) resizeObserver.disconnect()
})

defineExpose({ highlightEl })
</script>

<template>
    <!-- Frame -->
    <slot name="highlight" :registerFollowingFrame="registerFollowingFrame" :registerHighLight="registerHighlight">
    </slot>

    <!-- Scrollable content -->
    <slot name="content" :registerContainer="registerContainer">
    </slot>
</template>
