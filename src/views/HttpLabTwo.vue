<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { AlertTriangle, ArrowDown, ArrowRight, BookCheck, Box, Braces, Check, CheckCircle2, ChevronDown, CircleDot, Clock3, Code2, Database, FileJson, FlaskConical, Globe2, GraduationCap, HardDrive, Laptop, Network, PackagePlus, Play, Plus, Radio, Route, Send, Server, ShieldCheck, Sparkles, Terminal, UserRound, Users } from 'lucide-vue-next'
import LabHeader from '../components/LabHeader.vue'
import LabSidebar from '../components/LabSidebar.vue'
import LabSection from '../components/LabSection.vue'
import CodeBlock from '../components/CodeBlock.vue'
import InfoBlock from '../components/InfoBlock.vue'
import { bonusTasks, controlQuestions, httpMethods, labNavigation, practiceTasks, statusCodes } from '../data/httpLabTwo'
import '../styles/http-lab.css'

const theme = ref('light')
const menuOpen = ref(false)
const activeId = ref('client-server')
const progress = ref(0)
let observer

const httpExchange = 'GET /users HTTP/1.1\nHost: localhost:3000'
const httpResponse = 'HTTP/1.1 200 OK\nContent-Type: application/json'
const userJson = '[\n  {\n    "id": 1,\n    "name": "Adam"\n  }\n]'
const postRequest = 'POST /users HTTP/1.1\nContent-Type: application/json\n\n{\n  "name": "Adam",\n  "age": 18\n}'
const jsonExample = '{\n  "name": "Adam",\n  "age": 18,\n  "isStudent": true\n}'
const jsObject = 'const user = {\n  name: "Adam",\n  age: 18,\n  isStudent: true\n};'
const nestedJson = '{\n  "group": "ИВТ-26",\n  "students": [\n    { "id": 1, "name": "Adam" },\n    { "id": 2, "name": "Ali" }\n  ]\n}'
const firstServer = 'const express = require("express");\n\nconst app = express();\nconst PORT = 3000;\n\napp.listen(PORT, () => {\n  console.log(`Сервер запущен: http://localhost:${PORT}`);\n});'
const firstRoute = 'app.get("/", (req, res) => {\n  res.send("Hello from Express!");\n});'
const jsonRoute = 'app.get("/user", (req, res) => {\n  res.json({\n    id: 1,\n    name: "Adam",\n    age: 18\n  });\n});'
const usersArray = 'const users = [\n  { id: 1, name: "Adam", age: 18 },\n  { id: 2, name: "Ali", age: 19 }\n];\n\napp.get("/users", (req, res) => {\n  res.json(users);\n});'
const userById = 'app.get("/users/:id", (req, res) => {\n  const id = Number(req.params.id);\n  const user = users.find(user => user.id === id);\n\n  if (!user) {\n    return res.status(404).json({\n      message: "Пользователь не найден"\n    });\n  }\n\n  res.json(user);\n});'
const bodyMiddleware = 'const app = express();\n\napp.use(express.json()); // до маршрутов\n\n// Теперь JSON доступен в req.body'
const firstPost = 'app.post("/users", (req, res) => {\n  console.log(req.body);\n\n  res.json({ message: "Данные получены" });\n});'
const validatedPost = 'app.post("/users", (req, res) => {\n  const { name, age } = req.body;\n\n  if (!name || age === undefined) {\n    return res.status(400).json({\n      message: "Необходимо указать name и age"\n    });\n  }\n\n  const newUser = {\n    id: users.length + 1,\n    name,\n    age\n  };\n\n  users.push(newUser);\n  res.status(201).json(newUser);\n});'
const finalServer = 'const express = require("express");\n\nconst app = express();\nconst PORT = 3000;\n\napp.use(express.json());\n\nconst users = [\n  { id: 1, name: "Adam", age: 18 },\n  { id: 2, name: "Ali", age: 19 }\n];\n\napp.get("/", (req, res) => {\n  res.send("Express server is running");\n});\n\napp.get("/users", (req, res) => {\n  res.json(users);\n});\n\napp.get("/users/:id", (req, res) => {\n  const id = Number(req.params.id);\n  const user = users.find(user => user.id === id);\n\n  if (!user) {\n    return res.status(404).json({\n      message: "Пользователь не найден"\n    });\n  }\n\n  res.json(user);\n});\n\napp.post("/users", (req, res) => {\n  const { name, age } = req.body;\n\n  if (!name || age === undefined) {\n    return res.status(400).json({\n      message: "Необходимо указать name и age"\n    });\n  }\n\n  const newUser = { id: users.length + 1, name, age };\n  users.push(newUser);\n  res.status(201).json(newUser);\n});\n\napp.listen(PORT, () => {\n  console.log(`Сервер запущен: http://localhost:${PORT}`);\n});'
const curlPost = 'curl -X POST http://localhost:3000/users \\\n  -H "Content-Type: application/json" \\\n  -d \'{"name":"Maga","age":18}\''

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
  document.title = 'Лабораторная № 2 — HTTP и Express'
  observer = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
    if (visible[0]) activeId.value = visible[0].target.id
  }, { rootMargin: '-18% 0px -68% 0px', threshold: [0, .15, .5] })
  document.querySelectorAll('.lab-observe').forEach(section => observer.observe(section))
  window.addEventListener('scroll', updateProgress, { passive: true }); updateProgress()
})
onBeforeUnmount(() => { observer?.disconnect(); window.removeEventListener('scroll', updateProgress) })
</script>

