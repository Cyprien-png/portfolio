<script setup>
import { onMounted, ref } from 'vue';

const isHovering = ref(false);

const gapX = ref(0);
const gapY = ref(0);

onMounted(() => {
    const cursor = document.getElementById('cursor');
    const hoverListeners = document.querySelectorAll('.cursor-custom-pointer');

    hoverListeners.forEach((hoverListener) => {
        hoverListener.addEventListener('mouseover', () => {
            isHovering.value = true;
        });

        hoverListener.addEventListener('mouseleave', () => {
            isHovering.value = false;
        });
    });

    if (cursor) {
        // Update cursor position based on data attributes
        const updateCursorPosition = (event) => {
            const gapXValue = parseInt(cursor.dataset.gapX) || 0;
            const gapYValue = parseInt(cursor.dataset.gapY) || 0;

            cursor.style.left = `${event.clientX - gapXValue}px`;
            cursor.style.top = `${event.clientY - gapYValue}px`;
        };

        window.addEventListener('mousemove', updateCursorPosition);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('mousemove', updateCursorPosition);
        };
    } else {
        console.error('Cursor element not found');
    }
});
</script>

<template>
    <div :data-gap-x="gapX" :data-gap-y="gapY" id="cursor"
        class="absolute w-3 h-3 bg-white mix-blend-difference z-50 rounded-full -translate-1/2 pointer-events-none"
        :class="{ 'rounded-none animate-spin': isHovering }">

    </div>
</template>

<style>
body * {
    cursor: none;
}
</style>