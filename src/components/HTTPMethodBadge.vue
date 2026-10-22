<script setup>
import { computed } from 'vue'

const props = defineProps({ method: { type: String, required: true } })
const normalizedMethod = computed(() => props.method.toUpperCase())
</script>

<template>
  <span class="method-pill" :class="normalizedMethod.toLowerCase()">{{ normalizedMethod }}</span>
</template>
