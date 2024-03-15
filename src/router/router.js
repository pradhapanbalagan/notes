// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';

import SignupPage from '../components/SignupPage.vue';
import AcccountInit from '../components/AccountInit.vue'
import LoginPage from '../components/LoginPage.vue'
import WelcomPage from '../components/WelcomePage.vue'
import RootHome from '../components/RootHome.vue';
import ContactPage from '../components/ContactPage.vue';


const routes = [
  {
    name: 'home',
    path: '/',
    component: RootHome,
  },
  {
    name: 'Login',
    path: '/login',
    component: LoginPage,
  },
  {
    name: 'SignUp',
    path: '/signup',
    component: SignupPage,
  },
  {
    name: 'index',
    path: '/',
    component: AcccountInit,
    children: [
      {
        name: 'Welcome',
        path: '/welcome',
        component: WelcomPage,
      },
      {
        name: 'Contact',
        path: '/contact',
        component: ContactPage,
      },
     
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    redirect: '/'
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "active"
});

router.beforeEach((to,from, next) => {
  console.log("yes")
  // if(to.name === "Welcome"){
  //     router.push({name:"index"})
  // }
  console.log(to)
  console.log(from)
  
  next()
})

export default router;
