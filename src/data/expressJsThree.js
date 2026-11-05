export const lesson = {
  number: 3,
  title: 'Middleware и Router: как проходит запрос',
  description: 'Напишем маленький обработчик, разберём next() и перенесём маршруты товаров в отдельный файл. Каждый новый шаг проверим в браузере или терминале.',
  goal: 'Понять, зачем нужен middleware, научиться продолжать обработку через next() и собрать небольшой проект из трёх понятных файлов.',
  result: 'Сервер с журналом запросов и отдельным Router',
  steps: ['Вспомним знакомый сервер', 'Добавим действие перед маршрутом', 'Разберём next() и порядок', 'Вынесем маршруты в файл'],
  previous: { path: '/express-js-2', title: 'REST API и CRUD' },
  next: { path: '/express-js-4', title: 'Проверка данных и понятные ошибки' },
  navigation: [
    ['recap', 'Начинаем со знакомого'], ['setup', 'Запускаем пример'],
    ['middleware', 'Что такое middleware'], ['next', 'Для чего next()'],
    ['order', 'В каком порядке работает код'], ['json', 'Знакомый express.json()'],
    ['modules', 'Два файла: export и import'], ['router', 'Что делает Router'],
    ['project', 'Готовый проект: три файла'], ['testing', 'Проверяем результат'],
    ['practice', 'Практика'], ['questions', 'Вопросы с ответами'],
    ['homework', 'Домашнее задание'], ['submission', 'Что показать'],
  ],
  practice: [
    { title: 'Увидьте запрос в терминале', text: 'В logger добавьте вторую строку console.log("Пришёл новый запрос"). Откройте /api/products.', check: 'Сообщение появляется в терминале сервера, а JSON с товарами — в браузере.' },
    { title: 'Добавьте маршрут внутри Router', text: 'Создайте GET /count, который возвращает { count: products.length }. Поставьте его до GET /:id.', check: 'Адрес /api/products/count возвращает 200 и число товаров; /api/products/1 по-прежнему работает.' },
    { title: 'Проверьте общий префикс', text: 'В index.js временно замените /api/products на /shop. Сами пути в routers/products.js оставьте прежними.', check: '/shop и /shop/1 работают. Объясните, из каких двух частей получились эти адреса. После проверки верните /api/products.' },
    { title: 'Создайте товар', text: 'Отправьте POST с title и price. Затем ещё раз запросите список.', check: 'POST возвращает 201; в новом GET есть созданный товар. Отрицательная цена возвращает 400.' },
  ],
  questions: [
    ['Что такое middleware простыми словами?', 'Функция, которая выполняет один шаг обработки запроса. Например, выводит адрес запроса в терминал, а затем передаёт запрос дальше.'],
    ['Что означают req и res?', 'req содержит сведения о запросе клиента. Через res сервер отправляет ответ клиенту.'],
    ['Зачем вызывать next()?', 'Чтобы Express перешёл к следующему подходящему обработчику. Если не ответить и не вызвать next(), клиент будет ждать.'],
    ['Чем console.log() отличается от res.json()?', 'console.log() пишет в терминал сервера. res.json() отправляет JSON клиенту.'],
    ['Почему express.json() стоит перед Router?', 'Он должен разобрать JSON до того, как POST-маршрут прочитает req.body.'],
    ['Что делает export?', 'Позволяет другому файлу импортировать указанную переменную или функцию.'],
    ['Зачем нужен Router?', 'Чтобы собрать связанные маршруты в одном месте и подключить их к приложению по общему адресу.'],
    ['Какой адрес у router.get("/:id"), если префикс /api/products?', 'Например, /api/products/1. /api/products — общая часть, /1 — часть конкретного маршрута.'],
  ],
  homework: {
    intro: 'В отдельной копии API студентов из второго занятия создайте папку routers, а внутри неё файл students.js и вынесите в него маршруты студентов. Существующие проверки данных пока оставьте как есть.',
    tasks: ['Экспортируйте studentsRouter и подключите его по /api/students.', 'Вынесите logger в logger.js и подключите перед маршрутами.', 'Проверьте список, одного студента, создание, изменение и удаление. Сохраните фильтры, сортировку и пагинацию из предыдущей работы.'],
    check: 'При сдаче покажите один успешный запрос и запрос к отсутствующему студенту. Нарисуйте путь: запрос → logger → Router → ответ.',
  },
  criteria: ['Сервер запускается командой node index.js', 'Logger показывает метод и путь', 'Маршруты находятся в отдельном файле', 'GET и POST работают по новому префиксу', 'Студент объясняет next() и порядок middleware', 'Студент различает import, export и Router'],
}

export const setupCode = `mkdir express-steps
cd express-steps
npm init -y
npm install express@5
npm pkg set type=module`

export const starter = `import express from "express";

const app = express();

app.get("/hello", (req, res) => {
  res.json({ message: "Привет!" });
});

app.listen(3000, () => {
  console.log("Откройте http://localhost:3000/hello");
});`

export const middlewareCode = `function logger(req, res, next) {
  console.log(req.method, req.path);
  next();
}

app.use(logger); // добавьте ДО app.get("/hello", ...)`
export const orderCode = `app.use((req, res, next) => {
  console.log("1. Запрос пришёл");
  next();
});

app.get("/hello", (req, res) => {
  console.log("2. Отправляем ответ");
  res.json({ message: "Привет!" });
});`
export const exportCode = `// greeting.js
export const message = "Привет!";`
export const importCode = `// index.js — отдельный пример для понимания import
import { message } from "./greeting.js";
console.log(message); // Привет!`
export const routerCode = `const productsRouter = Router();

productsRouter.get("/", (req, res) => {
  res.json([{ id: 1, title: "Монитор", price: 23000 }]);
});

app.use("/api/products", productsRouter);`

export const projectFiles = {
  logger: { path: 'logger.js', code: `export function logger(req, res, next) {
  console.log(req.method, req.path);
  next();
}` },
  router: { path: 'routers/products.js', code: `import { Router } from "express";

export const productsRouter = Router();

const products = [
  { id: 1, title: "Монитор", price: 23000 },
  { id: 2, title: "Мышь", price: 1500 }
];
let nextId = 3;

productsRouter.get("/", (req, res) => {
  res.json(products);
});

productsRouter.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isSafeInteger(id) || id <= 0) {
    return res.status(400).json({ message: "Некорректный ID" });
  }

  const product = products.find((item) => item.id === id);
  if (!product) {
    return res.status(404).json({ message: "Товар не найден" });
  }

  res.json(product);
});

productsRouter.post("/", (req, res) => {
  const body = req.body;
  if (body === null || typeof body !== "object" || Array.isArray(body)) {
    return res.status(400).json({ message: "Нужен JSON-объект" });
  }

  const title = body.title;
  const price = body.price;

  if (typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ message: "Укажите название" });
  }
  if (typeof price !== "number" || !Number.isFinite(price) || price < 0) {
    return res.status(400).json({ message: "Цена должна быть числом от 0" });
  }

  const product = { id: nextId++, title: title.trim(), price: price };
  products.push(product);
  res.status(201).json(product);
});` },
  index: { path: 'index.js', code: `import express from "express";
import { logger } from "./logger.js";
import { productsRouter } from "./routers/products.js";

const app = express();

app.use(logger);
app.use(express.json());
app.use("/api/products", productsRouter);

app.listen(3000, () => {
  console.log("Сервер работает: http://localhost:3000/api/products");
});` },
}
export const curlCreate = `curl -i -X POST http://localhost:3000/api/products -H 'Content-Type: application/json' -d '{"title":"Клавиатура","price":4500}'`
