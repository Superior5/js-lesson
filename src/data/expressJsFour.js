import { projectFiles as previousFiles } from './expressJsThree.js'

export const lesson = {
  number: 4,
  title: 'Проверка данных и понятные ошибки',
  description: 'Продолжим проект прошлого занятия. Проверим название и цену товара с помощью Zod, а затем научимся отправлять ошибки через один общий обработчик.',
  goal: 'Научиться описывать простые правила данных, читать результат safeParse и различать ошибки 400, 404 и 500. По шагам подключить общий обработчик ошибок.',
  result: 'Проверенный POST и одинаковый формат ошибок',
  steps: ['Сформулируем правила для товара', 'Проверим значения с Zod', 'Разберём next(error)', 'Проверим ответы 400, 404 и 500'],
  previous: { path: '/express-js-3', title: 'Middleware и Router' },
  navigation: [
    ['recap', 'Продолжаем тот же проект'], ['rules', 'Что именно проверять'],
    ['schema', 'Первые правила Zod'], ['safe-parse', 'Два результата проверки'],
    ['post', 'Проверяем POST'], ['statuses', 'Разные причины ошибок'],
    ['next-error', 'Передаём ошибку дальше'], ['handler', 'Общий обработчик'],
    ['project', 'Итоговый проект'], ['testing', 'Проверяем себя запросами'],
    ['practice', 'Практика'], ['questions', 'Вопросы с ответами'],
    ['homework', 'Домашнее задание'], ['submission', 'Что показать'],
  ],
  practice: [
    { title: 'Проверьте границы', text: 'Отправьте товары с ценой 0, -1 и строкой "100". Затем отправьте название из одних пробелов.', check: 'Цена 0 принимается; остальные три запроса получают 400. Количество товаров при ошибках не меняется.' },
    { title: 'Добавьте правило длины', text: 'После min(1, ...) в схеме title добавьте max(80, "Название не длиннее 80 символов").', check: 'Название из 80 букв принимается, из 81 — возвращает 400 с вашим сообщением.' },
    { title: 'Отличите два случая 404', text: 'Запросите /api/products/999 и /missing.', check: 'Оба ответа имеют статус 404, но сообщения разные: «Товар не найден» и «Маршрут не найден».' },
    { title: 'Пройдите маршрут ошибки', text: 'В routers/products.js и errorHandler добавьте временные console.log. Отправьте товар с отрицательной ценой.', check: 'Сначала срабатывает проверка в маршруте, затем общий обработчик. Новый товар не создаётся.' },
    { title: 'Проверьте неожиданный сбой', text: 'Добавьте временный /test-error из раздела проверки. После запроса удалите этот маршрут.', check: 'Клиент видит 500 и общее сообщение, подробности ошибки видны в терминале. Обычный список товаров продолжает работать.' },
  ],
  questions: [
    ['Что такое валидация?', 'Проверка, что данные соответствуют правилам приложения. Например, название непустое, а цена — число не меньше нуля.'],
    ['Зачем проверять данные на сервере, если есть форма?', 'Запрос можно отправить без формы: из другого приложения, Postman или curl. Проверки формы не гарантируют корректность входных данных сервера.'],
    ['Что такое схема Zod?', 'Объект с правилами: какие поля ожидаются, каких они типов и какие значения допустимы.'],
    ['Что возвращает safeParse?', 'При успехе — success: true и проверенные data. При ошибке — success: false и error со списком issues.'],
    ['Зачем использовать result.data?', 'В них уже применены правила и преобразования схемы. Например, название очищено от крайних пробелов через trim().'],
    ['Почему "100" и 100 — разные значения?', 'Первое — строка, второе — число. z.number() принимает число; в нашем JSON цена должна передаваться без кавычек.'],
    ['Чем next() отличается от next(error)?', 'next() продолжает обычную обработку. next(error) переводит запрос к обработчику ошибок, пропуская обычные обработчики.'],
    ['Зачем return перед next(error)?', 'Чтобы текущая функция закончилась и не выполнила добавление товара или отправку успешного ответа.'],
    ['Почему обработчик ошибок принимает четыре аргумента?', 'По виду функции err, req, res, next Express определяет, что это обработчик ошибок.'],
    ['Что означают 400, 404 и 500?', '400 — неверный запрос; 404 — товар или маршрут не найден; 500 — неожиданный сбой сервера.'],
  ],
  homework: {
    intro: 'Продолжите API студентов из занятия № 3. Сначала улучшите только создание студента: остальные маршруты можно оставить с уже работающими проверками.',
    tasks: ['Создайте students.schema.js: name и group — непустые строки после trim; age — целое число от 16 до 100. Если в вашем API есть другие обязательные поля, добавьте правила и для них.', 'В POST используйте safeParse и создавайте студента только из проверенных данных. ID по-прежнему задаёт сервер.', 'Подключите общий обработчик ошибок последним. Ошибку проверки передавайте через next(error) со статусом 400.', 'В GET одного студента передавайте ошибку отсутствия через next(error) со статусом 404. Перед общим обработчиком ошибок добавьте обычный middleware для неизвестного маршрута.'],
    check: 'Сохраните шесть запросов с ответами: успешное создание, age = 15, age строкой, пустое name, отсутствующий студент и неизвестный маршрут. Все ошибки должны иметь формат { error: { message: "..." } }.',
  },
  criteria: ['POST использует схему Zod', 'Неверный запрос не меняет массив', 'Товар создаётся из result.data', 'Статусы 400, 404 и 500 различаются', 'Обработчик ошибок подключён последним', 'Студент объясняет путь next(error)'],
}

