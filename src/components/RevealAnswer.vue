<script setup>
import { ref } from 'vue'
import { ChevronDown, Eye, EyeOff } from 'lucide-vue-next'
import CodeBlock from './CodeBlock.vue'

defineProps({
  code: { type: String, required: true },
  answer: { type: String, required: true },
  explanation: { type: String, required: true },
  title: { type: String, default: 'Какой будет результат?' },
})

const open = ref(false)
</script>

<template>
  <article class="reveal-card">
    <div class="reveal-heading"><span>ПРОВЕРЬТЕ СЕБЯ</span><h3>{{ title }}</h3></div>
    <CodeBlock :code="code" language="javascript" />
    <button type="button" :aria-expanded="open" @click="open = !open">
      <EyeOff v-if="open" :size="17" /><Eye v-else :size="17" />
      {{ open ? 'Скрыть ответ' : 'Показать ответ' }}
      <ChevronDown :size="16" :class="{ rotated: open }" />
    </button>
    <div v-if="open" class="reveal-answer" role="status">
      <CodeBlock :code="answer" language="text" label="Результат" />
      <p>{{ explanation }}</p>
    </div>
  </article>
</template>
