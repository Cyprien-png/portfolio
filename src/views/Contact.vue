<script setup>
import FramedMainSection from '@/layouts/FramedMainSection.vue';
</script>

<template>
    <FramedMainSection id="contact" class="h-dvh">
        <div class="h-full w-full rounded-4xl flex flex-col pt-20">
            <div class="grid grid-cols-3 w-full gap-8">
                <div class="h-full w-full">
                    <h2 class="font-rubik border-b-3 border-dashed">Hire me</h2>
                    <ul class="pt-4 text-2xl flex flex-col gap-2 text-gray-600">
                        <li class="hover:text-black transition-colors duration-400 w-fit"><a href="mailto:cyprien@jaquier.dev">cyprien@jaquier.dev</a></li>
                    </ul>
                </div>
                <div class="h-full w-full">
                    <h2 class="font-rubik border-b-3 border-dashed">Social</h2>
                    <ul class="pt-4 text-2xl flex flex-col gap-2 text-gray-600">
                        <li class="hover:text-black transition-colors duration-400 w-fit"><a target="_blank" href="https://www.linkedin.com/in/cyprien-jaquier">LinkedIn</a></li>
                    </ul>
                </div>
                <div class="h-full w-full">
                    <h2 class="font-rubik border-b-3 border-dashed">Open source</h2>
                    <ul class="pt-4 text-2xl flex flex-col gap-2 text-gray-600">
                        <li class="hover:text-black transition-colors duration-400 w-fit"><a target="_blank" href="https://github.com/Cyprien-png">GitHub</a></li>
                        <li class="hover:text-black transition-colors duration-400 w-fit"><a target="_blank" href="https://codepen.io/R0kkxRyuk">CodePen</a></li>
                    </ul>
                </div>
            </div>

            <div class="h-full w-full bg-sky-400 translate-y-[3dvw]"></div>
        </div>
    </FramedMainSection>
</template>
