<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

const thumbY = ref(0);
const isScollable = ref(false);
const coeff = ref(0);

onMounted(() => {
    const borderWithSum = 32;
    const scrollableScreen = document.getElementById('scrollable-screen');
    const scrollTrack = document.getElementById('scroll-track');
    const scrollContainer = scrollableScreen.parentElement;
    
    const updateScrollbar = () => {
        isScollable.value = scrollableScreen.clientHeight > scrollContainer.clientHeight;
        if (!isScollable) { return };
        
        const scrollThumb = document.getElementById('scroll-thumb');
        if (!scrollThumb) { return }

        const maxScrollScreen = scrollableScreen.scrollHeight - scrollContainer.clientHeight;
        const maxScrollTrack = scrollTrack.clientHeight - scrollThumb.clientHeight + 2;

        // calulate the coefficient of scrolled pixels
        coeff.value = scrollContainer.scrollTop / (maxScrollScreen + borderWithSum);
        thumbY.value = Math.round(maxScrollTrack * coeff.value);
    }

    updateScrollbar();
    scrollContainer.addEventListener('scroll', updateScrollbar);
    window.addEventListener('resize', updateScrollbar);
})

onUnmounted(() => {
    const scrollContainer = document.getElementById('scrollable-screen').parentElement;
    scrollContainer.removeEventListener('scroll', updateScrollbar);
    window.removeEventListener('resize', updateScrollbar);
})
</script>

<template>
    <div class="absolute top-0 right-0 w-4 h-full py-4">
        <div id="scroll-track" class="w-full h-full relative flex justify-center">
            <div id="scroll-thumb" v-if="isScollable" :data-scroll-thumb-y="thumbY"
                :style="`top: ${thumbY - 1}px`" class="w-5/8 bg-custom-blue-dark absolute top-0 h-8 rounded-xs flex items-center justify-center">
                <span class="text-xs text-white rotate-270 text-left items-center justify-center">
                    {{Math.round(coeff * 100)}}%
                </span>
            </div>
        </div>
    </div>
</template>
