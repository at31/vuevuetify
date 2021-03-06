// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
// import {sync} from 'vuex-router-sync';
import store from './store'; // vuex store instance
import router from './router'; // vue-router instance
// import VueMaterial from 'vue-material';
import Vuetify from 'vuetify';
// import page from 'page';

// Vue.use(VueMaterial);
// sync(store, router);
Vue.use(Vuetify);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App}
});
