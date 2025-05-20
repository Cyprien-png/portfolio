<script setup>
import MailQR from './svg/MailQR.vue';
import GitHub from './svg/GitHub.vue';
import LinkedIn from './svg/LinkedIn.vue';
import CJ from './svg/CJ.vue';
import FillableBox from './FillableBox.vue';

const navItems = [
    'About',
    'Education',
    'Projects',
    'Contact'
];
</script>

<template>
    <nav class="w-full h-36 flex border-b-2 border-white">
        <CJ class="h-full w-auto border-r-2 p-8 opacity-90 text-white hidden xl:block" />

        <div class="flex justify-around items-center flex-1 border-r-2 px-8">
            <a v-for="(item, i) in navItems" :key="item"
                :href="`#${item.toLowerCase()}`"
                class="underline-slider p-2 cursor-custom-pointer animate-slides-from-left opacity-0"
                :style="{ animationDelay: `${i * 0.1}s` }">
                {{ item }}
            </a>
        </div>

        <div class="flex flex-col h-full w-fit border-r-2">
            <FillableBox class="border-b-1">
                <a target="_blank" href="https://github.com/Cyprien-png">
                    <GitHub class="flex-1 h-full w-16 p-5" />
                </a>
            </FillableBox>
            <FillableBox class="border-t-1">
                <a target="_blank" href="https://www.linkedin.com/in/cyprien-jaquier">
                    <LinkedIn class="flex-1 h-full w-16 p-5" />
                </a>
            </FillableBox>
        </div>

        <a class="h-full bg-slider cursor-custom-pointer hidden lg:flex" href="mailto:cyprien@jaquier.dev">
            <button class="flex flex-col justify-center py-4 px-12 text-left flex-1 relative">
                <p class="text-sm leading-none absolute top-[1.4rem]">You want me by your side?</p>
                <h1 class="uppercase text-5xl mix-blend-difference font-custom-anton">Hire me now!</h1>
            </button>
            <MailQR class="h-full w-auto border-l-2 hidden xl:block" />
        </a>
    </nav>
</template>