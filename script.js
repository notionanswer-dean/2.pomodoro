// 기본 설정 시간 (분 단위)
const DEFAULT_MINUTES = 25;

// 설정 페이지와 공유하는 localStorage 키
const STORAGE_KEY = "pomodoroMinutes";

// 저장된 설정 시간(분)을 읽어온다. 없거나 유효하지 않으면 기본값 사용
function getSavedMinutes() {
  const saved = Number(localStorage.getItem(STORAGE_KEY));
  return Number.isInteger(saved) && saved > 0 ? saved : DEFAULT_MINUTES;
}

// 타이머 상태
let remainingSeconds = getSavedMinutes() * 60; // 남은 시간(초)
let intervalId = null; // setInterval 식별자 (null이면 정지 상태)

// DOM 요소 참조
const timerEl = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");

// 남은 시간을 "MM:SS" 형식으로 화면에 출력
function renderTimer() {
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const mm = String(minutes).padStart(2, "0");
  const ss = String(seconds).padStart(2, "0");
  timerEl.textContent = `${mm}:${ss}`;
}

// 타이머 시작
function startTimer() {
  // 이미 동작 중이거나 시간이 0이면 중복 실행 방지
  if (intervalId !== null || remainingSeconds <= 0) return;

  intervalId = setInterval(() => {
    remainingSeconds -= 1;
    renderTimer();

    // 시간이 다 되면 자동 정지
    if (remainingSeconds <= 0) {
      stopTimer();
    }
  }, 1000);
}

// 타이머 정지
function stopTimer() {
  if (intervalId === null) return;
  clearInterval(intervalId);
  intervalId = null;
}

// 타이머 초기화 (설정된 시간으로 되돌림)
function resetTimer() {
  stopTimer();
  remainingSeconds = getSavedMinutes() * 60;
  renderTimer();
}

// 이벤트 핸들러 등록
startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);

// 다른 탭/창에서 설정이 변경되면, 타이머 정지 상태일 때 즉시 반영
window.addEventListener("storage", (event) => {
  if (event.key === STORAGE_KEY && intervalId === null) {
    remainingSeconds = getSavedMinutes() * 60;
    renderTimer();
  }
});

// 초기 화면 표시
renderTimer();
