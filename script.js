const $startGameButton = document.querySelector(".Start-quiz");
const $questionContainer = document.querySelector(".question-container");
const $answersContainer = document.querySelector(".answer-container");
const $questionText = document.querySelector(".question");
const $nextQuestionButton = document.querySelector(".Next-quiz")
const $timerContainer = document.querySelector(".timer-container");
const $mascote = document.getElementById("mascote");


$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)

let currentQuestionIndex = 0
let totalCorrect = 0
let score = 0; 
const pointsForCorrectAnswer = 10; 
const pointsForIncorrectAnswer = -5; 
const timeLimit = 35; 
let timer;

const $timerDisplay = document.querySelector(".timer");

function createConfetti() {
    const confettiContainer = document.getElementById('confetti');
    for (let i = 0; i < 100; i++) { 
        const confetti = document.createElement('div');
        confetti.classList.add('confetti-piece');

        
        const xPos = Math.random() * window.innerWidth;
        const color = `hsl(${Math.random() * 360}, 100%, 50%)`; 
        confetti.style.left = `${xPos}px`;
        confetti.style.backgroundColor = color;

       
        confettiContainer.appendChild(confetti);

      
        setTimeout(() => {
            confetti.remove();
        }, 3000); 
    }
}

function updateMascote(reaction) {
    switch (reaction) {
        case 'normal':
            $mascote.src = "Imagens/Normal.png";
            break;
        case 'correto':
            $mascote.src = "Imagens/Correto.png";
            setTimeout(() => updateMascote('normal'), 1000); 
            break;
        case 'errado':
            $mascote.src = "Imagens/Errado.png";
            setTimeout(() => updateMascote('normal'), 1000); 
            break;
        case 'final':
            $mascote.src = "Imagens/Final.png";
            break;
    }
}

function startGame() {
    $startGameButton.classList.add("hide");
    document.querySelector(".score-container").classList.remove("hide");
    $timerDisplay.classList.remove("hide");
    $timerContainer.classList.remove("hide");
    $questionContainer.classList.remove("hide");
    displayNextQuestion();

    const music = document.getElementById("background-music");
    music.play();
    music.volume = 0.5;

}

function displayNextQuestion() {
    resetState()

    if (questions.length === currentQuestionIndex) {
        return finishGame();
    }
   

   $questionText.textContent = questions[currentQuestionIndex].question;
    questions[currentQuestionIndex].answers.forEach(answer => {
        const newAnswer = document.createElement("button");
        newAnswer.classList.add("button", "answer");
        newAnswer.textContent = answer.text;
        if (answer.correct) {
            newAnswer.dataset.correct = answer.correct;
        }
        $answersContainer.appendChild(newAnswer);

        newAnswer.addEventListener("click", selectAnswer)
    });
    startTimer();
}

function resetState() {
    while($answersContainer.firstChild) {
        $answersContainer.removeChild($answersContainer.firstChild);
    }

    document.body.removeAttribute("class");
    $nextQuestionButton.classList.add("hide")
    clearInterval(timer);
    $timerDisplay.textContent = `Tempo restante: ${timeLimit}`;
}

function startTimer() {
    let timeRemaining = timeLimit;

    timer = setInterval(() => {
        timeRemaining--;
        $timerDisplay.textContent = `Tempo restante: ${timeRemaining}`;

        if (timeRemaining <= 0) {
            clearInterval(timer);
            handleTimeOut(); 
        }
    }, 1000);
}

function handleTimeOut() {
    score += pointsForIncorrectAnswer; 
    document.querySelector(".score").textContent = `Pontuação: ${score}`;
    currentQuestionIndex++; 
    displayNextQuestion();
    updateMascote('errado'); 
}

function selectAnswer(event) {
    clearInterval(timer);
    const answerClicked = event.target;
    const positivoSom = document.getElementById("positivo-som");
    const negativoSom = document.getElementById("negativo-som");

    if (answerClicked.dataset.correct) {
        document.body.classList.add("correct");
        totalCorrect++
        score += pointsForCorrectAnswer;
        positivoSom.play();
        updateMascote('correto');
} else {
    document.body.classList.add("incorrect");
    score += pointsForIncorrectAnswer;
    negativoSom.play();
    updateMascote('errado');
}

 document.querySelectorAll(".answer").forEach(button => {
    if(button.dataset.correct) {
        button.classList.add("correct");
} else {
    button.classList.add("incorrect");
}

button.disabled = true
 });

 document.querySelector(".score").textContent = `Pontuação: ${score}`;

 $nextQuestionButton.classList.remove("hide");
 currentQuestionIndex++
}


