<script setup>
import { ArrowLeft, BookOpenCheck, CheckCircle2, CircleHelp, Star } from 'lucide-vue-next'
import LessonLayout from '../components/LessonLayout.vue'
import LessonHero from '../components/LessonHero.vue'
import LessonSection from '../components/LessonSection.vue'
import CodeBlock from '../components/CodeBlock.vue'
import InfoBlock from '../components/InfoBlock.vue'
import TaskBlock from '../components/TaskBlock.vue'
import RevealAnswer from '../components/RevealAnswer.vue'
import { lessonTwo as lesson } from '../data/lessons'
import { advancedTasks, controlQuestions, practiceTasks } from '../data/lessonTwo'

const repeatCode = 'console.log("Hello, world!");\nconsole.log(10 + 20);'
const repeatedPrice = 'console.log(750 * 2);\nconsole.log(750 * 3);\nconsole.log(750 * 5);'
const variablePrice = 'const price = 750;\n\nconsole.log(price * 2);\nconsole.log(price * 3);\nconsole.log(price * 5);'
const letExample = 'let age = 18;\n\nconsole.log(age);\n\nage = 19;\n\nconsole.log(age);'
const constExample = 'const birthYear = 2008;\n\nconsole.log(birthYear);'
const constError = 'const age = 18;\n\nage = 19; // TypeError: Assignment to constant variable.'
const numberExample = 'const age = 18;\nconst price = 750;\nconst temperature = -5;\nconst pi = 3.14;'
const stringExample = 'const name = "Adam";\nconst city = \'Grozny\';\n\nconsole.log(name);\nconsole.log(city);'
const booleanExample = 'const isStudent = true;\nconst isAdmin = false;\n\nconsole.log(isStudent);\nconsole.log(isAdmin);'
const missingValues = 'let result;\nconst selectedStudent = null;\n\nconsole.log(result);          // undefined\nconsole.log(selectedStudent); // null'
const typeofExample = 'console.log(typeof 123);\nconsole.log(typeof "Hello");\nconsole.log(typeof true);\nconsole.log(typeof undefined);'
const arithmeticExample = 'const a = 10;\nconst b = 3;\n\nconsole.log(a + b);  // 13\nconsole.log(a - b);  // 7\nconsole.log(a * b);  // 30\nconsole.log(a / b);  // 3.333...\nconsole.log(a % b);  // 1\nconsole.log(a ** b); // 1000'
const assignmentExample = 'let balance = 1000;\n\nbalance += 500; // 1500\nbalance -= 200; // 1300\nbalance *= 2;   // 2600\nbalance /= 4;   // 650\n\nconsole.log(balance);'
const incrementExample = 'let count = 0;\n\ncount++; // то же, что count = count + 1\ncount--; // то же, что count = count - 1\n\nconsole.log(count); // 0'
const concatenationExample = 'const firstName = "Adam";\nconst lastName = "Dasaev";\n\nconsole.log(firstName + " " + lastName);'
const templateExample = 'const name = "Adam";\nconst age = 18;\n\nconsole.log(`Меня зовут ${name}, мне ${age} лет`);'
const conversionExample = 'const value = "100";\nconst number = Number(value);\n\nconsole.log(number + 50); // 150'
const conversionResults = 'console.log(Number("25"));    // 25\nconsole.log(Number("hello")); // NaN\nconsole.log(String(123));     // "123"\nconsole.log(Boolean(0));      // false\nconsole.log(Boolean(1));      // true'
const comparisonExample = 'const age = 18;\n\nconsole.log(age >= 18); // true\nconsole.log(age < 18);  // false\nconsole.log(age === 18); // true'
const looseComparison = 'console.log(5 == "5");  // true\nconsole.log(5 === "5"); // false'
const andExample = 'const age = 20;\nconst hasTicket = true;\n\nconsole.log(age >= 18 && hasTicket); // true'
const orExample = 'const isAdmin = false;\nconst isTeacher = true;\n\nconsole.log(isAdmin || isTeacher); // true'
const notExample = 'const isBlocked = false;\n\nconsole.log(!isBlocked); // true'
const homeworkAnalysis = 'console.log(10 + "5");\nconsole.log(10 - "5");\nconsole.log(typeof "123");\nconsole.log(5 === "5");\nconsole.log(true && false);\nconsole.log(!false);'
</script>

