import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import Vant from 'vant';
import { Slider } from 'vant';
import { ActionSheet } from 'vant';
import { Icon } from 'vant';
import 'vant/lib/index.css';
import 'lib-flexible/flexible'
import Vuex from 'vuex'
import 'font-awesome/css/font-awesome.min.css'

Vue.use(Vuex)
Vue.use(Vant);
Vue.use(ActionSheet)
Vue.use(Slider);
Vue.use(Icon)
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
