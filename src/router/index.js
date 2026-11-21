import { createRouter, createWebHistory } from 'vue-router'

const HomeView = () => import('../views/HomeView.vue')
const LessonOne = () => import('../views/LessonOne.vue')
const LessonTwo = () => import('../views/LessonTwo.vue')
const LessonThree = () => import('../views/LessonThree.vue')
const LessonFour = () => import('../views/LessonFour.vue')
const LessonFive = () => import('../views/LessonFive.vue')
const LessonSix = () => import('../views/LessonSix.vue')
const HttpLabTwo = () => import('../views/HttpLabTwo.vue')
const HttpLabThree = () => import('../views/HttpLabThree.vue')
const ExpressJsThree = () => import('../views/ExpressJsThree.vue')
const ExpressJsFour = () => import('../views/ExpressJsFour.vue')
const WebCssOne = () => import('../views/WebCssOne.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/1', name: 'lesson-one', component: LessonOne },
    { path: '/2', name: 'lesson-two', component: LessonTwo },
    { path: '/3', name: 'lesson-three', component: LessonThree },
    { path: '/4', name: 'lesson-four', component: LessonFour },
    { path: '/5', name: 'lesson-five', component: LessonFive },
    { path: '/6', name: 'lesson-six', component: LessonSix },
    { path: '/web-css-1', name: 'web-css-one', component: WebCssOne },
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
