<script setup>
import { onMounted, ref } from 'vue';

const thumbY = ref(0);
const thumbH = ref(0);
const isScollable = ref(false);

onMounted(() => {
    const body = document.querySelector('body');
    const scrollableScreen = document.getElementById('scrollable-screen');
    const scrollTrack = document.getElementById('scroll-track');
    const scrollContainer = scrollableScreen.parentElement;

    const updateScrollbar = () => {
        isScollable.value = scrollableScreen.clientHeight > scrollContainer.clientHeight;
        if (!isScollable) { return };

        const coeff = scrollTrack.clientHeight / scrollableScreen.clientHeight
        thumbH.value = body.clientHeight * coeff;
        thumbY.value = scrollContainer.scrollTop * coeff;
    }

    updateScrollbar();
    scrollContainer.addEventListener('scroll', updateScrollbar);
})
</script>

<template>
    <div class="absolute top-0 right-0 w-4 h-full py-4">
        <div id="scroll-track" class="w-full h-full relative flex justify-center">
            <div v-if="isScollable" :data-scroll-thumb-h="thumbH" :data-scroll-thumb-y="thumbY"
                :style="`height: ${thumbH}px; top: ${thumbY}px`" class="w-2/3 h-12 bg-custom-blue-dark absolute top-0">
            </div>
        </div>
    </div>
</template>
