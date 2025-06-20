import { createRouter, createWebHistory } from 'vue-router'
import LoginForm from '../views/LoginForm.vue'
import SignupForm from '../views/SignupForm.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: LoginForm,
    },
    {
      path: '/Signup',
      name: 'signup',
      component: SignupForm,
    },
  ],
})

export default router
