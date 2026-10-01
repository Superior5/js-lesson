<script setup>
import { FlaskConical, Route } from 'lucide-vue-next'
defineProps({ items: Array, activeId: String, open: Boolean })
defineEmits(['navigate', 'close'])
</script>

<template>
  <div v-if="open" class="lab-sidebar-backdrop" @click="$emit('close')" />
  <aside class="lab-sidebar" :class="{ open }" aria-label="Содержание лабораторной работы">
    <div class="lab-sidebar-title"><FlaskConical :size="16" /><span><small>ЛАБОРАТОРНАЯ № 2</small>Содержание работы</span></div>
    <nav>
      <a v-for="([id, label], index) in items" :key="id" :href="`#${id}`" :class="{ active: activeId === id }" @click="$emit('navigate', id)"><span>{{ String(index + 1).padStart(2, '0') }}</span>{{ label }}</a>
    </nav>
    <div class="lab-sidebar-goal"><Route :size="18" /><p><strong>Результат</strong>Работающий API с маршрутами GET и POST</p></div>
  </aside>
</template>
