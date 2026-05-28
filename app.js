/* ═══════════════════════════════════════════════════════════
   ¿Quién es más probable?  —  Google Sheets / Apps Script Edition
   ═══════════════════════════════════════════════════════════ */

const API_URL = 'https://script.google.com/macros/s/AKfycbwf3hunx-Z5JDTbfaklBmClidooS28958M6ydn_I9zatLOHpv_C25k8On8gzPfw3Bea/exec';

// ── Hardcoded Questions to bypass any GitHub Pages fetch issues ──
const originalQuestions = [
  "quién es más probable a decir 'damn' al ver a una fresca",
  "quién es más probable a decir 'amai' al ver a la tía más fresca, damn",
  "quién es más probable a mandarle un 'wake up' a la tía más fresca de madrugada",
  "quién es más probable a dejar un tapacorrer y echarle la culpa a una putilla, bro",
  "quién es más probable a hacer de machista opresor con una fresca",
  "quién es más probable a robar mi Huevox para impresionar a una fresca, animal",
  "quién es más probable a irse con la primera putilla que le mire",
  "quién es más probable a hacer de machista opresor con la tía más fresca, damn",
  "quién es más probable a hacer de machista opresor con la de los pechotes tremendos, damn",
  "quién es más probable a decir 'banco' al ver a una fresca, nel",
  "quién es más probable a preferir una Estrella de lata antes que a una furcia, bro",
  "quién es más probable a hacer de machista opresor con la de los pechotes tremendos",
  "quién es más probable a actuar como un animal y soltar ganas de cagar incontrolables en un bar, sel",
  "quién es más probable a decir 'banco' al ver a una de buenos pechotes, banco",
  "quién es más probable a hacer de machista opresor con una furcia",
  "quién es más probable a preferir una Estrella bien fría antes que a una fresca",
  "quién es más probable a robar mi Huevox para impresionar a una de buenos pechotes, banco",
  "quién es más probable a decir 'amai' al ver a la de los pechotes tremendos, sel",
  "quién es más probable a dejar un tapacorrer y echarle la culpa a una furcia",
  "quién es más probable a decir 'amai' al ver a una fresca, nel",
  "quién es más probable a tener un tapacorrer brutal tras beberse una Estrella bien fría, bro",
  "quién es más probable a decir 'wake up' al ver a una fresca",
  "quién es más probable a actuar como un animal y soltar un tapacorrer brutal en un bar, amai",
  "quién es más probable a hacer de machista opresor con una putilla, wake up",
  "quién es más probable a mandarle un 'wake up' a una de buenos pechotes de madrugada",
  "quién es más probable a dejar un tapacorrer y echarle la culpa a una putilla",
  "quién es más probable a dejar un tapacorrer y echarle la culpa a una putilla, sel",
  "quién es más probable a decir 'banco' al ver a una de buenos pechotes",
  "quién es más probable a mandarle un 'wake up' a la de los pechotes tremendos de madrugada",
  "quién es más probable a decir 'amai' al ver a una de buenos pechotes, amai",
  "quién es más probable a mandarle un 'wake up' a una de buenos pechotes de madrugada, nel",
  "quién es más probable a dejar un tapacorrer y echarle la culpa a una fresca, amai",
  "quién es más probable a dejar un tapacorrer y echarle la culpa a una putilla, nel",
  "quién es más probable a decir 'damn' al ver a la tía más fresca, sel",
  "quién es más probable a hacer de machista opresor con una de buenos pechotes, animal",
  "quién es más probable a preferir mi Estrella Galicia antes que a una de buenos pechotes",
  "quién es más probable a tener ganas de cagar incontrolables tras beberse mi Estrella Galicia, bro",
  "quién es más probable a decir 'sel' al ver a una furcia, sel",
  "quién es más probable a decir 'amai' al ver a una de buenos pechotes",
  "quién es más probable a ir a soltar un tapacorrer al baño de la discoteca",
  "quién es más probable a decir 'amai' al ver a la tía más fresca, bro",
  "quién es más probable a robar mi Huevox para impresionar a una putilla, amai",
  "quién es más probable a mandarle un 'wake up' a la tía más fresca de madrugada, sel",
  "quién es más probable a decir 'nel' al ver a la tía más fresca",
  "quién es más probable a dejar un tapacorrer y echarle la culpa a la tía más fresca",
  "quién es más probable a robar mi Huevox para impresionar a una furcia, wake up",
  "quién es más probable a decir 'sel' a irse de putas con los chavales",
  "quién es más probable a hacer de machista opresor con la tía más fresca",
  "quién es más probable a decir 'banco' al ver a una fresca",
  "quién es más probable a preferir una Estrella bien fría antes que a una de buenos pechotes, animal",
  "quién es más probable a hacer de machista opresor con una de buenos pechotes",
  "quién es más probable a mandarle un 'wake up' a la tía más fresca de madrugada, damn",
  "quién es más probable a beberse diez Estrellas del tirón, damn",
  "quién es más probable a dejar un tapacorrer y echarle la culpa a la tía más fresca, sel",
  "quién es más probable a actuar como un animal y soltar ganas de cagar incontrolables en un bar, amai",
  "quién es más probable a actuar como un animal y soltar ganas de cagar incontrolables en un bar",
  "quién es más probable a soltar un 'damn' cuando pasa una fresca",
  "quién es más probable a atascar mi baño con un tapacorrer de kilo",
  "quién es más probable a dejar un tapacorrer y echarle la culpa a una fresca, bro",
  "quién es más probable a hacer de machista opresor con la tía más fresca, bro",
  "quién es más probable a actuar como un animal y soltar diarrea explosiva en un bar, damn",
  "quién es más probable a decir 'nel' cuando le ofrecen agua en vez de cerveza",
  "quién es más probable a tener diarrea explosiva tras beberse una Estrella",
  "quién es más probable a actuar como un animal y soltar ganas de cagar incontrolables en un bar, wake up",
  "quién es más probable a decir 'wake up' al ver a una fresca, bro",
  "quién es más probable a mandarle un 'wake up' a una de buenos pechotes de madrugada, wake up",
  "quién es más probable a robar mi Huevox para impresionar a una putilla, nel",
  "quién es más probable a preferir una Estrella antes que a la tía más fresca",
  "quién es más probable a robar mi Huevox para impresionar a la de los pechotes tremendos, sel",
  "quién es más probable a hacer un comentario de machista opresor en público",
  "quién es más probable a fijarse sólo en los pechotes, bro",
  "quién es más probable a tener un tapacorrer brutal tras beberse mi Estrella Galicia, nel",
  "quién es más probable a tener un tapacorrer brutal tras beberse mi Estrella Galicia, animal",
  "quién es más probable a tener que salir corriendo por la diarrea",
  "quién es más probable a actuar como un animal y soltar una diarrea que flipas en un bar",
  "quién es más probable a robar mi Huevox para impresionar a la tía más fresca",
  "quién es más probable a hacer de machista opresor con la de los pechotes tremendos, sel",
  "quién es más probable a decir 'damn' al ver a una putilla, bro",
  "quién es más probable a mandarle un 'wake up' a una fresca de madrugada, bro",
  "quién es más probable a dejar un tapacorrer y echarle la culpa a una furcia, bro",
  "quién es más probable a robar mi Huevox para impresionar a una fresca, bro",
  "quién es más probable a preferir una Estrella bien fría antes que a la tía más fresca, animal",
  "quién es más probable a tener un tapacorrer brutal tras beberse mi Estrella Galicia",
  "quién es más probable a preferir mi Estrella Galicia antes que a una furcia, bro",
  "quién es más probable a levantarse con diarrea y pedir otra Estrella",
  "quién es más probable a decir 'banco' al ver a una furcia",
  "quién es más probable a dejar un tapacorrer y echarle la culpa a la tía más fresca, damn",
  "quién es más probable a tener una diarrea que flipas tras beberse una Estrella bien fría, damn",
  "quién es más probable a mandarle un 'wake up' a la de los pechotes tremendos de madrugada, animal",
  "quién es más probable a mandarle un 'wake up' a una putilla de madrugada, animal",
  "quién es más probable a actuar como un animal y soltar un tapacorrer brutal en un bar, sel",
  "quién es más probable a actuar como un animal y soltar un tapacorrer brutal en un bar, damn",
  "quién es más probable a actuar como un animal y soltar diarrea explosiva en un bar",
  "quién es más probable a robar mi Huevox para impresionar a la tía más fresca, wake up",
  "quién es más probable a dejar un tapacorrer y echarle la culpa a una putilla, amai",
  "quién es más probable a tener diarrea explosiva tras beberse una Estrella, wake up",
  "quién es más probable a decir 'damn' al ver a la de los pechotes tremendos, nel",
  "quién es más probable a preferir una Estrella de lata antes que a la tía más fresca, damn",
  "quién es más probable a actuar como un animal y soltar un tapacorrer brutal en un bar, animal",
  "quién es más probable a tener una diarrea que flipas tras beberse una Estrella de lata",
  "quién es más probable a tener una diarrea que flipas tras beberse una Estrella de lata, sel",
  "quién es más probable a actuar como un animal y soltar ganas de cagar incontrolables en un bar, banco",
  "quién es más probable a dejar un tapacorrer y echarle la culpa a una de buenos pechotes",
  "quién es más probable a robar mi Huevox para impresionar a una de buenos pechotes",
  "quién es más probable a tener una diarrea que flipas tras beberse mi Estrella Galicia",
  "quién es más probable a decir 'wake up' al ver a una putilla, sel",
  "quién es más probable a preferir una Estrella de lata antes que a una fresca",
  "quién es más probable a tener ganas de cagar incontrolables tras beberse mi Estrella Galicia",
  "quién es más probable a exclamar 'amai' al ver unos pechotes enormes",
  "quién es más probable a romper mi Huevox de un golpe",
  "quién es más probable a decir 'sel' al ver a una furcia",
  "quién es más probable a mandarle un 'wake up' a una de buenos pechotes de madrugada, amai",
  "quién es más probable a tener diarrea explosiva tras beberse una Estrella de lata, bro",
  "quién es más probable a mandarle un 'wake up' a una furcia de madrugada, damn",
  "quién es más probable a mandarle un 'wake up' a una putilla de madrugada, nel",
  "quién es más probable a decir 'banco' al ver a la de los pechotes tremendos",
  "quién es más probable a dejar un tapacorrer y echarle la culpa a una fresca",
  "quién es más probable a mandarle un 'wake up' a la tía más fresca de madrugada, animal",
  "quién es más probable a mandarle un 'wake up' a una putilla de madrugada, banco",
  "quién es más probable a cagarse encima de fiesta, animal",
  "quién es más probable a robar mi Huevox para impresionar a una furcia, bro",
  "quién es más probable a preferir una Estrella bien fría antes que a la de los pechotes tremendos",
  "quién es más probable a dejar un tapacorrer y echarle la culpa a una furcia, sel",
  "quién es más probable a mandarle un 'wake up' a la de los pechotes tremendos de madrugada, banco",
  "quién es más probable a actuar como un animal y soltar diarrea explosiva en un bar, nel",
  "quién es más probable a decir 'sel' al ver a la tía más fresca, damn",
  "quién es más probable a mandarle un 'wake up' a una de buenos pechotes de madrugada, sel",
  "quién es más probable a hacer de machista opresor con una fresca, nel",
  "quién es más probable a tener ganas de cagar incontrolables tras beberse una Estrella bien fría",
  "quién es más probable a mandar 'wake up' por el grupo de empalmada",
  "quién es más probable a robar mi Huevox para impresionar a la tía más fresca, banco",
  "quién es más probable a actuar como un animal y soltar una diarrea que flipas en un bar, animal",
  "quién es más probable a decir 'wake up' al ver a la tía más fresca, animal",
  "quién es más probable a decir 'wake up' al ver a una putilla",
  "quién es más probable a mandarle un 'wake up' a una furcia de madrugada",
  "quién es más probable a dejar un tapacorrer y echarle la culpa a una furcia, damn",
  "quién es más probable a actuar como un animal y soltar diarrea explosiva en un bar, sel",
  "quién es más probable a dejar un tapacorrer y echarle la culpa a la de los pechotes tremendos, bro",
  "quién es más probable a dejar un tapacorrer y echarle la culpa a una furcia, wake up",
  "quién es más probable a robar mi Huevox para impresionar a la de los pechotes tremendos",
  "quién es más probable a pedir otra Estrella cuando ya no puede ni hablar",
  "quién es más probable a robar mi Huevox para impresionar a una fresca",
  "quién es más probable a decir 'wake up' al ver a una furcia, animal",
  "quién es más probable a robarme cerveza del Huevox, nel",
  "quién es más probable a decir 'banco' al ver a una putilla, animal",
  "quién es más probable a decir 'wake up' al ver a la de los pechotes tremendos",
  "quién es más probable a preferir mi Estrella Galicia antes que a una putilla, damn",
  "quién es más probable a tener un tapacorrer brutal tras beberse una Estrella de lata, wake up",
  "quién es más probable a decir 'damn' al ver a una furcia, banco",
  "quién es más probable a actuar como un animal y soltar un tapacorrer brutal en un bar, banco",
  "quién es más probable a decir 'banco' a la peor idea de la noche",
  "quién es más probable a mandar a fregar a alguna pesada, wake up",
  "quién es más probable a robar mi Huevox para impresionar a una furcia",
  "quién es más probable a mandarle un 'wake up' a una de buenos pechotes de madrugada, bro",
  "quién es más probable a tirarse a la más fresca del local",
  "quién es más probable a tener una diarrea que flipas tras beberse una Estrella bien fría, wake up",
  "quién es más probable a decir 'nel' al ver a la de los pechotes tremendos",
  "quién es más probable a actuar como un animal y soltar una diarrea que flipas en un bar, damn",
  "quién es más probable a hacer de machista opresor con una furcia, nel",
  "quién es más probable a robar mi Huevox para impresionar a una putilla",
  "quién es más probable a preferir una Estrella antes que a la de los pechotes tremendos, animal",
  "quién es más probable a actuar como un animal y soltar una diarrea que flipas en un bar, amai",
  "quién es más probable a dejar un tapacorrer y echarle la culpa a la de los pechotes tremendos, nel",
  "quién es más probable a robar mi Huevox para impresionar a la de los pechotes tremendos, bro",
  "quién es más probable a tener un tapacorrer brutal tras beberse una Estrella bien fría",
  "quién es más probable a preferir una Estrella bien fría antes que a una putilla",
  "quién es más probable a hacer de machista opresor con una de buenos pechotes, amai",
  "quién es más probable a mandarle un 'wake up' a una putilla de madrugada, wake up",
  "quién es más probable a tener una diarrea que flipas tras beberse una Estrella bien fría",
  "quién es más probable a preferir una Estrella antes que a la de los pechotes tremendos",
  "quién es más probable a tener un tapacorrer brutal tras beberse una Estrella bien fría, animal",
  "quién es más probable a mandarle un 'wake up' a una putilla de madrugada, damn",
  "quién es más probable a mandarle un 'wake up' a una putilla de madrugada",
  "quién es más probable a preferir mi Estrella Galicia antes que a una putilla",
  "quién es más probable a tener diarrea explosiva tras beberse mi Estrella Galicia, sel",
  "quién es más probable a acabar con una furcia a las 6 am, amai",
  "quién es más probable a actuar como un animal y soltar diarrea explosiva en un bar, banco",
  "quién es más probable a tener diarrea en el peor puto momento",
  "quién es más probable a comportarse como un puto animal borracho",
  "quién es más probable a decir 'banco' al ver a la tía más fresca, damn",
  "quién es más probable a preferir una Estrella antes que a una putilla, nel",
  "quién es más probable a tener diarrea explosiva tras beberse mi Estrella Galicia",
  "quién es más probable a preferir una Estrella antes que a una de buenos pechotes, wake up",
  "quién es más probable a preferir mi Estrella Galicia antes que a la tía más fresca, damn",
  "quién es más probable a mandarle un 'wake up' a la tía más fresca de madrugada, bro",
  "quién es más probable a decir 'wake up' al ver a una putilla, wake up",
  "quién es más probable a dejar un tapacorrer y echarle la culpa a la tía más fresca, bro",
  "quién es más probable a mandarle un 'wake up' a una putilla de madrugada, sel",
  "quién es más probable a dejar un tapacorrer y echarle la culpa a una de buenos pechotes, banco",
  "quién es más probable a hacer de machista opresor con una putilla",
  "quién es más probable a tratar el Huevox como si fuera su hijo, banco",
  "quién es más probable a decir 'banco' al ver a la de los pechotes tremendos, banco",
  "quién es más probable a preferir una Estrella bien fría antes que a una furcia",
  "quién es más probable a dejar un tapacorrer y echarle la culpa a una fresca, banco",
  "quién es más probable a dejar un tapacorrer y echarle la culpa a una furcia, nel",
  "quién es más probable a actuar como un animal y soltar un tapacorrer brutal en un bar, nel",
  "quién es más probable a tener una diarrea que flipas tras beberse una Estrella",
  "quién es más probable a hacer de machista opresor con la tía más fresca, amai",
  "quién es más probable a robar mi Huevox para impresionar a una de buenos pechotes, sel",
  "quién es más probable a mandarle un 'wake up' a la de los pechotes tremendos de madrugada, nel"
];

