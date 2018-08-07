import Vue from 'vue'
import App from './App.vue'

import VueResource from 'vue-resource'
import VueSmoothScroll from 'vue-smooth-scroll'

import router from './router.js'

Vue.use(VueResource)
Vue.use(VueSmoothScroll)

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
