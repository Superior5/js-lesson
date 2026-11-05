<script setup>
import { onMounted } from 'vue'
import { ArrowRight, BookOpenText, Code2, Server } from 'lucide-vue-next'
import { lessons } from '../data/lessons'
import { expressLessons } from '../data/expressLessons'

onMounted(() => {
  document.title = 'Учебные курсы — JavaScript и Express.js'
  if (!document.documentElement.dataset.theme) {
    document.documentElement.dataset.theme = localStorage.getItem('lesson-theme')
      || localStorage.getItem('lab-theme')
      || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  }
})
</script>

<template>
  <main class="courses-home">
    <header class="courses-intro">
      <span class="courses-label"><BookOpenText :size="18" /> Учебные курсы</span>
      <h1>Что будем изучать?</h1>
      <p>Выберите курс и переходите к занятиям. В каждом уроке есть объяснения, примеры и задания для практики.</p>
    </header>

    <nav class="courses-grid" aria-label="Выбор учебного курса">
      <RouterLink class="course-tile javascript-tile" :to="lessons[0].path">
        <span class="course-tile-top"><span class="course-tile-icon"><Code2 :size="28" /></span><span>{{ lessons.length }} занятия</span></span>
        <h2>JavaScript</h2>
        <p>Основы программирования: от первых программ и переменных до условий и циклов.</p>
        <span class="course-tile-topics">Node.js · Типы данных · Операторы · Циклы</span>
        <span class="course-tile-action">Перейти к занятиям <ArrowRight :size="20" /></span>
      </RouterLink>
      <RouterLink class="course-tile express-tile" :to="expressLessons[0].path">
        <span class="course-tile-top"><span class="course-tile-icon"><Server :size="28" /></span><span>{{ expressLessons.length }} занятия</span></span>
        <h2>Express.js</h2>
        <p>Серверная разработка: HTTP, создание API, маршруты, проверка данных и обработка ошибок.</p>
        <span class="course-tile-topics">HTTP · REST API · Middleware · Router</span>
        <span class="course-tile-action">Перейти к занятиям <ArrowRight :size="20" /></span>
      </RouterLink>
    </nav>
  </main>
</template>

<style scoped>
.courses-home { max-width:1100px; margin:0 auto; padding:90px 28px; }
.courses-intro { max-width:650px; margin-bottom:44px; }
.courses-label { display:inline-flex; align-items:center; gap:9px; color:var(--accent); font-size:13px; font-weight:800; }
.courses-intro h1 { margin:18px 0 16px; font-size:clamp(34px,5vw,54px); line-height:1.15; letter-spacing:-.045em; }
.courses-intro p { margin:0; color:var(--muted); }
.courses-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:24px; }
.course-tile { --tile-accent:var(--accent); --tile-soft:var(--accent-soft); display:flex; flex-direction:column; padding:32px; border:1px solid var(--line); border-radius:22px; background:var(--surface); box-shadow:var(--shadow); text-decoration:none; transition:transform .2s,border-color .2s; }
.express-tile { --tile-accent:#087f8c; --tile-soft:#e6f6f5; }
:global([data-theme="dark"]) .express-tile { --tile-accent:#35c7c4; --tile-soft:#183536; }
.course-tile:hover { transform:translateY(-4px); border-color:var(--tile-accent); }
.course-tile-top { display:flex; align-items:center; justify-content:space-between; gap:16px; color:var(--muted); font-size:12px; font-weight:700; }
.course-tile-icon { display:grid; width:58px; height:58px; place-items:center; border-radius:15px; color:var(--tile-accent); background:var(--tile-soft); }
.course-tile h2 { margin:24px 0 10px; font-size:30px; line-height:1.2; letter-spacing:-.03em; }
.course-tile p { margin:0 0 20px; color:var(--muted); font-size:15px; }
.course-tile-topics { margin-bottom:30px; color:var(--muted); font-size:12px; }
.course-tile-action { display:flex; align-items:center; justify-content:space-between; gap:12px; margin-top:auto; padding-top:20px; border-top:1px solid var(--line); color:var(--tile-accent); font-size:14px; font-weight:800; }
@media (max-width:700px) {
  .courses-home { padding:48px 20px; }
  .courses-intro { margin-bottom:30px; }
  .courses-grid { grid-template-columns:1fr; gap:18px; }
  .course-tile { padding:26px; }
}
</style>
