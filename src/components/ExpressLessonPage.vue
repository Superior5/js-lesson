<script setup>
import { ArrowLeft, ArrowRight, BookCheck, CheckCircle2, Clock3, Code2, FlaskConical, Route } from 'lucide-vue-next'
import LabHeader from './LabHeader.vue'
import LabSidebar from './LabSidebar.vue'
import LabSection from './LabSection.vue'
import { useLabPage } from '../composables/useLabPage'
import '../styles/http-lab.css'

const props = defineProps({ lesson: { type: Object, required: true } })
const { theme, menuOpen, activeId, progress, toggleTheme, navigate } = useLabPage(
  props.lesson.navigation[0][0], `Express № ${props.lesson.number} — ${props.lesson.title}`,
)
</script>

<template>
  <div class="lab-page lab-three-page">
    <div class="lab-reading-progress" :style="{ transform: `scaleX(${progress / 100})` }" />
    <LabHeader :theme="theme" :menu-open="menuOpen" :lab-number="lesson.number" mark="EXP" :back-to="lesson.previous.path" :back-label="`Занятие № ${lesson.number - 1}`" @toggle-theme="toggleTheme" @toggle-menu="menuOpen = !menuOpen" />
    <div class="lab-layout">
      <LabSidebar :items="lesson.navigation" :active-id="activeId" :open="menuOpen" :lab-number="lesson.number" :result="lesson.result" @navigate="navigate" @close="menuOpen = false" />
      <main class="lab-main">
        <section id="lab-top" class="lab-hero lab-three-hero">
          <div class="lab-hero-grid">
            <div class="lab-hero-copy">
              <div class="lab-eyebrow"><FlaskConical :size="15" /> Express · занятие № {{ lesson.number }}</div>
              <h1>{{ lesson.title }}</h1><p>{{ lesson.description }}</p>
              <div class="lab-meta"><span><Clock3 :size="17" /> 90 минут</span><span><Code2 :size="17" /> Для начинающих · Express 5</span></div>
            </div>
            <div class="rest-resource-card" aria-label="План занятия"><header><span>Учимся по шагам</span><small>{{ lesson.number === 3 ? 'Часть 1 из 2' : 'Часть 2 из 2' }}</small></header><div v-for="(step, index) in lesson.steps" :key="step"><b>{{ index + 1 }}</b><span>{{ step }}</span></div><footer><Route :size="16" /> {{ lesson.result }}</footer></div>
          </div>
        </section>
        <div class="lab-content">
          <aside class="lab-goal"><span><Route /></span><div><small>ЧЕМУ НАУЧИМСЯ</small><p>{{ lesson.goal }}</p></div></aside>
          <slot />
        </div>
        <section id="practice" class="lab-practice lab-observe"><div class="lab-content"><header class="practice-title"><span><FlaskConical /></span><div><small>ТЕПЕРЬ САМОСТОЯТЕЛЬНО</small><h2>Небольшая практика</h2><p>Выполняйте по одному заданию и сразу проверяйте результат.</p></div></header><div class="lab-task-list"><article v-for="(task, index) in lesson.practice" :key="task.title"><span class="task-num">{{ index + 1 }}</span><div><h3>{{ task.title }}</h3><p>{{ task.text }}</p><p><strong>Проверка:</strong> {{ task.check }}</p></div><CheckCircle2 class="task-check" :size="18" /></article></div></div></section>
        <div class="lab-content lab-bottom">
          <section id="questions" class="questions-section lab-observe"><header><span>Q&amp;A</span><div><small>МОЖНО ОТКРЫТЬ ОТВЕТ</small><h2>Проверьте понимание</h2></div></header><div class="lab-question-list"><details v-for="([question, answer], index) in lesson.questions" :key="question"><summary><span>{{ index + 1 }}</span>{{ question }}</summary><p>{{ answer }}</p></details></div></section>
          <LabSection id="homework" title="Домашнее задание"><p>{{ lesson.homework.intro }}</p><ol class="lab-rules"><li v-for="task in lesson.homework.tasks" :key="task">{{ task }}</li></ol><p>{{ lesson.homework.check }}</p></LabSection>
          <section id="submission" class="submission lab-observe"><div class="submission-main"><span><BookCheck /></span><div><small>РЕЗУЛЬТАТ ЗАНЯТИЯ</small><h2>Что показать преподавателю</h2><p>Работающий проект и объяснение своими словами.</p></div></div><div class="criteria-grid"><span v-for="(criterion, index) in lesson.criteria" :key="criterion"><b>{{ index + 1 }}</b>{{ criterion }}</span></div></section>
          <nav class="lab-series-nav" :class="{ 'two-sided': lesson.next }" aria-label="Навигация между занятиями Express"><RouterLink class="lab-series-link previous" :to="lesson.previous.path"><ArrowLeft /><span><small>ПРЕДЫДУЩЕЕ ЗАНЯТИЕ</small><strong>Express № {{ lesson.number - 1 }}</strong><em>{{ lesson.previous.title }}</em></span></RouterLink><RouterLink v-if="lesson.next" class="lab-series-link next" :to="lesson.next.path"><span><small>СЛЕДУЮЩЕЕ ЗАНЯТИЕ</small><strong>Express № {{ lesson.number + 1 }}</strong><em>{{ lesson.next.title }}</em></span><ArrowRight /></RouterLink></nav>
          <footer class="lab-footer"><span class="lab-brand-mark small">EXP</span><p>Серверная веб-разработка · Занятие № {{ lesson.number }}</p><a href="#lab-top">Наверх ↑</a></footer>
        </div>
      </main>
    </div>
  </div>
</template>
