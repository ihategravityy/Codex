const warningScreen = document.querySelector("#warningScreen");
const scanScreen = document.querySelector("#scanScreen");
const revealScreen = document.querySelector("#revealScreen");
const progressBar = document.querySelector("#progressBar");
const progressText = document.querySelector("#progressText");
const scanTitle = document.querySelector("#scanTitle");
const scanMessage = document.querySelector("#scanMessage");
const checks = [...document.querySelectorAll("#checks li")];
let timer;

function show(screen) {
  [warningScreen, scanScreen, revealScreen].forEach((item) => item.classList.add("hidden"));
  screen.classList.remove("hidden");
}

function updateTime() {
  document.querySelector("#time").textContent = new Intl.DateTimeFormat([], {
    hour: "2-digit", minute: "2-digit"
  }).format(new Date());
}

function startVerification() {
  clearInterval(timer);
  show(scanScreen);
  progressBar.style.width = "0%";
  progressText.textContent = "0%";
  checks.forEach((check) => check.classList.remove("done"));
  let progress = 0;

  timer = setInterval(() => {
    progress += Math.floor(Math.random() * 9) + 4;
    progress = Math.min(progress, 100);
    progressBar.style.width = `${progress}%`;
    progressText.textContent = `${progress}%`;
    if (progress > 25) checks[0].classList.add("done");
    if (progress > 58) checks[1].classList.add("done");
    if (progress > 86) checks[2].classList.add("done");
    if (progress > 62) scanTitle.textContent = "Finalizing review…";
    if (progress > 62) scanMessage.textContent = "Almost finished with this simulated check.";
    if (progress === 100) {
      clearInterval(timer);
      setTimeout(() => show(revealScreen), 600);
    }
  }, 380);
}

document.querySelector("#verifyButton").addEventListener("click", startVerification);
document.querySelector("#restartButton").addEventListener("click", () => show(warningScreen));
updateTime();
setInterval(updateTime, 30000);