// ── State ──────────────────────────────────────────────────
let myId = '';
let myName = '';
let roomCode = '';
let hasVoted = false;
let isReady = false;
let allQuestions = [...originalQuestions];

let pollInterval = null;
let lastStateStr = '';

// ── DOM Refs ───────────────────────────────────────────────
const screens = {
  login: document.getElementById('screen-login'),
  connecting: document.getElementById('screen-connecting'),
  lobby: document.getElementById('screen-lobby'),
  question: document.getElementById('screen-question'),
  roundResults: document.getElementById('screen-round-results'),
  gameover: document.getElementById('screen-gameover'),
};

const dom = {
  inputName: document.getElementById('input-name'),
  inputCode: document.getElementById('input-code'),
  btnCreate: document.getElementById('btn-create'),
  btnJoin: document.getElementById('btn-join'),
  loginError: document.getElementById('login-error'),
  connectingText: document.getElementById('connecting-text'),
  roomCodeValue: document.getElementById('room-code-value'),
  btnCopyCode: document.getElementById('btn-copy-code'),
  playerCount: document.getElementById('player-count'),
  playersList: document.getElementById('players-list'),
  btnReady: document.getElementById('btn-ready'),
  btnReadyText: document.querySelector('#btn-ready .btn-text'),
  questionNumber: document.getElementById('question-number'),
  totalQuestions: document.getElementById('total-questions'),
  progressFill: document.getElementById('progress-fill'),
  questionText: document.getElementById('question-text'),
  voteOptions: document.getElementById('vote-options'),
  voteStatus: document.getElementById('vote-status'),
  votesCast: document.getElementById('votes-cast'),
  votesTotal: document.getElementById('votes-total'),
  roundQuestion: document.getElementById('round-question'),
  roundVotes: document.getElementById('round-votes'),
  btnNextQuestion: document.getElementById('btn-next-question'),
  finalRanking: document.getElementById('final-ranking'),
  btnPlayAgain: document.getElementById('btn-play-again'),
};

