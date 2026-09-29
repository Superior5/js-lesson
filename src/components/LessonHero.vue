<script setup>
import { Clock3, GraduationCap, Laptop } from 'lucide-vue-next'
</script>

<template>
  <section id="top" class="hero">
    <div class="eyebrow"><span>01</span> Занятие 1</div>
    <h1>Введение в программирование, <em>JavaScript</em> и Node.js</h1>
    <p class="hero-lead">Разберёмся, что такое программа и алгоритм, познакомимся с JavaScript и научимся запускать первые программы с помощью Node.js.</p>
    <div class="hero-meta">
      <span><Clock3 :size="17" /> 90 минут</span>
      <span><GraduationCap :size="18" /> Начальный уровень</span>
      <span><Laptop :size="17" /> Практика</span>
    </div>
    <div class="hero-decoration" aria-hidden="true"><span>console</span><strong>.log</strong><i>( )</i></div>
  </section>
</template>
