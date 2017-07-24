// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'

import Axios from 'axios'
import '@/common/upload'

Vue.use(ElementUI)
Vue.component(CollapseTransition.name, CollapseTransition)

Vue.prototype.$http = Axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
