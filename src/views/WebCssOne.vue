<script setup>
import { ArrowLeft, BookOpenCheck, CircleHelp, Paintbrush } from 'lucide-vue-next'
import LessonLayout from '../components/LessonLayout.vue'
import LessonHero from '../components/LessonHero.vue'
import LessonSection from '../components/LessonSection.vue'
import CodeBlock from '../components/CodeBlock.vue'
import InfoBlock from '../components/InfoBlock.vue'
import RevealAnswer from '../components/RevealAnswer.vue'
import { webCssOne as lesson, webLessons } from '../data/webLessons'
import { homeworkParts, practiceChecklist, practiceStarterHtml, practiceSteps } from '../data/webCssPractice'

const htmlStart = `<h1>Моё портфолио</h1>
<p>Привет! Я учусь создавать сайты.</p>
<a href="projects.html">Мои проекты</a>`
const folderTree = `my-page/
├── index.html
└── styles.css`
const htmlConnected = `<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Моё портфолио</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <h1>Моё портфолио</h1>
    <p>Привет! Я учусь создавать сайты.</p>
  </body>
</html>`
const firstCss = `h1 {
  color: darkslateblue;
}

p {
  font-size: 18px;
}`
const ruleCss = `p {
  color: #334155;
  font-size: 18px;
  line-height: 1.6;
}`
const selectorHtml = `<h1 id="page-title">Моё портфолио</h1>
<p>Я учусь делать сайты.</p>
<p class="highlight">Мой первый проект готов.</p>
<a class="button" href="projects.html">Смотреть проекты</a>`
const selectorCss = `p { color: #334155; }          /* все абзацы */
.highlight { color: #9a3412; } /* элементы с этим классом */
#page-title { color: #312e81; } /* элемент с этим id */`
const cascadeCss = `p { color: #334155; }
p { color: #0f766e; } /* тот же селектор: побеждает нижнее правило */
.highlight { color: #b45309; } /* класс точнее селектора p */`
const colorsCss = `body {
  color: #1e293b;             /* текст */
  background-color: #f8fafc; /* фон */
}

.notice {
  color: rgb(30, 64, 175);
  background-color: #dbeafe;
}`
const textCss = `body {
  font-family: Arial, sans-serif;
  font-size: 16px;
  line-height: 1.5;
}

h1 {
  font-size: 32px;
  font-weight: 700;
  text-align: center;
}`
const boxCss = `.card {
  width: 300px;             /* содержимое */
  padding: 20px;            /* внутри рамки */
  border: 2px solid #94a3b8;
  margin: 24px;             /* снаружи рамки */
}`
const sizingCss = `* { box-sizing: border-box; }

.card {
  width: 300px; /* уже вместе с padding и border */
  padding: 20px;
  border: 2px solid #94a3b8;
}`
const displayCss = `/* h1 и p по умолчанию блочные, a — строчная */
.button {
  display: inline-block;
  padding: 10px 16px;
  background-color: #4338ca;
  color: white;
}`
const finalHtml = `<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Моё портфолио</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <main class="card">
      <h1>Моё портфолио</h1>
      <p>Привет! Я учусь создавать сайты.</p>
      <a class="button" href="projects.html">Мои проекты</a>
    </main>
  </body>
</html>`
const finalCss = `* { box-sizing: border-box; }

body {
  margin: 0;
  padding: 40px 20px;
  background-color: #f1f5f9;
  color: #1e293b;
  font-family: Arial, sans-serif;
  line-height: 1.5;
}

.card {
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  padding: 32px;
  border: 1px solid #cbd5e1;
  background-color: white;
}

h1 { margin-top: 0; color: #312e81; }
.button {
  display: inline-block;
  padding: 10px 16px;
  background-color: #4338ca;
  color: white;
  text-decoration: none;
}`
const controlQuestions = [
  ['Для чего нужен CSS?', 'CSS задаёт внешний вид HTML-элементов: цвета, текст, размеры и отступы.'],
  ['Где подключают внешний файл стилей?', 'Внутри <head> через <link rel="stylesheet" href="styles.css">.'],
  ['Из каких частей состоит правило CSS?', 'Селектор и объявления свойство: значение; внутри фигурных скобок.'],
  ['Чем отличаются p, .note и #title?', 'Выбором по тегу, классу и идентификатору соответственно.'],
  ['Какое правило победит при одинаковых селекторах?', 'Правило, записанное ниже.'],
  ['Что находится между содержимым и рамкой?', 'Внутренний отступ padding. За рамкой находится margin.'],
  ['Что меняет box-sizing: border-box?', 'Включает padding и border в указанную ширину и высоту элемента.'],
  ['Почему ширина обычной ссылки может не работать?', 'Ссылка строчная по умолчанию; для размеров можно задать display: inline-block.'],
]
</script>

