<script setup>
import { Menu, Moon, Sun, X } from 'lucide-vue-next'
import CourseResources from './CourseResources.vue'
import { lessons } from '../data/lessons'

defineProps({
  theme: String,
  menuOpen: Boolean,
  courseLessons: { type: Array, default: () => lessons },
  courseLabel: { type: String, default: 'Основы JavaScript' },
  brandTitle: { type: String, default: 'Основы программирования' },
  brandSubtitle: { type: String, default: 'JavaScript · 1 курс' },
  brandMark: { type: String, default: 'JS' },
  showNodeDownload: { type: Boolean, default: true },
})
defineEmits(['toggle-theme', 'toggle-menu'])
</script>

<template>
  <header class="app-header">
    <div class="header-inner">
      <a class="brand" href="#top" aria-label="К началу занятия">
        <span class="brand-mark">{{ brandMark }}</span>
        <span class="brand-copy">
          <strong>{{ brandTitle }}</strong>
          <small>{{ brandSubtitle }}</small>
        </span>
      </a>
      <div class="header-actions">
        <CourseResources :lessons="courseLessons" :course-label="courseLabel" :show-node-download="showNodeDownload" />
        <button class="icon-button" type="button" :aria-label="theme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему'" @click="$emit('toggle-theme')">
          <Sun v-if="theme === 'dark'" :size="18" />
          <Moon v-else :size="18" />
        </button>
        <button class="icon-button menu-button" type="button" :aria-label="menuOpen ? 'Закрыть содержание' : 'Открыть содержание'" :aria-expanded="menuOpen" @click="$emit('toggle-menu')">
          <X v-if="menuOpen" :size="20" />
          <Menu v-else :size="20" />
        </button>
      </div>
    </div>
  </header>
</template>
