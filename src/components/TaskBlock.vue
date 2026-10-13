<script setup>
import { Circle, FileCode2, TerminalSquare, Timer } from 'lucide-vue-next'
import CodeBlock from './CodeBlock.vue'
defineProps({ task: Object, index: Number })
</script>

<template>
  <article class="task-card">
    <div class="task-top"><span class="task-index">ЗАДАНИЕ {{ String(index + 1).padStart(2, '0') }}</span><span class="difficulty" :class="`difficulty-${task.difficulty || 'легко'}`"><Circle :size="8" fill="currentColor" /> {{ task.difficulty || 'легко' }}</span></div>
    <h3>{{ task.title }}</h3>
    <p>{{ task.text }}</p>
    <CodeBlock v-if="task.code" :code="task.code" language="javascript" />
    <div v-if="task.file || task.output" class="task-details">
      <span v-if="task.file"><FileCode2 :size="14" /> Файл: <code>{{ task.file }}</code></span>
      <span v-if="task.output"><TerminalSquare :size="14" /> {{ task.output }}</span>
    </div>
    <p v-if="task.hint" class="task-hint"><strong>Подсказка:</strong> {{ task.hint }}</p>
    <div class="task-tags"><span v-for="tag in task.tags" :key="tag"><Timer v-if="tag.includes('мин')" :size="13" />{{ tag }}</span></div>
  </article>
</template>
