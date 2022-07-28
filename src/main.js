import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 加载VANT核心组件库
import Vant from 'vant'

// 加载Vant全局样式
import 'vant/lib/index.css'

// 加载全局样式
import './styles/index.less'

// 动态设置rem基准值
import 'amfe-flexible'

// 注册使用vant组件库
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
