<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { ArrowDown, ArrowRight, BookOpenCheck, CheckCircle2, ChevronRight, Code2, Cog, FileCode2, Globe2, Monitor, Play, Server, Smartphone, Star, TerminalSquare } from 'lucide-vue-next'
import AppHeader from '../components/AppHeader.vue'
import LessonSidebar from '../components/LessonSidebar.vue'
import LessonHero from '../components/LessonHero.vue'
import LessonSection from '../components/LessonSection.vue'
import CodeBlock from '../components/CodeBlock.vue'
import InfoBlock from '../components/InfoBlock.vue'
import TaskBlock from '../components/TaskBlock.vue'
import { bonusTasks, navigation, tasks, uses } from '../data/lessonOne'

const theme = ref('light')
const menuOpen = ref(false)
const activeId = ref('program')
const progress = ref(0)
const useIcons = { Globe2, Server, TerminalSquare, Smartphone, Monitor, Cog }
let observer

function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  document.documentElement.dataset.theme = theme.value
  localStorage.setItem('lesson-theme', theme.value)
}
function navigate(id) {
  menuOpen.value = false
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
function updateProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight
  progress.value = max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0
}

onMounted(() => {
  theme.value = localStorage.getItem('lesson-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  document.documentElement.dataset.theme = theme.value
  observer = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
    if (visible[0]) activeId.value = visible[0].target.id
  }, { rootMargin: '-18% 0px -65% 0px', threshold: [0, 0.15, 0.5] })
  document.querySelectorAll('.scroll-section').forEach(section => observer.observe(section))
  window.addEventListener('scroll', updateProgress, { passive: true })
  updateProgress()
})
onBeforeUnmount(() => { observer?.disconnect(); window.removeEventListener('scroll', updateProgress) })
</script>

