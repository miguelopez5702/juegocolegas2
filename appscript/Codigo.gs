function setup() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ["Game", "Players", "Votes"];
  sheets.forEach(function(s) {
    if (!ss.getSheetByName(s)) {
      ss.insertSheet(s);
    }
  });
  
  var game = ss.getSheetByName("Game");
  if (game.getLastRow() === 0) {
    game.appendRow(["roomCode", "state", "currentQuestionIndex", "questions", "roundResults"]);
  }
  
  var players = ss.getSheetByName("Players");
  if (players.getLastRow() === 0) {
    players.appendRow(["id", "name", "ready", "isHost", "stats"]);
  }
  
  var votes = ss.getSheetByName("Votes");
  if (votes.getLastRow() === 0) {
    votes.appendRow(["playerId", "targetName", "questionIndex"]);
  }
}

function doPost(e) {
  try {
    var params = JSON.parse(e.postData.contents);
    var action = params.action;
    
    // Auto setup
    setup();
    
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var result = {};
    
    switch(action) {
      case "create":
        result = createRoom(ss, params);
        break;
      case "join":
        result = joinRoom(ss, params);
        break;
      case "ready":
        result = toggleReady(ss, params);
        break;
      case "start":
        result = startGame(ss, params);
        break;
      case "vote":
        result = submitVote(ss, params);
        break;
      case "nextQuestion":
        result = nextQuestion(ss, params);
        break;
      case "playAgain":
        result = playAgain(ss, params);
        break;
      case "leave":
        result = leaveRoom(ss, params);
        break;
      default:
        result = { error: "Unknown action" };
    }
    
    return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({error: error.message})).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    var action = e.parameter.action;
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    
    if (action === "poll") {
      var roomCode = e.parameter.roomCode;
      var state = getGameState(ss, roomCode);
      return ContentService.createTextOutput(JSON.stringify(state)).setMimeType(ContentService.MimeType.JSON);
    }
    
    return ContentService.createTextOutput(JSON.stringify({status: "QEMP API is running"})).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({error: error.message})).setMimeType(ContentService.MimeType.JSON);
  }
}

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

function generateRoomCode() {
  var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  var code = '';
  for (var i = 0; i < 4; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

function clearSheet(sheet) {
  if (sheet.getLastRow() > 1) {
    sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).clearContent();
  }
}

function createRoom(ss, params) {
  var gameSheet = ss.getSheetByName("Game");
  var playersSheet = ss.getSheetByName("Players");
  var votesSheet = ss.getSheetByName("Votes");
  
  clearSheet(gameSheet);
  clearSheet(playersSheet);
  clearSheet(votesSheet);
  
  var roomCode = generateRoomCode();
  gameSheet.getRange(2, 1, 1, 5).setValues([[roomCode, "lobby", 0, "[]", "{}"]]);
  
  var playerId = generateId();
  playersSheet.appendRow([playerId, params.name, false, true, 0]);
  
  return { success: true, roomCode: roomCode, playerId: playerId, isHost: true };
}

function joinRoom(ss, params) {
  var gameSheet = ss.getSheetByName("Game");
  if (gameSheet.getLastRow() < 2) return { error: "No hay ninguna sala activa." };
  
  var currentCode = gameSheet.getRange(2, 1).getValue();
  if (currentCode !== params.roomCode) {
    return { error: "No se encontró la sala. ¿El código es correcto?" };
  }
  
  var state = gameSheet.getRange(2, 2).getValue();
  if (state !== "lobby") {
    return { error: "El juego ya ha empezado. Espera a que termine." };
  }
  
  var playersSheet = ss.getSheetByName("Players");
  var playersData = playersSheet.getDataRange().getValues();
  for (var i = 1; i < playersData.length; i++) {
    if (playersData[i][1].toLowerCase() === params.name.toLowerCase()) {
      return { error: "Ese nombre ya está en uso." };
    }
  }
  
  var playerId = generateId();
  playersSheet.appendRow([playerId, params.name, false, false, 0]);
  
  return { success: true, playerId: playerId, isHost: false };
}

function toggleReady(ss, params) {
  var playersSheet = ss.getSheetByName("Players");
  var data = playersSheet.getDataRange().getValues();
  
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] === params.playerId) {
      var currentReady = data[i][2];
      playersSheet.getRange(i + 1, 3).setValue(!currentReady);
      break;
    }
  }
  
  return { success: true };
}

function startGame(ss, params) {
  var gameSheet = ss.getSheetByName("Game");
  gameSheet.getRange(2, 2).setValue("playing");
  gameSheet.getRange(2, 3).setValue(0);
  gameSheet.getRange(2, 4).setValue(JSON.stringify(params.questions || []));
  
  var votesSheet = ss.getSheetByName("Votes");
  clearSheet(votesSheet);
  
  var playersSheet = ss.getSheetByName("Players");
  var data = playersSheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    playersSheet.getRange(i + 1, 5).setValue(0); // reset stats
  }
  
  return { success: true };
}

