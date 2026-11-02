<script setup>
import {
  ArrowLeft,
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  CircleHelp,
  Repeat2,
  RotateCw,
  Star,
} from 'lucide-vue-next'
import LessonLayout from '../components/LessonLayout.vue'
import LessonHero from '../components/LessonHero.vue'
import LessonSection from '../components/LessonSection.vue'
import CodeBlock from '../components/CodeBlock.vue'
import InfoBlock from '../components/InfoBlock.vue'
import TaskBlock from '../components/TaskBlock.vue'
import RevealAnswer from '../components/RevealAnswer.vue'
import { lessonFour as lesson } from '../data/lessons'
import { advancedTasks, controlQuestions, practiceTasks } from '../data/lessonFour'

const recapCondition = `let score = 72;

if (score >= 60) {
  console.log("Зачёт");
} else {
  console.log("Незачёт");
}`

const manualRepeat = `console.log("Повторение 1");
console.log("Повторение 2");
console.log("Повторение 3");
console.log("Повторение 4");
console.log("Повторение 5");`

const whileBasic = `let number = 1;

while (number <= 5) {
  console.log(number);
  number++;
}`

const whileTrace = `let count = 3;

while (count > 0) {
  console.log(count);
  count--;
}

console.log("Старт!");`

const infiniteLoop = `let number = 1;

while (number <= 5) {
  console.log(number);
  // number не изменяется
}`

const differentSteps = `let number = 0;

while (number <= 10) {
  console.log(number);
  number += 2;
}`

const doWhileCode = `let attempt = 1;

do {
  console.log(\`Попытка №\${attempt}\`);
  attempt++;
} while (attempt <= 3);`

const doWhileFalse = `let number = 10;

do {
  console.log(number);
} while (number < 5);`

const forBasic = `for (let number = 1; number <= 5; number++) {
  console.log(number);
}`

const forReverse = `for (let number = 5; number >= 1; number--) {
  console.log(number);
}`

const forStep = `for (let number = 0; number <= 10; number += 2) {
  console.log(number);
}`

const forScope = `for (let i = 0; i < 3; i++) {
  console.log(i);
}

console.log(i); // ReferenceError`

const sumLoop = `let sum = 0;

for (let number = 1; number <= 5; number++) {
  sum += number;
}

console.log(sum);`

const countLoop = `let evenCount = 0;

for (let number = 1; number <= 10; number++) {
  if (number % 2 === 0) {
    evenCount++;
  }
}

console.log(evenCount);`

const conditionLoop = `for (let number = 1; number <= 10; number++) {
  if (number % 3 === 0) {
    console.log(number);
  }
}`

const fizzBuzzOrder = `for (let number = 1; number <= 15; number++) {
  if (number % 3 === 0 && number % 5 === 0) {
    console.log("FizzBuzz");
  } else if (number % 3 === 0) {
    console.log("Fizz");
  } else if (number % 5 === 0) {
    console.log("Buzz");
  } else {
    console.log(number);
  }
}`

const breakLoop = `for (let number = 1; number <= 10; number++) {
  if (number === 6) {
    break;
  }

  console.log(number);
}`

const searchLoop = `const target = 17;
let divisor = 2;
let hasDivisor = false;

while (divisor < target) {
  if (target % divisor === 0) {
    hasDivisor = true;
    break;
  }

  divisor++;
}

console.log(hasDivisor);`

const continueLoop = `for (let number = 1; number <= 7; number++) {
  if (number === 4) {
    continue;
  }

  console.log(number);
}`

const safeWhileContinue = `let number = 0;

while (number < 5) {
  number++;

  if (number === 3) {
    continue;
  }

  console.log(number);
}`

const nestedLoop = `for (let row = 1; row <= 3; row++) {
  for (let column = 1; column <= 4; column++) {
    console.log(\`Строка \${row}, столбец \${column}\`);
  }
}`

const rectangleLoop = `const rows = 3;
const columns = 5;

for (let row = 1; row <= rows; row++) {
  let line = "";

  for (let column = 1; column <= columns; column++) {
    line += "#";
  }

  console.log(line);
}`

