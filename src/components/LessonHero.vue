<script setup>
import { Clock3, GraduationCap, Laptop } from 'lucide-vue-next'

defineProps({
  lesson: {
    type: Object,
    default: () => ({
      number: 1,
      title: 'Введение в программирование, JavaScript и Node.js',
      description: 'Разберёмся, что такое программа и алгоритм, познакомимся с JavaScript и научимся запускать первые программы с помощью Node.js.',
      duration: '90 минут',
      level: 'Начальный уровень',
      environment: 'Node.js',
      decoration: ['console', '.log', '( )'],
    }),
  },
})
</script>

<template>
  <section id="top" class="hero">
    <div class="eyebrow"><span>{{ String(lesson.number).padStart(2, '0') }}</span> Занятие {{ lesson.number }}</div>
    <h1>{{ lesson.title }}</h1>
    <p class="hero-lead">{{ lesson.description }}</p>
    <div class="hero-meta">
      <span><Clock3 :size="17" /> {{ lesson.duration }}</span>
      <span><GraduationCap :size="18" /> {{ lesson.level }}</span>
      <span><Laptop :size="17" /> {{ lesson.environment }}</span>
    </div>
    <div class="hero-decoration" aria-hidden="true"><span>{{ lesson.decoration[0] }}</span><strong>{{ lesson.decoration[1] }}</strong><i>{{ lesson.decoration[2] }}</i></div>
  </section>
</template>
