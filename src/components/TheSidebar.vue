<template>
    <aside class="fixed right-0 top-0 h-full transition-transform duration-200 z-50 border-l border-l-accent-main/40" :class="showSidebar ? 'translate-x-0' : 'translate-x-full'">
        <transition>
            <!-- <div v-show="showSidebar" id="sidebar" class="bg-accent-alter py-8 px-6 h-full overflow-hidden"> -->
            <div id="sidebar" class="bg-accent-alter py-8 px-10 h-full transition-opacity flex flex-col justify-between" :class="showSidebar ? 'opacity-100' : 'opacity-0'">
                <nav>
                    <ul>
                        <li><a class="hover:text-accent-main focus:text-accent-main whitespace-nowrap" :tabindex="showSidebar ? '0' : '-1'" href="#">Link</a></li>
                        <li><a class="hover:text-accent-main focus:text-accent-main whitespace-nowrap" :tabindex="showSidebar ? '0' : '-1'" href="#">Zelda</a></li>
                        <li><a class="hover:text-accent-main focus:text-accent-main whitespace-nowrap" :tabindex="showSidebar ? '0' : '-1'" href="#">Cooler Link</a></li>
                        <li><a class="hover:text-accent-main focus:text-accent-main whitespace-nowrap" :tabindex="showSidebar ? '0' : '-1'" href="#">Hotter Zelda</a></li>
                    </ul>
                </nav>
                <div>
                    <p class="mb-2">It doesn't work like a want it to work T_T</p>
                    <p class="leading-tight">V-Show and inner element width <br> doesn't allow a smooth transition</p>
                </div>
            </div>
        </transition>
        <button type="button" id="showSidebar" class="button --default absolute left-0 top-1/2 h-16 !px-2 transition-all duration-200" :class="showSidebar ? 'translate-x-0' : '-translate-x-full'" @click="triggerSidebar()">
            <svg class="w-4 transition-transform" :class="showSidebar ? 'rotate-0' : 'rotate-180'" viewBox="-4 0 16 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Dribbble-Light-Preview" transform="translate(-305.000000, -6679.000000)" class="fill-accent-main">
                        <g id="icons" transform="translate(56.000000, 160.000000)">
                            <path d="M249.365851,6538.70769 L249.365851,6538.70769 C249.770764,6539.09744 250.426289,6539.09744 250.830166,6538.70769 L259.393407,6530.44413 C260.202198,6529.66364 260.202198,6528.39747 259.393407,6527.61699 L250.768031,6519.29246 C250.367261,6518.90671 249.720021,6518.90172 249.314072,6519.28247 L249.314072,6519.28247 C248.899839,6519.67121 248.894661,6520.31179 249.302681,6520.70653 L257.196934,6528.32352 C257.601847,6528.71426 257.601847,6529.34685 257.196934,6529.73759 L249.365851,6537.29462 C248.960938,6537.68437 248.960938,6538.31795 249.365851,6538.70769"/>
                        </g>
                    </g>
                </g>
            </svg>
        </button>
    </aside>
</template>

<script>
export default {
    data(){
        return{
            showSidebar: false
        }
    },
    methods:{
        triggerSidebar(){
            this.showSidebar = !this.showSidebar;
        }
    }
}
</script>

<style scoped>
/* .v-enter-active, .v-leave-active{
    transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1), transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), right 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.v-enter-to{
    pointer-events: auto;
}
.v-leave-to, .v-enter-from{
    transform: translateX(100%);
    width: 0;
    opacity: 0;
    right: 0;
    pointer-events: none;
} */
</style>