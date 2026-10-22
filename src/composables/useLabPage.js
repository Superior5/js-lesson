import { onBeforeUnmount, onMounted, ref } from 'vue'

export function useLabPage(initialSection, title) {
  const theme = ref('light')
  const menuOpen = ref(false)
  const activeId = ref(initialSection)
  const progress = ref(0)
  let observer

  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = theme.value
    localStorage.setItem('lab-theme', theme.value)
  }

  function navigate(id) {
    menuOpen.value = false
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function updateProgress() {
    const max = document.documentElement.scrollHeight - window.innerHeight
    progress.value = max > 0 ? Math.min(100, window.scrollY / max * 100) : 0
  }

  onMounted(() => {
    theme.value = localStorage.getItem('lab-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    document.documentElement.dataset.theme = theme.value
    document.title = title
    observer = new IntersectionObserver(entries => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
      if (visible[0]) activeId.value = visible[0].target.id
    }, { rootMargin: '-18% 0px -68% 0px', threshold: [0, .15, .5] })
    document.querySelectorAll('.lab-observe').forEach(section => observer.observe(section))
    window.addEventListener('scroll', updateProgress, { passive: true })
    updateProgress()
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    window.removeEventListener('scroll', updateProgress)
  })

  return { theme, menuOpen, activeId, progress, toggleTheme, navigate }
}
