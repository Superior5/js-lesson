import { createRouter, createWebHistory } from 'vue-router'
import LessonOne from '../views/LessonOne.vue'
import LessonTwo from '../views/LessonTwo.vue'
import LessonThree from '../views/LessonThree.vue'
import HttpLabTwo from '../views/HttpLabTwo.vue'
import HttpLabThree from '../views/HttpLabThree.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/1' },
    { path: '/1', name: 'lesson-one', component: LessonOne },
    { path: '/2', name: 'lesson-two', component: LessonTwo },
    { path: '/3', name: 'lesson-three', component: LessonThree },
    { path: '/http-lab-2', name: 'http-lab-two', component: HttpLabTwo },
    { path: '/http-lab-3', name: 'http-lab-three', component: HttpLabThree },
    { path: '/:pathMatch(.*)*', redirect: '/1' },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth', top: 92 }
    return { top: 0 }
  },
})

export default router
