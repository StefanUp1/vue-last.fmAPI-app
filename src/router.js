import Vue from 'vue'
import VueRouter from 'vue-router'

import Artists from './components/Artists/Artists.vue'
import Albums from './components/Albums/Albums.vue'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/',
            name: 'artists',
            component: Artists
        },
        {
            path: '/:artist',
            name: 'albums',
            component: Albums
        }
    ],
    mode: 'history'
})
