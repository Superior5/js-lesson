<script setup>
import AppHeader from './AppHeader.vue'
import LessonSidebar from './LessonSidebar.vue'
import { useLessonPage } from '../composables/useLessonPage'

const props = defineProps({
  navigation: { type: Array, required: true },
  lessonNumber: { type: Number, required: true },
  title: { type: String, required: true },
})

const { theme, menuOpen, activeId, progress, toggleTheme, navigate } = useLessonPage(
  props.navigation[0]?.[0],
  `Занятие ${props.lessonNumber} — ${props.title}`,
)
</script>

<template>
  <div class="reading-progress" :style="{ transform: `scaleX(${progress / 100})` }" />
  <AppHeader :theme="theme" :menu-open="menuOpen" @toggle-theme="toggleTheme" @toggle-menu="menuOpen = !menuOpen" />
  <div class="app-shell">
    <LessonSidebar
      :items="navigation"
      :active-id="activeId"
      :open="menuOpen"
      :lesson-number="lessonNumber"
      :progress="progress"
      @navigate="navigate"
      @close="menuOpen = false"
    />
    <main><slot /></main>
  </div>
</template>