export const titleSchema = `import { z } from "zod";

const titleSchema = z.string().trim().min(1, "Укажите название");

console.log(titleSchema.safeParse("Монитор").success); // true
console.log(titleSchema.safeParse("   ").success);     // false
console.log(titleSchema.safeParse(123).success);       // false`
export const parseCode = `const result = productSchema.safeParse({
  title: "  Монитор  ",
  price: 23000
});

if (result.success) {
  console.log(result.data);
} else {
  console.log(result.error.issues);
}`
export const postStep = `productsRouter.post("/", (req, res) => {
  const result = productSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ message: "Проверьте название и цену" });
  }

  const product = {
    id: nextId++,
    title: result.data.title,
    price: result.data.price
  };

  products.push(product);
  res.status(201).json(product);
});`
export const nextErrorCode = `if (!result.success) {
  const error = new Error("Проверьте название и цену");
  error.status = 400;
  return next(error);
}`
export const handlerStep = `function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  res.status(status).json({
    error: { message: err.message }
  });
}`
export const testErrorCode = `// Временно добавьте в index.js ПЕРЕД middleware для 404.
app.get("/test-error", (req, res) => {
  throw new Error("Учебная поломка");
});`
export const projectFiles = {
  logger: previousFiles.logger,
  schema: { path: 'products.schema.js', code: `import { z } from "zod";

export const productSchema = z.strictObject({
  title: z.string().trim().min(1, "Укажите название"),
  price: z.number().min(0, "Цена не может быть отрицательной")
});` },
  router: { path: 'routers/products.js', code: `import { Router } from "express";
import { productSchema } from "../products.schema.js";

export const productsRouter = Router();

const products = [
  { id: 1, title: "Монитор", price: 23000 },
  { id: 2, title: "Мышь", price: 1500 }
];
let nextId = 3;

productsRouter.get("/", (req, res) => {
  res.json(products);
});

productsRouter.get("/:id", (req, res, next) => {
  const id = Number(req.params.id);

  if (!Number.isSafeInteger(id) || id <= 0) {
    const error = new Error("Некорректный ID");
    error.status = 400;
    return next(error);
  }

  const product = products.find((item) => item.id === id);
  if (!product) {
    const error = new Error("Товар не найден");
    error.status = 404;
    return next(error);
  }

  res.json(product);
});

productsRouter.post("/", (req, res, next) => {
  const result = productSchema.safeParse(req.body);

  if (!result.success) {
    // Для начала показываем первую проблему из списка.
    const error = new Error(result.error.issues[0].message);
    error.status = 400;
    return next(error);
  }

  const product = {
    id: nextId++,
    title: result.data.title,
    price: result.data.price
  };
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

// Сюда попадает запрос, на который маршруты не ответили.
app.use((req, res, next) => {
  const error = new Error("Маршрут не найден");
  error.status = 404;
  next(error);
});

// Обработчик ошибок должен стоять после маршрутов.
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  let status = err.status || 500;
  let message = err.message;

  if (err.type === "entity.parse.failed") {
    status = 400;
    message = "В теле запроса неправильный JSON";
  }

  if (status >= 500) {
    console.error(err);
    message = "На сервере произошла ошибка";
  }

  res.status(status).json({ error: { message: message } });
});

app.listen(3000, () => {
  console.log("Сервер работает: http://localhost:3000/api/products");
});` },
}
export const checks = [
  ['GET /api/products', '200', 'Массив из двух товаров на свежем сервере'],
  ['POST с title: " Монитор ", price: 23000', '201', 'Новый товар; название без крайних пробелов'],
  ['POST с price: 0', '201', 'Бесплатный товар допустим'],
  ['POST с price: -1', '400', 'Цена не может быть отрицательной'],
  ['POST с price: "100"', '400', 'Строка не подходит вместо числа'],
  ['POST с title: "   "', '400', 'Укажите название'],
  ['POST с пустым объектом {}', '400', 'Отсутствуют обязательные поля'],
  ['POST с дополнительным id', '400', 'Неизвестное поле отклоняется'],
  ['GET /api/products/abc', '400', 'Некорректный ID'],
  ['GET /api/products/999', '404', 'Товар не найден'],
  ['GET /missing', '404', 'Маршрут не найден'],
  ['POST со сломанным JSON', '400', 'В теле запроса неправильный JSON'],
  ['GET /test-error (временный маршрут)', '500', 'На сервере произошла ошибка'],
]
export const curlValid = `curl -i -X POST http://localhost:3000/api/products -H 'Content-Type: application/json' -d '{"title":" Монитор ","price":23000}'`
export const curlInvalid = `curl -i -X POST http://localhost:3000/api/products -H 'Content-Type: application/json' -d '{"title":"Монитор","price":-1}'`
export const curlBroken = `curl -i -X POST http://localhost:3000/api/products -H 'Content-Type: application/json' -d '{"title":'`
