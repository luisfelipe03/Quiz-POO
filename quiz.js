let currentQuestionIndex = 0;
let selectedOption = null;
let correctAnswers = 0;
let questions = [];

// Adicionando controle de tema
let isDarkTheme = true;

function loadQuestions() {
  fetch('questions.json')
    .then(response => response.json())
    .then(data => {
      questions = data.questions;
      displayQuestion();
    })
    .catch(error => console.error("Erro ao carregar as questões: ", error));
}

function displayQuestion() {
    if(currentQuestionIndex < questions.length) {
        let question = questions[currentQuestionIndex];
        document.getElementById('question').textContent = question.question;
        let optionsHtml = question.options.map((option, index) =>
            `<li class="list-group-item list-group-item-action" onclick="selectOption('${option}', ${index})">${option}</li>`
        ).join('');
        document.getElementById('options').innerHTML = optionsHtml;
    } else {
        window.location.href = "resultados.html?score=" + correctAnswers + "&total=" + questions.length;
    }
}

function selectOption(option, index) {
    selectedOption = option;
    let optionsList = document.querySelectorAll('#options li');
    optionsList.forEach((li, idx) => {
        li.classList.remove('active');
        if(idx === index) li.classList.add('active');
    });
}

document.getElementById('confirmButton').addEventListener('click', function() {
    if(selectedOption === questions[currentQuestionIndex].answer) {
        correctAnswers++;
    }
    currentQuestionIndex++;
    displayQuestion();
});

window.onload = function() {
    loadQuestions();
};

function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    document.body.classList.toggle('light-theme', !isDarkTheme);
}

