<script setup>
import MailQR from './svg/MailQR.vue';
import GitHub from './svg/GitHub.vue';
import LinkedIn from './svg/LinkedIn.vue';
import CJ from './svg/CJ.vue';
</script>

<template>
    <nav class="w-full h-32 flex border-b-2 border-white">
        <CJ class="h-full w-auto border-r-2 text-white opacity-50" />

        <ul class="flex justify-around items-center flex-1 border-x-2">
            <li>future sections</li>
        </ul>

        <div class="flex flex-col h-full w-fit border-r-2">
            <a target="_blank" href="https://github.com/Cyprien-png">
                <GitHub class="flex-1 h-full w-16 border-b-1 p-5" />
            </a>
            <a target="_blank" href="https://www.linkedin.com/in/cyprien-jaquier">
                <LinkedIn class="flex-1 h-full w-16 border-t-1 p-5" />
            </a>
        </div>

        <a class="flex h-full bg-slider" href="mailto:cyprien@jaquier.dev">
            <button class="flex flex-col justify-center py-4 px-8 xl:px-24 cursor-pointer text-left flex-1 relative">
                <p class="text-sm leading-none absolute top-7">You want me by your side?</p>
                <h1 class="uppercase font-bold text-5xl mix-blend-difference">Hire me!</h1>
            </button>
            <MailQR class="h-full w-auto border-l-2" />
        </a>
    </nav>
</template>