<template>
  <LessonLayout
    :navigation="lesson.sections" :lesson-number="lesson.number" :title="lesson.title"
    :course-lessons="webLessons" course-label="Веб-разработка"
    brand-title="Веб-разработка" brand-subtitle="HTML · CSS" brand-mark="WEB"
    :show-node-download="false"
  >
    <LessonHero :lesson="lesson" />
    <div class="lesson-body">
      <div class="intro-note"><Paintbrush :size="20" /><p><strong>После занятия вы сможете</strong> подключить CSS к HTML, написать правила для тегов и классов, оформить текст и карточку, а также найти ошибку через инструменты браузера.</p></div>

      <LessonSection id="recap" number="01" title="Вспоминаем HTML" kicker="СТРУКТУРА УЖЕ ЗНАКОМА">
        <p class="lead">HTML сообщает браузеру, что находится на странице: заголовок, абзац, ссылка и другие элементы.</p>
        <CodeBlock :code="htmlStart" language="html" />
        <p>Браузер покажет их и без наших стилей. Они получат стандартное оформление браузера.</p>
        <div class="oral-questions"><h3><CircleHelp :size="19" /> Вопросы для повторения</h3><ol><li>Какой тег обозначает главный заголовок?</li><li>Как создать ссылку и указать её адрес?</li><li>Что находится в <code>&lt;head&gt;</code>, а что — в <code>&lt;body&gt;</code>?</li></ol></div>
      </LessonSection>

      <LessonSection id="purpose" number="02" title="Зачем нужен CSS?">
        <p class="lead">CSS — язык стилей. Он задаёт, <strong>как выглядят</strong> элементы, описанные в HTML.</p>
        <div class="concept-grid"><article><strong>HTML — содержание</strong><p>Заголовок, текст и ссылка сохраняют свой смысл.</p></article><article><strong>CSS — оформление</strong><p>Цвет, размер текста, фон, рамка и расстояния.</p></article></div>
        <p>Один файл CSS может оформлять множество элементов и страниц. Изменение общего правила обновит их оформление сразу.</p>
        <InfoBlock type="important" title="Смысл остаётся в HTML"><p>Заголовок выбираем тегом <code>&lt;h1&gt;</code>, а не увеличением шрифта у обычного абзаца. Стиль меняет вид, но не назначение элемента.</p></InfoBlock>
      </LessonSection>

      <LessonSection id="connect" number="03" title="Подключаем файл стилей" kicker="ПЕРВЫЕ ДВА ФАЙЛА">
        <p class="lead">Создайте рядом <code>index.html</code> и <code>styles.css</code>. Ссылку на CSS поместите в <code>&lt;head&gt;</code>.</p>
        <CodeBlock :code="folderTree" language="text" /><CodeBlock :code="htmlConnected" language="html" /><CodeBlock :code="firstCss" language="css" />
        <p><code>href="styles.css"</code> означает, что файл находится рядом с HTML. Если он лежит в папке <code>css</code>, путь будет <code>href="css/styles.css"</code>.</p>
        <InfoBlock type="warning" title="Если ничего не изменилось"><p>Проверьте имя файла, расширение <code>.css</code>, путь в <code>href</code>, наличие <code>&lt;link&gt;</code> в <code>&lt;head&gt;</code> и обновите страницу.</p></InfoBlock>
      </LessonSection>

      <LessonSection id="rules" number="04" title="Как устроено правило CSS">
        <p class="lead">Селектор указывает, к каким элементам применяются свойства.</p>
        <CodeBlock :code="ruleCss" language="css" />
        <div class="concept-grid"><article><strong><code>p</code> — селектор</strong><p>Выбирает все абзацы <code>&lt;p&gt;</code>.</p></article><article><strong><code>color: #334155;</code> — объявление</strong><p><code>color</code> — свойство, <code>#334155</code> — значение.</p></article></div>
        <p>Объявления пишут в фигурных скобках. После значения ставят точку с запятой. В одном правиле может быть несколько свойств.</p>
        <InfoBlock type="tip" title="CSS работает в браузере"><p>CSS сохраняют в файле <code>.css</code>; его не запускают командой <code>node</code>. Браузер читает таблицу стилей вместе с HTML.</p></InfoBlock>
        <RevealAnswer code="h1 { color: #312e81; font-size: 32px; }" language="css" answer="Заголовок h1 станет тёмно-фиолетовым и получит размер 32px." explanation="Селектор h1 находит заголовок, а два объявления задают цвет и размер." title="Что изменит правило?" />
      </LessonSection>

      <LessonSection id="selectors" number="05" title="Тег, класс и идентификатор">
        <p class="lead">Тег подходит для всех элементов одного вида. Класс выделяет группу, идентификатор — один элемент.</p>
        <CodeBlock :code="selectorHtml" language="html" /><CodeBlock :code="selectorCss" language="css" />
        <p>Класс пишется в атрибуте <code>class</code>, а в CSS перед именем ставится точка. Идентификатор пишется в <code>id</code>, в CSS — знак <code>#</code>.</p>
        <p>Один класс можно повторить: <code>&lt;p class="notice"&gt;</code> и ещё один такой абзац получат общие стили <code>.notice</code>. Для повторяемого оформления используйте классы.</p>
      </LessonSection>

      <LessonSection id="cascade" number="06" title="Почему одно правило побеждает другое">
        <p class="lead">Несколько правил могут задавать одному элементу одно свойство. Итог выбирается по каскаду.</p>
        <CodeBlock :code="cascadeCss" language="css" />
        <p>Обычный абзац станет зелёным: второй <code>p</code> записан ниже. Абзац с классом <code>highlight</code> станет коричневым: класс точнее селектора тега.</p>
        <div class="concept-grid"><article><strong>Одинаковая точность</strong><p>Побеждает правило, записанное позже.</p></article><article><strong>Разная точность</strong><p>В простом случае <code>#id</code> сильнее <code>.class</code>, а <code>.class</code> — тега.</p></article></div>
        <InfoBlock type="important" title="Пока используем простые селекторы"><p>Для самостоятельного оформления выбирайте классы. Подробный расчёт специфичности изучим позже.</p></InfoBlock>
      </LessonSection>

      <LessonSection id="colors" number="07" title="Цвет текста и фон">
        <p class="lead"><code>color</code> задаёт цвет текста, <code>background-color</code> — цвет фона.</p>
        <CodeBlock :code="colorsCss" language="css" />
        <p>Цвет можно записать именем, шестнадцатеричным кодом <code>#1e293b</code> или через <code>rgb(30, 64, 175)</code>. Для первой страницы достаточно двух-трёх согласованных цветов.</p>
        <div class="css-demo" aria-label="Пример карточки с цветным фоном"><strong>Карточка проекта</strong><p>Текст легко читается на светлом фоне.</p><span>Ссылка на проект →</span></div>
        <InfoBlock type="warning" title="Проверяйте читаемость"><p>Текст должен заметно отличаться от фона. Светлый текст на белом фоне трудно прочитать.</p></InfoBlock>
      </LessonSection>

      <LessonSection id="text" number="08" title="Оформление текста">
        <p class="lead">Шрифт, размер и межстрочный интервал помогают отделить заголовок от основного текста.</p>
        <CodeBlock :code="textCss" language="css" />
        <p><code>font-family</code> выбирает шрифт, <code>sans-serif</code> служит запасным вариантом. <code>font-size</code> задаёт размер, <code>font-weight</code> — насыщенность, <code>line-height</code> — высоту строки, <code>text-align</code> — выравнивание.</p>
        <InfoBlock type="tip" title="Единица px"><p><code>px</code> — пиксели CSS. На первом занятии используем их для размеров и отступов; относительные единицы изучим позже.</p></InfoBlock>
      </LessonSection>

      <LessonSection id="box-model" number="09" title="Блочная модель" kicker="ОТ СОДЕРЖИМОГО К РАССТОЯНИЯМ">
        <p class="lead">У элемента есть содержимое, внутренний отступ <code>padding</code>, рамка <code>border</code> и внешний отступ <code>margin</code>.</p>
        <CodeBlock :code="boxCss" language="css" />
        <div class="box-model-demo"><div class="box-margin"><div class="box-border"><div class="box-padding"><div class="box-content">Содержимое</div></div></div></div><span>margin → border → padding → содержимое</span></div>
        <p>При стандартном расчёте ширины карточка занимает <strong>344px</strong> без внешних отступов: 300px содержимого + 40px внутренних отступов + 4px рамки.</p>
        <h3>Удобный расчёт ширины</h3><CodeBlock :code="sizingCss" language="css" />
        <p>С <code>box-sizing: border-box</code> объявленные 300px уже включают внутренние отступы и рамку. Звёздочка выбирает все элементы.</p>
      </LessonSection>

      <LessonSection id="display" number="10" title="Блочные и строчные элементы">
        <p class="lead">Блочный элемент обычно начинается с новой строки. Строчный располагается внутри строки текста.</p>
        <CodeBlock :code="displayCss" language="css" />
        <p><code>display: inline-block</code> оставляет элемент в строке, но позволяет удобно задать ему отступы, ширину и высоту. Ссылка может выглядеть как кнопка, сохранив назначение ссылки.</p>
        <InfoBlock type="important" title="Учитывайте узкий экран"><p>Для карточки используйте <code>width: 100%</code> и <code>max-width</code>, чтобы она помещалась на телефоне.</p></InfoBlock>
      </LessonSection>

      <LessonSection id="debug" number="11" title="Собираем и проверяем страницу" kicker="ИТОГОВЫЙ ПРИМЕР">
        <p class="lead">Скопируйте два файла в одну папку и откройте <code>index.html</code> в браузере. Появится светлая карточка с заголовком и синей ссылкой.</p>
        <CodeBlock :code="finalHtml" language="html" /><CodeBlock :code="finalCss" language="css" />
        <div class="debug-checklist"><h3>Если стиль не появился</h3><ol><li>Проверьте путь и имя CSS-файла в <code>href</code>.</li><li>В инструментах разработчика браузера выберите элемент.</li><li>Во вкладке <strong>Styles</strong> найдите правило и посмотрите, не зачёркнуто ли свойство.</li><li>Проверьте точку перед классом, скобки, двоеточия и точки с запятой.</li><li>Сохраните файлы и обновите страницу.</li></ol></div>
        <InfoBlock type="tip" title="Проверяйте маленькими шагами"><p>Сначала измените цвет заголовка. Затем добавляйте фон, текст и отступы по одному правилу.</p></InfoBlock>
      </LessonSection>
    </div>

    <section id="practice" class="practice-section scroll-section">
      <div class="lesson-body">
        <span class="practice-kicker">ПРАКТИЧЕСКАЯ РАБОТА · 35–40 МИНУТ</span>
        <h2>Карточки книжного клуба</h2>
        <p class="practice-lead">Скопируйте исходную HTML-страницу в <code>index.html</code>. Затем выполните шаги по порядку. Все стили пишите в отдельном <code>styles.css</code>; готовое оформление намеренно не показано.</p>
        <CodeBlock :code="practiceStarterHtml" language="html" label="Исходный index.html" />
        <div class="css-practice-grid">
          <article v-for="(step, index) in practiceSteps" :key="step.title" class="css-practice-card">
            <div class="css-practice-top"><span>ШАГ {{ String(index + 1).padStart(2, '0') }}</span><span>{{ step.time }}</span></div>
            <h3>{{ step.title }}</h3>
            <p>{{ step.task }}</p>
            <div class="css-practice-check"><strong>Как проверить:</strong> {{ step.check }}</div>
          </article>
        </div>
        <div class="css-practice-summary">
          <h3>Готово, если</h3>
          <ul><li v-for="item in practiceChecklist" :key="item">{{ item }}</li></ul>
        </div>
      </div>
    </section>

    <section id="review" class="review-section scroll-section"><div class="lesson-body"><span class="section-kicker">САМОПРОВЕРКА</span><h2>Контрольные вопросы</h2><p>Сначала ответьте самостоятельно, затем раскройте карточку.</p><div class="question-list"><details v-for="([question, answer], index) in controlQuestions" :key="question"><summary><span>{{ String(index + 1).padStart(2, '0') }}</span>{{ question }}</summary><p>{{ answer }}</p></details></div></div></section>

    <section id="homework" class="homework-section scroll-section">
      <div class="lesson-body">
        <div class="homework-header"><span><BookOpenCheck /></span><div><small>САМОСТОЯТЕЛЬНАЯ РАБОТА</small><h2>Домашнее задание</h2><p>Сделайте новую страницу по той же схеме. Сдайте <code>index.html</code>, <code>styles.css</code> и снимок экрана открытой страницы.</p></div></div>
        <div class="homework-parts">
          <article v-for="(part, index) in homeworkParts" :key="part.title"><span>{{ String(index + 1).padStart(2, '0') }}</span><div><h3>{{ part.title }}</h3><p>{{ part.text }}</p></div></article>
        </div>
        <InfoBlock type="tip" title="Критерии самопроверки"><p>Проверьте путь к CSS, одинаковое оформление всех трёх карточек, читаемость цветов и отсутствие горизонтальной прокрутки на узком экране. Новые темы вроде Flexbox, Grid и JavaScript для задания не нужны.</p></InfoBlock>
      </div>
    </section>

    <div class="lesson-body"><nav class="lesson-series-nav" aria-label="Навигация между занятиями"><RouterLink class="next-lesson previous-lesson" to="/" aria-label="Вернуться к выбору курса"><span><ArrowLeft /></span><div><small>НАВИГАЦИЯ</small><h2>Все курсы</h2><p>JavaScript <i /> Express.js <i /> Веб-разработка</p></div></RouterLink></nav><footer><span class="brand-mark small">WEB</span><p>Веб-разработка · HTML и CSS</p><a href="#top">Наверх ↑</a></footer></div>
  </LessonLayout>
