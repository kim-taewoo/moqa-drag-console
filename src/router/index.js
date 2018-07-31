import Vue from 'vue'
import Router from 'vue-router'
import Editor from '@/components/Editor'
import Support from '@/components/Support'
import DashBoard from '@/components/DashBoard'
import BasicSetting from '@/components/BasicSetting'
import AddGroup from '@/components/AddGroup'
import Step1 from '@/components/Step1'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'DashBoard',
      component: DashBoard
    },
    {
      path: '/addGroup',
      name: 'AddGroup',
      component: AddGroup
    },
    {
      path: '/support',
      name: 'Support',
      component: Support
    },
    {
      path: '/edit-form',
      name: 'Editor',
      component: Editor
    },
    {
      path: '/basic-setting',
      name: 'BasicSetting',
      component: BasicSetting,
      children: [
        {
          path: 'step1',
          component: Step1
        }
      ]
    }
  ]
})