const homeworkPrediction = `let result = 0;

for (let number = 1; number <= 6; number++) {
  if (number === 4) {
    continue;
  }

  result += number;
}

console.log(result);`
</script>

<template>
  <LessonLayout :navigation="lesson.sections" :lesson-number="lesson.number" :title="lesson.title">
    <LessonHero :lesson="lesson" />

    <div class="lesson-body">
      <div class="intro-note">
        <Repeat2 :size="20" />
        <p><strong>Цель занятия</strong> — научиться повторять действия без копирования кода, управлять количеством итераций и решать задачи со счётчиками, суммами и вложенными повторениями.</p>
      </div>

      <LessonSection id="recap" number="01" title="Повторение пройденного" kicker="ОТ УСЛОВИЙ К ПОВТОРЕНИЮ">
        <p class="lead">Мы уже умеем хранить данные, вычислять логические выражения и выбирать ветку программы. Цикл использует те же знания, но проверяет условие многократно.</p>
        <div class="concept-grid">
          <article><strong>Переменная</strong><p>Хранит текущее состояние: номер шага, сумму или количество.</p></article>
          <article><strong>Условие</strong><p>Определяет, нужно ли выполнить следующий шаг.</p></article>
          <article><strong>Изменение</strong><p><code>++</code>, <code>--</code> или присваивание приближают цикл к завершению.</p></article>
          <article><strong>Блок кода</strong><p>Фигурные скобки объединяют инструкции одной ветки или итерации.</p></article>
        </div>
        <CodeBlock :code="recapCondition" language="javascript" />
        <div class="oral-questions">
          <h3><CircleHelp :size="19" /> Вопросы для устного повторения</h3>
          <ol>
            <li>Какое значение получает выражение <code>score &gt;= 60</code>?</li>
            <li>Когда выполняется блок <code>if</code>?</li>
            <li>Чем <code>number++</code> отличается от <code>number + 1</code>?</li>
            <li>Почему для изменяемого счётчика нужен <code>let</code>?</li>
          </ol>
        </div>
      </LessonSection>

      <LessonSection id="why-loops" number="02" title="Зачем нужны циклы?">
        <p class="lead">Цикл — конструкция, которая повторяет блок кода. Одно выполнение этого блока называется <strong>итерацией</strong>.</p>
        <p>Пять похожих строк ещё можно написать вручную:</p>
        <CodeBlock :code="manualRepeat" language="javascript" />
        <p>Но для ста, тысячи или заранее неизвестного числа повторений копирование становится неудобным и опасным. Цикл описывает правило повторения один раз.</p>
        <div class="loop-flow" aria-label="Схема работы цикла">
          <div><span>01</span><strong>Проверить условие</strong><small>Продолжать?</small></div>
          <ArrowRight />
          <div class="accent"><span>02</span><strong>Выполнить тело</strong><small>Одна итерация</small></div>
          <ArrowRight />
          <div><span>03</span><strong>Изменить состояние</strong><small>Приблизиться к концу</small></div>
          <RotateCw class="loop-back" />
        </div>
        <InfoBlock type="important" title="У цикла должна быть точка завершения"><p>Если условие всегда остаётся истинным, программа попадёт в бесконечный цикл. Всегда проверяйте, какое действие сделает условие ложным.</p></InfoBlock>
      </LessonSection>

      <LessonSection id="while" number="03" title="Цикл while" kicker="ПОКА УСЛОВИЕ ИСТИННО">
        <p class="lead"><code>while</code> проверяет условие перед каждой итерацией и выполняет тело, пока результат остаётся <code>true</code>.</p>
        <div class="condition-syntax"><b>while</b><span>(</span><strong>условие</strong><span>)</span><i>{</i><code>тело цикла</code><i>}</i></div>
        <CodeBlock :code="whileBasic" language="javascript" />
        <CodeBlock :code="'1\n2\n3\n4\n5'" language="text" />
        <div class="loop-state">
          <article><span>До цикла</span><strong><code>number = 1</code></strong><p>Создаём начальное состояние.</p></article>
          <article><span>Условие</span><strong><code>number &lt;= 5</code></strong><p>Решаем, нужна ли итерация.</p></article>
          <article><span>Изменение</span><strong><code>number++</code></strong><p>Готовим состояние для следующей проверки.</p></article>
        </div>
        <p>После пятой итерации <code>number</code> станет равен 6. Условие вернёт <code>false</code>, и выполнение продолжится после цикла.</p>
        <h3>Обратный отсчёт</h3>
        <CodeBlock :code="whileTrace" language="javascript" />
        <RevealAnswer
          :code="'let value = 2;\n\nwhile (value <= 8) {\n  console.log(value);\n  value *= 2;\n}'"
          :answer="'2\n4\n8'"
          explanation="После вывода значение каждый раз удваивается: 2, 4, 8, затем 16. Для 16 условие уже ложно."
        />
      </LessonSection>

      <LessonSection id="counter" number="04" title="Счётчик и изменение состояния">
        <p class="lead">Управляющая переменная должна меняться так, чтобы условие однажды стало ложным.</p>
        <h3>Бесконечный цикл</h3>
        <CodeBlock :code="infiniteLoop" language="javascript" />
        <p>Значение остаётся равным 1, поэтому проверка <code>number &lt;= 5</code> всегда истинна. Программа будет непрерывно выводить единицу.</p>
        <InfoBlock type="warning" title="Как остановить программу"><p>Если вы случайно запустили бесконечный цикл в терминале, нажмите <code>Ctrl + C</code>. После этого исправьте условие или изменение переменной.</p></InfoBlock>
        <h3>Шаг не обязательно равен единице</h3>
        <CodeBlock :code="differentSteps" language="javascript" />
        <CodeBlock :code="'0\n2\n4\n6\n8\n10'" language="text" />
        <div class="lesson-table-wrap">
          <table class="lesson-table">
            <thead><tr><th>Запись</th><th>Действие</th><th>Полная форма</th></tr></thead>
            <tbody>
              <tr><td><code>number++</code></td><td>увеличить на 1</td><td><code>number = number + 1</code></td></tr>
              <tr><td><code>number--</code></td><td>уменьшить на 1</td><td><code>number = number - 1</code></td></tr>
              <tr><td><code>number += 2</code></td><td>увеличить на 2</td><td><code>number = number + 2</code></td></tr>
              <tr><td><code>number *= 2</code></td><td>умножить на 2</td><td><code>number = number * 2</code></td></tr>
            </tbody>
          </table>
        </div>
      </LessonSection>

      <LessonSection id="do-while" number="05" title="Цикл do...while">
        <p class="lead"><code>do...while</code> сначала выполняет тело и только затем проверяет условие. Поэтому первая итерация происходит всегда.</p>
        <CodeBlock :code="doWhileCode" language="javascript" />
        <CodeBlock :code="'Попытка №1\nПопытка №2\nПопытка №3'" language="text" />
        <h3>Условие ложно с самого начала</h3>
        <CodeBlock :code="doWhileFalse" language="javascript" />
        <CodeBlock code="10" language="text" />
        <div class="comparison two-columns">
          <div><CodeBlock :code="'while (condition) {\n  // действия\n}'" language="javascript" /><strong>0 или больше</strong><small>Сначала проверяет условие</small></div>
          <div><CodeBlock :code="'do {\n  // действия\n} while (condition);'" language="javascript" /><strong>1 или больше</strong><small>Сначала выполняет тело</small></div>
        </div>
        <InfoBlock type="tip" title="Когда это полезно"><p>Например, когда действие нужно выполнить хотя бы один раз: показать меню, сделать первую попытку или запросить данные. Пока мы работаем без пользовательского ввода, поэтому используем учебные примеры.</p></InfoBlock>
        <RevealAnswer
          :code="'let number = 5;\n\ndo {\n  console.log(number);\n  number++;\n} while (number < 5);'"
          answer="5"
          explanation="Тело выполняется до проверки. После первой итерации number равно 6, условие ложно, и цикл завершается."
        />
      </LessonSection>

      <LessonSection id="for" number="06" title="Цикл for" kicker="КОГДА ИЗВЕСТНЫ ГРАНИЦЫ">
        <p class="lead"><code>for</code> собирает начальное значение, условие и изменение счётчика в одной строке. Он особенно удобен для известного количества повторений.</p>
        <div class="for-anatomy">
          <code>for (</code>
          <span><b>let i = 1</b><small>инициализация</small></span>
          <i>;</i>
          <span><b>i &lt;= 5</b><small>условие</small></span>
          <i>;</i>
          <span><b>i++</b><small>изменение</small></span>
          <code>) { ... }</code>
        </div>
        <CodeBlock :code="forBasic" language="javascript" />
        <p>Этот код даёт тот же результат, что и первый пример с <code>while</code>, но все управляющие части находятся рядом.</p>
        <div class="code-pair">
          <div><span>В обратном порядке</span><CodeBlock :code="forReverse" language="javascript" /></div>
          <div><span>С шагом 2</span><CodeBlock :code="forStep" language="javascript" /></div>
        </div>
        <h3>Область видимости счётчика</h3>
        <CodeBlock :code="forScope" language="javascript" />
        <p>Счётчик, объявленный через <code>let</code> в заголовке <code>for</code>, доступен только внутри цикла.</p>
        <RevealAnswer
          :code="'for (let i = 3; i <= 9; i += 3) {\n  console.log(i);\n}'"
          :answer="'3\n6\n9'"
          explanation="Счётчик начинается с 3 и после каждой итерации увеличивается на 3. После 9 он станет равен 12, и условие будет ложным."
        />
      </LessonSection>

      <LessonSection id="trace" number="07" title="Как выполняется for">
        <p class="lead">Важно понимать порядок: инициализация выполняется один раз, а условие, тело и изменение повторяются.</p>
        <div class="iteration-line">
          <span><b>1</b>инициализация</span><ArrowRight /><span><b>2</b>условие</span><ArrowRight /><span><b>3</b>тело</span><ArrowRight /><span><b>4</b>изменение</span><RotateCw />
        </div>
        <CodeBlock :code="forBasic" language="javascript" />
        <div class="lesson-table-wrap">
          <table class="lesson-table">
            <thead><tr><th>Проверка</th><th>number</th><th>number &lt;= 5</th><th>Действие</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>1</td><td>true</td><td>вывести 1, увеличить до 2</td></tr>
              <tr><td>2</td><td>2</td><td>true</td><td>вывести 2, увеличить до 3</td></tr>
              <tr><td>3</td><td>3</td><td>true</td><td>вывести 3, увеличить до 4</td></tr>
              <tr><td>4</td><td>4</td><td>true</td><td>вывести 4, увеличить до 5</td></tr>
              <tr><td>5</td><td>5</td><td>true</td><td>вывести 5, увеличить до 6</td></tr>
              <tr><td>6</td><td>6</td><td>false</td><td>завершить цикл</td></tr>
            </tbody>
          </table>
        </div>
        <InfoBlock type="info" title="Проверок на одну больше, чем итераций"><p>Для завершения нужна последняя проверка, которая вернёт <code>false</code>. Поэтому условие здесь проверяется шесть раз, а тело выполняется пять.</p></InfoBlock>
      </LessonSection>

      <LessonSection id="accumulator" number="08" title="Счётчики и накопители">
        <p class="lead">Цикл часто не просто выводит значения, а постепенно формирует один итоговый результат.</p>
        <h3>Накопитель суммы</h3>
        <CodeBlock :code="sumLoop" language="javascript" />
        <CodeBlock code="15" language="text" />
        <div class="accumulator-trace">
          <span><b>0 + 1</b><small>1</small></span>
          <span><b>1 + 2</b><small>3</small></span>
          <span><b>3 + 3</b><small>6</small></span>
          <span><b>6 + 4</b><small>10</small></span>
          <span><b>10 + 5</b><small>15</small></span>
        </div>
        <h3>Счётчик найденных значений</h3>
        <CodeBlock :code="countLoop" language="javascript" />
        <CodeBlock code="5" language="text" />
        <div class="concept-grid">
          <article><strong>Счётчик</strong><p>Обычно увеличивается на единицу и отвечает на вопрос «сколько?».</p></article>
          <article><strong>Накопитель</strong><p>Получает очередное значение и хранит сумму, произведение или собранную строку.</p></article>
        </div>
        <InfoBlock type="important" title="Правильное начальное значение"><p>Сумма начинается с <code>0</code>, произведение — с <code>1</code>, строка — с <code>""</code>. Неверное начало исказит весь результат.</p></InfoBlock>
        <RevealAnswer
          :code="'let product = 1;\n\nfor (let number = 1; number <= 4; number++) {\n  product *= number;\n}\n\nconsole.log(product);'"
          answer="24"
          explanation="Накопитель последовательно принимает значения 1, 2, 6 и 24: это произведение чисел от 1 до 4."
        />
      </LessonSection>

      <LessonSection id="conditions" number="09" title="Условия внутри цикла">
        <p class="lead"><code>if</code> внутри цикла позволяет выполнять действие только для подходящих значений.</p>
        <CodeBlock :code="conditionLoop" language="javascript" />
        <CodeBlock :code="'3\n6\n9'" language="text" />
        <p>Цикл перебирает все числа от 1 до 10, но вывод происходит только тогда, когда остаток от деления на 3 равен нулю.</p>
        <h3>Порядок условий по-прежнему важен</h3>
        <CodeBlock :code="fizzBuzzOrder" language="javascript" />
        <p>Проверка делимости одновременно на 3 и 5 должна стоять первой. Иначе число 15 попадёт в более общую ветку <code>number % 3 === 0</code>.</p>
        <RevealAnswer
          :code="'let sum = 0;\n\nfor (let number = 1; number <= 6; number++) {\n  if (number % 2 === 0) {\n    sum += number;\n  }\n}\n\nconsole.log(sum);'"
          answer="12"
          explanation="В накопитель попадают только чётные числа: 2 + 4 + 6 = 12."
        />
      </LessonSection>

      <LessonSection id="break" number="10" title="Оператор break">
        <p class="lead"><code>break</code> немедленно завершает ближайший цикл, даже если его обычное условие ещё истинно.</p>
        <CodeBlock :code="breakLoop" language="javascript" />
        <CodeBlock :code="'1\n2\n3\n4\n5'" language="text" />
        <p>Когда <code>number</code> становится равен 6, выполняется <code>break</code>. Шестёрка не выводится, а оставшиеся итерации не запускаются.</p>
        <h3>Завершение поиска после первого совпадения</h3>
        <CodeBlock :code="searchLoop" language="javascript" />
        <p>Если делитель найден, продолжать проверки нет смысла. Флаг сохраняет результат, а <code>break</code> прекращает поиск.</p>
        <InfoBlock type="info" title="Знакомое ключевое слово"><p>В <code>switch</code> оператор <code>break</code> завершал выбранную ветку. В цикле он завершает повторение целиком.</p></InfoBlock>
        <RevealAnswer
          :code="'let result = 0;\n\nfor (let i = 1; i <= 10; i++) {\n  if (i === 4) {\n    break;\n  }\n  result += i;\n}\n\nconsole.log(result);'"
          answer="6"
          explanation="До остановки накопитель получает 1, 2 и 3. Число 4 уже не прибавляется: 1 + 2 + 3 = 6."
        />
      </LessonSection>

      <LessonSection id="continue" number="11" title="Оператор continue">
        <p class="lead"><code>continue</code> пропускает оставшийся код текущей итерации, но не завершает весь цикл.</p>
        <CodeBlock :code="continueLoop" language="javascript" />
        <CodeBlock :code="'1\n2\n3\n5\n6\n7'" language="text" />
        <div class="comparison two-columns">
          <div><strong>break</strong><small>Останавливает весь цикл</small></div>
          <div><strong>continue</strong><small>Пропускает только одну итерацию</small></div>
        </div>
        <h3>Осторожно с continue в while</h3>
        <CodeBlock :code="safeWhileContinue" language="javascript" />
        <p>Изменение счётчика размещено <strong>до</strong> возможного <code>continue</code>. Если поставить <code>number++</code> в конце тела, на значении 3 цикл будет бесконечно переходить к следующей итерации без изменения.</p>
        <RevealAnswer
          :code="'for (let i = 1; i <= 5; i++) {\n  if (i % 2 === 0) {\n    continue;\n  }\n  console.log(i);\n}'"
          :answer="'1\n3\n5'"
          explanation="Для чётных значений срабатывает continue, поэтому до console.log доходят только нечётные."
        />
      </LessonSection>

      <LessonSection id="nested" number="12" title="Вложенные циклы">
        <p class="lead">Цикл можно поместить внутрь другого. Внутренний цикл полностью выполняется для каждой итерации внешнего.</p>
        <CodeBlock :code="nestedLoop" language="javascript" />
        <div class="nested-visual">
          <div><span>Строка 1</span><i /><i /><i /><i /></div>
          <div><span>Строка 2</span><i /><i /><i /><i /></div>
          <div><span>Строка 3</span><i /><i /><i /><i /></div>
        </div>
        <p>Внешний цикл делает 3 итерации. На каждой из них внутренний выполняется 4 раза. Всего команда вывода сработает <code>3 × 4 = 12</code> раз.</p>
        <h3>Построение прямоугольника</h3>
        <CodeBlock :code="rectangleLoop" language="javascript" />
        <CodeBlock :code="'#####\n#####\n#####'" language="text" />
        <InfoBlock type="tip" title="Разные имена счётчиков"><p>Используйте понятные имена <code>row</code> и <code>column</code>. Это яснее, чем несколько переменных <code>i</code>, <code>j</code> и <code>k</code> в первом учебном коде.</p></InfoBlock>
        <RevealAnswer
          :code="'let count = 0;\n\nfor (let row = 1; row <= 2; row++) {\n  for (let column = 1; column <= 3; column++) {\n    count++;\n  }\n}\n\nconsole.log(count);'"
          answer="6"
          explanation="Для каждой из двух строк внутренний цикл выполняется три раза: 2 × 3 = 6."
        />
      </LessonSection>

      <LessonSection id="choice-mistakes" number="13" title="Выбор цикла и частые ошибки" kicker="ПИШЕМ ПРЕДСКАЗУЕМО">
        <div class="loop-choice-grid">
          <article><code>for</code><strong>Известны границы</strong><p>Вывести числа от 1 до 10, построить таблицу, повторить действие N раз.</p></article>
          <article><code>while</code><strong>Известно условие</strong><p>Повторять поиск, пока значение подходит или пока не достигнут результат.</p></article>
          <article><code>do...while</code><strong>Нужна первая попытка</strong><p>Сначала выполнить действие, потом решить, нужно ли повторять.</p></article>
        </div>
        <InfoBlock type="info" title="Это рекомендация, а не запрет"><p>Большинство задач можно записать разными циклами. Выбирайте конструкцию, которая яснее показывает намерение программы.</p></InfoBlock>
        <div class="mistake-grid">
          <article><span>01</span><div><strong>Нет изменения</strong><code>while (i &lt; 5) { }</code><p>Условие никогда не станет ложным.</p></div></article>
          <article><span>02</span><div><strong>Неверная граница</strong><code>i &lt; 10 вместо i &lt;= 10</code><p>Последнее значение не попадёт в цикл.</p></div></article>
          <article><span>03</span><div><strong>Неверное начало суммы</strong><code>let sum = 1</code><p>Результат окажется на единицу больше.</p></div></article>
          <article><span>04</span><div><strong>Неверное начало произведения</strong><code>let product = 0</code><p>Любое произведение останется нулём.</p></div></article>
          <article><span>05</span><div><strong>continue до изменения</strong><code>continue; i++;</code><p>В while счётчик может перестать изменяться.</p></div></article>
          <article><span>06</span><div><strong>Лишняя вложенность</strong><code>for внутри for</code><p>Не используйте два цикла, если задача требует одного прохода.</p></div></article>
        </div>
        <div class="debug-checklist">
          <h3>Проверка цикла перед запуском</h3>
          <ol>
            <li>Какое значение у счётчика перед первой итерацией?</li>
            <li>При каком значении условие станет ложным?</li>
            <li>Меняется ли состояние на каждой возможной ветке?</li>
            <li>Нужно ли включать правую границу через <code>&lt;=</code>?</li>
            <li>Правильно ли выбрано начальное значение накопителя?</li>
          </ol>
        </div>
      </LessonSection>
    </div>

    <section id="practice" class="practice-section scroll-section">
      <div class="lesson-body">
        <span class="practice-kicker">ПРАКТИЧЕСКАЯ РАБОТА</span>
        <h2>Закрепляем циклы</h2>
        <p class="practice-lead">Перед запуском определите начальное значение, условие завершения и изменение счётчика. Для задач с диапазонами отдельно проверьте первое и последнее значения.</p>
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
        <p>Сначала ответьте без подсказки, затем раскройте карточку и проверьте формулировку.</p>
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
        <div class="homework-header"><span><BookOpenCheck /></span><div><small>САМОСТОЯТЕЛЬНАЯ РАБОТА</small><h2>Домашнее задание</h2><p>Создайте файл <code>homework-4.js</code>. Не копируйте циклы из примеров — сначала сформулируйте границы словами.</p></div></div>
        <div class="homework-parts">
          <article><span>01</span><div><h3>Сумма кратных чисел</h3><p>Найдите сумму всех чисел от 1 до 100, которые делятся на 4 или на 7. Выведите сумму и количество таких чисел.</p></div></article>
          <article><span>02</span><div><h3>Таблица умножения 10 × 10</h3><p>С помощью вложенных циклов выведите десять строк. В каждой строке должны находиться результаты умножения номера строки на числа от 1 до 10.</p></div></article>
          <article><span>03</span><div><h3>Проверка числа</h3><p>Для положительного целого <code>number</code> посчитайте количество его делителей. По результату определите, является ли число простым.</p></div></article>
          <article><span>04</span><div><h3>Лесенка</h3><p>Для значения <code>height</code> выведите фигуру: в первой строке один символ <code>#</code>, во второй — два, и так далее до заданной высоты.</p></div></article>
          <article><span>05</span><div><h3>Анализ кода</h3><p>До запуска запишите значение <code>result</code> после каждой итерации и итоговый ответ.</p><CodeBlock :code="homeworkPrediction" language="javascript" /></div></article>
        </div>
      </div>
    </section>

    <div class="lesson-body">
      <nav class="lesson-series-nav" aria-label="Навигация между занятиями">
        <RouterLink class="next-lesson previous-lesson" to="/3" aria-label="Вернуться к третьему занятию">
          <span><ArrowLeft /></span>
          <div><small>ПРЕДЫДУЩЕЕ ЗАНЯТИЕ</small><h2>Условные конструкции</h2><p>if <i /> else <i /> switch <i /> boolean</p></div>
        </RouterLink>
        <div class="next-lesson lesson-disabled" aria-disabled="true">
          <div><small>СЛЕДУЮЩЕЕ ЗАНЯТИЕ</small><h2>Массивы и коллекции данных</h2><p>array <i /> length <i /> index <i /> перебор</p></div>
          <span><ArrowRight /></span>
        </div>
      </nav>
      <footer><span class="brand-mark small">JS</span><p>Основы программирования · 1 курс</p><a href="#top">Наверх ↑</a></footer>
    </div>
  </LessonLayout>
</template>
