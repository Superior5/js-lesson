<script setup>
defineProps({ id: String, number: String, title: String, label: String })
</script>

<template>
  <section :id="id" class="http-section lab-observe">
    <header class="http-section-heading"><span>{{ number }}</span><div><small v-if="label">{{ label }}</small><h2>{{ title }}</h2></div></header>
    <div class="http-section-content"><slot /></div>
  </section>
</template>
