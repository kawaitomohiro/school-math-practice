const gradeSelect = document.querySelector("#grade");
const questionLabel = document.querySelector("#question-label");
const questionText = document.querySelector("#question");
const answerForm = document.querySelector("#answer-form");
const answerInput = document.querySelector("#answer");
const answerHelp = document.querySelector("#answer-help");
const feedback = document.querySelector("#feedback");
const nextButton = document.querySelector("#next-question");
const scoreDisplay = document.querySelector("#score");

let questionNumber = 0;
let score = 0;
let currentAnswer;
let answered = false;

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeQuestion(grade) {
  if (grade === 1) {
    const a = randomInt(1, 20);
    const b = randomInt(1, 20);
    if (Math.random() < 0.5) {
      return { text: `${a} ＋ ${b} ＝ ？`, answer: a + b };
    }
    const larger = Math.max(a, b);
    const smaller = Math.min(a, b);
    return { text: `${larger} − ${smaller} ＝ ？`, answer: larger - smaller };
  }

  if (grade === 2) {
    const operation = randomInt(0, 2);
    if (operation === 2) {
      const a = randomInt(2, 9);
      const b = randomInt(2, 9);
      return { text: `${a} × ${b} ＝ ？`, answer: a * b };
    }
    const a = randomInt(10, 99);
    const b = randomInt(10, 99);
    if (operation === 0) return { text: `${a} ＋ ${b} ＝ ？`, answer: a + b };
    const larger = Math.max(a, b);
    const smaller = Math.min(a, b);
    return { text: `${larger} − ${smaller} ＝ ？`, answer: larger - smaller };
  }

  if (grade === 3) {
    const operation = randomInt(0, 3);
    if (operation === 2) {
      const a = randomInt(2, 9);
      const b = randomInt(10, 99);
      return { text: `${a} × ${b} ＝ ？`, answer: a * b };
    }
    if (operation === 3) {
      const divisor = randomInt(2, 9);
      const quotient = randomInt(2, 12);
      return { text: `${divisor * quotient} ÷ ${divisor} ＝ ？`, answer: quotient };
    }
    const a = randomInt(100, 999);
    const b = randomInt(100, 999);
    if (operation === 0) return { text: `${a} ＋ ${b} ＝ ？`, answer: a + b };
    const larger = Math.max(a, b);
    const smaller = Math.min(a, b);
    return { text: `${larger} − ${smaller} ＝ ？`, answer: larger - smaller };
  }

  if (grade === 4) {
    const operation = randomInt(0, 3);
    if (operation === 2) {
      const a = randomInt(12, 99);
      const b = randomInt(2, 9);
      return { text: `${a} × ${b} ＝ ？`, answer: a * b };
    }
    if (operation === 3) {
      const divisor = randomInt(2, 12);
      const quotient = randomInt(12, 99);
      return { text: `${divisor * quotient} ÷ ${divisor} ＝ ？`, answer: quotient };
    }
    const a = randomInt(1000, 9999);
    const b = randomInt(1000, 9999);
    if (operation === 0) return { text: `${a} ＋ ${b} ＝ ？`, answer: a + b };
    const larger = Math.max(a, b);
    const smaller = Math.min(a, b);
    return { text: `${larger} − ${smaller} ＝ ？`, answer: larger - smaller };
  }

  if (grade === 5) {
    const operation = randomInt(0, 3);
    if (operation === 2) {
      const tenths = randomInt(11, 99);
      const multiplier = randomInt(2, 9);
      const answerTenths = tenths * multiplier;
      return {
        text: `${formatTenths(tenths)} × ${multiplier} ＝ ？`,
        answer: answerTenths / 10,
      };
    }
    if (operation === 3) {
      const divisor = randomInt(2, 9);
      const quotientTenths = randomInt(11, 99);
      return {
        text: `${formatTenths(quotientTenths * divisor)} ÷ ${divisor} ＝ ？`,
        answer: quotientTenths / 10,
      };
    }
    const a = randomInt(10, 999);
    const b = randomInt(10, 999);
    const answerTenths = operation === 0 ? a + b : Math.abs(a - b);
    const left = operation === 0 ? a : Math.max(a, b);
    const right = operation === 0 ? b : Math.min(a, b);
    return {
      text: `${formatTenths(left)} ${operation === 0 ? "＋" : "−"} ${formatTenths(right)} ＝ ？`,
      answer: answerTenths / 10,
    };
  }

  const denominatorA = [2, 3, 4, 5, 6, 8, 10, 12][randomInt(0, 7)];
  const denominatorB = [2, 3, 4, 5, 6, 8, 10, 12][randomInt(0, 7)];
  const numeratorA = randomInt(1, denominatorA);
  const numeratorB = randomInt(1, denominatorB);
  const subtract = Math.random() < 0.5;
  const left = numeratorA / denominatorA;
  const right = numeratorB / denominatorB;
  const first = subtract && right > left
    ? { numerator: numeratorB, denominator: denominatorB }
    : { numerator: numeratorA, denominator: denominatorA };
  const second = subtract && right > left
    ? { numerator: numeratorA, denominator: denominatorA }
    : { numerator: numeratorB, denominator: denominatorB };
  const numerator = first.numerator * second.denominator
    + (subtract ? -1 : 1) * second.numerator * first.denominator;
  const denominator = first.denominator * second.denominator;
  const divisor = greatestCommonDivisor(numerator, denominator);
  return {
    text: `${first.numerator}/${first.denominator} ${subtract ? "−" : "＋"} ${second.numerator}/${second.denominator} ＝ ？`,
    answer: { numerator: numerator / divisor, denominator: denominator / divisor },
  };
}

