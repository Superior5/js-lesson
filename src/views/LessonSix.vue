<script setup>
import {
  ArrowLeft,
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  CircleHelp,
  Code2,
  Star,
} from 'lucide-vue-next'
import LessonLayout from '../components/LessonLayout.vue'
import LessonHero from '../components/LessonHero.vue'
import LessonSection from '../components/LessonSection.vue'
import CodeBlock from '../components/CodeBlock.vue'
import InfoBlock from '../components/InfoBlock.vue'
import TaskBlock from '../components/TaskBlock.vue'
import RevealAnswer from '../components/RevealAnswer.vue'
import { lessonSix as lesson } from '../data/lessons'
import { advancedTasks, controlQuestions, practiceTasks } from '../data/lessonSix'

const recapArray = `const prices = [120, 80, 250, 40];
let total = 0;

for (const price of prices) {
  total += price;
}

console.log(total);`

const repeatedCode = `const firstTotal = 500 * 3;
console.log(firstTotal);

const secondTotal = 750 * 2;
console.log(secondTotal);

const thirdTotal = 120 * 10;
console.log(thirdTotal);`

const reusableFunction = `function calculateTotal(price, count) {
  return price * count;
}

console.log(calculateTotal(500, 3));
console.log(calculateTotal(750, 2));
console.log(calculateTotal(120, 10));`

const declarationCode = `function showWelcome() {
  console.log("Добро пожаловать!");
}`

const callCode = `function showWelcome() {
  console.log("Добро пожаловать!");
}

showWelcome();
showWelcome();`

const executionOrder = `console.log("До вызова");

function showMessage() {
  console.log("Функция выполняется");
}

showMessage();

console.log("После вызова");`

const oneParameter = `function greet(name) {
  console.log(\`Привет, \${name}!\`);
}

greet("Адам");
greet("Амина");`

const twoParameters = `function calculateTotal(price, count) {
  const total = price * count;
  console.log(total);
}

calculateTotal(500, 3);
calculateTotal(750, 2);`

const expressionArguments = `function printSum(a, b) {
  console.log(a + b);
}

const first = 10;
const second = 5;

printSum(first, second);
printSum(2 * 3, 4 + 1);`

const parameterOrder = `function introduce(name, age) {
  console.log(\`\${name}, возраст: \${age}\`);
}

introduce("Адам", 19);
introduce(19, "Адам");`

const returnCode = `function calculateTotal(price, count) {
  return price * count;
}

const total = calculateTotal(500, 3);
console.log(total);`

const reuseResult = `function square(number) {
  return number * number;
}

const first = square(4);
const second = square(5);
const sum = first + second;

console.log(sum);`

const noReturn = `function add(a, b) {
  const result = a + b;
}

const value = add(10, 5);
console.log(value);`

const codeAfterReturn = `function double(number) {
  return number * 2;
  console.log("Эта строка не выполнится");
}

console.log(double(6));`

const consoleOnly = `function addAndPrint(a, b) {
  console.log(a + b);
}

const result = addAndPrint(10, 5);
console.log(result);`

const returnAndPrint = `function add(a, b) {
  return a + b;
}

const result = add(10, 5);
console.log(result);
console.log(result * 2);`

const earlyReturn = `function calculateDiscount(price) {
  if (price <= 0) {
    return "Ошибка: цена должна быть больше нуля";
  }

  return price * 0.1;
}

console.log(calculateDiscount(-500));
console.log(calculateDiscount(2000));`

const gradeFunction = `function getGrade(score) {
  if (score < 0 || score > 100) {
    return "Ошибка";
  }

  if (score >= 90) return "Отлично";
  if (score >= 75) return "Хорошо";
  if (score >= 60) return "Удовлетворительно";

  return "Не зачтено";
}`

const defaultParameter = `function greet(name = "гость") {
  return \`Привет, \${name}!\`;
}

console.log(greet("Амина"));
console.log(greet());`

const multipleDefaults = `function calculatePrice(price, count = 1, discount = 0) {
  const total = price * count;
  return total - total * discount;
}

console.log(calculatePrice(500));
console.log(calculatePrice(500, 3));
console.log(calculatePrice(500, 3, 0.1));`

const undefinedDefault = `function showValue(value = "не указано") {
  console.log(value);
}

showValue();
showValue(undefined);
showValue(null);`

