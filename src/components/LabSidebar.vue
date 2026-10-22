<script setup>
import { FlaskConical, Route } from 'lucide-vue-next'
defineProps({
  items: Array,
  activeId: String,
  open: Boolean,
  labNumber: { type: [Number, String], default: 2 },
  result: { type: String, default: 'Работающий API с маршрутами GET и POST' },
})
defineEmits(['navigate', 'close'])
</script>

<template>
  <div v-if="open" class="lab-sidebar-backdrop" @click="$emit('close')" />
  <aside class="lab-sidebar" :class="{ open }" aria-label="Содержание лабораторной работы">
    <div class="lab-sidebar-title"><FlaskConical :size="16" /><span><small>ЛАБОРАТОРНАЯ № {{ labNumber }}</small>Содержание работы</span></div>
    <nav>
      <a v-for="([id, label], index) in items" :key="id" :href="`#${id}`" :class="{ active: activeId === id }" @click="$emit('navigate', id)"><span>{{ String(index + 1).padStart(2, '0') }}</span>{{ label }}</a>
    </nav>
    <div class="lab-sidebar-goal"><Route :size="18" /><p><strong>Результат</strong>{{ result }}</p></div>
  </aside>
</template>
