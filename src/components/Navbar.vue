<script setup>
import MailQR from './svg/MailQR.vue';
import GitHub from './svg/GitHub.vue';
import LinkedIn from './svg/LinkedIn.vue';
import CJ from './svg/CJ.vue';
import FillableBox from './FillableBox.vue';
</script>

<template>
    <nav class="w-full h-32 flex border-b-2 mb-12 border-white">
        <CJ class="h-full w-auto border-r-2 text-white opacity-50 hidden xl:block" />

        <ul class="flex justify-around items-center flex-1 border-x-2">
            <li class="underline-slider">future sections</li>
        </ul>

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

        <a class="h-full bg-slider cursor-custom-pointer hidden md:flex" href="mailto:cyprien@jaquier.dev">
            <button class="flex flex-col justify-center py-4 px-12 text-left flex-1 relative">
                <p class="text-sm leading-none absolute top-6">You want me by your side?</p>
                <h1 class="uppercase text-5xl mix-blend-difference font-custom-anton">Hire me now!</h1>
            </button>
            <MailQR class="h-full w-auto border-l-2 hidden xl:block" />
        </a>
    </nav>
</template>