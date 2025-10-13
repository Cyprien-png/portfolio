<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import FramedMainSection from '@/layouts/FramedMainSection.vue'
import testimonials from '@/data/testimonials.json'
import { useScrollContext } from '@/composables/useScrollContext'
const { containerRef } = useScrollContext()


const contRef = ref(null)
const highlightRef = ref(null)
const centerYRef = ref(0)
let resizeObserver = null
let rafId = null

function computeLayout() {
    const container = contRef.value
    const highlight = highlightRef.value
    if (!container) return

    const items = container.querySelectorAll('.testimonial-item')
    if (!items.length) return

    const firstItem = items[0]
    const viewportH = window.innerHeight
    const itemH = firstItem.offsetHeight

    const homeWindow = document.getElementById('home-window')
    const frameStyle = homeWindow ? getComputedStyle(homeWindow) : null
    const paddingTop = frameStyle ? parseFloat(frameStyle.paddingTop) || 0 : 0
    const paddingBottom = frameStyle ? parseFloat(frameStyle.paddingBottom) || 0 : 0
    const frameOffset = paddingTop + paddingBottom

    const offset = (viewportH - frameOffset) / 2 - (itemH / 2)
    centerYRef.value = viewportH / 2 - (itemH / 2)
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

onMounted(async () => {
    await nextTick()
    computeLayout()

    containerRef.value.addEventListener('scroll', ((e) => {
        Array.from(contRef.value.children).forEach((e) => {
            const rotation = Math.round((e.getBoundingClientRect().top - centerYRef.value) * 10) / 10
            e.style.transform = `rotateX(${(rotation / -6)% 180}deg) translateZ(${- Math.abs(rotation) / 2}px)`
        })
    }))

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
</script>

<template>
    <FramedMainSection id="testimonials" class="min-h-[100dvh] flex relative">
        <!-- Frame -->
        <div class="h-dvh w-full absolute z-20 top-0 left-0 border-black border-[3dvw] pointer-events-none">
            <div id="home-window"
                class="h-full w-full outline-black outline-[2dvw] rounded-4xl flex flex-col justify-center items-center p-[3dvw]">
                <div ref="highlightRef" class="rounded-full transition-all duration-500 outline-[5dvw]"></div>
            </div>
        </div>

        <!-- Scrollable content -->
        <div class="h-full w-full bg-cover rounded-4xl text-center flex items-start bg-gray-400 relative">
            <div ref="contRef" class="flex flex-col items-center gap-[6dvh] w-fit perspective-distant" style="height:auto;">
                <div v-for="(testimonial, i) in testimonials" :key="i"
                    class="testimonial-item text-white w-1/2 text-justify flex items-center p-4">
                    {{ testimonial.description }}
                </div>
            </div>
        </div>
    </FramedMainSection>
</template>
