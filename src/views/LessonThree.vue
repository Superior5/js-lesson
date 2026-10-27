<script setup>
import {
  ArrowLeft,
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  CircleHelp,
  GitBranch,
  Route,
  Star,
} from 'lucide-vue-next'
import LessonLayout from '../components/LessonLayout.vue'
import LessonHero from '../components/LessonHero.vue'
import LessonSection from '../components/LessonSection.vue'
import CodeBlock from '../components/CodeBlock.vue'
import InfoBlock from '../components/InfoBlock.vue'
import TaskBlock from '../components/TaskBlock.vue'
import RevealAnswer from '../components/RevealAnswer.vue'
import { lessonThree as lesson } from '../data/lessons'
import { advancedTasks, controlQuestions, practiceTasks } from '../data/lessonThree'

const recapCode = `const age = 20;
const hasTicket = true;
const canEnter = age >= 18 && hasTicket;

console.log(canEnter);`

const firstIf = `const temperature = 28;

if (temperature > 25) {
  console.log("Сегодня жарко");
}`

const falseIf = `const temperature = 12;

if (temperature > 25) {
  console.log("Сегодня жарко");
}

console.log("Программа завершена");`

const ifElseCode = `const age = 17;

if (age >= 18) {
  console.log("Доступ разрешён");
} else {
  console.log("Доступ запрещён");
}`

const evenOddCode = `const number = 12;

if (number % 2 === 0) {
  console.log("Число чётное");
} else {
  console.log("Число нечётное");
}`

const gradeCode = `const score = 82;

if (score >= 90) {
  console.log("Отлично");
} else if (score >= 75) {
  console.log("Хорошо");
} else if (score >= 60) {
  console.log("Удовлетворительно");
} else {
  console.log("Не зачтено");
}`

const gradeWithValidation = `const score = 105;

if (score < 0 || score > 100) {
  console.log("Ошибка: балл должен быть от 0 до 100");
} else if (score >= 90) {
  console.log("Отлично");
} else if (score >= 75) {
  console.log("Хорошо");
} else if (score >= 60) {
  console.log("Удовлетворительно");
} else {
  console.log("Не зачтено");
}`

const accessCode = `const age = 20;
const hasTicket = true;
const isBlocked = false;

if (age >= 18 && hasTicket && !isBlocked) {
  console.log("Доступ разрешён");
} else {
  console.log("Доступ запрещён");
}`

const discountCode = `const isStudent = true;
const isPensioner = false;

if (isStudent || isPensioner) {
  console.log("Скидка 20%");
}`

const rangeCode = `const age = 24;

const isInRange = age >= 18 && age <= 30;
console.log(isInRange);`

const truthyCode = `console.log(Boolean(false));     // false
console.log(Boolean(0));         // false
console.log(Boolean(""));        // false
console.log(Boolean(null));      // false
console.log(Boolean(undefined)); // false
console.log(Boolean(NaN));       // false

console.log(Boolean(1));         // true
console.log(Boolean("0"));       // true
console.log(Boolean("false"));   // true`

const truthyIfCode = `const userName = "Adam";

if (userName) {
  console.log("Имя заполнено");
} else {
  console.log("Введите имя");
}`

const nestedCode = `const isLoggedIn = true;
const role = "admin";

if (isLoggedIn) {
  if (role === "admin") {
    console.log("Панель администратора");
  } else {
    console.log("Личный кабинет");
  }
} else {
  console.log("Войдите в систему");
}`

const flatAccessCode = `if (!isLoggedIn) {
  console.log("Войдите в систему");
} else if (role === "admin") {
  console.log("Панель администратора");
} else {
  console.log("Личный кабинет");
}`

const scopeCode = `const isReady = true;

if (isReady) {
  const message = "Можно начинать";
  console.log(message);
}

console.log(message); // ReferenceError`

const scopeLetCode = `let message;

if (isReady) {
  message = "Можно начинать";
} else {
  message = "Нужно подождать";
}

console.log(message);`

