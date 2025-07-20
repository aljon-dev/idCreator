import { createRouter, createWebHistory } from 'vue-router'
import LoginForm from '../views/LoginForm.vue'
import SignupForm from '../views/SignupForm.vue'
import DashboardLayout from '../views/DashboardLayout.vue'
import Dashboard from '../views/Dashboard.vue'
import Orders from '../views/Orders.vue'
import CreateOrder from '../views/CreateOrder.vue'
import Settings from '../views/Settings.vue'
import FrontPageForm  from '../views/FrontPageForm.vue';
import Templates from '../views/Templates.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'frontPage',
      component: FrontPageForm,
    },
    {
      path: '/signup',
      name: 'Signup',
      component: SignupForm,
    },
    {
        path: '/Login',
      name: 'Login',
      component: LoginForm,

    },

    {
      path: '/',
      component: DashboardLayout,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard,
        },
        {
          path: 'orders',
          name: 'Orders',
          component: Orders,
        },
        {
          path: 'create-order',
          name: 'CreateOrder',
          component: CreateOrder,
        },
        {
          path: '/review-order',
          name: 'ReviewOrder',
          component: () => import('../views/ReviewOrder.vue'),
        },
         {
          path: 'templates',
          name: 'Templates',
          component: Templates,
        },

        {
          path: 'settings',
          name: 'Settings',
          component: Settings,
        },
      ],
    },
  ],
})

export default router
