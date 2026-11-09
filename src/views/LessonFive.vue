<script setup>
import {
  ArrowLeft,
  ArrowRight,
  BookOpenCheck,
  Brackets,
  CheckCircle2,
  CircleHelp,
  Star,
} from 'lucide-vue-next'
import LessonLayout from '../components/LessonLayout.vue'
import LessonHero from '../components/LessonHero.vue'
import LessonSection from '../components/LessonSection.vue'
import CodeBlock from '../components/CodeBlock.vue'
import InfoBlock from '../components/InfoBlock.vue'
import TaskBlock from '../components/TaskBlock.vue'
import RevealAnswer from '../components/RevealAnswer.vue'
import { lessonFive as lesson } from '../data/lessons'
import { advancedTasks, controlQuestions, practiceTasks } from '../data/lessonFive'

const recapLoop = `let sum = 0;

for (let number = 1; number <= 5; number++) {
  sum += number;
}

console.log(sum);`

const separateVariables = `const student1 = "Адам";
const student2 = "Амина";
const student3 = "Марьям";
const student4 = "Ибрагим";`

const basicArray = `const students = ["Адам", "Амина", "Марьям", "Ибрагим"];

console.log(students);`

const arrayExamples = `const temperatures = [18, 21, 19, 24];
const cities = ["Грозный", "Москва", "Казань"];
const answers = [true, false, true];
const emptyList = [];`

const mixedArray = `const mixed = ["Адам", 19, true, null];

console.log(mixed);`

const arrayType = `const numbers = [10, 20, 30];

console.log(typeof numbers);              // "object"
console.log(Array.isArray(numbers));       // true
console.log(Array.isArray("10, 20, 30")); // false`

const indexAccess = `const colors = ["красный", "зелёный", "синий"];

console.log(colors[0]);
console.log(colors[1]);
console.log(colors[2]);`

const indexVariables = `const colors = ["красный", "зелёный", "синий"];
const index = 1;

console.log(colors[index]);`

const missingIndex = `const colors = ["красный", "зелёный", "синий"];

console.log(colors[3]); // undefined`

const lengthCode = `const cities = ["Грозный", "Москва", "Казань", "Сочи"];

console.log(cities.length);`

const lastElement = `const cities = ["Грозный", "Москва", "Казань", "Сочи"];

const lastIndex = cities.length - 1;
console.log(cities[lastIndex]);`

const emptyLength = `const items = [];

console.log(items.length); // 0
console.log(items[0]);     // undefined`

const changingElements = `const prices = [100, 250, 400];

prices[1] = 300;

console.log(prices);`

const constArray = `const scores = [70, 80, 90];

scores[0] = 75; // можно
scores = [10, 20, 30]; // TypeError`

const addFarIndex = `const values = [10, 20, 30];

values[5] = 60;

console.log(values);
console.log(values.length);`

const pushPop = `const queue = ["Адам", "Амина"];

queue.push("Ибрагим");
console.log(queue);

const removed = queue.pop();
console.log(removed);
console.log(queue);`

const shiftUnshift = `const tasks = ["Проверить код", "Запустить файл"];

tasks.unshift("Создать файл");
console.log(tasks);

const firstTask = tasks.shift();
console.log(firstTask);
console.log(tasks);`

const methodReturnValues = `const numbers = [10, 20];

const newLength = numbers.push(30);
const removedValue = numbers.pop();

console.log(newLength);   // 3
console.log(removedValue); // 30`

const forArray = `const scores = [72, 85, 91, 68];

for (let index = 0; index < scores.length; index++) {
  console.log(\`Индекс \${index}: \${scores[index]}\`);
}`

const offByOne = `const scores = [72, 85, 91];

for (let index = 0; index <= scores.length; index++) {
  console.log(scores[index]);
}`

const changeByIndex = `const prices = [100, 200, 300];

for (let index = 0; index < prices.length; index++) {
  prices[index] *= 2;
}

console.log(prices);`

const forOfCode = `const cities = ["Грозный", "Москва", "Казань"];

for (const city of cities) {
  console.log(city);
}`

const forComparison = `const prices = [100, 200, 300];

for (const price of prices) {
  console.log(price);
}`

