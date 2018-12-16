import Vue from 'vue'
import Router from 'vue-router'

// importing components to control with router
import Whoiam from '@/components/whoiam/Whoiam';
import Portfolio from '@/components/portfolio/Portfolio';
import Contact from '@/components/contact/Contact';

Vue.use(Router)

export let router = new Router({
  // mode: "history",
  routes: [
    {
      path: '/whoiam',
      name: 'whoiam',
      component: Whoiam
    },
    {
      path: '/portfolio',
      name: 'portfolio',
      component: Portfolio
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact
    }
  ]
})

/*
  history mode must be set for using vue-router in IE ??
*/

router.beforeEach((to, from, next) => {

  if(to.matched.length === 0) next(false);
  else next();

});