<template>
  <LessonLayout :navigation="lesson.sections" :lesson-number="lesson.number" :title="lesson.title">
    <LessonHero :lesson="lesson" />

    <div class="lesson-body">
      <div class="intro-note">
        <BookOpenCheck :size="20" />
        <p><strong>Цель занятия</strong> — научиться хранить данные в переменных, понимать базовые типы JavaScript, выполнять арифметические и логические операции и применять их в небольших программах для Node.js.</p>
      </div>

      <LessonSection id="recap" number="01" title="Повторение предыдущего занятия" kicker="ВСПОМИНАЕМ ОСНОВУ">
        <p class="lead">Прежде чем хранить и обрабатывать данные, вспомним, как JavaScript-программа попадает от файла к результату в терминале.</p>
        <div class="concept-grid">
          <article><strong>Программа</strong><p>Набор инструкций, которые компьютер выполняет для решения задачи.</p></article>
          <article><strong>Алгоритм</strong><p>Конечная и понятная последовательность шагов, ведущая к результату.</p></article>
          <article><strong>JavaScript</strong><p>Язык, на котором мы записываем инструкции для компьютера.</p></article>
          <article><strong>Node.js</strong><p>Среда, которая выполняет JavaScript-файлы вне браузера.</p></article>
        </div>
        <p><code>console.log()</code> выводит значение в консоль. Создайте файл <code>index.js</code> и поместите в него код:</p>
        <CodeBlock :code="repeatCode" language="javascript" />
        <p>Откройте терминал в папке с файлом и запустите программу:</p>
        <CodeBlock code="node index.js" language="bash" />
        <CodeBlock code="Hello, world!\n30" language="text" />
        <div class="oral-questions">
          <h3><CircleHelp :size="19" /> Вопросы для устного повторения</h3>
          <ol>
            <li>Чем программа отличается от алгоритма?</li>
            <li>Почему Node.js не является отдельным языком программирования?</li>
            <li>Что произойдёт после команды <code>node index.js</code>?</li>
            <li>Для чего используется <code>console.log()</code>?</li>
          </ol>
        </div>
      </LessonSection>

      <LessonSection id="variables" number="02" title="Что такое переменная?">
        <p class="lead">Переменная — это именованное место для хранения значения, которое программа может использовать в процессе работы.</p>
        <p>Представьте подписанную коробку. На этикетке написано <code>price</code>, а внутри лежит число <code>750</code>. В коде мы обращаемся к понятному имени, а JavaScript берёт связанное с ним значение.</p>
        <h3>Проблема повторяющихся значений</h3>
        <p>Без переменной цена повторяется в каждой строке. Если она изменится, придётся искать и исправлять каждое число:</p>
        <CodeBlock :code="repeatedPrice" language="javascript" />
        <p>Сохраним цену один раз и будем обращаться к ней по имени:</p>
        <CodeBlock :code="variablePrice" language="javascript" />
        <CodeBlock code="1500\n2250\n3750" language="text" />
        <div class="benefit-grid">
          <span><CheckCircle2 :size="17" /> повторное использование данных</span>
          <span><CheckCircle2 :size="17" /> понятный и читаемый код</span>
          <span><CheckCircle2 :size="17" /> изменение значения в одном месте</span>
          <span><CheckCircle2 :size="17" /> меньше случайных ошибок</span>
        </div>
        <RevealAnswer
          code="const price = 500;\nconst count = 3;\n\nconsole.log(price * count);"
          answer="1500"
          explanation="В price хранится 500, в count — 3. Выражение price * count означает 500 * 3."
        />
      </LessonSection>

      <LessonSection id="declarations" number="03" title="let и const" kicker="ОБЪЯВЛЕНИЕ ПЕРЕМЕННЫХ">
        <p>Чтобы создать переменную, используют ключевое слово <code>let</code> или <code>const</code>, затем имя, знак присваивания <code>=</code> и значение.</p>
        <div class="syntax-line"><span>const</span><strong>price</strong><b>=</b><code>750</code><i>;</i></div>
        <div class="syntax-legend"><span><b>const</b> способ объявления</span><span><b>price</b> имя</span><span><b>=</b> присваивание</span><span><b>750</b> значение</span></div>

        <h3><code>let</code> — значение можно изменить</h3>
        <CodeBlock :code="letExample" language="javascript" />
        <CodeBlock code="18\n19" language="text" />
        <p>Строка <code>let age = 18</code> объявляет переменную и сразу присваивает ей значение. Строка <code>age = 19</code> не создаёт новую переменную, а меняет значение существующей.</p>

        <h3><code>const</code> — повторное присваивание запрещено</h3>
        <CodeBlock :code="constExample" language="javascript" />
        <p>Если попытаться присвоить новое значение, Node.js остановит программу с ошибкой:</p>
        <CodeBlock :code="constError" language="javascript" />
        <InfoBlock type="tip" title="Правило по умолчанию"><p>Используйте <code>const</code>, если не планируете менять значение. Выбирайте <code>let</code>, когда изменение — часть задачи.</p></InfoBlock>

        <div class="lesson-table-wrap">
          <table class="lesson-table">
            <thead><tr><th>Свойство</th><th><code>let</code></th><th><code>const</code></th></tr></thead>
            <tbody>
              <tr><td>Объявляет переменную</td><td>Да</td><td>Да</td></tr>
              <tr><td>Можно присвоить новое значение</td><td>Да</td><td>Нет</td></tr>
              <tr><td>Нужно сразу указать значение</td><td>Нет</td><td>Да</td></tr>
              <tr><td>Когда применять</td><td>Значение меняется</td><td>Значение не переназначается</td></tr>
            </tbody>
          </table>
        </div>

        <h3>Как называть переменные</h3>
        <ul class="rule-list">
          <li>Имя может содержать буквы, цифры, символы <code>_</code> и <code>$</code>, но не должно начинаться с цифры.</li>
          <li>Регистр важен: <code>age</code> и <code>Age</code> — разные имена.</li>
          <li>Для нескольких слов используйте <strong>camelCase</strong>: первое слово со строчной буквы, следующие — с заглавной.</li>
          <li>Имя должно объяснять назначение значения.</li>
        </ul>
        <div class="naming-grid">
          <div><strong>Хорошие имена</strong><code>studentAge</code><code>productPrice</code><code>isLoggedIn</code></div>
          <div class="bad"><strong>Плохие имена</strong><code>2name</code><code>student age</code><code>x</code></div>
        </div>
        <InfoBlock type="info" title="А что такое var?"><p><code>var</code> — старый способ объявления переменных. Он встречается в существующем коде, но ведёт себя иначе в важных деталях. В современном учебном коде используем <code>let</code> и <code>const</code>.</p></InfoBlock>
      </LessonSection>

      <LessonSection id="types" number="04" title="Типы данных">
        <p class="lead">Тип данных сообщает JavaScript, что представляет собой значение: число, текст, логическое состояние или отсутствие данных.</p>

        <div class="type-heading"><span>01</span><div><h3>number — числа</h3><p>Для обычных целых и дробных чисел JavaScript использует один тип <code>number</code>.</p></div></div>
        <CodeBlock :code="numberExample" language="javascript" />
        <p>Числа записывают без кавычек. С ними можно выполнять арифметические операции.</p>

        <div class="type-heading"><span>02</span><div><h3>string — строки</h3><p>Строка хранит текст и записывается в одинарных, двойных или обратных кавычках.</p></div></div>
        <CodeBlock :code="stringExample" language="javascript" />
        <InfoBlock type="important" title="Кавычки меняют тип"><p><code>25</code> — число, а <code>"25"</code> — строка. Они выглядят похоже, но JavaScript работает с ними по-разному.</p></InfoBlock>

        <div class="type-heading"><span>03</span><div><h3>boolean — логическое значение</h3><p>У этого типа только два значения: <code>true</code> («да, истина») и <code>false</code> («нет, ложь»).</p></div></div>
        <CodeBlock :code="booleanExample" language="javascript" />
        <p>Boolean-значения удобно хранят ответы на вопросы: студент ли пользователь, есть ли билет, завершена ли задача, заблокирована ли учётная запись.</p>

        <div class="type-heading"><span>04</span><div><h3>undefined и null — отсутствие значения</h3></div></div>
        <CodeBlock :code="missingValues" language="javascript" />
        <p><code>undefined</code> обычно появляется, когда переменная объявлена, но значение ей ещё не присвоено. <code>null</code> программист задаёт явно: «сейчас здесь намеренно нет значения».</p>

        <div class="other-types">
          <h3>Типы, которые изучим позже</h3>
          <p><code>bigint</code> хранит очень большие целые числа; <code>symbol</code> создаёт уникальные идентификаторы; <code>object</code> объединяет связанные данные. Сейчас достаточно знать, что они существуют.</p>
        </div>
      </LessonSection>

      <LessonSection id="typeof" number="05" title="Оператор typeof">
        <p class="lead"><code>typeof</code> позволяет узнать тип значения. Результатом будет строка с названием типа.</p>
        <CodeBlock :code="typeofExample" language="javascript" />
        <CodeBlock code="number\nstring\nboolean\nundefined" language="text" />
        <div class="lesson-table-wrap">
          <table class="lesson-table">
            <thead><tr><th>Выражение</th><th>Результат</th></tr></thead>
            <tbody>
              <tr><td><code>typeof 42</code></td><td><code>"number"</code></td></tr>
              <tr><td><code>typeof "JavaScript"</code></td><td><code>"string"</code></td></tr>
              <tr><td><code>typeof false</code></td><td><code>"boolean"</code></td></tr>
              <tr><td><code>typeof undefined</code></td><td><code>"undefined"</code></td></tr>
              <tr><td><code>typeof 10n</code></td><td><code>"bigint"</code></td></tr>
            </tbody>
          </table>
        </div>
        <h3>Историческая особенность <code>null</code></h3>
        <CodeBlock code="console.log(typeof null); // &quot;object&quot;" language="javascript" />
        <p>Результат <code>"object"</code> — давняя особенность JavaScript, сохранённая ради совместимости со старыми программами. Она <strong>не означает</strong>, что <code>null</code> — полноценный объект.</p>
        <RevealAnswer
          code="const score = 100;\nconst message = &quot;100&quot;;\n\nconsole.log(typeof score);\nconsole.log(typeof message);"
          answer="number\nstring"
          explanation="Кавычки превращают 100 в текст. Поэтому одинаково выглядящие значения имеют разные типы."
        />
      </LessonSection>

      <LessonSection id="arithmetic" number="06" title="Арифметические операторы">
        <p class="lead">Оператор — это символ, который указывает JavaScript выполнить действие над значениями.</p>
        <div class="operator-cards">
          <span><b>+</b>Сложение</span><span><b>−</b>Вычитание</span><span><b>*</b>Умножение</span>
          <span><b>/</b>Деление</span><span><b>%</b>Остаток</span><span><b>**</b>Степень</span>
        </div>
        <CodeBlock :code="arithmeticExample" language="javascript" />
        <h3>Приоритет операций</h3>
        <p>JavaScript соблюдает привычный порядок: сначала скобки, затем степень, умножение, деление и остаток, потом сложение и вычитание. Скобки явно показывают нужный порядок и делают выражение понятнее.</p>
        <div class="comparison two-columns">
          <div><CodeBlock code="console.log(2 + 3 * 4);" language="javascript" /><strong>14</strong><small>Сначала 3 * 4</small></div>
          <div><CodeBlock code="console.log((2 + 3) * 4);" language="javascript" /><strong>20</strong><small>Сначала выражение в скобках</small></div>
        </div>
        <RevealAnswer
          code="const a = 17;\nconst b = 5;\n\nconsole.log(a % b);\nconsole.log(2 ** 3);"
          answer="2\n8"
          explanation="После деления 17 на 5 остаётся 2. Выражение 2 ** 3 означает 2 · 2 · 2."
        />
      </LessonSection>

      <LessonSection id="assignment" number="07" title="Операторы присваивания">
        <p>Знак <code>=</code> присваивает значение переменной. Сокращённые операторы одновременно выполняют вычисление и сохраняют результат.</p>
        <CodeBlock :code="assignmentExample" language="javascript" />
        <div class="equivalence">
          <code>balance = balance + 500;</code><strong>то же самое</strong><code>balance += 500;</code>
        </div>
        <div class="lesson-table-wrap">
          <table class="lesson-table">
            <thead><tr><th>Короткая запись</th><th>Полная запись</th></tr></thead>
            <tbody>
              <tr><td><code>x += 5</code></td><td><code>x = x + 5</code></td></tr>
              <tr><td><code>x -= 5</code></td><td><code>x = x - 5</code></td></tr>
              <tr><td><code>x *= 5</code></td><td><code>x = x * 5</code></td></tr>
              <tr><td><code>x /= 5</code></td><td><code>x = x / 5</code></td></tr>
            </tbody>
          </table>
        </div>
        <h3>Увеличение и уменьшение на единицу</h3>
        <CodeBlock :code="incrementExample" language="javascript" />
        <p>На этом занятии достаточно знать, что <code>count++</code> увеличивает, а <code>count--</code> уменьшает значение на единицу. Разницу между префиксной и постфиксной формой рассмотрим позже.</p>
        <RevealAnswer
          code="let x = 10;\n\nx += 5;\nx *= 2;\n\nconsole.log(x);"
          answer="30"
          explanation="Сначала x становится равен 15, затем текущее значение умножается на 2: 15 * 2 = 30."
        />
      </LessonSection>

      <LessonSection id="strings-operations" number="08" title="Строки и операции со строками">
        <p class="lead">Строки можно соединять. Такая операция называется конкатенацией.</p>
        <CodeBlock :code="concatenationExample" language="javascript" />
        <CodeBlock code="Adam Dasaev" language="text" />
        <h3>Шаблонные строки</h3>
        <p>Шаблонная строка записывается в обратных кавычках. Конструкция <code>${...}</code> подставляет внутрь строки значение переменной или выражения.</p>
        <CodeBlock :code="templateExample" language="javascript" />
        <CodeBlock code="Меня зовут Adam, мне 18 лет" language="text" />
        <h3>Один оператор <code>+</code> — два поведения</h3>
        <div class="comparison two-columns">
          <div><CodeBlock code="console.log(10 + 20);" language="javascript" /><strong>30</strong><small>Два числа складываются</small></div>
          <div><CodeBlock code="console.log(&quot;10&quot; + &quot;20&quot;);" language="javascript" /><strong>1020</strong><small>Две строки соединяются</small></div>
        </div>
        <InfoBlock type="warning" title="Неявное преобразование"><p>Если хотя бы один операнд <code>+</code> — строка, JavaScript обычно превращает второе значение в строку и соединяет их. Поэтому <code>"10" + 5</code> даёт <code>"105"</code>, а не <code>15</code>.</p></InfoBlock>
        <RevealAnswer
          code="const points = 10;\n\nconsole.log(points + 5);\nconsole.log(&quot;Баллы: &quot; + points + 5);"
          answer="15\nБаллы: 105"
          explanation="В первой строке складываются числа. Во второй после появления строки оператор + соединяет значения слева направо."
        />
      </LessonSection>

      <LessonSection id="conversion" number="09" title="Преобразование типов">
        <p class="lead">Иногда данные приходят в одном типе, а для вычисления нужен другой. Тогда тип преобразуют явно.</p>
        <CodeBlock :code="conversionExample" language="javascript" />
        <div class="conversion-grid">
          <article><code>Number(value)</code><p>Пытается получить число.</p></article>
          <article><code>String(value)</code><p>Создаёт строковое представление.</p></article>
          <article><code>Boolean(value)</code><p>Получает логическое значение.</p></article>
        </div>
        <CodeBlock :code="conversionResults" language="javascript" />
        <InfoBlock type="info" title="Что такое NaN?"><p><code>NaN</code> означает «не число» (<em>Not a Number</em>). Оно появляется, когда JavaScript не может корректно преобразовать значение в число, например <code>Number("hello")</code>. При этом <code>typeof NaN</code> исторически возвращает <code>"number"</code>.</p></InfoBlock>
      </LessonSection>

      <LessonSection id="comparison-operators" number="10" title="Операторы сравнения">
        <p>Сравнение отвечает на вопрос и всегда возвращает boolean: <code>true</code> или <code>false</code>.</p>
        <div class="operator-cards comparison-operators">
          <span><b>&gt;</b>Больше</span><span><b>&lt;</b>Меньше</span><span><b>&gt;=</b>Не меньше</span>
          <span><b>&lt;=</b>Не больше</span><span><b>===</b>Строго равно</span><span><b>!==</b>Строго не равно</span>
        </div>
        <CodeBlock :code="comparisonExample" language="javascript" />
        <h3><code>==</code> и <code>===</code></h3>
        <CodeBlock :code="looseComparison" language="javascript" />
        <p>Нестрогое сравнение <code>==</code> пытается привести операнды к одному типу, поэтому число <code>5</code> и строка <code>"5"</code> неожиданно считаются равными. Строгое сравнение <code>===</code> проверяет и значение, и тип.</p>
        <InfoBlock type="important" title="Используйте строгое сравнение"><p>В учебном и современном прикладном коде выбирайте <code>===</code> и <code>!==</code>: их результат легче предсказать.</p></InfoBlock>
      </LessonSection>

      <LessonSection id="logical-operators" number="11" title="Логические операторы">
        <p class="lead">Логические операторы объединяют или изменяют boolean-условия.</p>
        <h3><code>&&</code> — И</h3>
        <p>Результат <code>true</code>, только когда оба условия истинны.</p>
        <CodeBlock :code="andExample" language="javascript" />
        <div class="truth-tables">
          <table class="lesson-table"><thead><tr><th>A</th><th>B</th><th>A && B</th></tr></thead><tbody><tr><td>true</td><td>true</td><td>true</td></tr><tr><td>true</td><td>false</td><td>false</td></tr><tr><td>false</td><td>true</td><td>false</td></tr><tr><td>false</td><td>false</td><td>false</td></tr></tbody></table>
        </div>

        <h3><code>||</code> — ИЛИ</h3>
        <p>Результат <code>true</code>, если истинно хотя бы одно условие.</p>
        <CodeBlock :code="orExample" language="javascript" />
        <div class="truth-tables">
          <table class="lesson-table"><thead><tr><th>A</th><th>B</th><th>A || B</th></tr></thead><tbody><tr><td>true</td><td>true</td><td>true</td></tr><tr><td>true</td><td>false</td><td>true</td></tr><tr><td>false</td><td>true</td><td>true</td></tr><tr><td>false</td><td>false</td><td>false</td></tr></tbody></table>
        </div>

        <h3><code>!</code> — НЕ</h3>
        <p>Меняет логическое значение на противоположное.</p>
        <CodeBlock :code="notExample" language="javascript" />
        <div class="truth-tables compact">
          <table class="lesson-table"><thead><tr><th>A</th><th>!A</th></tr></thead><tbody><tr><td>true</td><td>false</td></tr><tr><td>false</td><td>true</td></tr></tbody></table>
        </div>
        <InfoBlock type="info"><p>Пока используем логические операторы с boolean-значениями. Особенности сокращённого вычисления (<em>short-circuit evaluation</em>) изучим позже.</p></InfoBlock>
        <RevealAnswer
          code="const age = 17;\nconst hasPermission = true;\nconst isBlocked = false;\n\nconsole.log(age >= 18 || hasPermission);\nconsole.log(!isBlocked);"
          answer="true\ntrue"
          explanation="Для || достаточно истинности одного условия: hasPermission равно true. Оператор ! меняет false на true."
        />
      </LessonSection>
    </div>

    <section id="practice" class="practice-section scroll-section">
      <div class="lesson-body">
        <span class="practice-kicker">ПРАКТИЧЕСКАЯ РАБОТА</span>
        <h2>Закрепляем материал</h2>
        <p class="practice-lead">Каждое задание выполняйте локально в VS Code: создайте указанный <code>.js</code>-файл и запускайте его командой <code>node имя-файла.js</code>. Готовые решения намеренно не опубликованы.</p>
        <div class="tasks-grid"><TaskBlock v-for="(task, index) in practiceTasks" :key="task.title" :task="task" :index="index" /></div>
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
        <p>Сначала сформулируйте ответ самостоятельно, затем раскройте карточку и проверьте себя.</p>
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
        <div class="homework-header"><span><BookOpenCheck /></span><div><small>САМОСТОЯТЕЛЬНАЯ РАБОТА</small><h2>Домашнее задание</h2><p>Создайте файл <code>homework.js</code> и выполните четыре части.</p></div></div>
        <div class="homework-parts">
          <article><span>01</span><div><h3>Переменные</h3><p>Создайте переменные для имени, фамилии, возраста и учебной группы. Выведите информацию одной строкой с использованием шаблонной строки.</p></div></article>
          <article><span>02</span><div><h3>Арифметика</h3><p>Вычислите стоимость покупки из 7 товаров по 890 рублей со скидкой 15%. Сохраните исходные данные и результаты в понятных переменных.</p></div></article>
          <article><span>03</span><div><h3>Логика</h3><p>Проверьте, может ли человек получить доступ к мероприятию: возраст не менее 16 лет, билет имеется, пользователь не заблокирован. Результат должен быть boolean.</p></div></article>
          <article><span>04</span><div><h3>Анализ кода</h3><p>Перед каждой строкой запишите предполагаемый результат в комментарии, затем запустите файл и проверьте себя.</p><CodeBlock :code="homeworkAnalysis" language="javascript" /></div></article>
        </div>
      </div>
    </section>

    <div class="lesson-body">
      <RouterLink class="next-lesson previous-lesson" to="/1" aria-label="Вернуться к первому занятию">
        <span><ArrowLeft /></span>
        <div><small>ПРЕДЫДУЩЕЕ ЗАНЯТИЕ</small><h2>Введение в JavaScript и Node.js</h2><p>программа <i /> алгоритм <i /> console.log <i /> Node.js</p></div>
      </RouterLink>
      <footer><span class="brand-mark small">JS</span><p>Основы программирования · 1 курс</p><a href="#top">Наверх ↑</a></footer>
    </div>
  </LessonLayout>
</template>
