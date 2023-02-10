const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let timerId = null;

stopBtn.setAttribute('disabled', 'true');

startBtn.addEventListener('click', () => {
  document.body.style.backgroundColor = getRandomHexColor();
  startBtn.setAttribute('disabled', 'true');
  stopBtn.removeAttribute('disabled');

  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  stopBtn.setAttribute('disabled', true);
  startBtn.removeAttribute('disabled');
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
