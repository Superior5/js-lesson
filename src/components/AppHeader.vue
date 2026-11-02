<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { BookOpenText, Check, ChevronDown, Download, Menu, Moon, Sun, X } from 'lucide-vue-next'
import { lessons } from '../data/lessons'

defineProps({ theme: String, menuOpen: Boolean })
defineEmits(['toggle-theme', 'toggle-menu'])

const route = useRoute()
const courseMenu = ref(null)
const nodeDownloadUrl = `${import.meta.env.BASE_URL}downloads/node-v26.13.0-x64.msi`

function closeCourseMenu() {
  courseMenu.value?.removeAttribute('open')
}

function closeCourseMenuFromOutside(event) {
  if (!courseMenu.value?.contains(event.target)) closeCourseMenu()
}

onMounted(() => document.addEventListener('pointerdown', closeCourseMenuFromOutside))
onBeforeUnmount(() => document.removeEventListener('pointerdown', closeCourseMenuFromOutside))
</script>

<template>
  <header class="app-header">
    <div class="header-inner">
      <a class="brand" href="#top" aria-label="К началу занятия">
        <span class="brand-mark">JS</span>
        <span class="brand-copy">
          <strong>Основы программирования</strong>
          <small>JavaScript <i /> 1 курс</small>
        </span>
      </a>
      <div class="header-actions">
        <details ref="courseMenu" class="course-menu">
          <summary title="Открыть список занятий">
            <BookOpenText :size="17" />
            <span>Уроки</span>
            <ChevronDown :size="14" />
          </summary>
          <nav class="course-menu-panel" aria-label="Занятия курса JavaScript">
            <div class="course-menu-heading">
              <small>ОСНОВЫ JAVASCRIPT</small>
              <strong>Занятия курса</strong>
            </div>
            <RouterLink
              v-for="item in lessons"
              :key="item.id"
              :to="item.path"
              :class="{ active: route.path === item.path }"
              :aria-current="route.path === item.path ? 'page' : undefined"
              @click="closeCourseMenu"
            >
              <span class="course-lesson-number">{{ String(item.number).padStart(2, '0') }}</span>
              <span class="course-lesson-copy">
                <strong>Занятие {{ item.number }}</strong>
                <small>{{ item.shortTitle }}</small>
              </span>
              <Check v-if="route.path === item.path" :size="16" />
            </RouterLink>
          </nav>
        </details>
        <a
          class="node-download"
          :href="nodeDownloadUrl"
          download="node-v26.13.0-x64.msi"
          title="Скачать Node.js 26.13.0 LTS для Windows x64"
        >
          <Download :size="17" />
          <span>Скачать Node.js</span>
          <small>LTS · Windows x64</small>
        </a>
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
