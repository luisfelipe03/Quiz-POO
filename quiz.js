let currentQuestionIndex = 0;
let selectedOption = null;
let correctAnswers = 0;
let questions = [];
let totalQuestions = 0; // Variável para armazenar o total de questões escolhidas

// Adicionando controle de tema
let isDarkTheme = true;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Troca elementos i e j de lugar no array
  }
}

// Carrega as questões do arquivo JSON
function loadQuestions() {
  fetch('questions.json')
    .then(response => response.json())
    .then(data => {
      questions = data.questions;
      shuffleArray(questions); // Embaralha as perguntas
      questions = questions.slice(0, totalQuestions); // Limita o número de questões
      displayQuestion(); // Exibe a primeira questão
    })
    .catch(error => console.error("Erro ao carregar as questões: ", error));
}

// Exibe a questão atual
function displayQuestion() {
  if (currentQuestionIndex < questions.length) {
    let question = questions[currentQuestionIndex];
    document.getElementById('question').textContent = question.question;
    document.getElementById('progress').textContent = `Questão: ${currentQuestionIndex + 1} / ${totalQuestions}`;

    let optionsHtml = question.options.map((option, index) =>
      `<li class="list-group-item list-group-item-action" onclick="selectOption('${option}', ${index})">${option}</li>`
    ).join('');
    document.getElementById('options').innerHTML = optionsHtml;
  } else {
    // Redireciona para a página de resultados
    window.location.href = "resultados.html?score=" + correctAnswers + "&total=" + totalQuestions;
  }
}

// Seleciona uma opção de resposta
function selectOption(option, index) {
  selectedOption = option;
  let optionsList = document.querySelectorAll('#options li');
  optionsList.forEach((li, idx) => {
    li.classList.remove('active');
    if (idx === index) li.classList.add('active');
  });
}

// Confirma a resposta selecionada e passa para a próxima questão
document.getElementById('confirmButton').addEventListener('click', function() {
  if (selectedOption === questions[currentQuestionIndex].answer) {
    correctAnswers++;
  }
  currentQuestionIndex++;
  displayQuestion();
});

// Função para definir o número de questões baseado na escolha do usuário e iniciar o quiz
function setQuestionCountAndStartQuiz() {
    var totalQuestions = parseInt(document.getElementById('questionCountSelect').value);
    localStorage.setItem('totalQuestions', totalQuestions); // Salva o total de questões escolhido
    window.location.href = 'questions.html'; // Redireciona para a página do quiz
  }
  

// Alterna o tema claro/escuro
function toggleTheme() {
  isDarkTheme = !isDarkTheme;
  document.body.classList.toggle('light-theme', !isDarkTheme);
}

// Inicia o quiz quando a página é carregada
window.onload = function() {
    // Recupera o número total de questões escolhido pelo usuário
    totalQuestions = parseInt(localStorage.getItem('totalQuestions')) || 10; // Padrão para 10 se não definido
    loadQuestions(); // Inicia o carregamento e exibição das questões
  };
  
