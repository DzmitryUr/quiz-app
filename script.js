const questions = [
  {
    question: 'What is the output of console.log(1+1+"1")',
    options: ["3", "21", "12", "111"],
    answer: 1,
  },
  {
    question: 'What is the output of console.log(1+"1"+1)',
    options: ["3", "21", "12", "111"],
    answer: 3,
  },
  {
    question: "What is the output of console.log(2+[2])",
    options: ["22", "4", "2", "NaN"],
    answer: 0,
  },
  {
    question: "What is the output of console.log(0.1+0.2)",
    options: ["0.30000000000000004", "0.3", "0", "NaN"],
    answer: 0,
  },
];

let currentCuestion = 0;
let selectedAnswer = -1;
let scores = 0;
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const quiz = document.getElementById("quiz");
const result = document.getElementById("result");
const btnSubmit = document.getElementById("btnSubmit");
const btnNext = document.getElementById("btnNext");

function loadQuestion() {
  const question = questions[currentCuestion];
  questionElement.textContent = question.question;
  optionsElement.innerHTML = "";
  question.options.forEach((element, index) => {
    const optionElement = document.createElement("div");
    optionElement.textContent = element;
    optionElement.classList.add("option");
    optionElement.setAttribute("data-index", index);
    optionElement.addEventListener("click", handleOptionClick);
    optionsElement.appendChild(optionElement);
  });
}

function handleOptionClick(event) {
  if (!btnNext.disabled) {
    return;
  }
  clearOptions();
  btnSubmit.disabled = false;
  selectedAnswer = parseInt(event.target.getAttribute("data-index"));
  event.target.classList.add("selected");
}

function clearOptions() {
  for (const option of optionsElement.children) {
    option.classList.remove("selected");
  }
}

btnSubmit.addEventListener("click", () => {
  btnNext.disabled = false;
  const question = questions[currentCuestion];
  const children = optionsElement.children;
  children[question.answer].classList.add("correct");
  if (selectedAnswer !== question.answer) {
    children[selectedAnswer].classList.add("wrong");
  } else {
    scores += 1;
  }
  btnSubmit.disabled = true;
});

btnNext.addEventListener("click", () => {
  currentCuestion += 1;
  selectedAnswer = -1;
  btnNext.disabled = true;
  btnSubmit.disabled = true;

  if (currentCuestion >= questions.length) {
    quiz.hidden = true;
    result.hidden = false;
    document.getElementById(
      "text"
    ).textContent = `You got ${scores} out of ${questions.length}`;
    return;
  }

  loadQuestion();
});

document.getElementById("btnReload").addEventListener("click", () => {
  quiz.hidden = false;
  result.hidden = true;
  currentCuestion = 0;
  loadQuestion();
});

loadQuestion();