function finishGame() {
    clearInterval(timer);
    $timerDisplay.classList.add("hide");
    createConfetti();
    updateMascote('final');
  const totalQuestions = questions.length
  const performace = Math.floor(totalCorrect * 100 / totalQuestions) 

  let message = ""

switch (true) {
    case (performace >= 90):
        message = "Pedrão está orgulhoso de você!";
        break

    case (performace >= 70):
        message = "Pedrão amou seu desempenho!";
        break

    case (performace >= 50):
        message = "Pedrão aprovou!";
        break

    default:
        message = "Pedrão ficou triste e pede para você melhorar!";
}

document.querySelector(".score-container").classList.add("hide");

$questionContainer.innerHTML = 
`
<p class="final-message">
 Voce acertou ${totalCorrect} de ${totalQuestions} questões!.
 <span>Resultado: ${message}</span> 
</p>
<span>Pontuação Final: ${score}</span>
<button onclick="window.location.reload()" class="button">
 Refazer teste
</button>
`
}

























const questions = [
    {
        question: "Em qual continente se encontra a forma mais conhecida de savana??",
        answers: [
            { text: "América do Sul", correct: false },
            { text: "África", correct: true },
            { text: "Oceania", correct: false },
            { text: "Europa", correct: false },
        ]
    },

    {
        question: "Qual é o nome dado à savana brasileira?",
        answers: [
            { text: "Pantanal", correct: false },
            { text: "Mata Atlântica", correct: false },
            { text: "Cerrado", correct: true },
            { text: "Caatinga", correct: false },
        ]
    },

    {
        question: "Quais são as características climáticas das regiões de savana?",
        answers: [
            { text: "Clima árido com pouca variação", correct: false },
            { text: "Inverno Rigoroso e seco", correct: false },
            { text: "Temperaturas baixas o ano inteiro", correct: false },
            { text: "Estações chuvosas e secas bem definidas", correct: true },
        ]
    },

    {
        question: "Qual é a principal diferença entre a vegetação da savana e de uma floresta tropical?",
        answers: [
            { text: "Vegetação rasteira e arbustos espaçados", correct: true },
            { text: "Presença de árvores frondosas", correct: false },
            { text: "Grandes rios e lagos", correct: false },
            { text: "Áreas com neve", correct: false },
        ]
    },

    {
        question: "Qual é uma das principais ameaças à biodiversidade da savana?",
        answers: [
            { text: "Incêndios naturais controlados", correct: false },
            { text: "Construção de rios artificiais", correct: false },
            { text: "Expansão agrícola e pecuária", correct: true },
            { text: "Conservação de áreas protegidas", correct: false },
        ]
    },

    {
        question: "Que tipo de vegetação é predominante na savana?",
        answers: [
            { text: "Árvores densas", correct: false },
            { text: "Gramíneas e arbustos", correct: true },
            { text: "Plantas aquáticas", correct: false },
            { text: "Plantas de áreas frias", correct: false },
        ]
    },

    {
        question: "Qual das alternativas abaixo NÃO é uma característica típica da savana?",
        answers: [
            { text: "Duas estações bem definidas: uma chuvosa e outra seca", correct: false },
            { text: "Vegetação composta por gramíneas e arbustos espaçados", correct: false },
            { text: "Clima tropical com temperaturas amenas durante o ano", correct: true },
            { text: "Presença de grandes felinos como leões e guepardos", correct: false },
        ]
    },

    {
        question: "Por que a vegetação da savana é vantajosa para animais predadores como o guepardo?",
        answers: [
            { text: "Porque oferece esconderijos", correct: false },
            { text: "Porque fornece alimento", correct: false },
            { text: "Porque reduz a visão de presas", correct: false },
            { text: "Porque permite correr em alta velocidade", correct: true },
        ]
    },

    {
        question: "Qual é a característica das árvores da savana em relação aos seus troncos e raízes?",
        answers: [
            { text: "Troncos retos e raízes curtas", correct: false },
            { text: "Troncos retorcidos e raízes profundas", correct: true },
            { text: "Sem troncos e com raízes superficiais", correct: false },
            { text: "Com troncos densos e folhas espessas", correct: false },
        ]
    },

    {
        question: "Qual é a principal estratégia das plantas da savana para sobreviver ao longo período de seca?",
        answers: [
            { text: "Perda de folhas durante o inverno", correct: true },
            { text: "Crescimento rápido de folhas durante a seca", correct: false },
            { text: "Floração frequente", correct: false },
            { text: "Absorção de água das chuvas", correct: false },
        ]
    },
]