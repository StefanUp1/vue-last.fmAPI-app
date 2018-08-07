<template>
    <div id="app">
        <div class="container">
            <transition name="slide" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'app'
    }

</script>


<style>
    #app {
        background-color: #AD172B;
        color: #fff;
        font-family: 'Lato', sans-serif;
    }

    /* slide-animation */

    .slide-enter-active {
        animation: slide-in 250ms ease-out forwards;
    }

    .slide-leave-active {
        animation: slide-out 250ms ease-out forwards;
    }

    @keyframes slide-in {
        from {
            transform: translateY(-40px);
            opacity: 0
        }
        to {
            transform: translateY(0);
            opacity: 1
        }
    }

    @keyframes slide-out {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(-40px);
            opacity: 0;
        }
    }

</style>