</template>

<style scoped>
.css-demo { margin:28px 0; padding:24px; border:1px solid #c7d2fe; border-radius:14px; background:#eef2ff; color:#1e1b4b; }
.css-demo strong { display:block; font-size:20px; }
.css-demo p { margin:8px 0 14px; color:#334155; }
.css-demo span { color:#3730a3; font-weight:800; }
.box-model-demo { margin:28px 0; padding:20px; border:1px solid var(--line); border-radius:14px; background:var(--surface); text-align:center; }
.box-margin { width:min(100%,380px); margin:auto; padding:20px; background:#fef3c7; }
.box-border { padding:3px; background:#d97706; }
.box-padding { padding:18px; background:#dbeafe; }
.box-content { padding:16px 8px; background:#fff; color:#1e293b; font-weight:800; }
.box-model-demo > span { display:block; margin-top:12px; color:var(--muted); font-size:12px; }
.css-practice-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:14px; margin:30px 0; }
.css-practice-card { padding:24px; border:1px solid #303240; border-radius:15px; background:#20212c; }
.css-practice-top { display:flex; justify-content:space-between; gap:12px; color:#a7a1ff; font-size:10px; font-weight:800; letter-spacing:.08em; }
.css-practice-card h3 { margin:15px 0 8px; color:#f3f3f7; font-size:16px; }
.css-practice-card p { margin:0; color:#aeb1c0; font-size:12px; }
.css-practice-check { margin-top:18px; padding-top:14px; border-top:1px solid #353747; color:#b8ddc9; font-size:11px; }
.css-practice-check strong { color:#7dddab; }
.css-practice-summary { padding:24px; border:1px solid #3a374d; border-radius:15px; background:#20212c; }
.css-practice-summary h3 { margin:0 0 10px; }
.css-practice-summary ul { margin:0; padding-left:20px; color:#c3c6d3; font-size:12px; }
.css-practice-summary li { margin:6px 0; }
@media (max-width:700px) { .css-practice-grid { grid-template-columns:1fr; } }
</style>
