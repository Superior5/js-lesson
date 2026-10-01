<script setup>
import { ArrowLeft, Menu, Moon, Sun, X } from 'lucide-vue-next'

defineProps({ theme: String, menuOpen: Boolean })
defineEmits(['toggle-theme', 'toggle-menu'])
</script>

<template>
  <header class="lab-header">
    <div class="lab-header-inner">
      <a class="lab-back" href="/" aria-label="Вернуться к основам программирования"><ArrowLeft :size="17" /><span>Все дисциплины</span></a>
      <a class="lab-brand" href="#lab-top" aria-label="К началу лабораторной">
        <span class="lab-brand-mark">HTTP</span>
        <span><strong>Серверная веб-разработка</strong><small>Node.js · Express</small></span>
      </a>
      <div class="lab-header-actions">
        <span class="lab-number">Лабораторная 02</span>
        <button type="button" class="lab-icon-button" :aria-label="theme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему'" @click="$emit('toggle-theme')"><Sun v-if="theme === 'dark'" :size="18" /><Moon v-else :size="18" /></button>
        <button type="button" class="lab-icon-button lab-menu-button" :aria-label="menuOpen ? 'Закрыть содержание' : 'Открыть содержание'" :aria-expanded="menuOpen" @click="$emit('toggle-menu')"><X v-if="menuOpen" :size="20" /><Menu v-else :size="20" /></button>
      </div>
    </div>
  </header>
</template>
