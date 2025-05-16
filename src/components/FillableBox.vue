<script setup>
import { ref } from 'vue';

const cursorContainer = document.getElementById('cursor-container');
const cursor = document.getElementById('cursor');

const active = ref(false);

function mouseOver(event) {
    active.value = true;
    const box = event.currentTarget;

    // ensure  that the cursor is not already in the box
    if (cursor.parentElement === box) {
        return;
    }
    
    // move the cursor in the box
    box.appendChild(cursor);
    const newSize = Math.max(box.clientWidth, box.clientHeight) * 3;

    // resize the cursor
    cursor.style.width = `${newSize}px`;
    cursor.style.height = `${newSize}px`;
    
    // set the data attributes
    cursor.dataset.gapX = `${box.getBoundingClientRect().left}`;
    cursor.dataset.gapY = `${box.getBoundingClientRect().top}`;
}

function mouseLeave() {
    active.value = false;

    // move the cursor outside of the box
    cursorContainer.appendChild(cursor);

    // remove the style
    cursor.style.width = '';
    cursor.style.height = '';

    // reset the data attributes
    cursor.dataset.gapX = 0;
    cursor.dataset.gapY = 0;
}
</script>

<template>
    <div 
    @mouseover="mouseOver" 
    @mouseleave="mouseLeave" 
    class="overflow-hidden relative">
        <slot></slot>
    </div>
</template>