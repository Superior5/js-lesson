<script setup>
import { Circle, Timer } from 'lucide-vue-next'
import CodeBlock from './CodeBlock.vue'
defineProps({ task: Object, index: Number })
</script>

<template>
  <article class="task-card">
    <div class="task-top"><span class="task-index">{{ String(index + 1).padStart(2, '0') }}</span><span class="difficulty"><Circle :size="8" fill="currentColor" /> легко</span></div>
    <h3>{{ task.title }}</h3>
    <p>{{ task.text }}</p>
    <CodeBlock v-if="task.code" :code="task.code" language="javascript" />
    <div class="task-tags"><span v-for="tag in task.tags" :key="tag"><Timer v-if="tag.includes('мин')" :size="13" />{{ tag }}</span></div>
  </article>
</template>
