const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'What is my favourite fast-food?',
    answers: [
      { text: 'Momos', correct: true },
      { text: 'Panipuri', correct: false },
      {text: 'Pav-Bhaji', correct: false},
      {text: 'Noodles', correct: false}
    ]
  },
  {
    question: 'What I Drink The most?',
    answers: [
      { text: 'Tea', correct: false },
      { text: 'Coffee', correct: true },
      { text: 'Cold Drink', correct: false },
      { text: 'Juice', correct: false }
    ]
  },
  {
    question: 'My Pet name is?',
    answers: [
      { text: 'Tommy', correct: false },
      { text: 'Bucky', correct: true },
      { text: 'Bunny', correct: false },
      { text: 'Simba', correct: false }
    ]
  },
  {
    question: 'What is my Eye color?',
    answers: [
      { text: 'black', correct: false },
      { text: 'brown', correct: true }
    ]
  },
  {
    question: 'What is my Fav. color?',
    answers: [
      { text: 'black', correct: false },
      { text: 'brown', correct: false },
      { text: 'blue', correct: false },
      { text: 'Lavender', correct: true }
    ]
  }
]