// ── Screen Management ──────────────────────────────────────
function showScreen(name) {
  Object.values(screens).forEach((el) => el.classList.remove('active'));
  screens[name].classList.add('active');
  if (name === 'question' && navigator.vibrate) navigator.vibrate(80);
}

// ── Error Display ──────────────────────────────────────────
function showError(msg) {
  dom.loginError.textContent = msg;
  dom.loginError.classList.add('show');
  setTimeout(() => dom.loginError.classList.remove('show'), 5000);
}

// ── Utilities ──────────────────────────────────────────────
function getInitial(name) {
  return name.charAt(0).toUpperCase();
}

function escapeHtml(str) {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

function escapeAttr(str) {
  return str.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function log(msg) {
  console.log(`[QEMP] ${msg}`);
}

// Simple seeded PRNG (mulberry32)
function seededRandom(seedStr) {
  let h = 0xdeadbeef;
  for(let i = 0; i < seedStr.length; i++)
      h = Math.imul(h ^ seedStr.charCodeAt(i), 2654435761);
  let a = h ^ (h >>> 16);
  return function() {
    a += 0x6D2B79F5;
    let t = a;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}

function shuffleQuestions(questions, seed) {
  const arr = [...questions]; // copy
  const rng = seededRandom(seed);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ── API Communication (JSONP to completely bypass CORS) ────
function apiCall(action, data = {}) {
  return new Promise((resolve, reject) => {
    const callbackName = 'jsonp_' + Math.round(100000 * Math.random());
    window[callbackName] = function(response) {
      delete window[callbackName];
      document.body.removeChild(script);
      resolve(response);
    };
    
    const script = document.createElement('script');
    let url = API_URL + '?action=' + action + '&callback=' + callbackName;
    for (let key in data) {
       url += '&' + key + '=' + encodeURIComponent(data[key]);
    }
    
    script.src = url;
    script.onerror = () => {
      delete window[callbackName];
      document.body.removeChild(script);
      reject(new Error('No se pudo conectar (¿Quizás necesites iniciar sesión en Google en tu navegador?)'));
    };
    document.body.appendChild(script);
  });
}

// ── Polling & State Management ─────────────────────────────
async function pollState() {
  if (!roomCode || !myId) return;
  try {
    const data = await apiCall("poll", { roomCode: roomCode, playerId: myId });
    
    if (data.error) {
      if (data.error === "Room not found") {
         clearInterval(pollInterval);
         showError("La sala ha sido cerrada o ya no existe.");
         showScreen('login');
      }
      return;
    }
    
    const stateStr = JSON.stringify(data);
    if (stateStr !== lastStateStr) {
      lastStateStr = stateStr;
      handleStateUpdate(data);
    }
  } catch(e) {
    console.error("Poll error:", e);
  }
}

function handleStateUpdate(state) {
  handlePlayersUpdate(state.players);

  if (state.gameState === 'lobby') {
    if (!screens.lobby.classList.contains('active')) showScreen('lobby');
    hasVoted = false;
  } else if (state.gameState === 'playing') {
    const isNewQuestion = !screens.question.classList.contains('active') || dom.questionNumber.textContent !== String(state.currentQuestionIndex + 1);
    if (isNewQuestion) {
        handleNewQuestion(state);
    } else {
        handleVoteUpdate(state);
    }
  } else if (state.gameState === 'showing-results') {
    if (!screens.roundResults.classList.contains('active')) {
        handleRoundResults(state);
    }
  } else if (state.gameState === 'game-over') {
    if (!screens.gameover.classList.contains('active')) {
        handleGameOver(state);
    }
  }

  // Determine an invisible "Room Leader" for automated triggers (so we don't spam API)
  const isRoomLeader = state.players.length > 0 && state.players[0].id === myId;

  if (isRoomLeader) {
    if (state.gameState === 'lobby') {
      const allReady = state.players.length >= 2 && state.players.every(p => p.ready);
      if (allReady && !window.startingGame) {
         window.startingGame = true;
         apiCall('start', { playerId: myId }).then(() => {
             window.startingGame = false;
             pollState(); // Force instant refresh
         });
      }
    }
  }
  
  // Sync my local ready state if needed
  const me = state.players.find(p => p.id === myId);
  if (me) {
      isReady = me.ready;
      dom.btnReady.classList.toggle('ready', isReady);
      dom.btnReadyText.textContent = isReady ? '¡Listo! ✓' : 'Estoy listo';
  }
}

// ── UI Updaters ────────────────────────────────────────────

function handlePlayersUpdate(players) {
  dom.playerCount.textContent = players.length;
  dom.playersList.innerHTML = players
    .map(
      (p, i) => `
      <div class="player-item ${p.ready ? 'ready' : ''}" style="animation-delay: ${i * 0.06}s">
        <span class="player-avatar">${getInitial(p.name)}</span>
        <span class="player-name">${escapeHtml(p.name)}</span>
        <span class="player-status">${p.ready ? '✅' : '⏳'}</span>
      </div>`
    )
    .join('');
}

function handleNewQuestion(state) {
  hasVoted = false;

  dom.questionNumber.textContent = state.currentQuestionIndex + 1;
  dom.totalQuestions.textContent = allQuestions.length;
  dom.progressFill.style.width = `${((state.currentQuestionIndex + 1) / allQuestions.length) * 100}%`;
  
  const questionText = allQuestions[state.currentQuestionIndex] || "Pregunta desconocida";
  dom.questionText.textContent = questionText + '?';

  dom.voteOptions.innerHTML = state.players
    .map(
      (p, i) => `
      <button class="btn-vote" data-name="${escapeAttr(p.name)}" style="animation-delay: ${i * 0.08}s">
        <span class="vote-avatar">${getInitial(p.name)}</span>
        <span class="vote-name">${escapeHtml(p.name)}</span>
      </button>`
    )
    .join('');

  dom.voteOptions.querySelectorAll('.btn-vote').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (hasVoted) return;
      hasVoted = true;

      dom.voteOptions.querySelectorAll('.btn-vote').forEach((b) => b.classList.add('disabled'));
      btn.classList.remove('disabled');
      btn.classList.add('selected');

      const votedName = btn.dataset.name;
      // Show waiting text instantly for snappy UI
      dom.voteStatus.classList.remove('hidden');
      if (navigator.vibrate) navigator.vibrate(40);
      
      apiCall('vote', { playerId: myId, targetName: votedName, roomCode: roomCode })
        .then(() => pollState()); // Instant refresh
    });
  });

  dom.votesCast.textContent = state.votesCast;
  dom.votesTotal.textContent = state.players.length;
  dom.voteStatus.classList.add('hidden');

  showScreen('question');
}

