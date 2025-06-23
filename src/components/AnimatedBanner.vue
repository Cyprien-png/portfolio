<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    isReverse: {
        type: Boolean,
        default: false
    }
});
</script>

<template>
    <div class="w-screen h-7 bg-white">
        <div
            class="relative text-custom-blue-dark font-bold w-full h-7 flex justify-center items-center overflow-hidden">
            <div class="absolute flex slide-left" :class="{ 'animate-reverse': props.isReverse }">
                <span v-for="n in 10" :key="n" class="whitespace-nowrap h-7 flex items-center px-4">
                    <slot></slot>
                </span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.slide-left {
    animation: slide-left 20s linear infinite;
}

.animate-reverse {
    animation-direction: reverse;
}

@keyframes slide-left {
    from {
        transform: translateX(0);
    }

    to {
        transform: translateX(-10%);
    }
}
</style>