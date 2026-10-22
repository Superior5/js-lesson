<script setup>
import { ArrowLeft, ArrowRight, BookCheck, CheckCircle2, ChevronDown, CircleDot, Clock3, Code2, Database, FlaskConical, GraduationCap, Layers3, PackageOpen, Route, Server, Sparkles, Tags } from 'lucide-vue-next'
import LabHeader from '../components/LabHeader.vue'
import LabSidebar from '../components/LabSidebar.vue'
import LabSection from '../components/LabSection.vue'
import CodeBlock from '../components/CodeBlock.vue'
import InfoBlock from '../components/InfoBlock.vue'
import EndpointBlock from '../components/EndpointBlock.vue'
import HTTPMethodBadge from '../components/HTTPMethodBadge.vue'
import RequestResponseExample from '../components/RequestResponseExample.vue'
import RevealAnswer from '../components/RevealAnswer.vue'
import { useLabPage } from '../composables/useLabPage'
import { bonusTasks, controlQuestions, crudOperations, labThreeNavigation, practiceTasks, submissionCriteria } from '../data/httpLabThree'
import '../styles/http-lab.css'

const { theme, menuOpen, activeId, progress, toggleTheme, navigate } = useLabPage(
  'recap',
  'Лабораторная № 3 — REST API и CRUD',
)

const recapServer = `import express from "express";

const app = express();

app.use(express.json());

app.get("/hello", (req, res) => {
  res.json({ message: "Hello, world!" });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});`

const packageJsonSetup = `{
  "type": "module",
  "dependencies": {
    "express": "^5.0.0"
  }
}`

const productJson = `{
  "id": 1,
  "title": "Ноутбук",
  "price": 75000,
  "category": "electronics",
  "inStock": true
}`

const goodRoutes = `GET    /products
GET    /products/1
POST   /products
PATCH  /products/1
DELETE /products/1`

const badRoutes = `GET  /getAllProducts
POST /createNewProduct
GET  /deleteProduct/1`

const productsData = `let products = [
  {
    id: 1,
    title: "Ноутбук",
    price: 75000,
    category: "electronics",
    inStock: true
  },
  {
    id: 2,
    title: "Монитор",
    price: 23000,
    category: "electronics",
    inStock: false
  },
  {
    id: 3,
    title: "Стол",
    price: 18000,
    category: "furniture",
    inStock: true
  }
];

let nextId = 4;`

const getListRoute = `app.get("/products", (req, res) => {
  res.json(products);
});`

const parseIdHelper = `function parseId(value) {
  const id = Number(value);

  if (!Number.isSafeInteger(id) || id <= 0) {
    return null;
  }

  return id;
}`

const getByIdRoute = `app.get("/products/:id", (req, res) => {
  const id = parseId(req.params.id);

  if (id === null) {
    return res.status(400).json({
      message: "Некорректный идентификатор"
    });
  }

  const product = products.find((item) => item.id === id);

  if (!product) {
    return res.status(404).json({
      message: "Товар не найден"
    });
  }

  res.json(product);
});`

const postProductRoute = `app.post("/products", (req, res) => {
  if (
    req.body === null ||
    typeof req.body !== "object" ||
    Array.isArray(req.body)
  ) {
    return res.status(400).json({
      message: "Тело должно быть JSON-объектом"
    });
  }

  const allowedFields = ["title", "price", "category", "inStock"];
  const hasUnknownField = Object.keys(req.body).some(
    (field) => !allowedFields.includes(field)
  );

  if (hasUnknownField) {
    return res.status(400).json({
      message: "Переданы неизвестные поля"
    });
  }

  const { title, price, category, inStock } = req.body;

  if (
    typeof title !== "string" ||
    title.trim() === "" ||
    typeof price !== "number" ||
    !Number.isFinite(price) ||
    price < 0 ||
    typeof category !== "string" ||
    category.trim() === "" ||
    typeof inStock !== "boolean"
  ) {
    return res.status(400).json({
      message: "Некорректные данные товара"
    });
  }

  const product = {
    id: nextId++,
    title: title.trim(),
    price,
    category: category.trim(),
    inStock
  };

  products.push(product);

  res.status(201).json(product);
});`

const patchPriceRoute = `app.patch("/products/:id", (req, res) => {
  const id = parseId(req.params.id);

  if (id === null) {
    return res.status(400).json({
      message: "Некорректный идентификатор"
    });
  }

  const product = products.find((item) => item.id === id);

  if (!product) {
    return res.status(404).json({
      message: "Товар не найден"
    });
  }

  const price = req.body?.price;

  if (typeof price !== "number" || !Number.isFinite(price) || price < 0) {
    return res.status(400).json({
      message: "Цена должна быть неотрицательным числом"
    });
  }

  product.price = price;
  res.json(product);
});`

const patchSafeRoute = `const editableFields = ["title", "price", "category", "inStock"];

app.patch("/products/:id", (req, res) => {
  const id = parseId(req.params.id);

  if (id === null) {
    return res.status(400).json({ message: "Некорректный идентификатор" });
  }

  const product = products.find((item) => item.id === id);

  if (!product) {
    return res.status(404).json({ message: "Товар не найден" });
  }

  if (
    req.body === null ||
    typeof req.body !== "object" ||
    Array.isArray(req.body)
  ) {
    return res.status(400).json({
      message: "Тело должно быть JSON-объектом"
    });
  }

  const fields = Object.keys(req.body);
  const hasUnknownField = fields.some(
    (field) => !editableFields.includes(field)
  );

  if (fields.length === 0 || hasUnknownField) {
    return res.status(400).json({
      message: "Переданы неизвестные поля или пустое тело"
    });
  }

  const updates = {};

  if ("title" in req.body) {
    if (typeof req.body.title !== "string" || req.body.title.trim() === "") {
      return res.status(400).json({ message: "Некорректное название" });
    }
    updates.title = req.body.title.trim();
  }

  if ("price" in req.body) {
    const price = req.body.price;
    if (typeof price !== "number" || !Number.isFinite(price) || price < 0) {
      return res.status(400).json({ message: "Некорректная цена" });
    }
    updates.price = price;
  }

  if ("category" in req.body) {
    if (
      typeof req.body.category !== "string" ||
      req.body.category.trim() === ""
    ) {
      return res.status(400).json({ message: "Некорректная категория" });
    }
    updates.category = req.body.category.trim();
  }

  if ("inStock" in req.body) {
    if (typeof req.body.inStock !== "boolean") {
      return res.status(400).json({ message: "Некорректный статус наличия" });
    }
    updates.inStock = req.body.inStock;
  }

  Object.assign(product, updates);
  res.json(product);
});`