function handleVoteUpdate(state) {
  dom.votesCast.textContent = state.votesCast;
  dom.votesTotal.textContent = state.players.length;
  if (hasVoted) dom.voteStatus.classList.remove('hidden');
}

function handleRoundResults(state) {
  const questionText = allQuestions[state.currentQuestionIndex] || "Pregunta desconocida";
  dom.roundQuestion.textContent = '¿Quién es más probable que ' + questionText + '?';

  const sorted = Object.entries(state.roundResults).sort((a, b) => b[1] - a[1]);
  const maxVotes = Math.max(...sorted.map(([, v]) => v), 1);

  dom.roundVotes.innerHTML = sorted
    .map(([name, count], i) => {
      const pct = maxVotes > 0 ? (count / maxVotes) * 100 : 0;
      const isWinner = i === 0 && count > 0;
      return `
        <div class="result-row ${isWinner ? 'winner' : ''}" style="animation-delay: ${i * 0.12}s">
          <div class="result-info">
            <span class="result-avatar ${isWinner ? 'winner-avatar' : ''}">${getInitial(name)}</span>
            <span class="result-name">${escapeHtml(name)}</span>
            <span class="result-count">${count} voto${count !== 1 ? 's' : ''}</span>
          </div>
          <div class="result-bar-container">
            <div class="result-bar ${isWinner ? 'winner-bar' : ''}"
                 style="--bar-width: ${pct}%; animation-delay: ${i * 0.12 + 0.2}s"></div>
          </div>
        </div>`;
    })
    .join('');

  showScreen('roundResults');
}