const localScope = `function calculateTotal(price, count) {
  const total = price * count;
  console.log(total);
}

calculateTotal(500, 3);
console.log(total); // ReferenceError`

const globalScope = `const taxRate = 0.2;

function addTax(price) {
  return price + price * taxRate;
}

console.log(addTax(1000));`

const explicitParameter = `function addTax(price, taxRate) {
  return price + price * taxRate;
}

console.log(addTax(1000, 0.2));
console.log(addTax(1000, 0.1));`

const parameterCopy = `const original = 10;

function changeNumber(number) {
  number = 100;
  console.log(number);
}

changeNumber(original);
console.log(original);`

const sumArrayFunction = `function sumArray(numbers) {
  let sum = 0;

  for (const number of numbers) {
    sum += number;
  }

  return sum;
}

const scores = [80, 75, 90, 85];
console.log(sumArray(scores));`

const createDoubledArray = `function doubleValues(numbers) {
  const result = [];

  for (const number of numbers) {
    result.push(number * 2);
  }

  return result;
}

const source = [2, 4, 6];
const doubled = doubleValues(source);

console.log(source);
console.log(doubled);`

const mutatingArray = `function addItem(items, item) {
  items.push(item);
}

const tasks = ["Изучить функции"];
addItem(tasks, "Выполнить практику");

console.log(tasks);`

const compositionCode = `function calculateSubtotal(price, count) {
  return price * count;
}

function calculateDiscount(subtotal, discountRate) {
  return subtotal * discountRate;
}

function calculateFinalPrice(price, count, discountRate) {
  const subtotal = calculateSubtotal(price, count);
  const discount = calculateDiscount(subtotal, discountRate);

  return subtotal - discount;
}

console.log(calculateFinalPrice(500, 3, 0.1));`

const functionExpression = `const multiply = function (a, b) {
  return a * b;
};

console.log(multiply(4, 5));`

const arrowFunction = `const multiply = (a, b) => {
  return a * b;
};

console.log(multiply(4, 5));`

const shortArrow = `const double = number => number * 2;

console.log(double(6));`

const homeworkPrediction = `function processNumbers(numbers) {
  let result = 0;

  for (const number of numbers) {
    if (number < 0) {
      continue;
    }

    result += number;
  }

  return result;
}

const values = [5, -2, 7, -1, 3];
console.log(processNumbers(values));`
</script>

