// TTS (Text To Speech) ============================================

// 음성 합성 객체
const synth = window.speechSynthesis;

// 음성 합성 기능을 위한 설정
const voices = synth.getVoices();
const voicesOptions = new SpeechSynthesisUtterance();

// 말하기
function speak(text) {
  // 선택한 목소리
  voicesOptions.voice = voices.find((voice) => voice.lang === "ko-KR");

  // 읽는 속도
  voicesOptions.rate = document.getElementById("rate").value;

  // 음 높이
  voicesOptions.pitch = document.getElementById("pitch").value;

  // 음량
  voicesOptions.volume = document.getElementById("volume").value;

  // 읽을 Text
  voicesOptions.text = text;

  synth.speak(voicesOptions);
}

// 플레이 버튼
const startSpeech = document.getElementById("startSpeech");
startSpeech.addEventListener("click", () => {
  const input = document.getElementById("input");
  speak(input.value);
});

// 멈춤 버튼
const stopSpeech = document.getElementById("stopSpeech");
stopSpeech.addEventListener("click", () => {
  synth.cancel();
});

// STT (Speech To Text) ============================================

// 음성 인식 객체 생성
const recognition = new webkitSpeechRecognition();

// 인식 설정
recognition.lang = "ko-KR"; // 인식할 언어 설정
recognition.continuous = true; // 연속적으로 인식할지 여부 설정
recognition.interimResults = false; // 중간 결과를 출력할지 여부 설정

recognition.onresult = (e) => {
  const last = e.results.length - 1;
  const speech = e.results[last][0].transcript;
  document.getElementById("input").value = speech;
};

// 음성 인식 시작
const startText = document.getElementById("startText");
startText.addEventListener("click", () => {
  recognition.start();
});

// 음성 인식 종료
const stopText = document.getElementById("stopText");
stopText.addEventListener("click", (event) => {
  recognition.stop();
});

// record =====================================

// 오디오 녹음을 위한 미디어 스트림 객체 생성
// navigator.mediaDevices
//   .getUserMedia({ audio: true })
//   .then(function (stream) {
//     const mediaRecorder = new MediaRecorder(stream);
//     let chunks = [];

//     // 클릭 이벤트 발생 시 녹음 시작
//     document.getElementById("startRecord").addEventListener("click", () => {
//       mediaRecorder.start();
//     });

//     // 클릭 이벤트 발생 시 녹음 종료 및 blob 생성
//     document.getElementById("stopRecord").addEventListener("click", () => {
//       mediaRecorder.stop();
//     });

//     // 녹음된 데이터 처리 이벤트 핸들러 등록
//     mediaRecorder.addEventListener("dataavailable", function (e) {
//       chunks.push(e.data);
//     });

//     // 녹음 종료 이벤트 핸들러 등록
//     mediaRecorder.addEventListener("stop", function () {
//       // blob 형식으로 녹음된 데이터 생성
//       const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
//       console.log("Blob created: ", blob);

//       // 녹음된 오디오를 재생하는 audio 요소 생성
//       const audio = document.createElement("audio");
//       audio.controls = true;
//       const audioUrl = URL.createObjectURL(blob);
//       audio.src = audioUrl;
//       document.body.appendChild(audio);

//       // chunks 초기화
//       chunks = [];
//     });
//   })
//   .catch(function (err) {
//     console.log("Error:", err);
//   });
