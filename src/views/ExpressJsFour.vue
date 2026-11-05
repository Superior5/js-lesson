<script setup>
import ExpressLessonPage from '../components/ExpressLessonPage.vue'
import LabSection from '../components/LabSection.vue'
import CodeBlock from '../components/CodeBlock.vue'
import InfoBlock from '../components/InfoBlock.vue'
import RevealAnswer from '../components/RevealAnswer.vue'
import { lesson, titleSchema, parseCode, postStep, nextErrorCode, handlerStep, testErrorCode, projectFiles, checks, curlValid, curlInvalid, curlBroken } from '../data/expressJsFour'
</script>

<template>
  <ExpressLessonPage :lesson="lesson">
    <LabSection id="recap" number="01" title="Продолжаем проект прошлого занятия">
      <p class="lab-lead">В занятии № 3 мы собрали сервер из трёх файлов. Он уже принимает запросы и создаёт товары. Сегодня улучшим только проверку данных и ответы об ошибках.</p>
      <p>Проверьте, что сохранились index.js, logger.js и routers/products.js. Запустите node index.js и откройте /api/products. Если приходит список, можно продолжать. Перед изменениями сохраните копию проекта.</p>
      <p>В POST уже есть несколько if: проверяется название и цена. Чем больше полей, тем больше таких условий. Попробуем записать те же правила в одном месте с помощью библиотеки Zod.</p>
      <CodeBlock code="npm install zod@4" language="bash" label="В папке проекта; перед установкой можно остановить сервер" />
      <InfoBlock type="info" title="Два небольших этапа"><p>Сначала проверим данные и оставим знакомый ответ 400 прямо в маршруте. Когда это заработает, подключим общий обработчик ошибок. Так будет понятно, что изменилось на каждом этапе.</p></InfoBlock>
    </LabSection>

    <LabSection id="rules" number="02" title="Сначала сформулируем правила словами">
      <p>Валидация — это проверка данных по правилам приложения. До добавления товара надо убедиться, что сервер получил то, с чем умеет работать.</p>
      <div class="lab-table-wrap"><table class="lab-table"><thead><tr><th>Поле</th><th>Правило</th><th>Подходит</th><th>Не подходит</th></tr></thead><tbody><tr><td>title</td><td>Строка, не пустая после удаления крайних пробелов</td><td>"Монитор"</td><td>"   ", 123</td></tr><tr><td>price</td><td>Число от 0 и больше</td><td>0, 1500, 99.5</td><td>-1, "1500"</td></tr><tr><td>id</td><td>Создаётся сервером</td><td>Не передавать в POST</td><td>Задавать самостоятельно</td></tr></tbody></table></div>
      <p>Даже если форма в браузере уже проверяет цену, проверка нужна и на сервере. Клиент может отправить запрос через другую программу и обойти форму. Наш массив должен изменяться только после успешной проверки.</p>
      <p>Обратите внимание на ноль: товар может быть бесплатным. Проверка <code>if (!price)</code> для этой задачи не подходит, потому что считает 0 ложным значением. Нам нужно проверить именно тип и границу числа.</p>
    </LabSection>

    <LabSection id="schema" number="03" title="Шаг 1. Опишем правило для одного значения">
      <p>Схема — это описание ожидаемых данных. Начнём с одного названия. Этот эксперимент можно запустить отдельным файлом check.js, чтобы пока не затрагивать сервер:</p>
      <CodeBlock :code="titleSchema" label="check.js — необязательный эксперимент" />
      <CodeBlock code="node check.js" language="bash" />
      <p>Прочитайте цепочку слева направо: <code>z.string()</code> требует строку, <code>trim()</code> удаляет пробелы по краям, <code>min(1, ...)</code> требует хотя бы один символ после удаления пробелов. Текст «Укажите название» — сообщение для неудачной проверки.</p>
      <p>Теперь создайте рядом с index.js файл products.schema.js. Это полный файл со схемой товара:</p>
      <CodeBlock :code="projectFiles.schema.code" :label="projectFiles.schema.path" />
      <p><code>z.strictObject({ ... })</code> говорит, что ожидается объект с перечисленными полями. Лишние поля запрещены: например, id или опечатка prcie вместо price. Оба наших поля обязательны.</p>
      <p><code>z.number()</code> требует число. <code>min(0, ...)</code> разрешает 0 и положительные значения. Здесь не нужно переводить строки в числа: в JSON цена должна сразу быть числом без кавычек.</p>
    </LabSection>

    <LabSection id="safe-parse" number="04" title="Шаг 2. Прочитаем результат safeParse">
      <p class="lab-lead">Вызов safeParse означает «проверь значение по схеме и верни результат проверки». Он не добавляет товар в массив и не отправляет ответ сам.</p>
      <CodeBlock :code="parseCode" label="Фрагмент после import { productSchema } из файла со схемой" />
      <p>У результата есть признак <code>success</code>. Если он равен true, используем <code>result.data</code>. Если false — читаем ошибки в <code>result.error.issues</code>. Не обращайтесь к data в ветке ошибки: проверенных данных там нет.</p>
      <p>Для этого примера получится объект <code>{ title: "Монитор", price: 23000 }</code>. Пробелы по краям названия уже удалены. Поэтому дальше берём именно result.data, а не исходный объект.</p>
      <RevealAnswer code='const result = productSchema.safeParse({&#10;  title: "Монитор",&#10;  price: "23000"&#10;});&#10;console.log(result.success);' answer="false" title="Пройдёт ли цена в кавычках?" explanation="Нет. В кавычках записана строка, а правило z.number() ожидает число. Замените строку на 23000 без кавычек — тогда проверка пройдёт." />
      <InfoBlock type="tip" title="Сначала проверьте руками"><p>Поменяйте цену на -1 и название на одни пробелы. Посмотрите список issues в терминале. Сейчас важно увидеть, что ошибка проверки — это результат, который программа может обработать.</p></InfoBlock>
    </LabSection>

    <LabSection id="post" number="05" title="Шаг 3. Подключим проверку к POST">
      <p>В файле routers/products.js добавьте импорт схемы из родительской папки:</p>
      <CodeBlock code='import { productSchema } from "../products.schema.js";' />
      <p><code>../</code> означает переход на одну папку вверх: из routers в корень проекта, где находится products.schema.js.</p>
      <p>Замените прежний POST-маршрут этим фрагментом. Остальные маршруты и массив товаров оставьте на месте.</p>
      <CodeBlock :code="postStep" label="Промежуточный вариант POST — пока без общего обработчика" />
      <ol class="lab-rules"><li>Получаем тело через req.body и проверяем его.</li><li>Если success равен false, отправляем 400 и заканчиваем функцию через return.</li><li>Если проверка успешна, создаём товар из result.data.</li><li>Только теперь изменяем массив и возвращаем 201.</li></ol>
      <p>Неверные данные не должны доходить до products.push. Иначе клиент получит ошибку, но в массиве уже останется неправильный товар. Проверьте это: отправьте отрицательную цену и затем запросите список — его размер не должен увеличиться.</p>
    </LabSection>

    <LabSection id="statuses" number="06" title="Что именно пошло не так: 400, 404 или 500?">
      <p>«Ошибка» — общее слово. Для клиента полезно различать причины. Неудачный запрос не всегда означает, что сломан сервер.</p>
      <div class="lab-table-wrap"><table class="lab-table"><thead><tr><th>Статус</th><th>Ситуация</th><th>Пример</th></tr></thead><tbody><tr><td>400</td><td>Запрос содержит неправильные данные</td><td>Отрицательная цена или ID abc</td></tr><tr><td>404</td><td>Запрошенного товара или маршрута нет</td><td>Товар 999 или адрес /missing</td></tr><tr><td>500</td><td>На сервере возник неожиданный сбой</td><td>Ошибка в коде обработчика</td></tr></tbody></table></div>
      <p>Сегодня договоримся возвращать ошибки в одинаковой форме. Для примера с отрицательной ценой:</p>
      <CodeBlock code='{ "error": { "message": "Цена не может быть отрицательной" } }' language="json" />
      <p>HTTP-статус передаётся отдельно от JSON-тела. Текст внутри message объясняет причину человеку, а статус помогает клиентской программе понять вид результата. Чтобы не повторять сборку такого ответа в каждом маршруте, вынесем её в один обработчик.</p>
    </LabSection>

    <LabSection id="next-error" number="07" title="Шаг 4. Передадим ошибку через next(error)">
      <p>На прошлом занятии next() означал «продолжить обычную обработку». Если передать в него ошибку, Express пойдёт другим путём: к обработчику ошибок.</p>
      <CodeBlock :code="nextErrorCode" label="Этими строками заменим отправку 400 внутри POST" />
      <p><code>new Error(...)</code> создаёт объект ошибки. В его свойстве message хранится переданный текст. Строкой <code>error.status = 400</code> мы добавляем статус для будущего ответа. Это наше соглашение: сам конструктор Error не задаёт HTTP-статус.</p>
      <p><code>return next(error)</code> передаёт ошибку и завершает текущую функцию. Обычные обработчики будут пропущены. Код добавления товара после этой ветки не выполнится.</p>
      <InfoBlock type="important" title="Не забудьте третий параметр"><p>У POST-обработчика теперь должно быть <code>(req, res, next)</code>, чтобы функция могла вызвать next. Вместе с изменением маршрута нужно подключить и обработчик ошибок из следующего раздела, затем перезапустить сервер.</p></InfoBlock>
    </LabSection>

    <LabSection id="handler" number="08" title="Шаг 5. Один обработчик для ошибок">
      <p>Сначала посмотрим на короткую версию, чтобы увидеть сам принцип:</p><CodeBlock :code="handlerStep" label="Схема работы; в проект возьмём итоговый вариант ниже" />
      <p>Здесь <code>err</code> — ошибка, которую передали в next. <code>err.status || 500</code> берёт указанный статус, а если его нет — использует 500. Затем отправляется один JSON-ответ.</p>
      <p>У этой функции четыре параметра: <code>err, req, res, next</code>. По такой записи Express отличает обработчик ошибок от обычного middleware. Даже если не используете req или next в коротком примере, параметры нужно оставить.</p>
      <p>В итоговом варианте добавим два понятных случая: неправильный JSON получит 400, а подробности неожиданного сбоя останутся в терминале. Клиент при 500 увидит сообщение «На сервере произошла ошибка».</p>
      <p>Кроме того, после рабочих маршрутов добавим обычный middleware для неизвестного адреса. Если GET /missing не совпал ни с одним маршрутом, он создаст ошибку 404. В Express отсутствие маршрута само по себе не вызывает next(error).</p>
    </LabSection>

    <LabSection id="project" number="09" title="Соберём изменения в работающий проект">
      <p>Всего будет четыре файла. Logger остаётся прежним, products.schema.js мы уже создали. Теперь полностью замените routers/products.js и index.js версиями ниже. Промежуточный POST из раздела 5 оставлять вторым маршрутом не нужно.</p>
      <CodeBlock code="express-steps/&#10;├── package.json&#10;├── index.js&#10;├── logger.js&#10;├── products.schema.js&#10;└── routers/&#10;    └── products.js" language="text" />
      <h3>routers/products.js</h3><CodeBlock :code="projectFiles.router.code" :label="projectFiles.router.path" />
      <p>В POST теперь берём первое сообщение из списка ошибок Zod: <code>issues[0].message</code>. Это простой вариант для начала; все ошибки по полям можно будет показывать позднее. При неверном ID и отсутствии товара используем такой же порядок: создать Error → добавить status → вызвать next(error).</p>
      <h3>index.js</h3><CodeBlock :code="projectFiles.index.code" :label="projectFiles.index.path" />
      <ol class="lab-rules"><li>Logger пишет запрос в терминал.</li><li>express.json разбирает JSON-тело.</li><li>Router ищет и выполняет маршрут.</li><li>Если маршрут не ответил, обычный middleware создаёт 404.</li><li>Если передана ошибка, последний middleware отправляет JSON.</li></ol>
      <p>Условие <code>res.headersSent</code> проверяет, не начал ли сервер уже отправлять ответ. Если начал, новый JSON отправлять нельзя: передаём ошибку стандартному обработчику Express через next(err). В наших обычных проверках ошибка возникает до отправки ответа.</p>
      <p>Проверка <code>err.type === 'entity.parse.failed'</code> относится к JSON-парсеру. Например, клиент забыл закрыть фигурную скобку. Такой запрос не доходит до Zod, но общий обработчик всё равно вернёт понятный JSON со статусом 400.</p>
      <InfoBlock type="warning" title="Порядок строк важен"><p>Обработчик ошибок подключается после Router и обычного middleware для 404. Не ставьте обработчик неизвестного адреса перед рабочими маршрутами: тогда он перехватит запросы раньше них.</p></InfoBlock>
    </LabSection>

    <LabSection id="testing" number="10" title="Проверяем небольшими запросами">
      <p>Перезапустите node index.js. Для начала отправьте правильный товар, затем повторите запрос с неправильной ценой. Команды ниже подходят для bash и zsh; в Postman выберите POST, тот же адрес и тело raw → JSON.</p>
      <CodeBlock :code="curlValid" language="bash" label="Ожидаем 201 и товар без крайних пробелов в названии" />
      <CodeBlock :code="curlInvalid" language="bash" label="Ожидаем 400 и JSON с error.message" />
      <CodeBlock :code="curlBroken" language="bash" label="Намеренно неправильный JSON — ожидаем 400" />
      <p>Первые два ответа должны иметь разный статус. Неверный POST не должен менять массив. Если Zod сообщает о неправильном типе или неизвестном поле, текст сообщения может быть на английском: собственные русские сообщения мы пока задали только для пустого названия и отрицательной цены.</p>
      <div class="lab-table-wrap"><table class="lab-table"><thead><tr><th>Проверка</th><th>Статус</th><th>Что ожидаем</th></tr></thead><tbody><tr v-for="([request, status, expected]) in checks" :key="request"><td>{{ request }}</td><td>{{ status }}</td><td>{{ expected }}</td></tr></tbody></table></div>
      <h3>Как безопасно проверить 500 в учебном проекте</h3><p>Временно добавьте этот маршрут после подключения productsRouter и перед middleware для неизвестного адреса:</p><CodeBlock :code="testErrorCode" />
      <p>Перезапустите сервер и откройте /test-error. Синхронный throw Express передаст в наш обработчик ошибок. В браузере будет общее сообщение со статусом 500, а в терминале — подробная ошибка. Затем откройте /api/products: сервер должен продолжать работать. Удалите /test-error и снова перезапустите сервер.</p>
      <p>Если всё верно, объясните оба пути своими словами: правильный POST → схема → массив → 201; неправильный POST → схема → next(error) → общий обработчик → 400.</p>
      <p>Для повторения есть <a href="https://zod.dev/basics" target="_blank" rel="noreferrer">основы Zod</a>, <a href="https://zod.dev/api" target="_blank" rel="noreferrer">правила схем</a> и <a href="https://expressjs.com/en/guide/error-handling.html" target="_blank" rel="noreferrer">руководство Express по ошибкам</a>.</p>
      <InfoBlock type="tip" title="Что изучать после этих двух занятий"><p>Когда этот пример станет понятен, можно отдельно разобрать PATCH-схемы, проверку query-параметров, асинхронные запросы и хранение данных в базе. Для сегодняшнего результата достаточно уверенно объяснять проверку POST и путь ошибки.</p></InfoBlock>
    </LabSection>
  </ExpressLessonPage>
</template>
