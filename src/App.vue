<script setup>
import LessonOne from './views/LessonOne.vue'
import HttpLabTwo from './views/HttpLabTwo.vue'

const path = window.location.pathname.replace(/\/$/, '') || '/'
</script>

<template>
  <HttpLabTwo v-if="path === '/http-lab-2'" />
  <LessonOne v-else />
</template>