const deleteProductRoute = `app.delete("/products/:id", (req, res) => {
  const id = parseId(req.params.id);

  if (id === null) {
    return res.status(400).json({
      message: "Некорректный идентификатор"
    });
  }

  const index = products.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Товар не найден"
    });
  }

  products.splice(index, 1);

  res.status(204).send();
});`

const queryReadRoute = `app.get("/products", (req, res) => {
  const { category, inStock } = req.query;

  console.log(category);
  console.log(inStock);

  res.json(products);
});`

const categoryFilterRoute = `app.get("/products", (req, res) => {
  const { category } = req.query;

  let result = [...products];

  if (category !== undefined) {
    result = result.filter(
      (product) => product.category === category
    );
  }

  res.json(result);
});`

const booleanQuery = `let inStockValue;

if (inStock !== undefined) {
  if (inStock !== "true" && inStock !== "false") {
    return res.status(400).json({
      message: "inStock должен быть true или false"
    });
  }

  inStockValue = inStock === "true";
}`

const priceQuery = `const minPriceValue =
  minPrice === undefined ? undefined : Number(minPrice);

if (
  minPrice !== undefined &&
  (
    typeof minPrice !== "string" ||
    minPrice.trim() === "" ||
    !Number.isFinite(minPriceValue) ||
    minPriceValue < 0
  )
) {
  return res.status(400).json({
    message: "Некорректный minPrice"
  });
}`

const sortNumber = `const sortedByPrice = [...products].sort(
  (a, b) => a.price - b.price
);`

const sortString = `const sortedByTitle = [...products].sort(
  (a, b) => a.title.localeCompare(b.title, "ru")
);`

const paginationCode = `const page = 2;
const limit = 10;
const offset = (page - 1) * limit;

const paginated = result.slice(
  offset,
  offset + limit
);`

const paginationResponse = `{
  "data": [],
  "pagination": {
    "page": 2,
    "limit": 10,
    "total": 35,
    "totalPages": 4
  }
}`

const combinedProductsRoute = `app.get("/products", (req, res) => {
  const allowedQuery = new Set([
    "category", "inStock", "minPrice", "maxPrice",
    "search", "sortBy", "order", "page", "limit"
  ]);
  const unknownParams = Object.keys(req.query).filter(
    (key) => !allowedQuery.has(key)
  );

  if (unknownParams.length > 0) {
    return res.status(400).json({
      message: \`Неизвестные параметры: \${unknownParams.join(", ")}\`
    });
  }

  const {
    category,
    inStock,
    minPrice,
    maxPrice,
    search,
    sortBy = "id",
    order = "asc",
    page = "1",
    limit = "10"
  } = req.query;

  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  if (
    typeof page !== "string" ||
    !Number.isSafeInteger(pageNumber) ||
    pageNumber <= 0 ||
    typeof limit !== "string" ||
    !Number.isSafeInteger(limitNumber) ||
    limitNumber <= 0 ||
    limitNumber > 100
  ) {
    return res.status(400).json({
      message: "Некорректные параметры page или limit"
    });
  }

  const minPriceValue =
    minPrice === undefined ? undefined : Number(minPrice);
  const maxPriceValue =
    maxPrice === undefined ? undefined : Number(maxPrice);

  if (
    (minPrice !== undefined &&
      (typeof minPrice !== "string" ||
        minPrice.trim() === "" ||
        !Number.isFinite(minPriceValue) ||
        minPriceValue < 0)) ||
    (maxPrice !== undefined &&
      (typeof maxPrice !== "string" ||
        maxPrice.trim() === "" ||
        !Number.isFinite(maxPriceValue) ||
        maxPriceValue < 0)) ||
    (minPriceValue !== undefined &&
      maxPriceValue !== undefined &&
      minPriceValue > maxPriceValue)
  ) {
    return res.status(400).json({
      message: "Некорректный диапазон цены"
    });
  }

  let inStockValue;

  if (inStock !== undefined) {
    if (inStock !== "true" && inStock !== "false") {
      return res.status(400).json({
        message: "inStock должен быть true или false"
      });
    }
    inStockValue = inStock === "true";
  }

  if (
    (category !== undefined &&
      (typeof category !== "string" || category.trim() === "")) ||
    (search !== undefined &&
      (typeof search !== "string" || search.trim() === ""))
  ) {
    return res.status(400).json({
      message: "Некорректный текстовый параметр"
    });
  }

  const allowedSortFields = ["id", "title", "price"];

  if (
    typeof sortBy !== "string" ||
    !allowedSortFields.includes(sortBy) ||
    typeof order !== "string" ||
    !["asc", "desc"].includes(order)
  ) {
    return res.status(400).json({
      message: "Некорректные параметры сортировки"
    });
  }

  let result = [...products];

  if (category !== undefined) {
    result = result.filter(
      (product) => product.category === category.trim()
    );
  }
  if (inStockValue !== undefined) {
    result = result.filter(
      (product) => product.inStock === inStockValue
    );
  }
  if (minPriceValue !== undefined) {
    result = result.filter(
      (product) => product.price >= minPriceValue
    );
  }
  if (maxPriceValue !== undefined) {
    result = result.filter(
      (product) => product.price <= maxPriceValue
    );
  }
  if (search !== undefined) {
    const normalizedSearch = search.trim().toLowerCase();
    result = result.filter((product) =>
      product.title.toLowerCase().includes(normalizedSearch)
    );
  }

  const direction = order === "asc" ? 1 : -1;

  result.sort((a, b) => {
    if (sortBy === "title") {
      return a.title.localeCompare(b.title, "ru") * direction;
    }
    return (a[sortBy] - b[sortBy]) * direction;
  });

  const total = result.length;
  const totalPages = Math.ceil(total / limitNumber);
  const offset = (pageNumber - 1) * limitNumber;
  const data = result.slice(offset, offset + limitNumber);

  res.json({
    data,
    pagination: {
      page: pageNumber,
      limit: limitNumber,
      total,
      totalPages
    }
  });
});`

