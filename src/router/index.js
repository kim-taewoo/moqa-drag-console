import Vue from 'vue'
import Router from 'vue-router'
import Editor from '@/components/Editor'
import DashBoard from '@/components/DashBoard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'DashBoard',
      component: DashBoard
    },
    {
      path: '/edit-form',
      name: 'Editor',
      component: Editor
    }
  ]
})
