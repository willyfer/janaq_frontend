import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import NotFound from '../views/NotFound.vue'
Vue.use(VueRouter)
function guardMyroute(to, from, next) {
  var isAuthenticated = false;
  //this is just an example. You will have to find a better or 
  // centralised way to handle you localstorage data handling 
  if (localStorage.getItem('token'))
    isAuthenticated = true;
  else
    isAuthenticated = false;
  if (isAuthenticated) {
    next(); // allow to enter route
  }
  else {
    next('/login'); // go to '/login';
  }
}
const routes = [

  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: guardMyroute

  },
  {
    path: '/about',
    name: 'About',
    beforeEnter: guardMyroute,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    // will match everything else
    path: '*',
    name: "NotFound",
    component: NotFound
  }
]
function existToken() {
  return localStorage.getItem("token");
}
const router = new VueRouter({
  routes,
  mode: 'history',
})
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !existToken) next({ name: 'Login' })
  else next()
})
// router.beforeEach((to, from, next) => {
//   try {
//     if (to.name == 'Login' && existToken()) next({ name: 'Home' })
//     else next({ path: '/login' })
//   } catch (error) {
//     console.log(error)
//   }

// });
export default router