<template>
  <div class="reading-progress" :style="{ transform: `scaleX(${progress / 100})` }" />
  <AppHeader :theme="theme" :menu-open="menuOpen" @toggle-theme="toggleTheme" @toggle-menu="menuOpen = !menuOpen" />
  <div class="app-shell">
    <LessonSidebar :items="navigation" :active-id="activeId" :open="menuOpen" @navigate="navigate" @close="menuOpen = false" />
    <main>
      <LessonHero />
      <div class="lesson-body">
        <div class="intro-note"><BookOpenCheck :size="20" /><p><strong>После занятия вы сможете</strong> объяснить разницу между JavaScript и Node.js, запустить файл из терминала и использовать числа, строки и <code>console.log()</code>.</p></div>

        <LessonSection id="program" number="01" title="Что такое программа?">
          <p class="lead">Программа — это последовательность инструкций, которые компьютер выполняет для решения определённой задачи.</p>
          <p>Представьте, что мы хотим приготовить чай. Для человека достаточно короткой просьбы «Сделай чай», но компьютер не умеет догадываться. Ему нужны точные шаги.</p>
          <div class="steps-card">
            <h3><span>☕</span> Алгоритм приготовления чая</h3>
            <ol><li>Налить воду в чайник.</li><li>Включить чайник.</li><li>Дождаться кипения.</li><li>Положить чай в чашку.</li><li>Налить кипяток.</li></ol>
          </div>
          <InfoBlock type="tip" title="Главная мысль"><p>Компьютер делает ровно то, что мы ему сказали. Чем точнее инструкции, тем предсказуемее результат.</p></InfoBlock>
        </LessonSection>

        <LessonSection id="algorithm" number="02" title="Что такое алгоритм?">
          <p class="lead">Алгоритм — это конечная последовательность чётких действий, которая приводит к решению задачи.</p>
          <div class="flow-diagram" aria-label="Исходные данные переходят в алгоритм, который создаёт результат">
            <div><small>01</small><strong>Исходные данные</strong><span>То, что нам известно</span></div><ArrowRight /><div class="accent"><small>02</small><strong>Алгоритм</strong><span>Последовательность шагов</span></div><ArrowRight /><div><small>03</small><strong>Результат</strong><span>Решённая задача</span></div>
          </div>
          <p>Например, чтобы вычислить стоимость покупки, исходными данными будут цена и количество товаров, алгоритмом — умножение, а результатом — итоговая сумма.</p>
        </LessonSection>

        <LessonSection id="languages" number="03" title="Языки программирования">
          <p>Компьютер не понимает JavaScript напрямую — процессор выполняет машинные инструкции. Язык программирования позволяет нам записывать алгоритмы в понятной человеку форме, а специальные программы переводят их для компьютера.</p>
          <div class="code-pair"><div><span>Псевдокод</span><CodeBlock code={'вывести "Привет"'} language="text" label="Псевдокод" /></div><div><span>JavaScript</span><CodeBlock code={'console.log("Привет");'} language="javascript" /></div></div>
          <InfoBlock type="info" title="Синтаксис"><p>Это правила записи конструкций языка программирования — как грамматика в обычном языке.</p></InfoBlock>
        </LessonSection>

        <LessonSection id="javascript" number="04" title="Что такое JavaScript?">
          <p class="lead">JavaScript — современный язык программирования. Он стал известен благодаря браузерам, но сегодня используется гораздо шире.</p>
          <div class="use-grid"><article v-for="([icon, title, description]) in uses" :key="title"><component :is="useIcons[icon]" :size="22" /><div><strong>{{ title }}</strong><span>{{ description }}</span></div></article></div>
          <InfoBlock type="important" title="Фокус курса"><p>Сначала мы изучаем JavaScript именно как <strong>язык программирования</strong>. К веб-разработке перейдём позже.</p></InfoBlock>
        </LessonSection>

        <LessonSection id="nodejs" number="05" title="Что такое Node.js?">
          <div class="formula"><div><Code2 /><span><strong>JavaScript</strong><small>язык программирования</small></span></div><span>+</span><div><TerminalSquare /><span><strong>Node.js</strong><small>среда выполнения</small></span></div></div>
          <p>Браузер позволяет выполнять JavaScript внутри веб-страницы. Node.js позволяет запускать JavaScript непосредственно на компьютере или сервере.</p>
          <div class="tree-diagram"><strong>JavaScript</strong><i /><div><span>🌐 Браузер</span><span>⌨️ Node.js</span></div></div>
          <InfoBlock type="important"><p>Node.js — не отдельный язык программирования. Мы продолжаем писать на JavaScript. Меняется только среда, в которой выполняется программа.</p></InfoBlock>
        </LessonSection>

        <LessonSection id="setup" number="06" title="Установка и запуск" kicker="ПЕРВАЯ ПРОГРАММА">
          <h3>Проверьте Node.js</h3><p>Откройте терминал и выполните команды:</p>
          <CodeBlock code="node -v" language="bash" /><CodeBlock code="v24.x.x" language="text" />
          <CodeBlock code="npm -v" language="bash" />
          <p class="muted">npm устанавливается вместе с Node.js. Подробно мы познакомимся с ним позже.</p>
          <hr />
          <h3>Создайте файл <code>index.js</code></h3>
          <CodeBlock code={'console.log("Hello, world!");'} language="javascript" />
          <p>Запустите его из папки проекта:</p><CodeBlock code="node index.js" language="bash" /><CodeBlock code="Hello, world!" language="text" />
          <div class="run-flow"><span><FileCode2 />index.js</span><ArrowDown /><span><Play />Node.js читает программу</span><ArrowDown /><span><Code2 />JavaScript выполняется</span><ArrowDown /><span><TerminalSquare />Результат в терминале</span></div>
        </LessonSection>

        <LessonSection id="console" number="07" title="console.log()">
          <p><code>console.log()</code> выводит значение в консоль. Это один из самых простых способов увидеть результат работы программы.</p>
          <CodeBlock :code="`console.log(\"Привет\");\nconsole.log(\"JavaScript\");\nconsole.log(123);\nconsole.log(10 + 20);`" language="javascript" />
          <CodeBlock :code="`Привет\nJavaScript\n123\n30`" language="text" />
        </LessonSection>

        <LessonSection id="numbers" number="08" title="Числа и арифметика">
          <CodeBlock :code="`console.log(10 + 5); // 15\nconsole.log(10 - 5); // 5\nconsole.log(10 * 5); // 50\nconsole.log(10 / 5); // 2`" language="javascript" />
          <div class="operator-grid"><span><b>+</b> сложение</span><span><b>−</b> вычитание</span><span><b>×</b> умножение</span><span><b>÷</b> деление</span><span><b>%</b> остаток</span></div>
          <h3>Остаток от деления</h3><CodeBlock code="console.log(10 % 3); // 1" language="javascript" />
          <p>Десять делится на три три раза, и ещё одна единица остаётся — поэтому результат равен <strong>1</strong>.</p>
          <div class="challenge"><small>МИНИ-ЭКСПЕРИМЕНТ</small><h3>Какой будет результат?</h3><div><code>5 + 2 * 3</code><span>и</span><code>(5 + 2) * 3</code></div><details><summary>Показать ответ <ChevronRight :size="16" /></summary><p><strong>11</strong> и <strong>21</strong>. Умножение выполняется первым, а скобки меняют порядок действий.</p></details></div>
        </LessonSection>

        <LessonSection id="strings" number="09" title="Строки">
          <p>Текстовые значения называются <strong>строками</strong>. В JavaScript строку записывают внутри кавычек.</p>
          <CodeBlock :code="`console.log(\"Hello\");\nconsole.log(\"JavaScript\");\nconsole.log(\"Hello \" + \"World\");`" language="javascript" />
          <CodeBlock code="Hello World" language="text" />
          <h3>Число или строка?</h3>
          <div class="comparison"><div><CodeBlock code="console.log(10 + 20);" language="javascript" /><strong>30</strong><small>Числа складываются</small></div><div><CodeBlock code={'console.log("10" + "20");'} language="javascript" /><strong>1020</strong><small>Строки соединяются</small></div><div><CodeBlock code={'console.log("10 + 20");'} language="javascript" /><strong>10 + 20</strong><small>Это просто текст</small></div></div>
          <InfoBlock type="warning" title="Кавычки имеют значение"><p><code>10</code> — число, а <code>"10"</code> — строка. Типы данных подробно изучим на следующем занятии.</p></InfoBlock>
        </LessonSection>
      </div>

      <section id="practice" class="practice-section scroll-section">
        <div class="lesson-body"><span class="practice-kicker">ПРАКТИЧЕСКАЯ РАБОТА</span><h2>Теперь ваша очередь</h2><p class="practice-lead">Создайте файл <code>practice.js</code> и выполните задания по порядку. Решения намеренно не показаны — проверяйте результат через Node.js.</p><div class="tasks-grid"><TaskBlock v-for="(task, index) in tasks" :key="task.title" :task="task" :index="index" /></div>
          <div class="bonus"><div class="bonus-heading"><Star fill="currentColor" :size="22" /><div><small>ДЛЯ ТЕХ, КТО ЗАКОНЧИЛ РАНЬШЕ</small><h3>Дополнительные задания</h3></div></div><article v-for="([title, text]) in bonusTasks" :key="title"><span><CheckCircle2 :size="19" /></span><div><strong>{{ title }}</strong><p>{{ text }}</p></div></article></div>
        </div>
      </section>

      <section id="homework" class="homework-section scroll-section"><div class="lesson-body"><div class="homework-header"><span><BookOpenCheck /></span><div><small>ЗАКРЕПЛЯЕМ МАТЕРИАЛ</small><h2>Домашнее задание</h2><p>Создайте файл <code>homework.js</code> и выполните три части.</p></div></div><div class="homework-parts"><article><span>01</span><div><h3>Вывод данных</h3><p>Программа должна вывести имя, фамилию, возраст и группу — каждое значение с новой строки.</p></div></article><article><span>02</span><div><h3>Вычисления</h3><CodeBlock :code="`24 + 35\n125 - 48\n12 * 12\n144 / 12\n37 % 5`" language="javascript" /></div></article><article><span>03</span><div><h3>Предскажите результат</h3><p>До запуска запишите свои ответы комментариями над строками:</p><CodeBlock :code="`// Я думаю, здесь будет 10\nconsole.log(5 + 5);\nconsole.log(\"5\" + \"5\");\nconsole.log(10 + 2 * 5);\nconsole.log((10 + 2) * 5);\nconsole.log(\"Hello \" + \"JavaScript\");`" language="javascript" /><p class="muted"><code>//</code> начинает однострочный комментарий. JavaScript его не выполняет.</p></div></article></div></div></section>

      <div class="lesson-body"><a class="next-lesson" href="#top" aria-label="Следующее занятие: Переменные и типы данных"><div><small>СЛЕДУЮЩЕЕ ЗАНЯТИЕ</small><h2>Переменные и типы данных</h2><p>let <i /> const <i /> typeof <i /> number <i /> string <i /> boolean</p></div><span><ArrowRight /></span></a><footer><span class="brand-mark small">JS</span><p>Основы программирования · 1 курс</p><a href="#top">Наверх ↑</a></footer></div>
    </main>
  </div>
</template>
