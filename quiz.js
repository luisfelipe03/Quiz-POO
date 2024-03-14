let currentQuestionIndex = 0;
let selectedOption = null;
let correctAnswers = 0;
let questions = [];

// Adicionando controle de tema
let isDarkTheme = true;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Troca elementos i e j de lugar no array
  }
}

function loadQuestions() {
  fetch('questions.json')
    .then(response => response.json())
    .then(data => {
      questions = data.questions;
      shuffleArray(questions); // Embaralha as perguntas
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

function displayQuestion() {
    if(currentQuestionIndex < questions.length) {
        let question = questions[currentQuestionIndex];
        document.getElementById('question').textContent = question.question;
        
        // Atualize esta parte para mostrar o progresso
        document.getElementById('progress').textContent = `Questão: ${currentQuestionIndex + 1} / ${questions.length}`;
        
        let optionsHtml = question.options.map((option, index) =>
            `<li class="list-group-item list-group-item-action" onclick="selectOption('${option}', ${index})">${option}</li>`
        ).join('');
        document.getElementById('options').innerHTML = optionsHtml;
    } else {
        window.location.href = "resultados.html?score=" + correctAnswers + "&total=" + questions.length;
    }
}

function confirmHomeRedirect() {
    // Exibe um alerta de confirmação
    const userConfirmed = confirm("Você deseja retornar à página inicial?");
    if (userConfirmed) {
      // Se o usuário confirmar, redirecione para a página inicial
      window.location.href = "index.html"; // Substitua "index.html" pelo URL da sua página inicial, se for diferente
    }
  }
  

window.onload = function() {
    loadQuestions();
};

function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    document.body.classList.toggle('light-theme', !isDarkTheme);
}
