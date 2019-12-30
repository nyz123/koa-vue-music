import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import Vant, { Lazyload } from 'vant';
import router from './router';
import 'vant/lib/index.css';

Vue.use(Lazyload)
Vue.use(Vant);
Vue.use(VueAxios,axios)
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
