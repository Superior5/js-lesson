<script setup>
import { ArrowRight, Server } from 'lucide-vue-next'
import CodeBlock from './CodeBlock.vue'

defineProps({
  request: { type: String, required: true },
  response: { type: String, required: true },
  requestLanguage: { type: String, default: 'http' },
  responseLanguage: { type: String, default: 'json' },
})
</script>

<template>
  <div class="request-response-example">
    <div><span>HTTP-ЗАПРОС</span><CodeBlock :code="request" :language="requestLanguage" /></div>
    <div class="express-step"><ArrowRight /><span><Server />Express</span><ArrowRight /></div>
    <div><span>HTTP-ОТВЕТ</span><CodeBlock :code="response" :language="responseLanguage" /></div>
  </div>
</template>
