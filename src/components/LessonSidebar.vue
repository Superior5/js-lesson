<script setup>
import { BookOpen, Check } from 'lucide-vue-next'

defineProps({ items: Array, activeId: String, open: Boolean })
defineEmits(['navigate', 'close'])
</script>

<template>
  <div v-if="open" class="sidebar-backdrop" @click="$emit('close')" />
  <aside class="sidebar" :class="{ open }" aria-label="Содержание занятия">
    <div class="sidebar-label"><BookOpen :size="15" /> Содержание занятия</div>
    <nav>
      <a v-for="([id, label], index) in items" :key="id" :href="`#${id}`" :class="{ active: activeId === id }" @click="$emit('navigate', id)">
        <span class="nav-number"><Check v-if="activeId === id" :size="12" /><template v-else>{{ index + 1 }}</template></span>
        <span>{{ label }}</span>
      </a>
    </nav>
    <div class="sidebar-progress">
      <span>Занятие 1 из 12</span>
      <div><i /></div>
    </div>
  </aside>
</template>
