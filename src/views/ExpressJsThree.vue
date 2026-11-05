<script setup>
import ExpressLessonPage from '../components/ExpressLessonPage.vue'
import LabSection from '../components/LabSection.vue'
import CodeBlock from '../components/CodeBlock.vue'
import InfoBlock from '../components/InfoBlock.vue'
import RevealAnswer from '../components/RevealAnswer.vue'
import { lesson, setupCode, starter, middlewareCode, orderCode, exportCode, importCode, routerCode, projectFiles, curlCreate } from '../data/expressJsThree'
</script>

<template>
  <ExpressLessonPage :lesson="lesson">
    <LabSection id="recap" number="01" title="Начинаем со знакомого сервера">
      <p class="lab-lead">На прошлом занятии мы писали маршруты: клиент отправляет запрос, Express находит нужную функцию, а функция возвращает ответ. Вспомним один такой маршрут.</p>
      <CodeBlock code='app.get("/hello", (req, res) => {&#10;  res.json({ message: "Привет!" });&#10;});' />
      <p><code>app.get</code> означает «обработать GET-запрос». <code>/hello</code> — путь. В круглых скобках после него записана функция, которая сработает при запросе. <code>res.json()</code> отправляет клиенту JSON.</p>
      <p>А если перед каждым маршрутом нужно выполнять одно и то же действие? Например, записывать в терминал, какой адрес открыл пользователь. Можно повторить console.log в каждом маршруте, но при добавлении новых маршрутов легко забыть про эту строку. В Express есть способ объявить общее действие один раз.</p>
      <InfoBlock type="info" title="План на сегодня"><p>Сначала запустим один файл. Затем добавим общее действие перед маршрутом. В конце перенесём маршруты товаров в отдельный файл. После каждого изменения будем отправлять запрос и смотреть результат.</p></InfoBlock>
    </LabSection>

    <LabSection id="setup" number="02" title="Шаг 1. Запустим маленький пример">
      <p>Создайте новую папку. Проект прошлого занятия пока оставьте для сравнения. В терминале выполните команды по очереди:</p>
      <CodeBlock :code="setupCode" language="bash" />
      <p><code>npm install express@5</code> устанавливает Express пятой версии. Последняя команда добавляет в package.json настройку <code>"type": "module"</code>. Она позволяет использовать import и export — эти слова разберём ниже.</p>
      <p>В папке express-steps создайте файл <code>index.js</code>. Скопируйте в него весь пример:</p>
      <CodeBlock :code="starter" label="index.js — первый работающий вариант" />
      <CodeBlock code="node index.js" language="bash" label="Запуск из папки проекта" />
      <p>Откройте <code>http://localhost:3000/hello</code>. Браузер должен показать <code>{ "message": "Привет!" }</code>. Сообщение «Откройте…» видно в терминале, где запущен Node.js. Это два разных места вывода.</p>
      <InfoBlock type="tip" title="После изменения кода"><p>Остановите сервер через Ctrl+C и снова выполните node index.js. Для проверки запросов оставляйте сервер работающим. Если порт 3000 занят, остановите сервер предыдущего занятия.</p></InfoBlock>
    </LabSection>

    <LabSection id="middleware" number="03" title="Шаг 2. Добавим действие перед маршрутом">
      <p class="lab-lead">Middleware — функция, которая выполняет отдельный шаг обработки запроса. Название можно понимать как «промежуточный обработчик».</p>
      <p>Наш первый middleware будет только печатать метод и путь. Назовём функцию logger: это название связано с записью событий в журнал.</p>
      <CodeBlock :code="middlewareCode" label="Добавьте в index.js после const app = express()" />
      <ol class="lab-rules"><li><code>function logger(...)</code> объявляет функцию. Пока её никто не вызвал, строки внутри не выполняются.</li><li><code>req</code> — запрос. Из него читаем метод GET и путь /hello.</li><li><code>console.log(...)</code> выводит эти значения в терминал сервера.</li><li><code>next()</code> передаёт обработку дальше, к маршруту.</li><li><code>app.use(logger)</code> подключает функцию к приложению. Express сам вызовет её при запросе.</li></ol>
      <p>Перезапустите сервер и снова откройте /hello. В браузере будет прежний JSON, а в терминале появится <code>GET /hello</code>. Если браузер дополнительно запросит favicon.ico, он тоже попадёт в журнал.</p>
      <InfoBlock type="important" title="Без скобок при подключении"><p>Пишем <code>app.use(logger)</code>: передаём Express саму функцию. Запись <code>app.use(logger())</code> попыталась бы вызвать её сразу, ещё без запроса, res и next.</p></InfoBlock>
    </LabSection>

    <LabSection id="next" number="04" title="Почему нужен next()">
      <p>Представьте очередь действий: записать запрос → выбрать маршрут → отправить ответ. Express должен понимать, закончил ли текущий обработчик свою работу и можно ли переходить к следующему.</p>
      <p>В logger мы ничего не отправляем клиенту, поэтому в конце вызываем next. Параметр <code>next</code> — функция, которую передаёт сам Express. Создавать её самостоятельно не нужно.</p>
      <div class="lab-table-wrap"><table class="lab-table"><thead><tr><th>Что сделал обработчик</th><th>Что увидит клиент</th></tr></thead><tbody><tr><td>Вызвал next()</td><td>Запрос перейдёт к следующему обработчику.</td></tr><tr><td>Вызвал res.json(...)</td><td>Клиент получит JSON-ответ.</td></tr><tr><td>Только вызвал console.log(...)</td><td>Клиент продолжит ждать: вывода в терминал недостаточно.</td></tr></tbody></table></div>
      <p>Ненадолго закомментируйте next() в logger. Перезапустите сервер и откройте /hello: запрос будет ждать ответа. Верните next(), снова перезапустите сервер и проверьте, что JSON появился.</p>
      <InfoBlock type="warning" title="Ответ обычно завершает обработку запроса"><p>В маршруте /hello после res.json не нужно добавлять next(). Иначе следующий обработчик может попытаться отправить ещё один ответ. Для ветки с ошибкой используйте <code>return res.status(400).json(...)</code>: return останавливает текущую функцию.</p></InfoBlock>
    </LabSection>

    <LabSection id="order" number="05" title="Шаг 3. Увидим порядок выполнения">
      <p>Express проходит обработчики в порядке подключения. Для эксперимента временно замените logger и маршрут /hello этим фрагментом. Не оставляйте второй экземпляр того же маршрута.</p>
      <CodeBlock :code="orderCode" />
      <p>При GET /hello сначала появится строка «1. Запрос пришёл», затем «2. Отправляем ответ». Это помогает увидеть, что маршрут получает запрос после общего middleware.</p>
      <RevealAnswer :code="orderCode.replace('  next();', '  // next() убран')" title="Что произойдёт, если убрать next()?" answer="В терминале: 1. Запрос пришёл&#10;В браузере: ожидание ответа" explanation="Первый обработчик выполнился, но не передал запрос дальше. Строка 2 не появится, потому что Express ещё не дошёл до маршрута." />
      <p>У next есть ещё одна особенность: его вызов не останавливает JavaScript-функцию. Код после next тоже может выполниться. Пока пишите next последней строкой middleware — так порядок будет проще проследить.</p>
    </LabSection>

    <LabSection id="json" number="06" title="express.json() — уже знакомый middleware">
      <p>В прошлой работе мы подключали <code>app.use(express.json())</code>. Теперь можно объяснить, зачем нужна эта строка: она добавляет шаг, который читает JSON-тело запроса и помещает результат в req.body.</p>
      <CodeBlock code='app.use(express.json());&#10;&#10;app.post("/example", (req, res) => {&#10;  res.json({ received: req.body });&#10;});' label="Короткий пример: сначала разбор, затем чтение body" />
      <p>JSON-парсер должен стоять перед POST-маршрутом или перед подключением Router с этим маршрутом. Клиенту нужно указать заголовок <code>Content-Type: application/json</code>, чтобы Express понял формат тела.</p>
      <p>Почему здесь есть скобки, а у logger их нет? <code>express.json()</code> сначала создаёт готовый middleware, который затем получает app.use. Наш logger уже является готовой функцией. Запомните эти две рабочие записи; создавать такие функции-фабрики сегодня не требуется.</p>
      <InfoBlock type="tip" title="Остановитесь и объясните"><p>Что выполняется раньше: чтение req.body внутри POST или express.json()? Почему перестановка этих строк может сломать маршрут?</p></InfoBlock>
    </LabSection>

    <LabSection id="modules" number="07" title="Шаг 4. Научимся связывать два файла">
      <p>Прежде чем переносить маршруты, разберём import и export на одной строке текста. Файл с кодом, который передаёт значения другим файлам, будем называть модулем.</p>
      <CodeBlock :code="exportCode" label="Файл greeting.js — отдельный учебный пример" />
      <CodeBlock :code="importCode" label="Что написал бы другой файл" />
      <p><code>export</code> означает «это значение можно взять из другого файла». <code>import</code> означает «возьми указанное значение». Имя message в фигурных скобках должно совпадать с именем экспортируемой переменной.</p>
      <p><code>./</code> означает текущую папку. Расширение <code>.js</code> в относительном пути указываем явно. Настройку type: module мы уже добавили при подготовке проекта. В итоговом проекте greeting.js не нужен: это только пример принципа.</p>
    </LabSection>

    <LabSection id="router" number="08" title="Router: маршруты в отдельной группе">
      <p class="lab-lead">Router собирает связанные маршруты в одну группу. Например, все маршруты товаров можно хранить вместе и подключить по общему адресу.</p>
      <CodeBlock :code="routerCode" label="Идея Router; полный код будет в следующем разделе" />
      <p><code>Router()</code> создаёт группу. <code>productsRouter.get()</code> добавляет маршрут в эту группу. <code>app.use('/api/products', productsRouter)</code> подключает группу к приложению.</p>
      <div class="lab-table-wrap"><table class="lab-table"><thead><tr><th>Общая часть</th><th>Путь внутри Router</th><th>Адрес для клиента</th></tr></thead><tbody><tr><td>/api/products</td><td>/</td><td>/api/products</td></tr><tr><td>/api/products</td><td>/:id</td><td>/api/products/1, /api/products/2…</td></tr></tbody></table></div>
      <p>Не повторяйте /api/products внутри каждого маршрута: Express добавит префикс сам. В файле Router также не нужен app.listen. Порт открывает основное приложение один раз.</p>
    </LabSection>

    <LabSection id="project" number="09" title="Шаг 5. Соберём проект из трёх файлов">
      <p>Теперь заменим содержимое index.js итоговым вариантом. Рядом создайте файл logger.js и папку routers, а внутри неё — файл products.js. В папке routers будем хранить файлы с группами маршрутов. Короткие эксперименты из предыдущих разделов в этот вариант добавлять не нужно.</p>
      <CodeBlock code="express-steps/&#10;├── package.json&#10;├── index.js&#10;├── logger.js&#10;└── routers/&#10;    └── products.js" language="text" />
      <h3>1. logger.js — только журнал запросов</h3><CodeBlock :code="projectFiles.logger.code" :label="projectFiles.logger.path" />
      <p>Это уже знакомая функция. Новое слово export позволяет подключить её из index.js.</p>
      <h3>2. routers/products.js — только маршруты товаров</h3><CodeBlock :code="projectFiles.router.code" :label="projectFiles.router.path" />
      <p>Файл products.js находится в папке routers. Здесь два товара и три знакомых маршрута: список, поиск по ID и создание. Проверки написаны обычными if, как в прошлой работе. Если товар найден, возвращаем его. Если нет — 404. В POST сначала проверяем название и цену, затем добавляем товар.</p>
      <p>Цена 0 допустима. Строка "1500" не подходит: ожидаем число. Счётчик nextId нужен для новых идентификаторов. Массив хранится в памяти, поэтому созданные товары исчезнут после перезапуска.</p>
      <h3>3. index.js — соединяет всё вместе</h3><CodeBlock :code="projectFiles.index.code" :label="projectFiles.index.path" />
      <p>Путь <code>./routers/products.js</code> в import указывает на файл products.js внутри папки routers. Прочитайте три строки app.use сверху вниз: записать запрос → разобрать JSON → передать в маршруты товаров. Теперь обязанности файлов можно объяснить одним предложением для каждого.</p>
      <InfoBlock type="info" title="Маленький пример для новой темы"><p>В этом примере только GET и POST, чтобы проще проследить запрос. В домашней работе перенесите и остальные готовые маршруты своего API. Сам перенос в Router не требует переписывать фильтрацию или сортировку.</p></InfoBlock>
    </LabSection>

    <LabSection id="testing" number="10" title="Проверяем готовый сервер">
      <p>Остановите предыдущий запуск и снова выполните node index.js из папки express-steps. Сначала откройте список в браузере:</p>
      <CodeBlock code="http://localhost:3000/api/products" language="text" />
      <p>Должны вернуться два товара. По адресу /api/products/1 вернётся монитор; по /api/products/999 — сообщение «Товар не найден» со статусом 404.</p>
      <p>Для POST используйте отдельный терминал. В bash или zsh отправьте команду:</p><CodeBlock :code="curlCreate" language="bash" />
      <p>Ключ -i показывает HTTP-статус. Ожидаем 201 и новый товар с ID 3. Повторный GET списка должен содержать три товара. В Windows можно использовать Postman: метод POST, тот же URL, тело raw → JSON с полями title и price.</p>
      <CodeBlock code='{ "title": "Клавиатура", "price": 4500 }' language="json" label="Тело запроса для Postman" />
      <p>Если запрос не работает, проверяйте по очереди: сервер запущен? Адрес содержит /api/products? Подключён express.json до Router? У POST указан Content-Type? У logger есть next()?</p>
      <p>Порядок подключения middleware и способы продолжить запрос описаны также в <a href="https://expressjs.com/en/guide/using-middleware.html" target="_blank" rel="noreferrer">руководстве Express</a>.</p>
      <InfoBlock type="tip" title="Что дальше"><p>Сегодня мы научились организовывать обработку запроса. В занятии № 4 возьмём этот же проект, заменим ручную проверку POST небольшой схемой Zod и разберём понятные ответы об ошибках.</p></InfoBlock>
    </LabSection>
  </ExpressLessonPage>
</template>