const ternaryCode = `const age = 20;

const status = age >= 18 ? "взрослый" : "несовершеннолетний";
console.log(status);`

const ternaryComparison = `let status;

if (age >= 18) {
  status = "взрослый";
} else {
  status = "несовершеннолетний";
}`

const switchCode = `const dayNumber = 3;

switch (dayNumber) {
  case 1:
    console.log("Понедельник");
    break;
  case 2:
    console.log("Вторник");
    break;
  case 3:
    console.log("Среда");
    break;
  default:
    console.log("Неизвестный день");
}`

const groupedSwitch = `const dayNumber = 6;

switch (dayNumber) {
  case 1:
  case 2:
  case 3:
  case 4:
  case 5:
    console.log("Будний день");
    break;
  case 6:
  case 7:
    console.log("Выходной");
    break;
  default:
    console.log("Неверный номер");
}`

const missingBreak = `const role = "editor";

switch (role) {
  case "editor":
    console.log("Можно редактировать");
  case "reader":
    console.log("Можно читать");
}`

const homeworkPrediction = `const score = 78;
const hasDebt = false;

if (score >= 90 && !hasDebt) {
  console.log("Повышенная стипендия");
} else if (score >= 70 && !hasDebt) {
  console.log("Обычная стипендия");
} else {
  console.log("Стипендии нет");
}`
</script>

