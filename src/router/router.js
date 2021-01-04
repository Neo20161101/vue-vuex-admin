import Vue from "vue";
import VueRouter from "vue-router";

// 引入组件
import home from "../view/home/home.vue";
const Login = () => import('../view/user/login.vue')
const tacos = () => import('../view/tacos/tacos.vue')
const about = () => import('../view/about/about.vue')
const notfound = () => import('../notfound/404.vue')
// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        component: home,
        children: [
            {
                // 当 /home 匹配成功，
                // UserProfile 会被渲染在 User 的 <router-view> 中
                path: 'home',
                component: tacos
            },
            {
                path: 'BasisInfo',
                component: () => import('../view/youping/youping.vue'),
                children: [
                    {
                        // 当 /BasisInfo 匹配成功，
                        // UserProfile 会被渲染在 User 的 <router-view> 中
                        path: '0',
                        component: () => import('../view/youping/youping.vue')
                    },
                    {
                        path: '1',
                        component: about
                    },
                    {
                        path: '*',
                        component: notfound
                    }
                ]
            },   // 重定向
            {
                path: '/',
                redirect: '/home'
            }
        ]
    },
    {
        path: "/login",
        component: Login
    },
    {
        path: '*',
        component: notfound
    }
]

var router = new VueRouter({
    mode: 'history',
    routes
})
export default router;