<template>
  <div class="lab-page">
    <div class="lab-reading-progress" :style="{ transform: `scaleX(${progress / 100})` }" />
    <LabHeader :theme="theme" :menu-open="menuOpen" @toggle-theme="toggleTheme" @toggle-menu="menuOpen = !menuOpen" />
    <div class="lab-layout">
      <LabSidebar :items="labNavigation" :active-id="activeId" :open="menuOpen" @navigate="navigate" @close="menuOpen = false" />
      <main class="lab-main">
        <section id="lab-top" class="lab-hero">
          <div class="lab-hero-grid">
            <div class="lab-hero-copy">
              <div class="lab-eyebrow"><FlaskConical :size="15" /> Лабораторная работа № 2</div>
              <h1>HTTP и первый <span>Express</span>-сервер</h1>
              <p>Разберём путь запроса от клиента до сервера, научимся читать HTTP и создадим API с маршрутами GET и POST.</p>
              <div class="lab-meta"><span><Clock3 :size="17" /> 120 минут</span><span><GraduationCap :size="18" /> Базовый уровень</span><span><Laptop :size="17" /> Node.js + Express</span></div>
            </div>
            <div class="request-card" aria-label="Пример HTTP-запроса и ответа">
              <div class="request-card-head"><span><i /> <i /> <i /></span><small>localhost:3000</small></div>
              <div class="request-line"><b>GET</b><code>/students</code><span>HTTP/1.1</span></div>
              <div class="request-divider"><span>REQUEST</span><ArrowDown :size="16" /><span>RESPONSE</span></div>
              <div class="response-line"><b>200</b><span>OK</span><small>application/json</small></div>
              <div class="response-json"><span>[</span><br />&nbsp;&nbsp;{ <em>"name"</em>: <strong>"Adam"</strong> }<br /><span>]</span></div>
            </div>
          </div>
        </section>

        <div class="lab-content">
          <aside class="lab-goal"><span><Route /></span><div><small>ЦЕЛЬ РАБОТЫ</small><p>Понять структуру HTTP-запроса и ответа, научиться работать с URL, методами, заголовками, JSON и кодами состояния. Создать первый Express-сервер с GET- и POST-маршрутами.</p></div></aside>

          <LabSection id="client-server" number="01" title="Клиент и сервер" label="ОСНОВНАЯ МОДЕЛЬ">
            <p class="lab-lead">Большинство современных приложений работают по простой модели: клиент просит — сервер отвечает.</p>
            <div class="client-server-flow"><div><Laptop /><strong>Клиент</strong><small>Отправляет запрос</small></div><span><ArrowRight /><code>GET /users</code></span><div class="server-node"><Server /><strong>Сервер</strong><small>Выполняет логику</small></div><span><ArrowRight /><code>JSON</code></span><div><FileJson /><strong>Ответ</strong><small>Возвращает данные</small></div></div>
            <p>Клиентом может быть браузер, мобильное или frontend-приложение, другой сервер, Postman, Insomnia или утилита <code>curl</code>.</p>
            <div class="client-chips"><span><Globe2 /> Браузер</span><span><Laptop /> Frontend</span><span><Terminal /> curl</span><span><Send /> Postman</span><span><Server /> Другой сервер</span></div>
          </LabSection>

          <LabSection id="http" number="02" title="Что такое HTTP?" label="ПРАВИЛА ОБМЕНА">
            <p class="lab-lead"><strong>HTTP</strong> — HyperText Transfer Protocol, протокол передачи данных между клиентом и сервером.</p>
            <blockquote class="http-quote">HTTP определяет правила, по которым клиент и сервер обмениваются запросами и ответами.</blockquote>
            <div class="exchange-code"><div><span>ЗАПРОС</span><CodeBlock :code="httpExchange" language="http" /></div><ArrowRight /><div><span>ОТВЕТ</span><CodeBlock :code="httpResponse" language="http" /></div></div>
            <CodeBlock :code="userJson" language="json" label="Тело ответа" />
          </LabSection>

          <LabSection id="request" number="03" title="Структура HTTP-запроса">
            <p>Запрос состоит из метода, URL, заголовков и, при необходимости, тела.</p>
            <div class="request-anatomy"><div class="anatomy-code"><CodeBlock :code="postRequest" language="http" /></div><ol><li><b>POST</b><span>HTTP-метод</span></li><li><b>/users</b><span>Адрес ресурса</span></li><li><b>Content-Type</b><span>Заголовок</span></li><li><b>{ name, age }</b><span>Тело запроса</span></li></ol></div>
          </LabSection>

          <LabSection id="methods" number="04" title="HTTP-методы" label="ДЕЙСТВИЕ НАД РЕСУРСОМ">
            <p class="lab-lead">Метод описывает действие, которое клиент хочет выполнить.</p>
            <div class="methods-table"><article v-for="item in httpMethods" :key="item.method"><span class="method-pill" :class="item.tone">{{ item.method }}</span><div><strong>{{ item.purpose }}</strong><small>{{ item.note }}</small></div><code>{{ item.example }}</code></article></div>
            <InfoBlock type="info" title="Один URL — разные действия"><p><code>GET /users</code> получает пользователей, а <code>POST /users</code> создаёт нового. URL одинаковый, но это разные маршруты.</p></InfoBlock>
          </LabSection>

          <LabSection id="url-routes" number="05–06" title="URL и маршруты">
            <p>URL определяет адрес ресурса. Разберём <code>http://localhost:3000/users</code> по частям:</p>
            <div class="url-anatomy"><div><strong>http://</strong><span>протокол</span></div><div><strong>localhost</strong><span>адрес сервера</span></div><div><strong>:3000</strong><span>порт</span></div><div><strong>/users</strong><span>путь ресурса</span></div></div>
            <div class="route-formula"><span class="method-pill get">GET</span><b>+</b><code>/users</code><b>=</b><strong>маршрут</strong></div>
            <p>Маршрут — это сочетание <strong>HTTP-метода и URL</strong>. Сервер выбирает обработчик сразу по двум значениям.</p>
          </LabSection>

          <LabSection id="headers-json" number="07–09" title="Заголовки, тело и JSON">
            <h3>Заголовки передают метаданные</h3>
            <div class="headers-list"><code>Content-Type: application/json</code><span>формат тела</span><code>Authorization: Bearer token</code><span>данные авторизации</span><code>Accept: application/json</code><span>ожидаемый формат</span><code>User-Agent: ...</code><span>информация о клиенте</span></div>
            <InfoBlock type="important" title="Главный заголовок занятия"><p><code>Content-Type: application/json</code> сообщает серверу, что тело запроса содержит JSON.</p></InfoBlock>
            <h3>Тело запроса</h3><p>GET-запросы обычно обходятся без тела. POST-запросы часто передают в теле данные для создания ресурса.</p>
            <h3>JSON — формат данных</h3><div class="json-compare"><div><span>JSON</span><CodeBlock :code="jsonExample" language="json" /></div><div><span>ОБЪЕКТ JAVASCRIPT</span><CodeBlock :code="jsObject" language="javascript" /></div></div>
            <p>JSON похож на объект JavaScript, но является форматом данных. Он поддерживает строки, числа, <code>true</code>, <code>false</code>, <code>null</code>, массивы и объекты.</p><CodeBlock :code="nestedJson" language="json" />
          </LabSection>

          <LabSection id="response" number="10–11" title="HTTP-ответ и коды состояния">
            <p>Ответ содержит код состояния, заголовки и тело. Код быстро сообщает клиенту, что произошло.</p>
            <div class="status-groups"><span class="success">2xx <small>успех</small></span><span class="client">4xx <small>ошибка клиента</small></span><span class="server">5xx <small>ошибка сервера</small></span></div>
            <div class="status-grid"><article v-for="status in statusCodes" :key="status.code" :class="status.group"><strong>{{ status.code }}</strong><div><b>{{ status.title }}</b><p>{{ status.description }}</p></div></article></div>
          </LabSection>

          <LabSection id="setup" number="12–13" title="Подготовка проекта" label="НАЧИНАЕМ ПРАКТИКУ">
            <div class="setup-steps"><article><span>1</span><div><strong>Создайте папку</strong><CodeBlock code="mkdir express-lab" language="bash" /></div></article><article><span>2</span><div><strong>Перейдите в неё</strong><CodeBlock code="cd express-lab" language="bash" /></div></article><article><span>3</span><div><strong>Создайте Node.js-проект</strong><CodeBlock code="npm init -y" language="bash" /></div></article><article><span>4</span><div><strong>Установите Express</strong><CodeBlock code="npm install express" language="bash" /></div></article></div>
            <InfoBlock type="tip" title="Зачем Express?"><p>Сервер можно создать средствами Node.js, но Express делает работу с маршрутами, запросами и ответами заметно проще.</p></InfoBlock>
          </LabSection>

          <LabSection id="express" number="14–17" title="Первый Express-сервер">
            <p>Создайте файл <code>index.js</code>. Подключим Express, создадим приложение и запустим его на порту 3000.</p><CodeBlock :code="firstServer" language="javascript" />
            <CodeBlock code="node index.js" language="bash" /><CodeBlock code="Сервер запущен: http://localhost:3000" language="text" />
            <h3>Первый GET-маршрут</h3><CodeBlock :code="firstRoute" language="javascript" /><p>После открытия <code>http://localhost:3000</code> сервер вернёт «Hello from Express!».</p>
            <div class="req-res"><article><span>req</span><div><strong>request</strong><p>Содержит информацию о запросе клиента.</p></div></article><article><span>res</span><div><strong>response</strong><p>Используется для формирования ответа.</p></div></article></div>
            <h3>Возвращаем JSON</h3><CodeBlock :code="jsonRoute" language="javascript" />
          </LabSection>

          <LabSection id="users-api" number="18–20" title="API пользователей" label="GET-МАРШРУТЫ">
            <h3>Массив и список пользователей</h3><CodeBlock :code="usersArray" language="javascript" />
            <h3>Параметр маршрута <code>:id</code></h3><p>В адресе <code>/users/:id</code> значение после <code>/users/</code> доступно через <code>req.params.id</code>.</p><CodeBlock :code="userById" language="javascript" />
            <div class="outcome-row"><div><span class="method-pill get">GET</span><code>/users/1</code><ArrowRight /><span class="status-mini ok">200</span><small>пользователь</small></div><div><span class="method-pill get">GET</span><code>/users/100</code><ArrowRight /><span class="status-mini bad">404</span><small>не найден</small></div></div>
          </LabSection>

          <LabSection id="post" number="21–24" title="POST и валидация данных">
            <p>Чтобы Express мог прочитать JSON из тела, подключите middleware <strong>до объявления маршрутов</strong>.</p><CodeBlock :code="bodyMiddleware" language="javascript" />
            <h3>Получаем тело запроса</h3><CodeBlock :code="firstPost" language="javascript" />
            <h3>Создаём пользователя безопасно</h3><p>Данным клиента нельзя слепо доверять. Сначала проверяем обязательные поля, затем создаём объект.</p><CodeBlock :code="validatedPost" language="javascript" />
            <div class="validation-flow"><span><Send /> POST /users</span><ArrowRight /><span><ShieldCheck /> Проверка</span><ArrowRight /><span><Plus /> users.push()</span><ArrowRight /><span><Check /> 201 Created</span></div>
          </LabSection>

          <LabSection id="final-server" number="25" title="Итоговый сервер" label="СОБИРАЕМ ВСЁ ВМЕСТЕ">
            <p>Готовый сервер поддерживает список пользователей, поиск по ID, создание и обработку ошибок.</p><CodeBlock :code="finalServer" language="javascript" />
          </LabSection>

          <LabSection id="curl" number="26" title="Проверка через curl">
            <p><code>curl</code> позволяет отправлять HTTP-запросы прямо из терминала.</p><CodeBlock code="curl http://localhost:3000/users" language="bash" label="Получить всех" /><CodeBlock code="curl http://localhost:3000/users/1" language="bash" label="Получить одного" /><CodeBlock :code="curlPost" language="bash" label="Создать пользователя" />
          </LabSection>
        </div>

        <section id="practice" class="lab-practice lab-observe"><div class="lab-content"><header class="practice-title"><span><FlaskConical /></span><div><small>ПРАКТИЧЕСКАЯ ЧАСТЬ</small><h2>Соберите API студентов</h2><p>Выполняйте задания по порядку. Каждое следующее опирается на предыдущий код.</p></div></header><div class="lab-task-list"><article v-for="task in practiceTasks" :key="task.n"><span class="task-num">{{ task.n }}</span><div><span class="endpoint-chip">{{ task.endpoint }}</span><h3>{{ task.title }}</h3><p>{{ task.text }}</p><CodeBlock v-if="task.code" :code="task.code" language="json" /></div><span class="task-check"><CircleDot :size="18" /></span></article></div>
          <div class="lab-bonus"><header><Sparkles /><div><small>ЕСЛИ ОСНОВНАЯ ЧАСТЬ ГОТОВА</small><h3>Дополнительные задания</h3></div></header><div><article v-for="task in bonusTasks" :key="task.n"><span>{{ task.n }}</span><div><code>{{ task.endpoint }}</code><h4>{{ task.title }}</h4><p>{{ task.text }}</p></div></article></div></div>
        </div></section>

        <div class="lab-content lab-bottom">
          <section id="questions" class="questions-section lab-observe"><header><span>Q&A</span><div><small>ПРОВЕРЬТЕ СЕБЯ</small><h2>Контрольные вопросы</h2></div></header><ol><li v-for="question in controlQuestions" :key="question"><span>{{ question }}</span><ChevronDown :size="16" /></li></ol></section>
          <section id="submission" class="submission lab-observe"><div class="submission-main"><span><BookCheck /></span><div><small>ЧТО НУЖНО СДАТЬ</small><h2>Готовый Node.js-проект</h2><p>Преподаватель проверяет результат локально на компьютере студента.</p></div></div><div class="submission-grid"><div><strong>Обязательные маршруты</strong><code>GET /</code><code>GET /about</code><code>GET /students</code><code>GET /students/:id</code><code>POST /students</code></div><div><strong>Обязательные статусы</strong><span><b>200</b> OK</span><span><b>201</b> Created</span><span><b>400</b> Bad Request</span><span><b>404</b> Not Found</span></div><div><strong>Формат данных</strong><p>Все ответы с данными должны возвращаться в формате JSON.</p><span class="json-badge"><Braces /> JSON</span></div></div></section>
          <section class="learning-outcome"><small>ПОСЛЕ ЛАБОРАТОРНОЙ</small><h2>Вы понимаете полный путь запроса</h2><div><span>Клиент</span><ArrowRight /><span>HTTP</span><ArrowRight /><span>Express</span><ArrowRight /><span>Маршрут</span><ArrowRight /><span>Ответ</span></div><p>Следующий этап — query-параметры, middleware, подробная работа с маршрутами и полный CRUD.</p></section>
          <a class="back-course" href="/"><ArrowLeft /><span><small>ВЕРНУТЬСЯ К ДРУГОЙ ДИСЦИПЛИНЕ</small><strong>Основы программирования на JavaScript</strong></span></a>
          <footer class="lab-footer"><span class="lab-brand-mark small">HTTP</span><p>Серверная веб-разработка · Лабораторная № 2</p><a href="#lab-top">Наверх ↑</a></footer>
        </div>
      </main>
    </div>
  </div>
</template>
