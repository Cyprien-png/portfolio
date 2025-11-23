<script setup>
import starIcon from '@/icons/starIcon.vue';

const props = defineProps({
    writerImage: {
        type: String,
        required: true
    },
    writerPosition: {
        type: String,
        required: true
    },
    starsCount: {
        type: Number,
        required: true
    },
    isDarkMode: {
        type: Boolean,
        default: false
    }
})
</script>

<template>
    <header class="flex">
        <img :src="writerImage" alt="" class="h-12 w-12 rounded-full">
        <div class="pl-2">
            <div class="flex">
                <starIcon v-for="i in 5" :class="i <= starsCount ? 'text-yellow-500' : (isDarkMode?'text-transparent':'text-white')" />
            </div>
            <span class="italic text-sm" :class="isDarkMode? 'text-neutral-100':'text-neutral-600'">{{ writerPosition }}</span>
        </div>
    </header>
</template>