<template>
  <LessonLayout :navigation="lesson.sections" :lesson-number="lesson.number" :title="lesson.title">
    <LessonHero :lesson="lesson" />

    <div class="lesson-body">
      <div class="intro-note">
        <GitBranch :size="20" />
        <p><strong>Цель занятия</strong> — научиться управлять ходом программы: проверять условия, выбирать одну из нескольких веток и записывать понятные решения с помощью <code>if</code>, <code>else</code>, <code>switch</code> и тернарного оператора.</p>
      </div>

      <LessonSection id="recap" number="01" title="Повторение предыдущего занятия" kicker="ГОТОВИМ УСЛОВИЯ">
        <p class="lead">На прошлом занятии мы получили всё необходимое для принятия решений: переменные хранят данные, сравнения отвечают <code>true</code> или <code>false</code>, а логические операторы объединяют проверки.</p>
        <div class="concept-grid">
          <article><strong>Переменные</strong><p><code>const</code> и <code>let</code> сохраняют данные под понятными именами.</p></article>
          <article><strong>Сравнения</strong><p><code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>===</code> возвращают boolean.</p></article>
          <article><strong>Логическое И</strong><p><code>&&</code> требует, чтобы истинными были обе проверки.</p></article>
          <article><strong>Логическое ИЛИ и НЕ</strong><p><code>||</code> ищет хотя бы одну истину, а <code>!</code> меняет результат.</p></article>
        </div>
        <CodeBlock :code="recapCode" language="javascript" />
        <CodeBlock code="true" language="text" />
        <div class="oral-questions">
          <h3><CircleHelp :size="19" /> Вопросы для устного повторения</h3>
          <ol>
            <li>Какой тип данных получается после сравнения?</li>
            <li>Чем <code>===</code> отличается от <code>=</code>?</li>
            <li>Когда выражение с <code>&&</code> возвращает <code>true</code>?</li>
            <li>Что вернёт выражение <code>!false</code>?</li>
          </ol>
        </div>
      </LessonSection>

      <LessonSection id="branching" number="02" title="Ветвление программы">
        <p class="lead">До сих пор инструкции выполнялись сверху вниз. Условная конструкция добавляет развилку: программа проверяет вопрос и выбирает подходящий путь.</p>
        <div class="decision-flow">
          <div class="decision-start"><Route :size="21" /><strong>Условие</strong><small>Пользователю 18 лет?</small></div>
          <div class="decision-branches">
            <article><span>TRUE</span><strong>Разрешить доступ</strong><small>выполняется одна ветка</small></article>
            <article><span>FALSE</span><strong>Отказать в доступе</strong><small>выполняется другая ветка</small></article>
          </div>
        </div>
        <p>Условие — это выражение, которое JavaScript приводит к логическому значению. В зависимости от результата программа выполняет один блок и пропускает другой.</p>
        <InfoBlock type="tip" title="Сначала сформулируйте решение словами"><p>Перед кодом произнесите правило: «если возраст не меньше 18 — разрешить, иначе — отказать». Такое предложение почти напрямую переводится в <code>if / else</code>.</p></InfoBlock>
      </LessonSection>

      <LessonSection id="if-statement" number="03" title="Конструкция if" kicker="ОДНА УСЛОВНАЯ ВЕТКА">
        <p class="lead"><code>if</code> выполняет блок кода, только если условие истинно. Если условие ложно, блок пропускается.</p>
        <div class="condition-syntax"><b>if</b><span>(</span><strong>условие</strong><span>)</span><i>{</i><code>инструкции</code><i>}</i></div>
        <CodeBlock :code="firstIf" language="javascript" />
        <CodeBlock code="Сегодня жарко" language="text" />
        <p>Теперь изменим температуру. Условие станет ложным, поэтому первая строка не появится:</p>
        <CodeBlock :code="falseIf" language="javascript" />
        <CodeBlock code="Программа завершена" language="text" />
        <InfoBlock type="important" title="Всегда ставьте фигурные скобки"><p>JavaScript разрешает опустить скобки для одной инструкции, но явный блок безопаснее: при добавлении новых строк логика не сломается незаметно.</p></InfoBlock>
        <RevealAnswer
          :code="'const balance = 1200;\n\nif (balance >= 1000) {\n  console.log(&quot;Доставка бесплатная&quot;);\n}\n\nconsole.log(&quot;Заказ рассчитан&quot;);'"
          :answer="'Доставка бесплатная\nЗаказ рассчитан'"
          explanation="Условие истинно, поэтому выполняется блок if. После него программа продолжает работу со следующей инструкцией."
        />
      </LessonSection>

      <LessonSection id="if-else" number="04" title="Конструкция if / else">
        <p class="lead">Когда нужно выбрать ровно один из двух вариантов, к <code>if</code> добавляют ветку <code>else</code>.</p>
        <CodeBlock :code="ifElseCode" language="javascript" />
        <CodeBlock code="Доступ запрещён" language="text" />
        <p>Сначала вычисляется условие <code>age &gt;= 18</code>. При <code>true</code> выполняется первый блок, при <code>false</code> — блок <code>else</code>. Две ветки одновременно выполниться не могут.</p>
        <h3>Пример с остатком от деления</h3>
        <CodeBlock :code="evenOddCode" language="javascript" />
        <p>Чётное число делится на 2 без остатка. Поэтому выражение <code>number % 2 === 0</code> удобно использовать как условие.</p>
        <RevealAnswer
          :code="'const password = &quot;qwerty&quot;;\n\nif (password === &quot;secret&quot;) {\n  console.log(&quot;Добро пожаловать&quot;);\n} else {\n  console.log(&quot;Неверный пароль&quot;);\n}'"
          answer="Неверный пароль"
          explanation="Строки qwerty и secret не равны, поэтому выполняется ветка else."
        />
      </LessonSection>

      <LessonSection id="else-if" number="05" title="Несколько вариантов: else if">
        <p class="lead">Цепочка <code>else if</code> последовательно проверяет несколько условий и выполняет первую подходящую ветку.</p>
        <CodeBlock :code="gradeCode" language="javascript" />
        <CodeBlock code="Хорошо" language="text" />
        <div class="range-map">
          <span><b>90–100</b>Отлично</span>
          <span><b>75–89</b>Хорошо</span>
          <span><b>60–74</b>Удовлетворительно</span>
          <span><b>0–59</b>Не зачтено</span>
        </div>
        <p>Проверки идут от более высокой границы к более низкой. Для <code>82</code> первая проверка ложна, вторая истинна — следующие ветки уже не проверяются.</p>
        <h3>Сначала проверяем корректность данных</h3>
        <CodeBlock :code="gradeWithValidation" language="javascript" />
        <InfoBlock type="warning" title="Порядок имеет значение"><p>Если сначала поставить <code>score &gt;= 60</code>, значение <code>95</code> попадёт в эту общую ветку, а до проверки <code>score &gt;= 90</code> выполнение не дойдёт.</p></InfoBlock>
        <RevealAnswer
          :code="'const number = 0;\n\nif (number > 0) {\n  console.log(&quot;Положительное&quot;);\n} else if (number < 0) {\n  console.log(&quot;Отрицательное&quot;);\n} else {\n  console.log(&quot;Ноль&quot;);\n}'"
          answer="Ноль"
          explanation="Первые два сравнения ложны. Остаётся единственный вариант, который обрабатывает else."
        />
      </LessonSection>

      <LessonSection id="logical-conditions" number="06" title="Сложные условия">
        <p class="lead">Логические операторы позволяют выразить правила из нескольких требований без множества отдельных конструкций.</p>
        <div class="logic-condition-grid">
          <article><b>&&</b><strong>Все условия</strong><p>Возраст подходит <em>и</em> билет есть <em>и</em> блокировки нет.</p></article>
          <article><b>||</b><strong>Хотя бы одно</strong><p>Скидка есть у студента <em>или</em> пенсионера.</p></article>
          <article><b>!</b><strong>Противоположное</strong><p><code>!isBlocked</code> означает «не заблокирован».</p></article>
        </div>
        <CodeBlock :code="accessCode" language="javascript" />
        <CodeBlock :code="discountCode" language="javascript" />
        <h3>Проверка диапазона</h3>
        <CodeBlock :code="rangeCode" language="javascript" />
        <p>В математике можно написать <code>18 ≤ age ≤ 30</code>, но в JavaScript нужно явно сравнить значение с обеими границами и объединить результаты через <code>&&</code>.</p>
        <InfoBlock type="tip" title="Скобки делают замысел видимым"><p>В длинных выражениях группируйте связанные части: <code>(isAdmin || isTeacher) && !isBlocked</code>. Так условие проще читать и проверять.</p></InfoBlock>
        <RevealAnswer
          :code="'const temperature = 22;\nconst isRaining = false;\n\nif (temperature >= 18 && !isRaining) {\n  console.log(&quot;Можно идти гулять&quot;);\n} else {\n  console.log(&quot;Лучше остаться дома&quot;);\n}'"
          answer="Можно идти гулять"
          explanation="Температура подходит, а отрицание false даёт true. Оба условия, соединённые через &&, истинны."
        />
      </LessonSection>

      <LessonSection id="truthy-falsy" number="07" title="Truthy и falsy">
        <p class="lead"><code>if</code> умеет проверять не только готовые boolean-значения. JavaScript автоматически приводит любое значение к <code>true</code> или <code>false</code>.</p>
        <div class="lesson-table-wrap">
          <table class="lesson-table">
            <thead><tr><th>Falsy — становятся false</th><th>Truthy — становятся true</th></tr></thead>
            <tbody>
              <tr><td><code>false</code></td><td><code>true</code></td></tr>
              <tr><td><code>0</code>, <code>-0</code>, <code>0n</code></td><td>любое ненулевое число</td></tr>
              <tr><td>пустая строка <code>""</code></td><td>любая непустая строка</td></tr>
              <tr><td><code>null</code>, <code>undefined</code></td><td>объекты и массивы</td></tr>
              <tr><td><code>NaN</code></td><td>остальные значения</td></tr>
            </tbody>
          </table>
        </div>
        <CodeBlock :code="truthyCode" language="javascript" />
        <h3>Практическое применение</h3>
        <CodeBlock :code="truthyIfCode" language="javascript" />
        <InfoBlock type="warning" title="Текст «false» не равен false"><p>Строка <code>"false"</code> непустая, поэтому она truthy. Кавычки принципиально меняют значение и его тип.</p></InfoBlock>
        <RevealAnswer
          :code="'const message = &quot;&quot;;\n\nif (message) {\n  console.log(&quot;Сообщение есть&quot;);\n} else {\n  console.log(&quot;Сообщение пустое&quot;);\n}'"
          answer="Сообщение пустое"
          explanation="Пустая строка — falsy-значение, поэтому выполняется ветка else."
        />
      </LessonSection>

      <LessonSection id="nested-conditions" number="08" title="Вложенные условия">
        <p class="lead">Внутри каждой ветки можно разместить ещё один <code>if</code>. Это полезно, когда вторая проверка имеет смысл только после первой.</p>
        <CodeBlock :code="nestedCode" language="javascript" />
        <p>Сначала проверяется авторизация. Роль пользователя рассматривается только для вошедшего пользователя.</p>
        <h3>Когда код можно сделать ровнее</h3>
        <CodeBlock :code="flatAccessCode" language="javascript" />
        <p>Оба варианта работают одинаково. Цепочка часто читается легче, потому что код меньше уходит вправо. Вложенность оставляйте там, где она действительно показывает зависимость проверок.</p>
        <InfoBlock type="tip" title="Не усложняйте раньше времени"><p>Если условие помещается в одну понятную строку, объедините проверки через <code>&&</code> или <code>||</code>. Если каждой ситуации нужна собственная причина или действие — используйте ветки.</p></InfoBlock>
      </LessonSection>

      <LessonSection id="block-scope" number="09" title="Область видимости блока">
        <p class="lead">Фигурные скобки создают блок. Переменные, объявленные внутри него через <code>let</code> или <code>const</code>, снаружи недоступны.</p>
        <CodeBlock :code="scopeCode" language="javascript" />
        <p>Первая команда <code>console.log</code> работает, потому что находится в том же блоке. Вторая вызывает <code>ReferenceError</code>: имя <code>message</code> за границей блока не существует.</p>
        <h3>Если результат нужен после условия</h3>
        <CodeBlock :code="scopeLetCode" language="javascript" />
        <p>Переменная объявлена до ветвления, а внутри веток меняется только её значение. Поэтому после конструкции она доступна.</p>
        <RevealAnswer
          :code="'const loggedIn = true;\n\nif (loggedIn) {\n  const userName = &quot;Adam&quot;;\n  console.log(userName);\n}\n\nconsole.log(typeof userName);'"
          :answer="'Adam\nundefined'"
          explanation="Внутри блока имя доступно. Оператор typeof для необъявленного имени в данном случае возвращает строку undefined, не выбрасывая ошибку."
        />
      </LessonSection>

      <LessonSection id="ternary" number="10" title="Тернарный оператор">
        <p class="lead">Тернарный оператор — компактная запись выбора одного из двух значений.</p>
        <div class="ternary-formula"><strong>условие</strong><b>?</b><span>значение, если true</span><b>:</b><span>значение, если false</span></div>
        <CodeBlock :code="ternaryCode" language="javascript" />
        <h3>Эквивалент через if / else</h3>
        <CodeBlock :code="ternaryComparison" language="javascript" />
        <p>Тернарный оператор особенно удобен при присваивании короткого значения. Для нескольких действий, сложных условий или длинных веток обычный <code>if / else</code> понятнее.</p>
        <InfoBlock type="warning" title="Не вкладывайте тернарные операторы друг в друга"><p>Цепочка вида <code>condition ? a : otherCondition ? b : c</code> быстро становится трудной для чтения. Для трёх и более вариантов используйте <code>else if</code>.</p></InfoBlock>
        <RevealAnswer
          :code="'const number = 7;\nconst type = number % 2 === 0 ? &quot;чётное&quot; : &quot;нечётное&quot;;\n\nconsole.log(type);'"
          answer="нечётное"
          explanation="Остаток от деления 7 на 2 равен 1, условие ложно, поэтому выбирается значение после двоеточия."
        />
      </LessonSection>

      <LessonSection id="switch" number="11" title="Конструкция switch">
        <p class="lead"><code>switch</code> удобен, когда одно значение нужно сравнить с несколькими конкретными вариантами.</p>
        <CodeBlock :code="switchCode" language="javascript" />
        <div class="switch-parts">
          <article><b>switch</b><p>значение, которое проверяем</p></article>
          <article><b>case</b><p>один из возможных вариантов</p></article>
          <article><b>break</b><p>выход из конструкции после совпадения</p></article>
          <article><b>default</b><p>действие, если совпадений нет</p></article>
        </div>
        <InfoBlock type="info" title="Сравнение строгое"><p><code>switch</code> сравнивает значения по принципу <code>===</code>. Строка <code>"3"</code> не совпадёт с числовым вариантом <code>case 3</code>.</p></InfoBlock>
        <h3>Несколько case с общим действием</h3>
        <CodeBlock :code="groupedSwitch" language="javascript" />
        <h3>Что произойдёт без break</h3>
        <CodeBlock :code="missingBreak" language="javascript" />
        <CodeBlock :code="'Можно редактировать\nМожно читать'" language="text" />
        <p>После совпадения выполнение «проваливается» в следующий <code>case</code>. Иногда это делают намеренно, но чаще пропущенный <code>break</code> — ошибка.</p>
        <RevealAnswer
          :code="'const color = &quot;blue&quot;;\n\nswitch (color) {\n  case &quot;red&quot;:\n    console.log(&quot;Стоп&quot;);\n    break;\n  case &quot;green&quot;:\n    console.log(&quot;Можно идти&quot;);\n    break;\n  default:\n    console.log(&quot;Неизвестный сигнал&quot;);\n}'"
          answer="Неизвестный сигнал"
          explanation="Ни один case не совпал со строкой blue, поэтому выполняется ветка default."
        />
      </LessonSection>

      <LessonSection id="mistakes" number="12" title="Частые ошибки" kicker="ПРОВЕРЯЕМ СЕБЯ">
        <p class="lead">Большинство ошибок в условиях связано не с синтаксисом, а с неточно записанным правилом или неверным порядком проверок.</p>
        <div class="mistake-grid">
          <article><span>01</span><div><strong>Присваивание вместо сравнения</strong><code>if (age = 18) { }</code><p><code>=</code> записывает значение. Для сравнения используйте <code>===</code>.</p></div></article>
          <article><span>02</span><div><strong>Разные типы</strong><code>18 === "18"</code><p>Число и строка не равны при строгом сравнении.</p></div></article>
          <article><span>03</span><div><strong>Потерянная граница</strong><code>age &gt; 18</code><p>Если 18 тоже подходит, нужен оператор <code>&gt;=</code>.</p></div></article>
          <article><span>04</span><div><strong>Лишнее сравнение</strong><code>if (isReady === true)</code><p>Boolean уже можно проверить так: <code>if (isReady)</code>.</p></div></article>
          <article><span>05</span><div><strong>Пропущен break</strong><code>case "admin": ...</code><p><code>switch</code> продолжит выполнять следующие ветки.</p></div></article>
          <article><span>06</span><div><strong>Неверный порядок</strong><code>&gt;= 60 раньше &gt;= 90</code><p>Общая проверка перехватит более высокий результат.</p></div></article>
        </div>
        <div class="debug-checklist">
          <h3>Как проверить условие</h3>
          <ol>
            <li>Перескажите требование обычными словами.</li>
            <li>Подставьте значение, при котором ответ точно должен быть <code>true</code>.</li>
            <li>Проверьте значение для <code>false</code>.</li>
            <li>Отдельно испытайте границы: 17, 18 и 19; 59, 60 и 61.</li>
            <li>Выведите части сложного выражения через <code>console.log()</code>.</li>
          </ol>
        </div>
      </LessonSection>
    </div>

    <section id="practice" class="practice-section scroll-section">
      <div class="lesson-body">
        <span class="practice-kicker">ПРАКТИЧЕСКАЯ РАБОТА</span>
        <h2>Учимся принимать решения</h2>
        <p class="practice-lead">Создавайте отдельный <code>.js</code>-файл для каждого задания и проверяйте не один, а несколько наборов данных — особенно значения на границах диапазонов.</p>
        <div class="tasks-grid">
          <TaskBlock v-for="(task, index) in practiceTasks" :key="task.title" :task="task" :index="index" />
        </div>
        <div class="bonus">
          <div class="bonus-heading"><Star fill="currentColor" :size="22" /><div><small>ПОВЫШЕННАЯ СЛОЖНОСТЬ</small><h3>Дополнительные задания</h3></div></div>
          <article v-for="task in advancedTasks" :key="task.title">
            <span><CheckCircle2 :size="19" /></span>
            <div><strong>{{ task.title }}</strong><p>{{ task.text }}</p><small class="bonus-hint">Подсказка: {{ task.hint }}</small></div>
          </article>
        </div>
      </div>
    </section>

    <section id="review" class="review-section scroll-section">
      <div class="lesson-body">
        <span class="section-kicker">САМОПРОВЕРКА</span>
        <h2>Контрольные вопросы</h2>
        <p>Ответьте своими словами, затем раскройте карточку и сравните формулировки.</p>
        <div class="question-list">
          <details v-for="([question, answer], index) in controlQuestions" :key="question">
            <summary><span>{{ String(index + 1).padStart(2, '0') }}</span>{{ question }}</summary>
            <p>{{ answer }}</p>
          </details>
        </div>
      </div>
    </section>

    <section id="homework" class="homework-section scroll-section">
      <div class="lesson-body">
        <div class="homework-header"><span><BookOpenCheck /></span><div><small>САМОСТОЯТЕЛЬНАЯ РАБОТА</small><h2>Домашнее задание</h2><p>Создайте файл <code>homework-3.js</code>. Для каждой задачи проверьте минимум три набора данных.</p></div></div>
        <div class="homework-parts">
          <article><span>01</span><div><h3>Калькулятор билета</h3><p>Цена зависит от возраста: до 7 лет — бесплатно, 7–17 — 50%, 18–59 — полная цена, от 60 лет — скидка 30%. Некорректный возраст обработайте отдельно.</p></div></article>
          <article><span>02</span><div><h3>Авторизация</h3><p>Сравните введённые логин и пароль с сохранёнными значениями. Выведите точную причину отказа: неверный логин, неверный пароль или заблокированный пользователь.</p></div></article>
          <article><span>03</span><div><h3>Мини-калькулятор</h3><p>Создайте числа <code>a</code>, <code>b</code> и строку <code>operation</code>. Через <code>switch</code> выполните <code>+</code>, <code>-</code>, <code>*</code> или <code>/</code>. Предусмотрите деление на ноль и неизвестную операцию.</p></div></article>
          <article><span>04</span><div><h3>Координаты точки</h3><p>По значениям <code>x</code> и <code>y</code> определите, находится точка в одной из четырёх четвертей, на оси или в начале координат.</p></div></article>
          <article><span>05</span><div><h3>Анализ кода</h3><p>До запуска запишите ожидаемый результат и объясните, почему будет выбрана именно эта ветка.</p><CodeBlock :code="homeworkPrediction" language="javascript" /></div></article>
        </div>
      </div>
    </section>

    <div class="lesson-body">
      <nav class="lesson-series-nav" aria-label="Навигация между занятиями">
        <RouterLink class="next-lesson previous-lesson" to="/2" aria-label="Вернуться ко второму занятию">
          <span><ArrowLeft /></span>
          <div><small>ПРЕДЫДУЩЕЕ ЗАНЯТИЕ</small><h2>Переменные, типы и операторы</h2><p>let <i /> const <i /> typeof <i /> сравнения</p></div>
        </RouterLink>
        <div class="next-lesson lesson-disabled" aria-disabled="true">
          <div><small>СЛЕДУЮЩЕЕ ЗАНЯТИЕ</small><h2>Циклы и повторение действий</h2><p>for <i /> while <i /> break <i /> continue</p></div>
          <span><ArrowRight /></span>
        </div>
      </nav>
      <footer><span class="brand-mark small">JS</span><p>Основы программирования · 1 курс</p><a href="#top">Наверх ↑</a></footer>
    </div>
  </LessonLayout>
</template>
