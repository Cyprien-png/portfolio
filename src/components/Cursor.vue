<script setup>
import { onMounted, ref } from 'vue';

const gapX = ref(0);
const gapY = ref(0);

onMounted(() => {
    const cursor = document.getElementById('cursor');

    // Update cursor position based on data attributes
    const updateCursorPosition = (event) => {
        const gapXValue = parseInt(cursor.dataset.gapX) || 0;
        const gapYValue = parseInt(cursor.dataset.gapY) || 0;

        cursor.style.left = `${event.clientX - gapXValue}px`;
        cursor.style.top = `${event.clientY - gapYValue}px`;
    };

    window.addEventListener('mousemove', updateCursorPosition);

    return () => {
        window.removeEventListener('mousemove', updateCursorPosition);
    };
});
</script>

<template>
    <div :data-gap-x="gapX" :data-gap-y="gapY" id="cursor"
        class="absolute w-3 h-3 bg-white mix-blend-difference z-50 rounded-full -translate-1/2 pointer-events-none">
    </div>
</template>

<style>
#cursor {
    transition: width 0.5s ease, height 0.5s ease;
}
body * {
    cursor: none;
}
</style>