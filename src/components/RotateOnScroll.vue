<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useScrollContext } from '@/composables/useScrollContext'

const { containerRef } = useScrollContext()

// Internal refs
const contRef = ref(null)
const highlightEl = ref(null)
const followingWindow = ref(null)
const follow = ref(null)
const centerY = ref(0)
const sectionStart = ref(0)
const paddingTopRef = ref(0)
let resizeObserver = null
let rafId = null

// The function that the parent will use via slot binding
function registerHighlight(el) {
    highlightEl.value = el
}

function registerFollowingWindow(el) {
    followingWindow.value = el
}

function registerContainer(el) {
    contRef.value = el
}

function registerFollow(el) {
    follow.value = el
}

function computeLayout() {
    const container = contRef.value
    const highlight = highlightEl.value
    if (!container) return

    const items = container.querySelectorAll('.testimonial-item')
    if (!items.length) return

    const firstItem = items[0]
    const viewportH = window.innerHeight
    const itemH = firstItem.offsetHeight

    const frameStyle = followingWindow.value ? getComputedStyle(followingWindow.value) : null
    const paddingTop = frameStyle ? parseFloat(frameStyle.paddingTop) || 0 : 0
    paddingTopRef.value = paddingTop
    const paddingBottom = frameStyle ? parseFloat(frameStyle.paddingBottom) || 0 : 0
    const frameOffset = paddingTop + paddingBottom

    sectionStart.value = contRef.value.getBoundingClientRect().top - paddingTop

    const offset = (viewportH - frameOffset) / 2 - (itemH / 2)
    centerY.value = viewportH / 2 - (itemH / 2)

    const topPad = Math.max(0, offset)

    container.style.paddingTop = `${topPad}px`
    container.style.paddingBottom = `${topPad}px`
    container.style.display = 'flex'
    container.style.flexDirection = 'column'
    container.style.justifyContent = 'flex-start'

    if (highlight) {
        const maxHeight = Math.max(...Array.from(items).map(i => i.offsetHeight)) * 2
        const maxWidth = Math.max(...Array.from(items).map(i => i.offsetWidth)) * 1.2
        highlight.style.height = `${maxHeight}px`
        highlight.style.width = `${maxWidth}px`
    }
}

function handleScroll() {
    const container = contRef.value
    if (!container) return
    let pos = contRef.value.getBoundingClientRect().top - paddingTopRef.value
    const startScroll = 0
    const endScroll = -container.getBoundingClientRect().height + window.innerHeight - paddingTopRef.value

    if (pos > startScroll) {
        pos = startScroll
    } else if (pos < endScroll) {
        pos = endScroll
    } else {        
        Array.from(container.children).forEach((el) => {
            const rotation = Math.round((el.getBoundingClientRect().top - centerY.value) * 10) / 10
            el.style.transform = `rotateX(${(rotation / -6) % 180}deg) translateZ(${-Math.abs(rotation) / 2}px)`
        })
    }
    
    follow.value.style.transform = `translateY(${-pos}px)`
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
        if (contRef.value) resizeObserver.observe(contRef.value)
        contRef.value.querySelectorAll('.testimonial-item').forEach(el => resizeObserver.observe(el))
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
    <slot name="highlight" :registerFollow="registerFollow" :registerFollowingWindow="registerFollowingWindow" :registerHighLight="registerHighlight">
    </slot>

    <!-- Scrollable content -->
    <slot name="content" :registerContainer="registerContainer">
    </slot>
</template>
