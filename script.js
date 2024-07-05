const questions = [
  {
    question: "What is the capital of India?",
    answer: [
      { text: "Gujarat", correct: false },
      { text: "New Delhi", correct: true },
      { text: "Maharastra", correct: false },
      { text: "Kerela", correct: false },
    ],
  },
  {
    question: "What is the national flower of India?",
    answer: [
      { text: "Lotus", correct: true },
      { text: "Mogra", correct: false },
      { text: "Rose", correct: false },
      { text: "Tulip", correct: false },
    ],
  },
];

const questionHandler = document.getElementById("question");
const ansHandler = document.getElementById("ans-btn");
const nextBtn = document.getElementById("next");

let currentQuestionIndex = 0;
let score = 0;

const quizHandler = () => {
  currentQuestionIndex = 0;
  score = 0;
  nextBtn.innerHTML = "Next";
  showQuestion();
};

const showQuestion = () => {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionHandler.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answer.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    ansHandler.append(button);

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAns);
  });
};

function resetState() {
  nextBtn.style.display = "none";
  while (ansHandler.firstChild) {
    ansHandler.removeChild(ansHandler.firstChild);
  }
}

function selectAns(e) {
  const selectedbtn = e.target;
  const isCorrect = selectedbtn.dataset.correct == "true";
  if (isCorrect) {
    selectedbtn.classList.add("correct");
    score++;
  } else {
    selectedbtn.classList.add("incorrect");
  }
  Array.from(ansHandler.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextBtn.style.display = "block";
}

function handleNxtbtn() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  resetState();
  questionHandler.innerHTML = `You Scored ${score} out of ${questions.length}!`;
  nextBtn.innerHTML = "Play Again";
  nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNxtbtn();
  } else {
    quizHandler();
  }
});

quizHandler();