const curlCreate = `curl -X POST http://localhost:3000/products \\
  -H "Content-Type: application/json" \\
  -d '{"title":"Клавиатура","price":4500,"category":"electronics","inStock":true}'`

const curlPatch = `curl -X PATCH http://localhost:3000/products/1 \\
  -H "Content-Type: application/json" \\
  -d '{"price":65000}'`

const filterRevealCode = `const prices = [75000, 23000, 18000];
const result = prices.filter((price) => price >= 20000);

console.log(result);`
const filterRevealAnswer = `[75000, 23000]`
const sliceRevealCode = `const products = ["A", "B", "C", "D", "E"];
const page = 2;
const limit = 2;
const offset = (page - 1) * limit;

console.log(products.slice(offset, offset + limit));`
const sliceRevealAnswer = `["C", "D"]`
const sortRevealCode = `const prices = [75000, 18000, 23000];
const sorted = [...prices].sort((a, b) => a - b);

console.log(sorted);`
const sortRevealAnswer = `[18000, 23000, 75000]`
const queryRevealCode = `const queryValue = "false";

console.log(Boolean(queryValue));
console.log(queryValue === "true");`
const queryRevealAnswer = `true
false`
</script>

<template>
  <div class="lab-page lab-three-page">
    <div class="lab-reading-progress" :style="{ transform: `scaleX(${progress / 100})` }" />
    <LabHeader
      :theme="theme"
      :menu-open="menuOpen"
      :lab-number="3"
      mark="REST"
      back-to="/http-lab-2"
      back-label="Лабораторная № 2"
      @toggle-theme="toggleTheme"
      @toggle-menu="menuOpen = !menuOpen"
    />
    <div class="lab-layout">
      <LabSidebar
        :items="labThreeNavigation"
        :active-id="activeId"
        :open="menuOpen"
        :lab-number="3"
        result="REST API с CRUD, фильтрацией, сортировкой и пагинацией"
        @navigate="navigate"
        @close="menuOpen = false"
      />

      <main class="lab-main">
        <section id="lab-top" class="lab-hero lab-three-hero">
          <div class="lab-hero-grid">
            <div class="lab-hero-copy">
              <div class="lab-eyebrow"><FlaskConical :size="15" /> Лабораторная работа № 3</div>
              <h1>Проектирование <span>REST API</span> и реализация CRUD</h1>
              <p>Научимся работать с ресурсами, параметрами маршрутов и query-параметрами, реализуем CRUD, фильтрацию, сортировку и пагинацию данных с помощью Express.js.</p>
              <div class="lab-meta">
                <span><Clock3 :size="17" /> 2 академических часа</span>
                <span><GraduationCap :size="18" /> Начальный / средний</span>
                <span><Code2 :size="17" /> Node.js · Express 5 · JavaScript</span>
                <span><Layers3 :size="17" /> Теория · примеры · практика</span>
              </div>
            </div>
            <div class="rest-resource-card" aria-label="Схема REST API для товаров">
              <header><span>products.api</span><small>Express 5</small></header>
              <div><HTTPMethodBadge method="GET" /><code>/products</code><b>200</b></div>
              <div><HTTPMethodBadge method="POST" /><code>/products</code><b>201</b></div>
              <div><HTTPMethodBadge method="PATCH" /><code>/products/:id</code><b>200</b></div>
              <div><HTTPMethodBadge method="DELETE" /><code>/products/:id</code><b>204</b></div>
              <footer><Database :size="16" /> данные в памяти процесса</footer>
            </div>
          </div>
        </section>

        <div class="lab-content">
          <aside class="lab-goal">
            <span><Route /></span>
            <div><small>ЦЕЛЬ РАБОТЫ</small><p>Спроектировать понятный REST API, реализовать полный CRUD для массива объектов и научиться безопасно обрабатывать параметры пути, тела и строки запроса.</p></div>
          </aside>

          <LabSection id="recap" number="01" title="Повторение предыдущей лабораторной" label="ВОЗВРАЩАЕМСЯ К ОСНОВЕ">
            <p class="lab-lead">HTTP задаёт правила обмена сообщениями, а Express помогает связать HTTP-метод и путь с JavaScript-обработчиком.</p>
            <div class="recap-grid">
              <article><strong>HTTP</strong><p>Протокол запросов и ответов между клиентом и сервером.</p></article>
              <article><strong>Маршрут</strong><p>Сочетание метода, пути и функции-обработчика.</p></article>
              <article><strong>req</strong><p>Запрос: параметры, query, заголовки и тело.</p></article>
              <article><strong>res</strong><p>Ответ: статус, заголовки и данные для клиента.</p></article>
            </div>
            <p><code>express.json()</code> разбирает JSON-тело и помещает результат в <code>req.body</code>. Параметры пути доступны в <code>req.params</code>. Методы <code>res.status()</code> и <code>res.json()</code> задают статус и JSON-ответ.</p>
            <CodeBlock :code="recapServer" language="javascript" />
            <InfoBlock type="important" title="ES-модули"><p>Все примеры этой лабораторной используют <code>import</code>. Установите Express командой <code>npm install express@5</code> и проверьте настройку проекта:</p></InfoBlock>
            <CodeBlock :code="packageJsonSetup" language="json" label="Фрагмент package.json" />
            <CodeBlock code="node index.js" language="bash" label="Запуск сервера" />
            <div class="oral-check">
              <strong>Перед продолжением ответьте</strong>
              <span>Чем GET отличается от POST?</span><span>Где находится JSON-тело?</span><span>Что содержит req.params?</span><span>Зачем нужен статус ответа?</span>
            </div>
          </LabSection>

          <LabSection id="api-rest" number="02" title="Что такое API и REST API">
            <p class="lab-lead"><strong>API</strong> — интерфейс взаимодействия программ: набор правил, по которым одна программа запрашивает данные или действие у другой.</p>
            <p><strong>REST</strong> — архитектурный стиль проектирования сетевых приложений. Это не библиотека, не фреймворк и не отдельный протокол. Express помогает реализовать REST API, но сам по себе не делает любой API REST-совместимым.</p>
            <div class="rest-principles">
              <article><PackageOpen /><div><strong>Ресурсы</strong><p>Товары, студенты, книги и другие сущности предметной области.</p></div></article>
              <article><Server /><div><strong>Stateless</strong><p>Каждый запрос содержит всё необходимое для его обработки.</p></div></article>
              <article><Layers3 /><div><strong>Единый интерфейс</strong><p>Понятные URI, HTTP-методы и коды состояния.</p></div></article>
              <article><Tags /><div><strong>Представление</strong><p>Состояние ресурса передаётся, например, в формате JSON.</p></div></article>
            </div>
            <CodeBlock :code="productJson" language="json" label="Представление ресурса" />
            <div class="collection-resource">
              <div><code>/products</code><strong>Коллекция</strong><span>набор товаров</span></div>
              <ArrowRight />
              <div><code>/products/1</code><strong>Один ресурс</strong><span>товар с ID 1</span></div>
            </div>
            <InfoBlock type="warning" title="JSON ещё не означает REST"><p>API может возвращать JSON, но использовать глаголы в URL, игнорировать HTTP-методы и неверно выбирать статусы. Формат данных — лишь одна часть интерфейса.</p></InfoBlock>
          </LabSection>

          <LabSection id="rest-design" number="03" title="Правила проектирования REST API">
            <div class="route-quality">
              <div><span>УДАЧНО</span><CodeBlock :code="goodRoutes" language="http" /></div>
              <div class="bad"><span>НЕУДАЧНО</span><CodeBlock :code="badRoutes" language="http" /></div>
            </div>
            <p>URL называет <strong>ресурс существительным</strong>, а действие выражает HTTP-метод. Благодаря этому все операции образуют единообразный и предсказуемый интерфейс.</p>
            <ul class="lab-rules">
              <li>Для коллекции используйте множественное число: <code>/products</code>.</li>
              <li>Конкретный ресурс обозначайте идентификатором: <code>/products/:id</code>.</li>
              <li>Вложенность применяйте для связи ресурсов: <code>/groups/:group/students</code>, но не стройте слишком длинные пути.</li>
              <li>GET читает, POST создаёт, PATCH частично обновляет, DELETE удаляет.</li>
            </ul>
            <h3>Идемпотентность простыми словами</h3>
            <p>Операция идемпотентна, если повторение одного и того же запроса не добавляет новых изменений после первого выполнения. GET, PUT и DELETE проектируют идемпотентными. Повторный POST обычно создаёт ещё один ресурс, поэтому не считается идемпотентным.</p>
            <div class="lab-table-wrap">
              <table class="lab-table">
                <thead><tr><th>Метод</th><th>Типичная операция</th><th>Идемпотентен</th><th>Успешный статус</th></tr></thead>
                <tbody>
                  <tr><td><HTTPMethodBadge method="GET" /></td><td>Получить</td><td>Да</td><td>200</td></tr>
                  <tr><td><HTTPMethodBadge method="POST" /></td><td>Создать</td><td>Обычно нет</td><td>201</td></tr>
                  <tr><td><HTTPMethodBadge method="PUT" /></td><td>Полностью заменить</td><td>Да</td><td>200 / 204</td></tr>
                  <tr><td><HTTPMethodBadge method="PATCH" /></td><td>Частично изменить</td><td>Зависит от операции</td><td>200 / 204</td></tr>
                  <tr><td><HTTPMethodBadge method="DELETE" /></td><td>Удалить</td><td>Да</td><td>204</td></tr>
                </tbody>
              </table>
            </div>
          </LabSection>

          <LabSection id="crud" number="04" title="Что такое CRUD">
            <p class="lab-lead">CRUD объединяет четыре базовые операции, которые большинство приложений выполняют над данными.</p>
            <div class="crud-grid">
              <article v-for="item in crudOperations" :key="item.operation">
                <span>{{ item.operation[0] }}</span>
                <div><strong>{{ item.operation }}</strong><small>{{ item.meaning }}</small><HTTPMethodBadge :method="item.method.split(' / ')[0]" /><code>{{ item.path }}</code></div>
              </article>
            </div>
            <h3>Полный интерфейс каталога товаров</h3>
            <div class="endpoint-list">
              <EndpointBlock method="GET" path="/products" description="Получить коллекцию товаров" status="200" />
              <EndpointBlock method="GET" path="/products/:id" description="Получить конкретный товар" status="200 / 404" />
              <EndpointBlock method="POST" path="/products" description="Создать товар" status="201 / 400" />
              <EndpointBlock method="PATCH" path="/products/:id" description="Частично изменить товар" status="200 / 400 / 404" />
              <EndpointBlock method="DELETE" path="/products/:id" description="Удалить товар" status="204 / 400 / 404" />
            </div>
            <p>Все операции связаны с одним ресурсом <code>products</code>. Клиенту не нужно запоминать отдельное название пути для каждого действия.</p>
          </LabSection>

          <LabSection id="memory" number="05" title="Хранение данных в памяти" label="БЕЗ БАЗЫ ДАННЫХ">
            <p>В этой работе используем обычный массив объектов. Он позволит сосредоточиться на маршрутах и HTTP, не добавляя инфраструктуру базы данных.</p>
            <CodeBlock :code="productsData" language="javascript" />
            <div class="memory-warning">
              <Database />
              <div><strong>Массив живёт в оперативной памяти процесса Node.js</strong><p>После перезапуска сервера все созданные, изменённые и удалённые во время работы данные исчезнут. Это учебный подход, а не постоянное хранилище. В следующих лабораторных данные будут перенесены в SQLite.</p></div>
            </div>
            <InfoBlock type="tip" title="Почему nextId, а не products.length + 1?"><p>После удаления длина массива уменьшается, и формула может повторно выдать существующий ID. Отдельный счётчик не уменьшается при удалении.</p></InfoBlock>
          </LabSection>

          <LabSection id="get-list" number="06" title="Получение списка ресурсов — GET">
            <p>Маршрут коллекции возвращает JSON-массив. Express автоматически задаёт подходящий <code>Content-Type</code> при вызове <code>res.json()</code>.</p>
            <CodeBlock :code="getListRoute" language="javascript" />
            <CodeBlock code="curl http://localhost:3000/products" language="bash" />
            <RequestResponseExample
              :request="'GET /products HTTP/1.1\nHost: localhost:3000'"
              :response="`HTTP/1.1 200 OK\nContent-Type: application/json\n\n[${productJson}]`"
              response-language="http"
            />
          </LabSection>

          <LabSection id="path-params" number="07" title="Параметры пути — req.params">
            <p class="lab-lead">В маршруте <code>/products/:id</code> сегмент <code>:id</code> динамический. Для запроса <code>/products/5</code> значение доступно как <code>req.params.id</code>.</p>
            <InfoBlock type="important" title="Параметр пути — строка"><p>Даже если URL содержит цифры, <code>req.params.id</code> изначально является строкой. Перед сравнением с числовым ID его нужно преобразовать и проверить.</p></InfoBlock>
            <CodeBlock :code="parseIdHelper" language="javascript" label="Общая функция проверки ID" />
            <CodeBlock :code="getByIdRoute" language="javascript" />
            <div class="status-scenarios">
              <div><code>/products/abc</code><span>невалидный формат</span><b>400</b></div>
              <div><code>/products/999</code><span>формат верен, товара нет</span><b>404</b></div>
              <div><code>/products/1</code><span>товар найден</span><b>200</b></div>
            </div>
            <p><code>400</code> сообщает, что сам запрос некорректен. <code>404</code> означает: идентификатор допустим, но ресурс с ним не найден.</p>
          </LabSection>

          <LabSection id="post-product" number="08" title="Создание ресурса — POST">
            <p>Клиент передаёт данные в JSON-теле. Middleware <code>express.json()</code> должен быть подключён до маршрута, иначе <code>req.body</code> не будет содержать разобранный объект.</p>
            <CodeBlock :code="postProductRoute" language="javascript" />
            <ol class="code-walkthrough">
              <li><strong>Получаем поля</strong><span>Деструктурируем значения из <code>req.body</code>.</span></li>
              <li><strong>Проверяем</strong><span>Типы, пустые строки, конечность и диапазон цены.</span></li>
              <li><strong>Создаём объект</strong><span>ID формирует сервер через <code>nextId++</code>.</span></li>
              <li><strong>Сохраняем и отвечаем</strong><span><code>push()</code> добавляет объект, статус <code>201</code> подтверждает создание.</span></li>
            </ol>
            <InfoBlock type="warning" title="Данным клиента нельзя доверять"><p>Проверяйте каждое обязательное поле до изменения массива. Полноценную валидацию схем с Zod разберём в лабораторной № 4.</p></InfoBlock>
          </LabSection>

          <LabSection id="patch-product" number="09" title="Изменение ресурса — PATCH">
            <p><code>PUT</code> обычно полностью заменяет представление ресурса, а <code>PATCH</code> изменяет только переданные поля. Для запроса ниже остальные свойства товара сохраняются:</p>
            <CodeBlock :code="'PATCH /products/1\nContent-Type: application/json\n\n{\n  &quot;price&quot;: 70000\n}'" language="http" />
            <h3>Первый шаг: обновляем только цену</h3>
            <CodeBlock :code="patchPriceRoute" language="javascript" />
            <p>Этот обработчик — рабочая демонстрация одного разрешённого поля. Следующий вариант <strong>заменяет его</strong> и расширяет подход на все разрешённые поля.</p>
            <h3>Итоговый безопасный вариант</h3>
            <CodeBlock :code="patchSafeRoute" language="javascript" />
            <div class="patch-rules">
              <article><strong>Белый список</strong><p>Клиент меняет только явно разрешённые поля, но не <code>id</code>.</p></article>
              <article><strong>Проверка наличия</strong><p><code>"inStock" in req.body</code> отличает отсутствие поля от корректного <code>false</code>.</p></article>
              <article><strong>Сначала проверка</strong><p>Объект <code>updates</code> не даёт частично изменить товар до завершения всех проверок.</p></article>
            </div>
            <InfoBlock type="warning" title="Не присваивайте тело целиком"><p><code>Object.assign(product, req.body)</code> без белого списка позволит изменить <code>id</code> и сохранить неизвестные поля. Контролировать структуру должен сервер.</p></InfoBlock>
          </LabSection>

          <LabSection id="delete-product" number="10" title="Удаление ресурса — DELETE">
            <p><code>findIndex()</code> возвращает позицию элемента или <code>-1</code>. После проверки <code>splice()</code> удаляет один элемент из массива.</p>
            <CodeBlock :code="deleteProductRoute" language="javascript" />
            <InfoBlock type="important" title="204 No Content"><p>Операция выполнена успешно, но тела ответа нет. Не вызывайте <code>res.json()</code> вместе со статусом <code>204</code>.</p></InfoBlock>
          </LabSection>

          <LabSection id="query-params" number="11" title="Query-параметры — req.query">
            <div class="param-compare">
              <div><code>/products/5</code><strong>Параметр пути</strong><span>Какой конкретно ресурс?</span></div>
              <div><code>/products?category=electronics</code><strong>Query-параметр</strong><span>Как отобрать или представить коллекцию?</span></div>
            </div>
            <p>После знака <code>?</code> начинается строка запроса. Знак <code>=</code> отделяет имя от значения, а <code>&</code> разделяет несколько параметров:</p>
            <CodeBlock code="/products?category=electronics&amp;inStock=true" language="text" label="URL" />
            <CodeBlock :code="queryReadRoute" language="javascript" />
            <div class="lab-table-wrap">
              <table class="lab-table">
                <thead><tr><th>Источник</th><th>Пример</th><th>Express</th><th>Назначение</th></tr></thead>
                <tbody>
                  <tr><td>Путь</td><td><code>/products/5</code></td><td><code>req.params.id</code></td><td>Идентифицировать ресурс</td></tr>
                  <tr><td>Query</td><td><code>?page=2</code></td><td><code>req.query.page</code></td><td>Настроить выборку</td></tr>
                  <tr><td>Тело</td><td>JSON</td><td><code>req.body</code></td><td>Передать данные создания/изменения</td></tr>
                </tbody>
              </table>
            </div>
            <InfoBlock type="warning" title="Query не преобразует типы автоматически"><p>Значения могут отсутствовать, а переданные обычно приходят строками. Строка <code>"false"</code> не равна boolean <code>false</code> и сама по себе является truthy-значением.</p></InfoBlock>
            <InfoBlock type="info" title="Особенность Express 5"><p><code>req.query</code> — доступный только для чтения getter, а стандартный parser стал простым. Не изменяйте объект запроса: прочитайте нужные значения в локальные переменные, проверьте их и преобразуйте явно.</p></InfoBlock>
            <RevealAnswer :code="queryRevealCode" :answer="queryRevealAnswer" explanation="Любая непустая строка преобразуется Boolean() в true. Для query-параметра нужно явно сравнить текст с допустимыми значениями." />
          </LabSection>

          <LabSection id="filtering" number="12" title="Фильтрация данных">
            <p>Фильтрация оставляет только товары, соответствующие условиям клиента. Начнём с категории:</p>
            <CodeBlock :code="categoryFilterRoute" language="javascript" />
            <p>Копия <code>[...products]</code> отделяет рабочий результат запроса от исходного массива. Метод <code>filter()</code> и так создаёт новый массив, но единая копия удобна, когда дальше добавляются сортировка и пагинация.</p>
            <div class="filter-examples">
              <EndpointBlock method="GET" path="/products?inStock=true" description="Только товары в наличии" />
              <EndpointBlock method="GET" path="/products?minPrice=10000&amp;maxPrice=50000" description="Диапазон цены" />
              <EndpointBlock method="GET" path="/products?search=ноутбук" description="Поиск по названию" />
            </div>
            <h3>Безопасное преобразование boolean</h3>
            <CodeBlock :code="booleanQuery" language="javascript" />
            <h3>Проверка числового фильтра</h3>
            <CodeBlock :code="priceQuery" language="javascript" />
            <p>Несколько фильтров применяются последовательно к одному <code>result</code>. Каждый следующий фильтр работает уже с результатом предыдущего.</p>
            <RevealAnswer :code="filterRevealCode" :answer="filterRevealAnswer" explanation="filter() оставляет значения, для которых условие price >= 20000 вернуло true." />
          </LabSection>

          <LabSection id="sorting" number="13" title="Сортировка">
            <p>Параметры <code>sortBy</code> и <code>order</code> позволяют клиенту выбрать поле и направление:</p>
            <CodeBlock :code="'GET /products?sortBy=price&amp;order=asc\nGET /products?sortBy=price&amp;order=desc'" language="http" />
            <InfoBlock type="important" title="sort() изменяет массив"><p>Вызов <code>products.sort()</code> переставит элементы в основном хранилище. Создавайте копию перед сортировкой.</p></InfoBlock>
            <div class="code-pair-lab">
              <div><span>ЧИСЛА</span><CodeBlock :code="sortNumber" language="javascript" /></div>
              <div><span>СТРОКИ</span><CodeBlock :code="sortString" language="javascript" /></div>
            </div>
            <p>Для чисел функция сравнения вычитает значения. Для текста используйте <code>localeCompare()</code>. Не принимайте любое имя свойства от клиента: разрешите только явный список, например <code>id</code>, <code>title</code> и <code>price</code>.</p>
            <RevealAnswer :code="sortRevealCode" :answer="sortRevealAnswer" explanation="Вычитание a - b задаёт сортировку чисел по возрастанию. Исходный массив prices не меняется благодаря копии." />
          </LabSection>

          <LabSection id="pagination" number="14" title="Пагинация">
            <p class="lab-lead">Если в каталоге 100 000 товаров, не нужно отправлять их все одним ответом. Пагинация делит результат на небольшие страницы.</p>
            <div class="pagination-terms">
              <div><code>page</code><span>номер страницы</span></div>
              <div><code>limit</code><span>элементов на странице</span></div>
              <div><code>offset</code><span>сколько элементов пропустить</span></div>
            </div>
            <CodeBlock :code="paginationCode" language="javascript" />
            <p>Формула <code>(page - 1) * limit</code> даёт начало среза. Для второй страницы по 10 элементов offset равен 10.</p>
            <CodeBlock code="GET /products?page=2&amp;limit=10" language="http" />
            <CodeBlock :code="paginationResponse" language="json" label="Формат ответа" />
            <ul class="lab-rules">
              <li><code>page</code> и <code>limit</code> должны быть положительными целыми числами.</li>
              <li>Максимальный <code>limit</code> — 100, чтобы клиент не запросил слишком большой ответ.</li>
              <li><code>total</code> считают до <code>slice()</code>, а <code>totalPages</code> — через <code>Math.ceil(total / limit)</code>.</li>
              <li>Некорректные параметры приводят к <code>400 Bad Request</code>.</li>
            </ul>
            <RevealAnswer :code="sliceRevealCode" :answer="sliceRevealAnswer" explanation="Для второй страницы offset равен 2. slice(2, 4) берёт элементы с индексами 2 и 3." />
          </LabSection>

          <LabSection id="combined" number="15" title="Фильтрация, сортировка и пагинация вместе" label="КЛЮЧЕВОЙ РАЗДЕЛ">
            <p>Один запрос может содержать несколько настроек:</p>
            <CodeBlock code="GET /products?category=electronics&amp;sortBy=price&amp;order=desc&amp;page=1&amp;limit=5" language="http" />
            <div class="processing-pipeline" aria-label="Последовательность обработки списка">
              <span>Исходные данные</span><ArrowRight /><span>Фильтрация</span><ArrowRight /><span>Сортировка</span><ArrowRight /><span>Подсчёт</span><ArrowRight /><span>Пагинация</span><ArrowRight /><span>Ответ</span>
            </div>
            <p>Сначала сервер проверяет параметры. Затем отбирает товары категории electronics, сортирует их по убыванию цены, считает количество отобранных записей и только после этого берёт первую страницу из пяти элементов.</p>
            <InfoBlock type="important" title="Этот вариант заменяет простой GET /products"><p>В разделе 6 был минимальный маршрут для знакомства. Ниже — итоговая версия того же маршрута с проверками и всеми этапами обработки.</p></InfoBlock>
            <CodeBlock :code="combinedProductsRoute" language="javascript" label="Итоговый GET /products" />
          </LabSection>

          <LabSection id="rest-statuses" number="16" title="HTTP-коды в REST API">
            <div class="lab-table-wrap">
              <table class="lab-table status-reference">
                <thead><tr><th>Код</th><th>Назначение</th><th>Пример</th></tr></thead>
                <tbody>
                  <tr><td><b class="status-ok">200</b></td><td>Успешное получение или обновление</td><td>GET /products/1</td></tr>
                  <tr><td><b class="status-ok">201</b></td><td>Ресурс создан</td><td>POST /products</td></tr>
                  <tr><td><b class="status-ok">204</b></td><td>Успешно, тела нет</td><td>DELETE /products/1</td></tr>
                  <tr><td><b class="status-client">400</b></td><td>Некорректный запрос</td><td>page=-1</td></tr>
                  <tr><td><b class="status-client">404</b></td><td>Ресурс не найден</td><td>/products/999</td></tr>
                  <tr><td><b class="status-server">500</b></td><td>Внутренняя ошибка сервера</td><td>Неожиданное исключение</td></tr>
                </tbody>
              </table>
            </div>
            <InfoBlock type="warning" title="500 — не универсальная ошибка"><p>Неверный ID, отсутствующее поле или недопустимая сортировка — ошибки клиента и должны приводить к 400. Отсутствующий ресурс — 404. Статус 500 предназначен для непредвиденной ошибки внутри сервера.</p></InfoBlock>
          </LabSection>

          <LabSection id="manual-testing" number="17" title="Тестирование API вручную">
            <p><code>curl</code> позволяет проверить каждый маршрут без frontend-приложения. Сервер должен быть запущен на порту 3000.</p>
            <div class="curl-stack">
              <CodeBlock code="curl http://localhost:3000/products" language="bash" label="Получить список" />
              <CodeBlock code="curl http://localhost:3000/products/1" language="bash" label="Получить товар" />
              <CodeBlock :code="curlCreate" language="bash" label="Создать товар" />
              <CodeBlock :code="curlPatch" language="bash" label="Изменить товар" />
              <CodeBlock code="curl -X DELETE http://localhost:3000/products/1" language="bash" label="Удалить товар" />
              <CodeBlock code="curl -i http://localhost:3000/products" language="bash" label="Показать статус и заголовки" />
            </div>
            <p>Те же запросы можно отправлять через Postman, Insomnia или другой HTTP-клиент. Проверяйте не только тело, но и статус ответа.</p>
          </LabSection>
        </div>

        <section id="practice" class="lab-practice lab-three-practice lab-observe">
          <div class="lab-content">
            <header class="practice-title"><span><FlaskConical /></span><div><small>САМОСТОЯТЕЛЬНАЯ РАБОТА</small><h2>REST API для студентов</h2><p>Продолжите сервер предыдущей лабораторной. Код пишется локально и проверяется преподавателем — сайт не выполняет и не отправляет решения.</p></div></header>
            <div class="student-model"><span>ОСНОВНАЯ СУЩНОСТЬ</span><CodeBlock :code="'{\n  id: 1,\n  name: &quot;Adam&quot;,\n  age: 18,\n  group: &quot;ИВТ-26&quot;,\n  averageGrade: 4.5,\n  isActive: true\n}'" language="javascript" /></div>
            <div class="lab-task-list detailed-tasks">
              <article v-for="task in practiceTasks" :key="task.n">
                <span class="task-num">{{ task.n }}</span>
                <div>
                  <span class="endpoint-chip">{{ task.endpoint }}</span>
                  <h3>{{ task.title }}</h3>
                  <p>{{ task.text }}</p>
                  <div class="task-checks"><span v-for="check in task.checks" :key="check"><CheckCircle2 :size="12" />{{ check }}</span></div>
                </div>
                <span class="task-check"><CircleDot :size="18" /></span>
              </article>
            </div>
            <div class="lab-bonus lab-three-bonus">
              <header><Sparkles /><div><small>ПОВЫШЕННАЯ СЛОЖНОСТЬ</small><h3>Дополнительные задания</h3></div></header>
              <div><article v-for="task in bonusTasks" :key="task.n"><span>{{ task.n }}</span><div><code>{{ task.endpoint }}</code><h4>{{ task.title }}</h4><p>{{ task.text }}</p></div></article></div>
            </div>
          </div>
        </section>

        <div class="lab-content lab-bottom">
          <section id="questions" class="questions-section lab-questions-reveal lab-observe">
            <header><span>Q&A</span><div><small>САМОПРОВЕРКА</small><h2>Контрольные вопросы</h2></div></header>
            <p class="questions-intro">Сначала ответьте своими словами, затем раскройте карточку.</p>
            <div class="lab-question-list">
              <details v-for="([question, answer], index) in controlQuestions" :key="question">
                <summary><span>{{ String(index + 1).padStart(2, '0') }}</span>{{ question }}<ChevronDown :size="16" /></summary>
                <p>{{ answer }}</p>
              </details>
            </div>
          </section>

          <section id="homework" class="lab-homework lab-observe">
            <header><span><BookCheck /></span><div><small>ДОМАШНЕЕ ЗАДАНИЕ</small><h2>REST API для библиотеки</h2><p>Создайте отдельное Express-приложение. Готовое решение намеренно не приводится.</p></div></header>
            <CodeBlock :code="'{\n  id: 1,\n  title: &quot;Преступление и наказание&quot;,\n  author: &quot;Фёдор Достоевский&quot;,\n  year: 1866,\n  genre: &quot;Роман&quot;,\n  available: true\n}'" language="javascript" label="Модель книги" />
            <div class="homework-endpoints">
              <EndpointBlock method="GET" path="/books" /><EndpointBlock method="GET" path="/books/:id" />
              <EndpointBlock method="POST" path="/books" /><EndpointBlock method="PATCH" path="/books/:id" />
              <EndpointBlock method="DELETE" path="/books/:id" />
            </div>
            <h3>Дополнительные возможности</h3>
            <ul class="lab-rules"><li>поиск по названию;</li><li>фильтрация по автору, жанру и доступности;</li><li>сортировка по году издания;</li><li>пагинация с метаданными.</li></ul>
          </section>

          <section id="submission" class="submission lab-three-submission lab-observe">
            <div class="submission-main"><span><BookCheck /></span><div><small>КРИТЕРИИ СДАЧИ</small><h2>Что показать преподавателю</h2><p>Проверка выполняется вручную на компьютере студента.</p></div></div>
            <div class="criteria-grid"><span v-for="(criterion, index) in submissionCriteria" :key="criterion"><b>{{ String(index + 1).padStart(2, '0') }}</b>{{ criterion }}</span></div>
            <InfoBlock type="important" title="Работающий сервер — только часть результата"><p>Студент должен уметь объяснить назначение маршрутов и HTTP-методов, различие <code>req.params</code>, <code>req.query</code> и <code>req.body</code>, порядок обработки массива и выбор кодов ответа.</p></InfoBlock>
          </section>

          <section class="learning-outcome">
            <small>ОБРАЗОВАТЕЛЬНЫЙ РЕЗУЛЬТАТ</small>
            <h2>Вы можете спроектировать небольшой REST API</h2>
            <div><span>Ресурсы</span><ArrowRight /><span>CRUD</span><ArrowRight /><span>Фильтры</span><ArrowRight /><span>Сортировка</span><ArrowRight /><span>Пагинация</span></div>
            <p>Следующая тема — middleware, схемы Zod и централизованная обработка ошибок.</p>
          </section>

          <nav class="lab-series-nav two-sided" aria-label="Навигация между лабораторными работами">
            <RouterLink class="lab-series-link previous" to="/http-lab-2"><ArrowLeft /><span><small>ПРЕДЫДУЩАЯ РАБОТА</small><strong>Лабораторная № 2</strong><em>HTTP и первый Express-сервер</em></span></RouterLink>
            <div class="lab-series-link disabled" aria-disabled="true"><span><small>СЛЕДУЮЩАЯ РАБОТА</small><strong>Лабораторная № 4</strong><em>Middleware, Zod и ошибки · скоро</em></span><ArrowRight /></div>
          </nav>

          <footer class="lab-footer"><span class="lab-brand-mark small">REST</span><p>Разработка веб-приложений · Лабораторная № 3</p><a href="#lab-top">Наверх ↑</a></footer>
        </div>
      </main>
    </div>
  </div>
</template>
