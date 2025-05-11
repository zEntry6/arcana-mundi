let questions = [];
let currentQuestion = 0;
let score = 0;
let level = 1;
let timerInterval;
let timeLeft = 30;

const playerName = localStorage.getItem('playerName') || 'Penjelajah';
document.getElementById('playerNameDisplay').textContent = playerName;

const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const timerDisplay = document.getElementById('timer');
const feedback = document.getElementById('feedback');
const nextBtn = document.getElementById('nextBtn');
const levelDisplay = document.getElementById('levelDisplay');
const scoreDisplay = document.getElementById('scoreDisplay');

const params = new URLSearchParams(window.location.search);
const dungeonName = params.get('d') || 'verdant';

const dungeonTitles = {
  verdant: "🌿 The Verdant Vault",
  cryptarithm: "🧮 The Cryptarithm Core",
  blooming: "🌸 The Blooming Grotto",
  ether: "🌌 The Ether Spire"
};
const dungeonTitleEl = document.getElementById('dungeonTitle');
if (dungeonTitleEl) {
  dungeonTitleEl.textContent = dungeonTitles[dungeonName] || 'Unknown Dungeon';
}

fetch('questions.json')
  .then(res => res.json())
  .then(data => {
    questions = data[dungeonName] || data['verdant'];
    showQuestion();
  });

function showQuestion() {
  resetState();
  const q = questions[currentQuestion];
  questionText.textContent = q.question;
  q.options.forEach(option => {
    const btn = document.createElement('button');
    btn.textContent = option;
    btn.addEventListener('click', () => handleAnswer(option, q.answer));
    optionsContainer.appendChild(btn);
  });
  startTimer();
}

function handleAnswer(selected, correct) {
    stopTimer();
    if (selected === correct) {
      feedback.textContent = 'Benar! 🌟';
      feedback.className = 'feedback correct';
      score += 10;
      if ((currentQuestion + 1) % 3 === 0) {
        level++;
      }
    } else {
      feedback.textContent = 'Salah! 💥';
      feedback.className = 'feedback wrong';
      score -= 5;
    }
  
    const allButtons = optionsContainer.querySelectorAll('button');
    allButtons.forEach(btn => btn.disabled = true);
  
    updateStats();
    nextBtn.classList.remove('hidden');
  }
  

function updateStats() {
  levelDisplay.textContent = level;
  scoreDisplay.textContent = score;
  localStorage.setItem('arcana_progress', JSON.stringify({ score, level }));
}

function resetState() {
  feedback.textContent = '';
  feedback.className = 'feedback';
  optionsContainer.innerHTML = '';
  nextBtn.classList.add('hidden');
  timeLeft = 30;
  timerDisplay.textContent = timeLeft;
}

function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    if (timeLeft === 0) {
      stopTimer();
      handleAnswer('___', questions[currentQuestion].answer);
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

nextBtn.addEventListener('click', () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    alert(`Dungeon selesai! Skor akhir: ${score}`);
    window.location.href = 'index.html';
  }
});