const sumAverage = `const scores = [80, 75, 90, 85];
let sum = 0;

for (const score of scores) {
  sum += score;
}

const average = sum / scores.length;

console.log(sum);
console.log(average);`

const maxValue = `const temperatures = [-5, -12, -2, -9];
let maximum = temperatures[0];

for (const temperature of temperatures) {
  if (temperature > maximum) {
    maximum = temperature;
  }
}

console.log(maximum);`

const countValues = `const numbers = [-2, 0, 7, -5, 4, 0];
let positiveCount = 0;

for (const number of numbers) {
  if (number > 0) {
    positiveCount++;
  }
}

console.log(positiveCount);`

const searchIndex = `const students = ["Адам", "Амина", "Ибрагим", "Марьям"];
const target = "Ибрагим";
let foundIndex = -1;

for (let index = 0; index < students.length; index++) {
  if (students[index] === target) {
    foundIndex = index;
    break;
  }
}

console.log(foundIndex);`

const searchBoolean = `const numbers = [12, 7, 18, 25];
const target = 18;
let found = false;

for (const number of numbers) {
  if (number === target) {
    found = true;
    break;
  }
}

console.log(found);`

const nestedArray = `const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

console.log(matrix[0]);
console.log(matrix[1][2]);`

const nestedTraversal = `const matrix = [
  [1, 2, 3],
  [4, 5, 6],
];

for (const row of matrix) {
  for (const value of row) {
    console.log(value);
  }
}`

const rowSums = `const matrix = [
  [2, 4, 6],
  [1, 3, 5],
];

for (const row of matrix) {
  let rowSum = 0;

  for (const value of row) {
    rowSum += value;
  }

  console.log(rowSum);
}`

const homeworkPrediction = `const values = [3, 7, 2, 8, 5];
let result = values[0];

for (let index = 1; index < values.length; index++) {
  if (values[index] > result) {
    result = values[index];
  }
}

console.log(result);`
</script>

