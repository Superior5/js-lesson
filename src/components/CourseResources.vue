<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { BookOpenText, Check, ChevronDown, Download } from 'lucide-vue-next'

defineProps({ lessons: { type: Array, required: true }, courseLabel: { type: String, required: true } })

const route = useRoute()
const courseMenu = ref(null)
const nodeDownloadUrl = `${import.meta.env.BASE_URL}downloads/node-v26.13.0-x64.msi`

function closeCourseMenu() {
  courseMenu.value?.removeAttribute('open')
}

function closeCourseMenuFromOutside(event) {
  if (!courseMenu.value?.contains(event.target)) closeCourseMenu()
}

watch(() => route.path, closeCourseMenu)
onMounted(() => document.addEventListener('pointerdown', closeCourseMenuFromOutside))
onBeforeUnmount(() => document.removeEventListener('pointerdown', closeCourseMenuFromOutside))
</script>

<template>
  <details ref="courseMenu" class="course-menu" @keydown.esc="closeCourseMenu">
    <summary :title="`Открыть список занятий ${courseLabel}`" :aria-label="`Уроки ${courseLabel}`">
      <BookOpenText :size="17" />
      <span>Уроки</span>
      <ChevronDown :size="14" />
    </summary>
    <nav class="course-menu-panel" :aria-label="`Занятия курса ${courseLabel}`">
      <div class="course-menu-heading">
        <small>{{ courseLabel }}</small>
        <strong>Занятия курса</strong>
      </div>
      <RouterLink
        v-for="item in lessons"
        :key="item.path"
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
    aria-label="Скачать Node.js 26.13.0 LTS для Windows x64"
  >
    <Download :size="17" />
    <span>Скачать Node.js</span>
    <small>LTS · Windows x64</small>
  </a>
</template>