<template>
  <LessonLayout :navigation="lesson.sections" :lesson-number="lesson.number" :title="lesson.title">
    <LessonHero :lesson="lesson" />

    <div class="lesson-body">
      <div class="intro-note">
        <Code2 :size="20" />
        <p><strong>Цель занятия</strong> — научиться превращать повторяемые действия в функции, явно передавать им данные и получать результат, из которого можно собрать более крупную программу.</p>
      </div>

      <LessonSection id="recap" number="01" title="Повторение пройденного" kicker="ДАННЫЕ И АЛГОРИТМ">
        <p class="lead">К этому занятию мы умеем хранить данные, выбирать ветки, повторять действия и обрабатывать массивы. Функция позволит дать готовому алгоритму имя и использовать его многократно.</p>
        <div class="concept-grid">
          <article><strong>Переменные</strong><p>Хранят исходные данные и промежуточный результат.</p></article>
          <article><strong>Условия</strong><p>Выбирают действие по логическому правилу.</p></article>
          <article><strong>Циклы</strong><p>Повторяют один блок кода.</p></article>
          <article><strong>Массивы</strong><p>Хранят коллекции значений для перебора.</p></article>
        </div>
        <CodeBlock :code="recapArray" language="javascript" />
        <CodeBlock code="490" language="text" />
        <div class="oral-questions">
          <h3><CircleHelp :size="19" /> Вопросы для устного повторения</h3>
          <ol>
            <li>Какие данные нужны алгоритму вычисления суммы?</li>
            <li>Что хранится в переменной <code>total</code> после каждой итерации?</li>
            <li>Как повторить тот же алгоритм для другого массива?</li>
            <li>Какая часть этого кода является отдельной законченной задачей?</li>
          </ol>
        </div>
      </LessonSection>

      <LessonSection id="why-functions" number="02" title="Зачем нужны функции?">
        <p class="lead">Функция — блок кода с именем, который решает отдельную задачу и выполняется при вызове.</p>
        <p>Без функции одно правило приходится записывать заново для каждой покупки:</p>
        <CodeBlock :code="repeatedCode" language="javascript" />
        <p>Функция описывает вычисление один раз, а входные значения передаются при каждом вызове:</p>
        <CodeBlock :code="reusableFunction" language="javascript" />
        <div class="function-benefits">
          <article><span>01</span><strong>Повторное использование</strong><p>Один алгоритм работает с разными данными.</p></article>
          <article><span>02</span><strong>Понятное имя</strong><p><code>calculateTotal()</code> объясняет намерение кода.</p></article>
          <article><span>03</span><strong>Одно место для исправления</strong><p>Правило меняется внутри функции, а не во всех вызовах.</p></article>
        </div>
        <InfoBlock type="tip" title="Одна функция — одна понятная задача"><p>Хорошая функция делает что-то конкретное: вычисляет стоимость, проверяет возраст, находит индекс или суммирует массив.</p></InfoBlock>
      </LessonSection>

      <LessonSection id="declaration" number="03" title="Объявление и вызов функции">
        <p class="lead">Объявление описывает функцию, но само по себе не запускает её тело. Для выполнения нужны круглые скобки вызова.</p>
        <div class="function-anatomy">
          <b>function</b><strong>showWelcome</strong><span>(</span><span>)</span><i>{</i><code>инструкции</code><i>}</i>
        </div>
        <CodeBlock :code="declarationCode" language="javascript" />
        <p>Пока в программе нет вызова, в консоли ничего не появится:</p>
        <CodeBlock :code="callCode" language="javascript" />
        <CodeBlock :code="'Добро пожаловать!\nДобро пожаловать!'" language="text" />
        <div class="function-call-flow">
          <span><b>1</b>встречается вызов</span><ArrowRight />
          <span><b>2</b>выполняется тело</span><ArrowRight />
          <span><b>3</b>возврат к следующей строке</span>
        </div>
        <CodeBlock :code="executionOrder" language="javascript" />
        <CodeBlock :code="'До вызова\nФункция выполняется\nПосле вызова'" language="text" />
        <InfoBlock type="important" title="Круглые скобки запускают функцию"><p><code>showWelcome</code> — сама функция как значение. <code>showWelcome()</code> — её вызов.</p></InfoBlock>
        <RevealAnswer
          :code="'function printLine() {\n  console.log(&quot;---&quot;);\n}\n\nprintLine();\nprintLine();\nprintLine();'"
          :answer="'---\n---\n---'"
          explanation="Тело функции выполняется отдельно при каждом из трёх вызовов."
        />
      </LessonSection>

      <LessonSection id="parameters" number="04" title="Параметры и аргументы" kicker="ПЕРЕДАЁМ ДАННЫЕ">
        <p class="lead">Параметр — имя внутри объявления функции. Аргумент — конкретное значение, переданное во время вызова.</p>
        <CodeBlock :code="oneParameter" language="javascript" />
        <div class="parameter-map">
          <span><small>ПАРАМЕТР</small><code>name</code><p>локальное имя в функции</p></span>
          <ArrowRight />
          <span><small>АРГУМЕНТ</small><code>"Адам"</code><p>значение при вызове</p></span>
        </div>
        <h3>Несколько параметров</h3>
        <CodeBlock :code="twoParameters" language="javascript" />
        <p>При вызове <code>calculateTotal(500, 3)</code> параметр <code>price</code> получает 500, а <code>count</code> — 3.</p>
        <h3>Аргументом может быть выражение</h3>
        <CodeBlock :code="expressionArguments" language="javascript" />
        <CodeBlock :code="'15\n11'" language="text" />
        <InfoBlock type="warning" title="Порядок аргументов важен"><p>Значения связываются с параметрами слева направо. Перестановка может изменить смысл вызова.</p></InfoBlock>
        <CodeBlock :code="parameterOrder" language="javascript" />
        <RevealAnswer
          :code="'function subtract(a, b) {\n  console.log(a - b);\n}\n\nsubtract(10, 3);\nsubtract(3, 10);'"
          :answer="'7\n-7'"
          explanation="Параметр a получает первый аргумент, b — второй. Вычитание зависит от их порядка."
        />
      </LessonSection>

      <LessonSection id="return" number="05" title="Возврат результата через return">
        <p class="lead"><code>return</code> завершает функцию и передаёт значение обратно в место вызова.</p>
        <CodeBlock :code="returnCode" language="javascript" />
        <div class="return-flow">
          <span><code>calculateTotal(500, 3)</code><small>вызов</small></span>
          <ArrowRight />
          <span><code>500 * 3</code><small>вычисление</small></span>
          <ArrowRight />
          <span class="accent"><code>1500</code><small>результат вызова</small></span>
        </div>
        <p>После завершения вызов можно мысленно заменить возвращённым значением. Поэтому результат разрешено сохранить, вывести или использовать в следующем выражении.</p>
        <CodeBlock :code="reuseResult" language="javascript" />
        <CodeBlock code="41" language="text" />
        <h3>Функция без return</h3>
        <CodeBlock :code="noReturn" language="javascript" />
        <CodeBlock code="undefined" language="text" />
        <h3>Код после return недостижим</h3>
        <CodeBlock :code="codeAfterReturn" language="javascript" />
        <RevealAnswer
          :code="'function getLast(values) {\n  return values[values.length - 1];\n}\n\nconst result = getLast([10, 20, 30]);\nconsole.log(result * 2);'"
          answer="60"
          explanation="Функция возвращает последний элемент 30, после чего внешний код умножает результат на 2."
        />
      </LessonSection>

      <LessonSection id="console-vs-return" number="06" title="return и console.log()">
        <p class="lead"><code>console.log()</code> показывает значение человеку, а <code>return</code> передаёт его программе для дальнейшей работы.</p>
        <CodeBlock :code="consoleOnly" language="javascript" />
        <CodeBlock :code="'15\nundefined'" language="text" />
        <p>Первая строка появляется из тела функции. Но функция ничего не возвращает, поэтому <code>result</code> получает <code>undefined</code>.</p>
        <CodeBlock :code="returnAndPrint" language="javascript" />
        <CodeBlock :code="'15\n30'" language="text" />
        <div class="comparison two-columns">
          <div><strong>console.log()</strong><small>Показывает значение в терминале</small></div>
          <div><strong>return</strong><small>Делает значение результатом функции</small></div>
        </div>
        <InfoBlock type="tip" title="Вычисляющая функция обычно возвращает"><p>Пусть функция вычисляет и возвращает значение, а внешний код решает, вывести его, сохранить или передать дальше.</p></InfoBlock>
        <RevealAnswer
          :code="'function triple(number) {\n  console.log(number * 3);\n}\n\nconst value = triple(4);\nconsole.log(value === 12);'"
          :answer="'12\nfalse'"
          explanation="Функция выводит 12, но не возвращает его. В value находится undefined, поэтому сравнение с 12 ложно."
        />
      </LessonSection>

      <LessonSection id="early-return" number="07" title="Ранний return">
        <p class="lead">Ранний <code>return</code> завершает функцию при ошибке или особом случае до выполнения основной логики.</p>
        <CodeBlock :code="earlyReturn" language="javascript" />
        <CodeBlock :code="'Ошибка: цена должна быть больше нуля\n200'" language="text" />
        <div class="guard-flow">
          <article><span>1</span><strong>Проверить входные данные</strong><p>Цена корректна?</p></article>
          <article><span>2</span><strong>Вернуть ошибку раньше</strong><p>Основной код не запускается.</p></article>
          <article><span>3</span><strong>Выполнить задачу</strong><p>Только для корректных данных.</p></article>
        </div>
        <h3>Несколько возможных результатов</h3>
        <CodeBlock :code="gradeFunction" language="javascript" />
        <p>Каждый <code>return</code> завершает текущий вызов, поэтому после успешной проверки не нужны дополнительные <code>else</code>.</p>
        <InfoBlock type="important" title="Возвращайте один понятный тип"><p>Для учебной простоты старайтесь, чтобы обычные успешные ветки возвращали значения одного типа. Отдельное сообщение об ошибке должно быть явно предусмотрено задачей.</p></InfoBlock>
        <RevealAnswer
          :code="'function isPositive(number) {\n  if (number <= 0) {\n    return false;\n  }\n\n  return true;\n}\n\nconsole.log(isPositive(-2));\nconsole.log(isPositive(5));'"
          :answer="'false\ntrue'"
          explanation="Для -2 функция завершается в первой ветке. Для 5 проверка ложна, поэтому выполняется последний return."
        />
      </LessonSection>

      <LessonSection id="defaults" number="08" title="Значения параметров по умолчанию">
        <p class="lead">Параметр может получить запасное значение, если соответствующий аргумент не передан.</p>
        <CodeBlock :code="defaultParameter" language="javascript" />
        <CodeBlock :code="'Привет, Амина!\nПривет, гость!'" language="text" />
        <h3>Несколько необязательных параметров</h3>
        <CodeBlock :code="multipleDefaults" language="javascript" />
        <CodeBlock :code="'500\n1500\n1350'" language="text" />
        <p>Обязательные параметры принято ставить первыми, необязательные со значениями по умолчанию — после них.</p>
        <h3>undefined включает значение по умолчанию, null — нет</h3>
        <CodeBlock :code="undefinedDefault" language="javascript" />
        <CodeBlock :code="'не указано\nне указано\nnull'" language="text" />
        <RevealAnswer
          :code="'function power(base, exponent = 2) {\n  return base ** exponent;\n}\n\nconsole.log(power(3));\nconsole.log(power(3, 3));'"
          :answer="'9\n27'"
          explanation="В первом вызове используется exponent = 2, во втором переданный аргумент 3 заменяет значение по умолчанию."
        />
      </LessonSection>

      <LessonSection id="scope" number="09" title="Область видимости функции">
        <p class="lead">Параметры и переменные, объявленные внутри функции, являются локальными. Снаружи они недоступны.</p>
        <CodeBlock :code="localScope" language="javascript" />
        <div class="scope-boxes">
          <article><span>ВНЕ ФУНКЦИИ</span><code>calculateTotal</code><p>Имя функции доступно для вызова.</p></article>
          <article class="inner"><span>ВНУТРИ ФУНКЦИИ</span><code>price · count · total</code><p>Параметры и локальные переменные.</p></article>
        </div>
        <h3>Чтение глобального значения</h3>
        <CodeBlock :code="globalScope" language="javascript" />
        <p>Функция видит внешнюю переменную, но скрытая зависимость усложняет повторное использование.</p>
        <h3>Явная зависимость через параметр</h3>
        <CodeBlock :code="explicitParameter" language="javascript" />
        <p>Теперь ставка видна прямо в вызове, а функция работает с разными значениями.</p>
        <h3>Изменение параметра с примитивом</h3>
        <CodeBlock :code="parameterCopy" language="javascript" />
        <CodeBlock :code="'100\n10'" language="text" />
        <InfoBlock type="tip" title="Минимум глобальных зависимостей"><p>Передавайте необходимые данные параметрами и возвращайте результат. Так функцию легче проверить отдельно.</p></InfoBlock>
      </LessonSection>

      <LessonSection id="arrays" number="10" title="Функции и массивы">
        <p class="lead">Массив можно передать параметром, перебрать внутри функции и вернуть одно значение или новый массив.</p>
        <CodeBlock :code="sumArrayFunction" language="javascript" />
        <CodeBlock code="330" language="text" />
        <h3>Создание нового массива</h3>
        <CodeBlock :code="createDoubledArray" language="javascript" />
        <CodeBlock :code="'[2, 4, 6]\n[4, 8, 12]'" language="text" />
        <p>Функция создаёт отдельный массив <code>result</code>, поэтому исходный <code>source</code> остаётся прежним.</p>
        <h3>Функция может изменить переданный массив</h3>
        <CodeBlock :code="mutatingArray" language="javascript" />
        <p>Метод <code>push()</code> меняет тот же массив, который находится снаружи. Такое поведение допустимо, если оно явно отражено в названии и описании функции, но неожиданная мутация затрудняет проверку кода.</p>
        <InfoBlock type="important" title="Предпочитайте предсказуемый результат"><p>Для вычислений удобно возвращать новое значение или новый массив. Если функция должна изменить коллекцию, это должно быть очевидно из задачи.</p></InfoBlock>
        <RevealAnswer
          :code="'function countPositive(numbers) {\n  let count = 0;\n\n  for (const number of numbers) {\n    if (number > 0) count++;\n  }\n\n  return count;\n}\n\nconsole.log(countPositive([-2, 0, 5, 8]));'"
          answer="2"
          explanation="Положительными являются только 5 и 8, поэтому локальный счётчик возвращает 2."
        />
      </LessonSection>

      <LessonSection id="composition" number="11" title="Декомпозиция программы">
        <p class="lead">Декомпозиция — разделение большой задачи на небольшие функции, каждая из которых отвечает за один шаг.</p>
        <CodeBlock :code="compositionCode" language="javascript" />
        <CodeBlock code="1350" language="text" />
        <div class="function-pipeline">
          <span><code>calculateSubtotal()</code><small>сумма до скидки</small></span>
          <ArrowRight />
          <span><code>calculateDiscount()</code><small>размер скидки</small></span>
          <ArrowRight />
          <span><code>calculateFinalPrice()</code><small>итоговый результат</small></span>
        </div>
        <p>Главная функция читается как последовательность шагов. Каждый расчёт можно отдельно проверить с простыми аргументами.</p>
        <div class="concept-grid">
          <article><strong>Небольшой размер</strong><p>Функцию можно понять без просмотра всей программы.</p></article>
          <article><strong>Ясное имя</strong><p>Имя описывает действие или возвращаемый ответ.</p></article>
          <article><strong>Явные входы</strong><p>Необходимые данные приходят через параметры.</p></article>
          <article><strong>Предсказуемый выход</strong><p>Результат возвращается через <code>return</code>.</p></article>
        </div>
        <InfoBlock type="tip" title="Не дробите механически"><p>Выделяйте функцию, если действие имеет собственный смысл, повторяется или делает основной алгоритм заметно понятнее.</p></InfoBlock>
      </LessonSection>

      <LessonSection id="function-forms" number="12" title="Формы записи функций">
        <p class="lead">Помимо объявления через <code>function name()</code>, функцию можно создать как значение и сохранить в <code>const</code>.</p>
        <h3>Функциональное выражение</h3>
        <CodeBlock :code="functionExpression" language="javascript" />
        <h3>Стрелочная функция</h3>
        <CodeBlock :code="arrowFunction" language="javascript" />
        <p>Для небольшого выражения фигурные скобки и слово <code>return</code> можно опустить:</p>
        <CodeBlock :code="shortArrow" language="javascript" />
        <div class="function-form-grid">
          <article><code>function name() {}</code><strong>Объявление</strong><p>Основная форма для первых функций и именованных действий.</p></article>
          <article><code>const name = function () {}</code><strong>Выражение</strong><p>Функция хранится в переменной как значение.</p></article>
          <article><code>const name = () => {}</code><strong>Стрелочная</strong><p>Короткая современная запись, часто встречается в методах массивов.</p></article>
        </div>
        <InfoBlock type="important" title="Сначала ясность, потом краткость"><p>На этом занятии используйте обычное объявление для основных заданий. Стрелочную форму достаточно уметь прочитать и записать для простого выражения.</p></InfoBlock>
        <RevealAnswer
          :code="'const isEven = number => number % 2 === 0;\n\nconsole.log(isEven(8));\nconsole.log(isEven(5));'"
          :answer="'true\nfalse'"
          explanation="Короткая стрелочная функция неявно возвращает результат единственного выражения."
        />
      </LessonSection>

      <LessonSection id="mistakes" number="13" title="Частые ошибки" kicker="ФУНКЦИЯ ДОЛЖНА БЫТЬ ПРЕДСКАЗУЕМОЙ">
        <div class="mistake-grid">
          <article><span>01</span><div><strong>Забыты скобки вызова</strong><code>calculateTotal</code><p>Функция не запускается без <code>()</code>.</p></div></article>
          <article><span>02</span><div><strong>Нет return</strong><code>const result = calculate()</code><p>Результатом станет undefined.</p></div></article>
          <article><span>03</span><div><strong>Код после return</strong><code>return value; console.log()</code><p>Вторая инструкция недостижима.</p></div></article>
          <article><span>04</span><div><strong>Перепутан порядок</strong><code>divide(divisor, number)</code><p>Аргументы связываются слева направо.</p></div></article>
          <article><span>05</span><div><strong>Скрытая глобальная зависимость</strong><code>return price * rate</code><p>Лучше передать rate параметром.</p></div></article>
          <article><span>06</span><div><strong>Слишком много задач</strong><code>processEverything()</code><p>Большую функцию трудно читать и проверять.</p></div></article>
        </div>
        <div class="debug-checklist">
          <h3>Проверка функции</h3>
          <ol>
            <li>Понятно ли действие по имени?</li>
            <li>Все ли необходимые данные переданы параметрами?</li>
            <li>Что функция возвращает для обычного случая?</li>
            <li>Что произойдёт с неверными или пустыми данными?</li>
            <li>Не изменяет ли функция внешний массив неожиданно?</li>
          </ol>
        </div>
        <RevealAnswer
          :code="'function calculate(a, b) {\n  console.log(a + b);\n}\n\nconst result = calculate(2, 3);\nconsole.log(result * 2);'"
          :answer="'5\nNaN'"
          explanation="Функция выводит 5, но возвращает undefined. Умножение undefined на 2 даёт NaN. Нужно вернуть a + b через return."
          title="Почему результат равен NaN?"
        />
      </LessonSection>
    </div>

    <section id="practice" class="practice-section scroll-section">
      <div class="lesson-body">
        <span class="practice-kicker">ПРАКТИЧЕСКАЯ РАБОТА</span>
        <h2>Выделяем алгоритмы в функции</h2>
        <p class="practice-lead">Перед кодом запишите для каждой функции три пункта: что она получает, что делает и что возвращает. Затем проверьте минимум два разных вызова.</p>
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
        <p>Ответьте своими словами, затем раскройте карточку и проверьте формулировку.</p>
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
        <div class="homework-header"><span><BookOpenCheck /></span><div><small>САМОСТОЯТЕЛЬНАЯ РАБОТА</small><h2>Домашнее задание</h2><p>Создайте файл <code>homework-6.js</code>. Каждая часть должна быть оформлена отдельной функцией и проверена несколькими вызовами.</p></div></div>
        <div class="homework-parts">
          <article><span>01</span><div><h3>Стоимость заказа</h3><p>Создайте функции для подытога, скидки и итоговой стоимости. Отрицательные цена, количество или скидка должны обрабатываться до вычислений.</p></div></article>
          <article><span>02</span><div><h3>Статистика оценок</h3><p>Создайте отдельные функции <code>sumArray()</code>, <code>getAverage()</code>, <code>getMinimum()</code> и <code>getMaximum()</code>. Каждая должна возвращать результат.</p></div></article>
          <article><span>03</span><div><h3>Фильтрация вручную</h3><p>Функция <code>getPositive(numbers)</code> должна вернуть новый массив только с положительными числами, не изменяя исходный.</p></div></article>
          <article><span>04</span><div><h3>Поиск студента</h3><p>Создайте функцию поиска индекса и функцию, которая на её основе возвращает понятную строку: студент найден или отсутствует.</p></div></article>
          <article><span>05</span><div><h3>Анализ кода</h3><p>До запуска проследите все итерации, определите возвращаемое значение и объясните, почему отрицательные числа не участвуют в сумме.</p><CodeBlock :code="homeworkPrediction" language="javascript" /></div></article>
        </div>
      </div>
    </section>

    <div class="lesson-body">
      <nav class="lesson-series-nav" aria-label="Навигация между занятиями">
        <RouterLink class="next-lesson previous-lesson" to="/5" aria-label="Вернуться к пятому занятию">
          <span><ArrowLeft /></span>
          <div><small>ПРЕДЫДУЩЕЕ ЗАНЯТИЕ</small><h2>Массивы и коллекции</h2><p>array <i /> length <i /> push <i /> for...of</p></div>
        </RouterLink>
        <div class="next-lesson lesson-disabled" aria-disabled="true">
          <div><small>СЛЕДУЮЩЕЕ ЗАНЯТИЕ</small><h2>Объекты и связанные данные</h2><p>object <i /> properties <i /> methods <i /> this</p></div>
          <span><ArrowRight /></span>
        </div>
      </nav>
      <footer><span class="brand-mark small">JS</span><p>Основы программирования · 1 курс</p><a href="#top">Наверх ↑</a></footer>
    </div>
  </LessonLayout>
</template>
