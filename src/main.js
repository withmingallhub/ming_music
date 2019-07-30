import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import Vant from 'vant';
import 'vant/lib/index.css';
import 'lib-flexible/flexible'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.use(Vant);
Vue.config.productionTip = false
Vue.use(iView);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  components: { App },
  template: '<App/>'
})
