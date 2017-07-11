import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home/Home.vue'

import Login from '../views/Login/Login.vue'
import Register from '../views/Register/Register.vue'

import Settings from '../views/Settings/Settings.vue'

import Live from '../views/Live/Live.vue'
import Recommend from '../views/Recommend/Recommend.vue'
import Comic from '../views/Comic/Comic.vue'
import Partition from '../views/Partition/Partition.vue'
import Dynamic from '../views/Dynamic/Dynamic.vue'
import Find from '../views/Find/Find.vue'

// 推荐详情页
import Recom from '../views/Recommend/Recom.vue'

Vue.use(VueRouter)
//判断路由，并执行动画
VueRouter.prototype.goBack = function () {
  this.isBack = true
  window.history.go(-1)
}

let router = new VueRouter({
    mode:'history',
    routes:[{
        path:'/',
        component:Home,
        redirect:'/Home/Recommend'
    },{
        path:'/Login',
        component:Login,
        name:'登录'
    },{
        path:'/Register',
        component:Register,
        name:'注册'
    },{
        path:'/Settings',
        component:Settings,
        name:'设置'
    },{
        path:'/Home',
        component:Home,
        name:'首页',
        children:[{
            path:'Live',
            component:Live,
            name:'直播'
        },{
            path:'Recommend',
            component:Recommend,
            name:'推荐'
        },{
            path:'Comic',
            component:Comic,
            name:'追番'
        },{
            path:'Partition',
            component:Partition,
            name:'分区'
        },{
            path:'Dynamic',
            component:Dynamic,
            name:'动态'
        },{
            path:'Find',
            component:Find,
            name:'发现'
        }]
    },{
            path:'/Recommend/:id',
            component:Recom,
            name:'推荐详情'
        }]
})


export default router