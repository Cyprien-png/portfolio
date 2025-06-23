<script setup>
import Background from './components/Background.vue';
import Navbar from './components/Navbar.vue';
import Cursor from './components/Cursor.vue';
import Scrollbar from './components/Scrollbar.vue';
import AnimatedBanner from './components/AnimatedBanner.vue';

// Flag to check if the device is mobile
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

const getMyAge = () => {
  const birthYear = 2004;
  const birthMonth = 4;
  const birthDay = 12;

  const today = new Date();
  let age = today.getFullYear() - birthYear;

  if (today.getMonth() < birthMonth - 1 || (today.getMonth() === birthMonth - 1 && today.getDate() < birthDay)) {
    age--;
  }

  return age;
};

</script>

<template>
  <div class="h-dvh w-dvw relative text-white font-custom-code flex justify-center items-center overflow-hidden">
    <div id="cursor-container">
      <Cursor v-if="!isMobile" />
    </div>
    <Background class="h-dvh w-dvw absolute inset-0 -z-10" />

    <div class="w-screen h-dvh flex flex-col overflow-auto no-scrollbar scroll-smooth">
      <div id="scrollable-screen" class="flex-1 flex flex-col border-[1rem] border-white">
        <Scrollbar />
        <Navbar />

        <div class="overflow-hidden">
          <AnimatedBanner :isReverse="true">
            Welcome on my portfolio!
          </AnimatedBanner>
          <h1
            class="flex flex-col opacity-0 uppercase font-custom-anton font-extrabold text-center my-4 text-[8dvw] highlight animate-slides-from-top">
            Full Stack Developer
          </h1>
          <AnimatedBanner>
            This site is currently under development, feel free to contact me with your suggestions.
          </AnimatedBanner>
        </div>

        <section id="about" class="section-container mb-4">
          <h1 class="text-2xl font-bold uppercase mb-2 mt-8 animate-slides-from-top">
            About me
          </h1>
          <p class="hover:text-gray-400 transition-all text-justify">
            <b class="text-white font-bold">Hi, I'm Cyprien, I’m {{ getMyAge() }} years old,</b>
            and I live in Switzerland.
            <b class="text-white font-bold">When I was a kid,</b>
            I was part of the nerdy group that only talked about video games
            during recess. My first console was a Nintendo DS (Lite), and after spending weeks making Mario run
            around,
            <b class="text-white font-bold">I started wondering how a few buttons could bring a fictional character
              to life.</b>
            That’s where it all began.
            <b class="text-white font-bold">That curiosity pushed me into the world of computer science, and</b>
            though I’ve explored different aspects of it along the way (systems, networking, development),
            <b class="text-white font-bold">it’s in coding that I’ve found the most joy.</b>
          </p>
        </section>
      </div>
    </div>
  </div>
</template>
