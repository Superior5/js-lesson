<script setup>
import { computed, ref } from 'vue'
import { Check, Copy } from 'lucide-vue-next'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import bash from 'highlight.js/lib/languages/bash'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('bash', bash)

const props = defineProps({ code: { type: String, required: true }, language: { type: String, default: 'javascript' }, label: String })
const copied = ref(false)
const cleanCode = computed(() => props.code.trim())
const highlighted = computed(() => props.language === 'text' ? escapeHtml(cleanCode.value) : hljs.highlight(cleanCode.value, { language: props.language }).value)
const languageLabel = computed(() => props.label || ({ javascript: 'JavaScript', bash: 'Terminal', text: 'Результат' }[props.language] || props.language))

function escapeHtml(value) { return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;') }
async function copyCode() {
  try {
    await navigator.clipboard.writeText(cleanCode.value)
    copied.value = true
    window.setTimeout(() => { copied.value = false }, 1800)
  } catch { copied.value = false }
}
</script>

<template>
  <div class="code-block">
    <div class="code-header"><span><i /><i /><i />{{ languageLabel }}</span><button type="button" :aria-label="copied ? 'Код скопирован' : 'Копировать код'" @click="copyCode"><Check v-if="copied" :size="14" /><Copy v-else :size="14" />{{ copied ? 'Скопировано' : 'Копировать' }}</button></div>
    <pre><code :class="`language-${language}`" v-html="highlighted" /></pre>
  </div>
</template>
