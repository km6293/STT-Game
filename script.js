// game.txt파일에 있는 단어들을 들고온다.
const txtFilePath = "game.txt"; // txt 파일 경로
const request = new XMLHttpRequest();
let vocabularyList = [];
request.open("GET", txtFilePath, true);
request.onreadystatechange = function () {
  if (request.readyState === 4 && request.status === 200) {
    const fileContent = request.responseText;
    vocabularyList = fileContent.split(",");
  }
};
request.send();

// 게임 요소 선택
const startBtn = document.getElementById("start-btn");
const gameContainer = document.getElementById("game-container");
const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const scoreDisplay = document.getElementById("score");
const popup = document.getElementById("popup");
const finalScoreDisplay = document.getElementById("final-score");
const yesBtn = document.getElementById("yes-btn");
const darkModeBtn = document.getElementById("dark-mode-btn");

// 초기 변수 설정
let gameStarted = false;
let score = 0;
let obstacleSpeed = 1; // 장애물 이동 속도
let obstacleInterval; // 장애물 이동 setInterval ID
let recognition; // 음성인식 객체

// 음성인식 지원 여부 확인
if (!("webkitSpeechRecognition" in window)) {
  alert("음성인식이 지원되지 않는 브라우저입니다.");
} else {
  recognition = new webkitSpeechRecognition();
  recognition.lang = "ko-KR"; // 언어 설정
  recognition.continuous = true; // 계속해서 음성인식 수행
  // 연속적으로 음성 인식 결과를 받아오기 위해 interimResults 속성을 true로 설정.
  recognition.interimResults = true;
  recognition.onresult = function (event) {
    // 난수 생성
    let randomNumber =
      Math.floor(Math.random() * (vocabularyList.length - 1)) + 1;

    // const transcript = event.results[event.results.length - 1][0].transcript;
    // console.log(event.results[event.results.length - 1]);

    if (event.results[event.results.length - 1].isFinal === false) {
      playerJump();
    }
  }; // 음성인식 시작
}
function startRecognition() {
  recognition.start();
}

// 음성인식 멈춤
function stopRecognition() {
  recognition.stop();
}

// 플레이어 점프
function playerJump() {
  player.style.bottom = "100px";
  setTimeout(() => {
    player.style.bottom = "0px";
  }, 200);
}

// 게임 시작
function startGame() {
  gameStarted = true;
  score = 0;
  scoreDisplay.innerText = "점수: " + score;
  obstacle.style.right = "-50px";
  obstacleInterval = setInterval(function () {
    obstacle.style.right =
      parseInt(obstacle.style.right) + obstacleSpeed + "px";
    if (parseInt(obstacle.style.right) >= gameContainer.offsetWidth - 100) {
      obstacle.style.right = "-50px";
      score++;
      scoreDisplay.innerText = "점수: " + score;
      obstacleSpeed += 0.5;
    }
    if (checkCollision(player, obstacle)) {
      endGame();
    }
  }, 10);
  startRecognition();
}

// 게임 종료
function endGame() {
  stopRecognition();
  clearInterval(obstacleInterval);
  gameStarted = false;
  popup.style.display = "block";
  finalScoreDisplay.innerText = score;
}

// 재시작
function restartGame() {
  popup.style.display = "none";
  startGame();
}

// 충돌 검사
function checkCollision(player, obstacle) {
  const playerRect = player.getBoundingClientRect();
  const obstacleRect = obstacle.getBoundingClientRect();
  return !(
    playerRect.bottom < obstacleRect.top ||
    playerRect.top > obstacleRect.bottom ||
    playerRect.right < obstacleRect.left ||
    playerRect.left > obstacleRect.right
  );
}

// 이벤트 리스너 추가
startBtn.addEventListener("click", function () {
  if (!gameStarted) {
    startGame();
  }
});

yesBtn.addEventListener("click", function () {
  restartGame();
});

// 다크모드 on/off 버튼 클릭 시 이벤트 처리
darkModeBtn.addEventListener("click", function () {
  const body = document.querySelector("body");
  const buttons = document.querySelectorAll("button");
  const gameElements = document.querySelectorAll("#game-container div");
  const scoreDisplay = document.getElementById("score");

  body.classList.toggle("dark-mode");
  buttons.forEach((button) => button.classList.toggle("dark-mode"));
  gameElements.forEach((element) => element.classList.toggle("dark-mode"));
  scoreDisplay.classList.toggle("dark-mode");

  const darkModeText = body.classList.contains("dark-mode")
    ? "다크모드: On"
    : "다크모드: Off";
  darkModeBtn.innerText = darkModeText;
});
