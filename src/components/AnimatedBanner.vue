<template>
    <div class="w-screen h-7 absolute left-0 bg-white px-4 opacity-90">
        <div class="relative text-custom-blue-dark font-bold w-full h-7 flex justify-center items-center overflow-hidden">
            <div class="absolute flex slide-left">
                <span v-for="n in 8" :key="n" class="whitespace-nowrap h-7 flex items-center px-4">
                    This website is currently under development, don't hesitate to write to me with any suggestions.
                </span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.slide-left {
    animation: slide-left 20s linear infinite;
}

@keyframes slide-left {
    from {
        transform: translateX(0);
    }

    to {
        transform: translateX(-12.5%);
    }
}
</style>