function submitVote(ss, params) {
  var gameSheet = ss.getSheetByName("Game");
  var state = gameSheet.getRange(2, 2).getValue();
  if (state !== "playing") return { error: "Not voting phase" };
  
  var qIndex = gameSheet.getRange(2, 3).getValue();
  
  var votesSheet = ss.getSheetByName("Votes");
  var votesData = votesSheet.getDataRange().getValues();
  
  // check if already voted
  for (var i = 1; i < votesData.length; i++) {
    if (votesData[i][0] === params.playerId && votesData[i][2] === qIndex) {
      return { success: true }; // ignore double vote
    }
  }
  
  votesSheet.appendRow([params.playerId, params.targetName, qIndex]);
  
  // Check if all voted
  var playersSheet = ss.getSheetByName("Players");
  var numPlayers = playersSheet.getLastRow() - 1;
  
  var votesForQ = 1; // including this one
  for (var j = 1; j < votesData.length; j++) {
    if (votesData[j][2] === qIndex) votesForQ++;
  }
  
  if (votesForQ >= numPlayers && numPlayers > 0) {
    calculateRoundResults(ss, qIndex, numPlayers);
  }
  
  return { success: true };
}

function calculateRoundResults(ss, qIndex, numPlayers) {
  var gameSheet = ss.getSheetByName("Game");
  var votesSheet = ss.getSheetByName("Votes");
  var playersSheet = ss.getSheetByName("Players");
  
  var votesData = votesSheet.getDataRange().getValues();
  var voteCounts = {};
  
  var playersData = playersSheet.getDataRange().getValues();
  for (var i = 1; i < playersData.length; i++) {
    voteCounts[playersData[i][1]] = 0;
  }
  
  for (var i = 1; i < votesData.length; i++) {
    if (votesData[i][2] === qIndex) {
      var target = votesData[i][1];
      if (voteCounts[target] !== undefined) {
        voteCounts[target]++;
      }
    }
  }
  
  // Update stats
  for (var i = 1; i < playersData.length; i++) {
    var name = playersData[i][1];
    var currentStats = playersData[i][4] || 0;
    playersSheet.getRange(i + 1, 5).setValue(currentStats + voteCounts[name]);
  }
  
  gameSheet.getRange(2, 2).setValue("showing-results");
  gameSheet.getRange(2, 5).setValue(JSON.stringify(voteCounts));
}

function nextQuestion(ss, params) {
  var gameSheet = ss.getSheetByName("Game");
  var qIndex = gameSheet.getRange(2, 3).getValue();
  var questions = JSON.parse(gameSheet.getRange(2, 4).getValue() || "[]");
  
  qIndex++;
  
  if (qIndex >= questions.length) {
    gameSheet.getRange(2, 2).setValue("game-over");
  } else {
    gameSheet.getRange(2, 2).setValue("playing");
    gameSheet.getRange(2, 3).setValue(qIndex);
  }
  
  return { success: true };
}

function playAgain(ss, params) {
  var gameSheet = ss.getSheetByName("Game");
  gameSheet.getRange(2, 2).setValue("lobby");
  gameSheet.getRange(2, 3).setValue(0);
  
  var playersSheet = ss.getSheetByName("Players");
  var data = playersSheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    playersSheet.getRange(i + 1, 3).setValue(false); // ready = false
  }
  
  return { success: true };
}

function leaveRoom(ss, params) {
  var playersSheet = ss.getSheetByName("Players");
  var data = playersSheet.getDataRange().getValues();
  
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] === params.playerId) {
      playersSheet.deleteRow(i + 1);
      break;
    }
  }
  
  return { success: true };
}

function getGameState(ss, roomCode) {
  var gameSheet = ss.getSheetByName("Game");
  if (!gameSheet || gameSheet.getLastRow() < 2) return { error: "No game active" };
  
  var currentCode = gameSheet.getRange(2, 1).getValue();
  if (currentCode !== roomCode) return { error: "Room not found" };
  
  var state = gameSheet.getRange(2, 2).getValue();
  var qIndex = gameSheet.getRange(2, 3).getValue();
  var questionsStr = gameSheet.getRange(2, 4).getValue();
  var questions = questionsStr ? JSON.parse(questionsStr) : [];
  var roundResultsStr = gameSheet.getRange(2, 5).getValue();
  var roundResults = roundResultsStr ? JSON.parse(roundResultsStr) : {};
  
  var playersSheet = ss.getSheetByName("Players");
  var playersData = playersSheet.getLastRow() > 1 ? playersSheet.getRange(2, 1, playersSheet.getLastRow() - 1, 5).getValues() : [];
  var players = playersData.map(function(row) {
    return {
      id: row[0],
      name: row[1],
      ready: row[2],
      isHost: row[3],
      stats: row[4]
    };
  });
  
  var votesSheet = ss.getSheetByName("Votes");
  var votesData = votesSheet.getLastRow() > 1 ? votesSheet.getRange(2, 1, votesSheet.getLastRow() - 1, 3).getValues() : [];
  var votesCast = 0;
  for (var i = 0; i < votesData.length; i++) {
    if (votesData[i][2] === qIndex) votesCast++;
  }
  
  return {
    gameState: state,
    players: players,
    currentQuestion: questions[qIndex] || "",
    currentQuestionIndex: qIndex,
    totalQuestions: questions.length,
    votesCast: votesCast,
    roundResults: roundResults
  };
}
