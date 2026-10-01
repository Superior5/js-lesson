export const labNavigation = [
  ['client-server', 'Клиент и сервер'],
  ['http', 'Протокол HTTP'],
  ['request', 'Структура запроса'],
  ['methods', 'HTTP-методы'],
  ['url-routes', 'URL и маршруты'],
  ['headers-json', 'Заголовки и JSON'],
  ['response', 'Ответ и статус-коды'],
  ['setup', 'Подготовка проекта'],
  ['express', 'Первый Express-сервер'],
  ['users-api', 'API пользователей'],
  ['post', 'POST и валидация'],
  ['final-server', 'Итоговый сервер'],
  ['curl', 'Проверка через curl'],
  ['practice', 'Практическая часть'],
  ['questions', 'Контрольные вопросы'],
  ['submission', 'Что нужно сдать'],
]

export const httpMethods = [
  { method: 'GET', tone: 'get', purpose: 'Получить данные', example: '/users', note: 'Не изменяет ресурс' },
  { method: 'POST', tone: 'post', purpose: 'Создать данные', example: '/users', note: 'Передаёт тело запроса' },
  { method: 'PUT', tone: 'put', purpose: 'Заменить ресурс', example: '/users/5', note: 'Полное обновление' },
  { method: 'PATCH', tone: 'patch', purpose: 'Изменить часть', example: '/users/5', note: 'Частичное обновление' },
  { method: 'DELETE', tone: 'delete', purpose: 'Удалить ресурс', example: '/users/5', note: 'Удаляет данные' },
]

export const statusCodes = [
  { code: '200', title: 'OK', group: 'success', description: 'Запрос успешно выполнен.' },
  { code: '201', title: 'Created', group: 'success', description: 'Новый ресурс успешно создан.' },
  { code: '400', title: 'Bad Request', group: 'client', description: 'Клиент отправил неправильные данные.' },
  { code: '404', title: 'Not Found', group: 'client', description: 'Запрошенный ресурс не найден.' },
  { code: '500', title: 'Server Error', group: 'server', description: 'На сервере произошла внутренняя ошибка.' },
]

export const practiceTasks = [
  { n: '01', title: 'Подготовьте проект', text: 'Создайте Node.js-проект, установите Express и запустите сервер на порту 3000.', endpoint: 'PORT 3000' },
  { n: '02', title: 'Корневой маршрут', text: 'Создайте маршрут, который возвращает текст «Мой первый Express-сервер».', endpoint: 'GET /' },
  { n: '03', title: 'Информация о курсе', text: 'Верните JSON с полями course, lesson и topic.', endpoint: 'GET /about', code: '{\n  "course": "JavaScript",\n  "lesson": 2,\n  "topic": "HTTP и Express"\n}' },
  { n: '04', title: 'Список студентов', text: 'Создайте массив students с двумя студентами и верните его целиком.', endpoint: 'GET /students' },
  { n: '05', title: 'Студент по ID', text: 'Найдите студента по req.params.id. Если его нет — верните 404 и сообщение об ошибке.', endpoint: 'GET /students/:id' },
  { n: '06', title: 'Добавление студента', text: 'Принимайте name и group, добавляйте студента в массив и возвращайте созданный объект со статусом 201.', endpoint: 'POST /students' },
  { n: '07', title: 'Проверка данных', text: 'Если name или group не переданы, верните 400 Bad Request.', endpoint: '400 Bad Request', code: '{\n  "message": "Необходимо указать name и group"\n}' },
]

export const bonusTasks = [
  { n: '08', title: 'Количество студентов', endpoint: 'GET /students/count', text: 'Верните актуальное количество элементов массива students.' },
  { n: '09', title: 'Возраст студента', endpoint: 'age ≥ 16', text: 'Сделайте age обязательным. Если возраст меньше 16, верните код 400.' },
  { n: '10', title: 'Состояние сервера', endpoint: 'GET /status', text: 'Верните status: "ok" и текущее время сервера.' },
]

export const controlQuestions = [
  'Что такое HTTP?', 'Из каких основных частей состоит HTTP-запрос?', 'Чем GET отличается от POST?',
  'Что такое URL?', 'Что такое маршрут?', 'Что означает GET /users?',
  'Могут ли GET /users и POST /users обрабатываться по-разному?', 'Для чего используется Content-Type: application/json?',
  'Что такое JSON?', 'Что обозначает код 200?', 'Что обозначает код 201?',
  'В каком случае стоит вернуть 400?', 'Что означает 404?', 'Для чего используется express.json()?',
  'Где находятся данные POST-запроса в Express?', 'Где находятся параметры маршрута /users/:id?',
  'Для чего нужны req и res?'
]
