<script setup>
import HTTPMethodBadge from './HTTPMethodBadge.vue'

defineProps({
  method: { type: String, required: true },
  path: { type: String, required: true },
  description: String,
  status: [String, Number],
})
</script>

<template>
  <article class="endpoint-block">
    <div class="endpoint-line">
      <HTTPMethodBadge :method="method" />
      <code>{{ path }}</code>
      <span v-if="status" class="endpoint-status">{{ status }}</span>
    </div>
    <p v-if="description">{{ description }}</p>
    <slot />
  </article>
</template>
