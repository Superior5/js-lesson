import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LessonOne from '../views/LessonOne.vue'
import LessonTwo from '../views/LessonTwo.vue'
import LessonThree from '../views/LessonThree.vue'
import LessonFour from '../views/LessonFour.vue'
import HttpLabTwo from '../views/HttpLabTwo.vue'
import HttpLabThree from '../views/HttpLabThree.vue'
import ExpressJsThree from '../views/ExpressJsThree.vue'
import ExpressJsFour from '../views/ExpressJsFour.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/1', name: 'lesson-one', component: LessonOne },
    { path: '/2', name: 'lesson-two', component: LessonTwo },
    { path: '/3', name: 'lesson-three', component: LessonThree },
    { path: '/4', name: 'lesson-four', component: LessonFour },
    { path: '/express-js-1', name: 'express-js-one', component: HttpLabTwo },
    { path: '/express-js-2', name: 'express-js-two', component: HttpLabThree },
    { path: '/express-js-3', name: 'express-js-three', component: ExpressJsThree },
    { path: '/express-js-4', name: 'express-js-four', component: ExpressJsFour },
    { path: '/http-lab-2', redirect: to => ({ path: '/express-js-1', query: to.query, hash: to.hash }) },
    { path: '/http-lab-3', redirect: to => ({ path: '/express-js-2', query: to.query, hash: to.hash }) },
    { path: '/:pathMatch(.*)*', redirect: '/1' },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth', top: 92 }
    return { top: 0 }
  },
})

export default router
