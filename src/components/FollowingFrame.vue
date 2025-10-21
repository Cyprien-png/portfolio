<script setup>
import { ref, watch } from 'vue'
import { useScrollContext } from '@/composables/useScrollContext'

const { containerRef, getSectionById, sections } = useScrollContext()
const contentContainerRef = ref(null)
const frameRef = ref(null)

const props = defineProps({
    sectionId: {
        type: String,
        required: true
    }
})

const handleScroll = () => {
    if (!frameRef.value) return

    const scrollPositionStart = 0
    const scrollPositionEnd = -contentContainerRef.value.getBoundingClientRect().height + frameRef.value.offsetHeight
    const scrollPositionCurrent = contentContainerRef.value.getBoundingClientRect().top
    let position = "fixed";
    let translateY = 0;

    if (scrollPositionCurrent > scrollPositionStart) {
        position = "absolute";
    } else if (scrollPositionCurrent < scrollPositionEnd) {
        position = "absolute";
        translateY = scrollPositionEnd;
    }

    frameRef.value.style.transform = `translateY(${-translateY}px)`
    frameRef.value.style.position = position;
}

watch(getSectionById(props.sectionId), (el) => {
    if (el) {
        contentContainerRef.value = el
        containerRef.value?.addEventListener('scroll', handleScroll)
    }
}, { immediate: true })
</script>

<template>
    <div ref="frameRef" class="h-dvh w-dvw z-20 absolute top-0 left-0 pointer-events-none">
        <slot></slot>
    </div>
</template>