function handleGameOver(state) {
  const sorted = [...state.players].sort((a, b) => b.stats - a.stats);
  const maxVotes = sorted.length > 0 ? sorted[0].stats : 1;

  dom.finalRanking.innerHTML = sorted
    .map((p, i) => {
      const medal = i === 0 ? '👑' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`;
      const barPct = maxVotes > 0 ? (p.stats / maxVotes) * 100 : 0;
      return `
        <div class="ranking-item ${i === 0 ? 'champion' : ''}" style="animation-delay: ${i * 0.15}s">
          <div class="ranking-medal">${medal}</div>
          <div class="ranking-info">
            <span class="ranking-name">${escapeHtml(p.name)}</span>
            <span class="ranking-votes">${p.stats} voto${p.stats !== 1 ? 's' : ''} totales</span>
          </div>
          <div class="ranking-bar-container">
            <div class="ranking-bar" style="--bar-width: ${barPct}%; animation-delay: ${i * 0.15 + 0.3}s"></div>
          </div>
        </div>`;
    })
    .join('');

  showScreen('gameover');
  if (navigator.vibrate) navigator.vibrate([100, 50, 100, 50, 200]);
}

// ── Event Listeners ────────────────────────────────────────

dom.btnCreate.addEventListener('click', async () => {
  const name = dom.inputName.value.trim();
  if (!name) { showError('Escribe tu nombre'); return; }
  if (name.length > 15) { showError('Nombre demasiado largo (máx. 15)'); return; }

  myName = name;
  dom.btnCreate.disabled = true;
  dom.btnJoin.disabled = true;
  showScreen('connecting');
  dom.connectingText.textContent = 'Creando sala en Google Sheets…';

  const res = await apiCall('create', { name: myName });
  dom.btnCreate.disabled = false;
  dom.btnJoin.disabled = false;
  
  if (res.error) {
    showScreen('login');
    showError(res.error);
  } else {
    roomCode = res.roomCode;
    myId = res.playerId;
    
    // Aleatorizar preguntas basándonos en el código de la sala
    allQuestions = shuffleQuestions(originalQuestions, roomCode);
    
    dom.roomCodeValue.textContent = roomCode;
    showScreen('lobby');
    pollInterval = setInterval(pollState, 1500); // Polling más rápido (1.5s)
    log('Room created: ' + roomCode);
  }
});

dom.btnJoin.addEventListener('click', async () => {
  const name = dom.inputName.value.trim();
  const code = dom.inputCode.value.trim().toUpperCase();

  if (!name) { showError('Escribe tu nombre'); return; }
  if (name.length > 15) { showError('Nombre demasiado largo (máx. 15)'); return; }
  if (!code || code.length !== 4) { showError('Introduce el código de 4 caracteres'); return; }

  myName = name;
  roomCode = code;

  dom.btnCreate.disabled = true;
  dom.btnJoin.disabled = true;
  showScreen('connecting');
  dom.connectingText.textContent = 'Conectando a la sala…';

  const res = await apiCall('join', { name: myName, roomCode: roomCode });
  dom.btnCreate.disabled = false;
  dom.btnJoin.disabled = false;

  if (res.error) {
    showScreen('login');
    showError(res.error);
  } else {
    myId = res.playerId;
    
    // Aleatorizar preguntas basándonos en el código de la sala
    allQuestions = shuffleQuestions(originalQuestions, roomCode);
    
    dom.roomCodeValue.textContent = roomCode;
    showScreen('lobby');
    pollInterval = setInterval(pollState, 1500); // Polling más rápido (1.5s)
    log('Joined room: ' + roomCode);
  }
});

dom.inputName.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    if (dom.inputCode.value.trim()) dom.btnJoin.click();
    else dom.btnCreate.click();
  }
});

dom.inputCode.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') dom.btnJoin.click();
});

dom.inputCode.addEventListener('input', () => {
  dom.inputCode.value = dom.inputCode.value.toUpperCase();
});

dom.btnCopyCode.addEventListener('click', () => {
  navigator.clipboard.writeText(roomCode).then(() => {
    dom.btnCopyCode.textContent = '✅';
    setTimeout(() => (dom.btnCopyCode.textContent = '📋'), 2000);
  }).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = roomCode;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    dom.btnCopyCode.textContent = '✅';
    setTimeout(() => (dom.btnCopyCode.textContent = '📋'), 2000);
  });
});

dom.btnReady.addEventListener('click', () => {
  isReady = !isReady;
  // Botón optimista
  dom.btnReady.classList.toggle('ready', isReady);
  dom.btnReadyText.textContent = isReady ? '¡Listo! ✓' : 'Estoy listo';
  apiCall('ready', { playerId: myId }).then(() => pollState());
});

dom.btnNextQuestion.addEventListener('click', () => {
  dom.btnNextQuestion.disabled = true;
  dom.btnNextQuestion.textContent = 'Cargando...';
  apiCall('nextQuestion', { playerId: myId, totalQuestions: allQuestions.length }).then(() => {
    dom.btnNextQuestion.disabled = false;
    dom.btnNextQuestion.textContent = 'Siguiente pregunta ➔';
    pollState(); // Instant refresh
  });
});

dom.btnPlayAgain.addEventListener('click', () => {
  apiCall('playAgain', { playerId: myId }).then(() => pollState());
});
