<script setup>
defineProps({ id: String, number: String, title: String, kicker: String })
</script>

<template>
  <section :id="id" class="lesson-section scroll-section">
    <div class="section-heading">
      <span class="section-number">{{ number }}</span>
      <div><small v-if="kicker">{{ kicker }}</small><h2>{{ title }}</h2></div>
    </div>
    <div class="section-content"><slot /></div>
  </section>
</template>