<template>
  <LessonLayout :navigation="lesson.sections" :lesson-number="lesson.number" :title="lesson.title">
    <LessonHero :lesson="lesson" />

    <div class="lesson-body">
      <div class="intro-note">
        <Brackets :size="20" />
        <p><strong>Цель занятия</strong> — научиться хранить несколько связанных значений в одной коллекции, безопасно обращаться к элементам и применять циклы для обработки всего массива.</p>
      </div>

      <LessonSection id="recap" number="01" title="Повторение предыдущих тем" kicker="ГОТОВИМСЯ К КОЛЛЕКЦИЯМ">
        <p class="lead">Мы уже умеем хранить одно значение в переменной и повторять действие циклом. Массив соединяет эти навыки: одна переменная хранит много значений, а цикл обрабатывает их по очереди.</p>
        <div class="concept-grid">
          <article><strong>Переменная</strong><p>Даёт имя одному значению или одной структуре данных.</p></article>
          <article><strong>Цикл</strong><p>Повторяет действие для последовательности шагов.</p></article>
          <article><strong>Счётчик</strong><p>Подходит для номера позиции — индекса.</p></article>
          <article><strong>Накопитель</strong><p>Собирает сумму, количество или другой общий результат.</p></article>
        </div>
        <CodeBlock :code="recapLoop" language="javascript" />
        <CodeBlock code="15" language="text" />
        <div class="oral-questions">
          <h3><CircleHelp :size="19" /> Вопросы для устного повторения</h3>
          <ol>
            <li>Сколько итераций выполнит этот цикл?</li>
            <li>Почему накопитель суммы начинается с нуля?</li>
            <li>Когда условие <code>number &lt;= 5</code> станет ложным?</li>
            <li>Чем значение счётчика отличается от количества итераций?</li>
          </ol>
        </div>
      </LessonSection>

      <LessonSection id="why-arrays" number="02" title="Зачем нужны массивы?">
        <p class="lead">Массив — упорядоченная коллекция значений. Он позволяет хранить целый список в одной переменной.</p>
        <p>Без массива для каждого студента нужна отдельная переменная:</p>
        <CodeBlock :code="separateVariables" language="javascript" />
        <p>Такой код трудно расширять и невозможно удобно перебрать циклом. С массивом данные образуют единый список:</p>
        <CodeBlock :code="basicArray" language="javascript" />
        <div class="collection-benefits">
          <article><span>01</span><strong>Одно имя</strong><p>Связанные значения хранятся вместе.</p></article>
          <article><span>02</span><strong>Сохраняется порядок</strong><p>У каждого элемента есть позиция.</p></article>
          <article><span>03</span><strong>Можно перебрать</strong><p>Цикл обработает весь список.</p></article>
        </div>
        <InfoBlock type="tip" title="Массив отвечает на вопрос «какие значения?»"><p>Если переменная должна хранить список студентов, температур, цен или результатов, массив обычно подходит лучше набора отдельных переменных.</p></InfoBlock>
      </LessonSection>

      <LessonSection id="creating" number="03" title="Создание массива">
        <p class="lead">Массив записывают в квадратных скобках, а элементы разделяют запятыми.</p>
        <div class="array-anatomy">
          <b>const</b><strong>temperatures</strong><i>=</i><span>[</span><code>18, 21, 19, 24</code><span>]</span><i>;</i>
        </div>
        <CodeBlock :code="arrayExamples" language="javascript" />
        <p>Массив может быть пустым. Позже программа сможет добавить в него элементы.</p>
        <h3>Разные типы технически допустимы</h3>
        <CodeBlock :code="mixedArray" language="javascript" />
        <InfoBlock type="warning" title="Лучше хранить однородные данные"><p>JavaScript разрешает смешивать типы, но список одинаковых по смыслу значений легче понимать и обрабатывать: массив цен, массив имён, массив ответов.</p></InfoBlock>
        <h3>Какой тип у массива?</h3>
        <CodeBlock :code="arrayType" language="javascript" />
        <p><code>typeof</code> возвращает <code>"object"</code> — это особенность устройства JavaScript. Для точной проверки используйте <code>Array.isArray()</code>.</p>
        <RevealAnswer
          :code="'const data = [];\n\nconsole.log(data);\nconsole.log(Array.isArray(data));'"
          :answer="'[]\n0\ntrue'"
          explanation="Пустой массив не содержит элементов, поэтому его длина равна нулю, но он всё равно является массивом."
        />
      </LessonSection>

      <LessonSection id="indexes" number="04" title="Индексы элементов" kicker="СЧЁТ НАЧИНАЕТСЯ С НУЛЯ">
        <p class="lead">Каждый элемент имеет числовой индекс. Первый элемент расположен по индексу <code>0</code>, второй — по индексу <code>1</code>.</p>
        <div class="array-index-strip">
          <span><small>0</small><strong>красный</strong></span>
          <span><small>1</small><strong>зелёный</strong></span>
          <span><small>2</small><strong>синий</strong></span>
        </div>
        <CodeBlock :code="indexAccess" language="javascript" />
        <CodeBlock :code="'красный\nзелёный\nсиний'" language="text" />
        <p>В квадратных скобках может находиться не только готовое число, но и переменная или выражение:</p>
        <CodeBlock :code="indexVariables" language="javascript" />
        <h3>Несуществующий индекс</h3>
        <CodeBlock :code="missingIndex" language="javascript" />
        <p>Ошибка не возникает, но результатом будет <code>undefined</code>. Это частый признак неверной границы цикла или индекса.</p>
        <InfoBlock type="important" title="Номер элемента и индекс отличаются на единицу"><p>«Третий элемент» имеет индекс <code>2</code>. Всегда переводите человеческий номер позиции в индекс, начинающийся с нуля.</p></InfoBlock>
        <RevealAnswer
          :code="'const languages = [&quot;JavaScript&quot;, &quot;Python&quot;, &quot;Java&quot;];\n\nconsole.log(languages[2]);\nconsole.log(languages[3]);'"
          :answer="'Java\nundefined'"
          explanation="Индекс 2 существует и указывает на третий элемент. Индекса 3 в массиве из трёх элементов нет."
        />
      </LessonSection>

      <LessonSection id="length" number="05" title="Свойство length">
        <p class="lead"><code>length</code> хранит количество элементов массива. Это свойство, поэтому после него не ставят круглые скобки.</p>
        <CodeBlock :code="lengthCode" language="javascript" />
        <CodeBlock code="4" language="text" />
        <div class="array-length-formula">
          <span><b>Количество</b><code>array.length</code></span>
          <strong>→</strong>
          <span><b>Последний индекс</b><code>array.length - 1</code></span>
        </div>
        <CodeBlock :code="lastElement" language="javascript" />
        <p>Формула работает для массива любой длины. Не нужно вручную менять индекс после добавления или удаления элементов.</p>
        <h3>Пустой массив</h3>
        <CodeBlock :code="emptyLength" language="javascript" />
        <RevealAnswer
          :code="'const values = [5, 10, 15, 20, 25];\n\nconsole.log(values.length);\nconsole.log(values[values.length - 1]);'"
          :answer="'5\n25'"
          explanation="В массиве пять элементов, а индекс последнего равен 5 - 1, то есть 4."
        />
      </LessonSection>

      <LessonSection id="changing" number="06" title="Изменение элементов">
        <p class="lead">Элемент массива можно заменить, присвоив новое значение по существующему индексу.</p>
        <CodeBlock :code="changingElements" language="javascript" />
        <CodeBlock code="[100, 300, 400]" language="text" />
        <h3>Почему это работает с const?</h3>
        <CodeBlock :code="constArray" language="javascript" />
        <p><code>const</code> не позволяет связать имя <code>scores</code> с другим массивом. При этом содержимое уже созданного массива можно изменять.</p>
        <div class="const-array-rule">
          <article><span>✓</span><div><strong>Изменить содержимое</strong><code>scores[0] = 75</code></div></article>
          <article><span>×</span><div><strong>Присвоить другой массив</strong><code>scores = [10, 20]</code></div></article>
        </div>
        <h3>Не создавайте случайные пустые позиции</h3>
        <CodeBlock :code="addFarIndex" language="javascript" />
        <p>Индексы 3 и 4 останутся пустыми, а длина станет равна 6. Для последовательного добавления используйте <code>push()</code>.</p>
        <InfoBlock type="warning" title="Проверяйте индекс перед изменением"><p>Запись по неверному индексу может создать новый элемент вместо изменения существующего. Сначала убедитесь, что позиция входит в диапазон от <code>0</code> до <code>length - 1</code>.</p></InfoBlock>
      </LessonSection>

      <LessonSection id="methods" number="07" title="Добавление и удаление элементов">
        <p class="lead">Методы массива выполняют готовые действия с коллекцией. Метод вызывается через точку и круглые скобки.</p>
        <div class="array-method-grid">
          <article><code>push()</code><strong>добавить в конец</strong><span>возвращает длину</span></article>
          <article><code>pop()</code><strong>удалить с конца</strong><span>возвращает элемент</span></article>
          <article><code>unshift()</code><strong>добавить в начало</strong><span>возвращает длину</span></article>
          <article><code>shift()</code><strong>удалить из начала</strong><span>возвращает элемент</span></article>
        </div>
        <h3>Конец массива</h3>
        <CodeBlock :code="pushPop" language="javascript" />
        <h3>Начало массива</h3>
        <CodeBlock :code="shiftUnshift" language="javascript" />
        <h3>Метод тоже возвращает результат</h3>
        <CodeBlock :code="methodReturnValues" language="javascript" />
        <InfoBlock type="info" title="Пустой массив"><p><code>pop()</code> и <code>shift()</code> для пустого массива ничего не удаляют и возвращают <code>undefined</code>.</p></InfoBlock>
        <RevealAnswer
          :code="'const items = [&quot;A&quot;, &quot;B&quot;];\n\nitems.push(&quot;C&quot;);\nconst removed = items.shift();\n\nconsole.log(removed);\nconsole.log(items);'"
          :answer="'A\n[&quot;B&quot;, &quot;C&quot;]'"
          explanation="push добавляет C в конец, затем shift удаляет и возвращает первый элемент A."
        />
      </LessonSection>

      <LessonSection id="for-loop" number="08" title="Перебор массива через for">
        <p class="lead">Обычный <code>for</code> удобен, когда нужен индекс элемента или требуется изменить значение по позиции.</p>
        <CodeBlock :code="forArray" language="javascript" />
        <div class="array-loop-map">
          <span><b>index = 0</b><code>scores[0]</code></span>
          <span><b>index = 1</b><code>scores[1]</code></span>
          <span><b>...</b><code>...</code></span>
          <span><b>index = length - 1</b><code>последний</code></span>
        </div>
        <p>Счётчик начинается с нуля и работает, пока <code>index &lt; scores.length</code>.</p>
        <h3>Типичная лишняя итерация</h3>
        <CodeBlock :code="offByOne" language="javascript" />
        <p>Условие <code>&lt;=</code> разрешает индекс, равный длине массива. Такой позиции нет, поэтому последней строкой будет <code>undefined</code>.</p>
        <h3>Изменение всех элементов</h3>
        <CodeBlock :code="changeByIndex" language="javascript" />
        <CodeBlock code="[200, 400, 600]" language="text" />
        <RevealAnswer
          :code="'const values = [2, 4, 6];\n\nfor (let index = 0; index < values.length; index++) {\n  values[index] += 1;\n}\n\nconsole.log(values);'"
          answer="[3, 5, 7]"
          explanation="На каждой итерации изменяется элемент по текущему индексу, поэтому все три значения увеличиваются на единицу."
        />
      </LessonSection>

      <LessonSection id="for-of" number="09" title="Цикл for...of">
        <p class="lead"><code>for...of</code> последовательно даёт сами элементы массива. Он удобен, когда индекс не нужен.</p>
        <div class="condition-syntax"><b>for</b><span>(</span><strong>const element</strong><b>of</b><code>array</code><span>)</span><i>{ ... }</i></div>
        <CodeBlock :code="forOfCode" language="javascript" />
        <CodeBlock :code="'Грозный\nМосква\nКазань'" language="text" />
        <div class="comparison two-columns">
          <div><CodeBlock :code="'for (let i = 0; i < array.length; i++) {\n  console.log(i, array[i]);\n}'" language="javascript" /><strong>for</strong><small>Есть индекс и элемент</small></div>
          <div><CodeBlock :code="'for (const value of array) {\n  console.log(value);\n}'" language="javascript" /><strong>for...of</strong><small>Есть только элемент</small></div>
        </div>
        <CodeBlock :code="forComparison" language="javascript" />
        <InfoBlock type="important" title="Выбирайте по задаче"><p>Если нужно только прочитать значения — используйте <code>for...of</code>. Если нужен индекс, обратный порядок или изменение элементов — обычный <code>for</code> часто понятнее.</p></InfoBlock>
        <RevealAnswer
          :code="'const words = [&quot;JS&quot;, &quot;Node.js&quot;, &quot;Vue&quot;];\nlet text = &quot;&quot;;\n\nfor (const word of words) {\n  text += word + &quot; &quot;;\n}\n\nconsole.log(text);'"
          answer="JS Node.js Vue "
          explanation="На каждой итерации очередная строка и пробел добавляются в общий строковый накопитель."
        />
      </LessonSection>

      <LessonSection id="calculations" number="10" title="Вычисления по массиву">
        <p class="lead">Знакомые счётчики и накопители теперь получают значения не из числового диапазона, а из массива.</p>
        <h3>Сумма и среднее</h3>
        <CodeBlock :code="sumAverage" language="javascript" />
        <CodeBlock :code="'330\n82.5'" language="text" />
        <h3>Наибольшее значение</h3>
        <CodeBlock :code="maxValue" language="javascript" />
        <CodeBlock code="-2" language="text" />
        <InfoBlock type="warning" title="Максимум не всегда начинается с нуля"><p>Если все значения отрицательные, ноль не является элементом массива и даст неверный ответ. Для непустого массива безопасное начало — первый элемент.</p></InfoBlock>
        <h3>Количество подходящих элементов</h3>
        <CodeBlock :code="countValues" language="javascript" />
        <RevealAnswer
          :code="'const prices = [120, 80, 250, 40];\nlet total = 0;\nlet expensiveCount = 0;\n\nfor (const price of prices) {\n  total += price;\n  if (price >= 100) {\n    expensiveCount++;\n  }\n}\n\nconsole.log(total);\nconsole.log(expensiveCount);'"
          :answer="'490\n2'"
          explanation="В сумму входят все четыре цены, а условию price >= 100 соответствуют значения 120 и 250."
        />
      </LessonSection>

      <LessonSection id="search" number="11" title="Поиск элементов">
        <p class="lead">Поиск — это перебор, который сравнивает каждый элемент с целью и сохраняет результат при совпадении.</p>
        <h3>Найти индекс</h3>
        <CodeBlock :code="searchIndex" language="javascript" />
        <CodeBlock code="2" language="text" />
        <div class="search-state-grid">
          <article><code>-1</code><strong>начальное значение</strong><p>Такого индекса в массиве нет.</p></article>
          <article><code>index</code><strong>совпадение найдено</strong><p>Сохраняем текущую позицию.</p></article>
          <article><code>break</code><strong>поиск завершён</strong><p>Первое совпадение уже найдено.</p></article>
        </div>
        <h3>Ответ true или false</h3>
        <CodeBlock :code="searchBoolean" language="javascript" />
        <p>Флаг <code>found</code> отвечает только на вопрос о наличии значения. Индекс не нужен, поэтому используется <code>for...of</code>.</p>
        <RevealAnswer
          :code="'const values = [4, 9, 2, 9];\nlet foundIndex = -1;\n\nfor (let index = 0; index < values.length; index++) {\n  if (values[index] === 9) {\n    foundIndex = index;\n    break;\n  }\n}\n\nconsole.log(foundIndex);'"
          answer="1"
          explanation="Цикл останавливается на первом совпадении. Первая девятка находится по индексу 1."
        />
      </LessonSection>

      <LessonSection id="nested-arrays" number="12" title="Вложенные массивы">
        <p class="lead">Элементом массива может быть другой массив. Так можно представить таблицу, игровое поле или несколько групп значений.</p>
        <CodeBlock :code="nestedArray" language="javascript" />
        <CodeBlock :code="'[1, 2, 3]\n6'" language="text" />
        <div class="matrix-visual">
          <span><b>1</b><b>2</b><b>3</b></span>
          <span><b>4</b><b>5</b><b class="accent">6</b></span>
          <span><b>7</b><b>8</b><b>9</b></span>
        </div>
        <p>Сначала <code>matrix[1]</code> выбирает вторую строку, затем <code>[2]</code> — третий элемент этой строки.</p>
        <h3>Перебор двумя циклами</h3>
        <CodeBlock :code="nestedTraversal" language="javascript" />
        <h3>Сумма каждой строки</h3>
        <CodeBlock :code="rowSums" language="javascript" />
        <CodeBlock :code="'12\n9'" language="text" />
        <InfoBlock type="tip" title="Имена помогают читать вложенность"><p>Названия <code>row</code> и <code>value</code> сразу показывают уровень данных. Это понятнее абстрактных <code>i</code> и <code>j</code>.</p></InfoBlock>
      </LessonSection>

      <LessonSection id="mistakes" number="13" title="Частые ошибки" kicker="ПРОВЕРЯЕМ ГРАНИЦЫ">
        <div class="mistake-grid">
          <article><span>01</span><div><strong>Счёт с единицы</strong><code>array[1] — второй элемент</code><p>Первый индекс всегда равен нулю.</p></div></article>
          <article><span>02</span><div><strong>Индекс равен length</strong><code>array[array.length]</code><p>Это позиция после последнего элемента.</p></div></article>
          <article><span>03</span><div><strong>Лишняя итерация</strong><code>index &lt;= array.length</code><p>Последним результатом станет undefined.</p></div></article>
          <article><span>04</span><div><strong>Скобки после length</strong><code>array.length()</code><p>length — свойство, а не метод.</p></div></article>
          <article><span>05</span><div><strong>Переприсваивание const</strong><code>items = []</code><p>Содержимое менять можно, саму связь — нельзя.</p></div></article>
          <article><span>06</span><div><strong>Максимум равен нулю</strong><code>let max = 0</code><p>Решение ломается на массиве отрицательных чисел.</p></div></article>
        </div>
        <div class="debug-checklist">
          <h3>Проверка задачи с массивом</h3>
          <ol>
            <li>Может ли массив быть пустым?</li>
            <li>Нужен индекс или достаточно самого значения?</li>
            <li>Начинается ли перебор с индекса 0?</li>
            <li>Используется ли условие <code>index &lt; array.length</code>?</li>
            <li>Правильно ли выбрано начальное значение результата?</li>
          </ol>
        </div>
        <RevealAnswer
          :code="'const numbers = [-8, -3, -12];\nlet maximum = 0;\n\nfor (const number of numbers) {\n  if (number > maximum) {\n    maximum = number;\n  }\n}\n\nconsole.log(maximum);'"
          answer="0"
          explanation="Код выводит ошибочный результат: нуля нет в массиве. maximum нужно инициализировать значением numbers[0], тогда ответ будет -3."
          title="Где логическая ошибка?"
        />
      </LessonSection>
    </div>

    <section id="practice" class="practice-section scroll-section">
      <div class="lesson-body">
        <span class="practice-kicker">ПРАКТИЧЕСКАЯ РАБОТА</span>
        <h2>Обрабатываем коллекции</h2>
        <p class="practice-lead">Для каждого задания сначала определите: нужен ли индекс, может ли массив быть пустым и какое начальное значение требуется результату.</p>
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
        <p>Сначала сформулируйте ответ самостоятельно, затем раскройте карточку.</p>
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
        <div class="homework-header"><span><BookOpenCheck /></span><div><small>САМОСТОЯТЕЛЬНАЯ РАБОТА</small><h2>Домашнее задание</h2><p>Создайте файл <code>homework-5.js</code>. Для числовых задач проверьте обычные, отрицательные и граничные значения.</p></div></div>
        <div class="homework-parts">
          <article><span>01</span><div><h3>Статистика оценок</h3><p>Для массива оценок найдите сумму, среднее, минимальное и максимальное значение, а также количество оценок не ниже 60.</p></div></article>
          <article><span>02</span><div><h3>Очередь задач</h3><p>Создайте массив задач. Добавьте две задачи в конец, одну в начало, затем удалите первую выполненную задачу. Выведите удалённую задачу и оставшуюся очередь.</p></div></article>
          <article><span>03</span><div><h3>Поиск всех совпадений</h3><p>Для массива чисел и <code>target</code> создайте новый массив со всеми индексами совпадений. Если совпадений нет, новый массив должен остаться пустым.</p></div></article>
          <article><span>04</span><div><h3>Таблица температур</h3><p>Дан вложенный массив: каждая строка содержит температуры одной недели. Выведите среднюю температуру каждой недели и общий максимум.</p></div></article>
          <article><span>05</span><div><h3>Анализ кода</h3><p>До запуска запишите значение <code>result</code> после каждой итерации и итоговый ответ.</p><CodeBlock :code="homeworkPrediction" language="javascript" /></div></article>
        </div>
      </div>
    </section>

    <div class="lesson-body">
      <nav class="lesson-series-nav" aria-label="Навигация между занятиями">
        <RouterLink class="next-lesson previous-lesson" to="/4" aria-label="Вернуться к четвёртому занятию">
          <span><ArrowLeft /></span>
          <div><small>ПРЕДЫДУЩЕЕ ЗАНЯТИЕ</small><h2>Циклы и повторение</h2><p>for <i /> while <i /> break <i /> continue</p></div>
        </RouterLink>
        <div class="next-lesson lesson-disabled" aria-disabled="true">
          <div><small>СЛЕДУЮЩЕЕ ЗАНЯТИЕ</small><h2>Функции и декомпозиция</h2><p>function <i /> parameters <i /> return <i /> scope</p></div>
          <span><ArrowRight /></span>
        </div>
      </nav>
      <footer><span class="brand-mark small">JS</span><p>Основы программирования · 1 курс</p><a href="#top">Наверх ↑</a></footer>
    </div>
  </LessonLayout>
</template>
