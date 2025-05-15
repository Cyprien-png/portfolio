<script setup>
import { onMounted } from 'vue';

onMounted(() => {
    const cursor = document.getElementById('cursor');
    const updateCursorPosition = (event) => {
        cursor.style.left = `${event.clientX}px`;
        cursor.style.top = `${event.clientY}px`;
    };
    window.addEventListener('mousemove', updateCursorPosition);
    return () => {
        window.removeEventListener('mousemove', updateCursorPosition);
    };
});
</script>

<template>
    <div id="cursor"
        class="absolute inset-0 w-3 h-3 bg-white mix-blend-difference z-50 rounded-full -translate-1/2 pointer-events-none">
    </div>
</template>

<style>
body * {
    cursor: none;
}
</style>