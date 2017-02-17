// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from "vue-router"
import routes from "./config/routerConfig"
import store from 'store'

import Flexible from "lib-flexible"

// 加入muse-ui
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'

Vue.use(MuseUI)

Vue.use(VueRouter);

const router = new VueRouter({
    routes //（缩写）相当于 routes: routes
});

/* eslint-disable no-new */
const app = new Vue({
    el: '#app',
    template: '<App/>',
    components: { App },
    router,
    // store
});
