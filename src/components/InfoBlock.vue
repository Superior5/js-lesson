<script setup>
import { CircleAlert, Info, Lightbulb, Sparkles } from 'lucide-vue-next'
const icons = { info: Info, tip: Lightbulb, warning: CircleAlert, important: Sparkles }
const labels = { info: 'Обратите внимание', tip: 'Подсказка', warning: 'Осторожно', important: 'Важно' }
defineProps({ type: { type: String, default: 'info' }, title: String })
</script>

<template>
  <aside class="info-block" :class="`info-${type}`">
    <component :is="icons[type]" :size="20" />
    <div><strong>{{ title || labels[type] }}</strong><slot /></div>
  </aside>
</template>
