import Vue from 'vue'
import App from './App.vue'
import router from "./router/router.js"
import Antd from 'ant-design-vue/es';
import 'ant-design-vue/dist/antd.less';
// import VueRouter from 'vue-router'
Vue.config.productionTip = false
Vue.use(Antd);
// Vue.use(VueRouter);
new Vue({
  router,  // 注入到根实例中
  render: h => h(App),
}).$mount('#app')
