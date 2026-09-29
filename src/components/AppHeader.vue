<script setup>
import { Menu, Moon, Sun, X } from 'lucide-vue-next'

defineProps({ theme: String, menuOpen: Boolean })
defineEmits(['toggle-theme', 'toggle-menu'])
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
