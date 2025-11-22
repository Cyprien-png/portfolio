<script setup>
import { computed } from "vue";

const props = defineProps({
    text: { type: String, required: true },
    href: { type: String, default: "#" },
    target: { type: String, default: "" }
});

const letters = computed(() => props.text.split(""));
</script>

<template>
    <a :href="href" :target="target" class="relative group flex overflow-hidden">
        <span class="flex">
            <span v-for="(l, i) in letters" :key="i"
                class="inline-block transition-all duration-200 group-hover:-translate-y-full"
                :style="{ '--i': i, 'transition-delay': `calc(var(--i) * 30ms)` }">
                {{ l }}
            </span>
        </span>

        <span class="absolute top-full left-0 flex">
            <span v-for="(l, i) in letters" :key="'bot-' + i"
                class="inline-block text-red-custom transition-all duration-200 group-hover:-translate-y-full"
                :style="{ '--i': i, 'transition-delay': `calc(var(--i) * 30ms)` }">
                {{ l }}
            </span>
        </span>
    </a>
</template>
