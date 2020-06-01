import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import demo from '@/components/demo'
import nav from '@/components/nav'
import chooseone from '@/components/chooseone'
import choosetwo from '@/components/choosetwo'
import time from '@/components/time'

Vue.use(Router)
//解决同一个路由被多次添加
const VueRouterPush = Router.prototype.push 
Router.prototype.push = function push (to) {
    return VueRouterPush.call(this, to).catch(err => err)
}
export default new Router({
  routes: [
    {
      path: '/',
      name: 'nav',
      component: nav,
      redirect:'/index',
     children:[{
        path: '/index',
        name: 'index',
        component: index
      },
      {
        path: '/demo',
        name: 'demo',
        component: demo
      },
      {
        path: '/chooseone',
        name: 'chooseone',
        component: chooseone
      },
      {
        path: '/choosetwo',
        name: 'choosetwo',
        component: choosetwo
      }]
    },
      //    {
      //   path: '/time',
      //   name: 'time',
      //   component: time
      // },
    
  ]
})
