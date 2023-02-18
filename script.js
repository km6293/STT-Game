// 음성 합성 객체
const synth = window.speechSynthesis;

// 음성 합성 기능을 위한 설정
const voices = synth.getVoices();
const voicesOptions = new SpeechSynthesisUtterance();

// 목소리 종류
const voicesCountry = speechSynthesis.getVoices();
for (let i = 0; i < voicesCountry.length; i++) {
  const option = document.createElement("option");
  option.textContent = `${voicesCountry[i].name} (${voicesCountry[i].lang})`;
  option.setAttribute("data-lang", voicesCountry[i].lang);
  option.setAttribute("data-name", voicesCountry[i].name);
  document.getElementById("voiceSelect").appendChild(option);
}

// TTS(Text To Speech)
function speak(text) {
  // 선택한 목소리
  let selectVoice = document.getElementById("voiceSelect");
  voicesOptions.voice = voices.find(
    (voice) =>
      voice.lang ===
      selectVoice.options[selectVoice.selectedIndex].getAttribute("data-lang")
  );

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
const playButton = document.getElementById("button");
playButton.addEventListener("click", () => {
  const input = document.getElementById("input");
  speak(input.value);
});

// 멈춤 버튼
const stopButton = document.getElementById("stop");
stopButton.addEventListener("click", () => {
  synth.cancel();
});
