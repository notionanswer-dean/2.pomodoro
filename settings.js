// 타이머 시간을 저장할 localStorage 키 (메인 페이지와 공유)
const STORAGE_KEY = "pomodoroMinutes";

// 설정 가능한 시간 범위 (분)
const MIN_MINUTES = 1;
const MAX_MINUTES = 60;

// DOM 요소 참조
const timeInput = document.getElementById("timeInput");
const saveBtn = document.getElementById("saveBtn");
const errorMessage = document.getElementById("errorMessage");

// 저장된 값이 있으면 입력창에 반영
const savedMinutes = localStorage.getItem(STORAGE_KEY);
if (savedMinutes !== null) {
  timeInput.value = savedMinutes;
}

// 에러 메시지 표시/초기화
function showError(message) {
  errorMessage.textContent = message;
}

// 저장 처리
function saveSetting() {
  const rawValue = timeInput.value.trim();

  // 시간을 비워둔 채로는 저장 불가
  if (rawValue === "") {
    showError("시간을 입력해 주세요.");
    return;
  }

  const minutes = Number(rawValue);

  // 숫자가 아니거나 정수가 아닌 경우
  if (!Number.isInteger(minutes)) {
    showError("올바른 숫자를 입력해 주세요.");
    return;
  }

  // 1분 이상, 60분 이하만 허용
  if (minutes < MIN_MINUTES || minutes > MAX_MINUTES) {
    showError(`${MIN_MINUTES}분 이상 ${MAX_MINUTES}분 이하로 입력해 주세요.`);
    return;
  }

  // 유효한 값 → localStorage에 저장 (새로고침 시에도 유지)
  localStorage.setItem(STORAGE_KEY, String(minutes));
  showError("");

  // 저장 완료 안내
  errorMessage.style.color = "#b6f0c0";
  showError("저장되었습니다!");
}

// 저장 버튼 이벤트 핸들러 등록
saveBtn.addEventListener("click", saveSetting);