function formatTenths(value) {
  return `${Math.floor(value / 10)}.${value % 10}`;
}

function greatestCommonDivisor(a, b) {
  return b === 0 ? a : greatestCommonDivisor(b, a % b);
}

function parseFraction(value) {
  const parts = value.trim().split("/");
  if (parts.length === 1 && /^\d+$/.test(parts[0])) {
    return { numerator: Number(parts[0]), denominator: 1 };
  }
  if (parts.length !== 2 || !parts.every((part) => /^\d+$/.test(part.trim()))) {
    return null;
  }
  const numerator = Number(parts[0].trim());
  const denominator = Number(parts[1].trim());
  if (denominator === 0) return null;
  return { numerator, denominator };
}

function nextQuestion() {
  questionNumber += 1;
  const grade = Number(gradeSelect.value);
  const generated = makeQuestion(grade);
  currentAnswer = generated.answer;
  answered = false;
  questionLabel.textContent = `もんだい ${questionNumber}`;
  questionText.textContent = generated.text;
  answerInput.value = "";
  answerInput.disabled = false;
  answerHelp.textContent = grade === 6
    ? "分数は「分子/分母」、整数はそのまま入力してね"
    : grade === 5
      ? "小数のこたえは 3.5 のように入力してね"
      : "こたえを入力して「こたえ合わせ」をおそう";
  feedback.textContent = "";
  feedback.className = "feedback";
  nextButton.disabled = true;
  answerInput.focus();
}

function isCorrect(value) {
  if (typeof currentAnswer === "number") {
    const parsed = value.trim();
    if (parsed === "" || !/^-?\d+(?:\.\d+)?$/.test(parsed)) return false;
    return Math.abs(Number(parsed) - currentAnswer) < 0.000001;
  }
  const fraction = parseFraction(value);
  return fraction !== null
    && fraction.numerator * currentAnswer.denominator
      === currentAnswer.numerator * fraction.denominator;
}

gradeSelect.addEventListener("change", nextQuestion);

answerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (answered) return;

  if (answerInput.value.trim() === "") {
    feedback.textContent = "こたえを入力してね";
    feedback.className = "feedback error";
    answerInput.focus();
    return;
  }

  answered = true;
  answerInput.disabled = true;
  nextButton.disabled = false;
  if (isCorrect(answerInput.value)) {
    score += 1;
    scoreDisplay.textContent = String(score);
    feedback.textContent = "せいかい！ すばらしい！";
    feedback.className = "feedback correct";
  } else {
    const answerText = typeof currentAnswer === "number"
      ? String(currentAnswer)
      : `${currentAnswer.numerator}/${currentAnswer.denominator}`;
    feedback.textContent = `おしい！ こたえは ${answerText} だよ`;
    feedback.className = "feedback incorrect";
  }
  nextButton.focus();
});

nextButton.addEventListener("click", nextQuestion);

nextQuestion();
