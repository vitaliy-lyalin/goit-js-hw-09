import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const datetimePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      startBtn.setAttribute('disabled', 'true');
      Notify.failure('Please choose a date in the future');
    } else startBtn.removeAttribute('disabled');
  },
};

styleTimer();

startBtn.setAttribute('disabled', 'true');
startBtn.addEventListener('click', onStartBtnClick);

const fp = flatpickr(datetimePicker, options);

function onStartBtnClick() {
  datetimePicker.setAttribute('disabled', 'true');
  startBtn.setAttribute('disabled', 'true');

  const timer = setInterval(() => {
    const currentTimeEnd = fp.selectedDates[0] - Date.now();
    const { days, hours, minutes, seconds } = convertMs(currentTimeEnd);

    if (currentTimeEnd < 1000) {
      clearInterval(timer);
      datetimePicker.removeAttribute('disabled');
    }
    dataDays.textContent = leftFillNum(days);
    dataHours.textContent = leftFillNum(hours);
    dataMinutes.textContent = leftFillNum(minutes);
    dataSeconds.textContent = leftFillNum(seconds);
    console.log('countdown timer:', convertMs(currentTimeEnd));
  }, 1000);
}

// Leads value to string and adds zero to the beginning
function leftFillNum(value) {
  return value.toString().padStart(2, '0');
}

// Add styles for timer
function styleTimer() {
  const timerBox = document.querySelector('.timer');
  const timerBoxField = document.querySelectorAll('.field');
  const timerBoxValue = document.querySelectorAll('.value');
  const timerBoxLabel = document.querySelectorAll('.label');

  timerBox.style.display = 'flex';
  timerBox.style.gap = '10px';
  timerBox.style.marginTop = '20px';

  timerBoxField.forEach(element => {
    element.style.display = 'flex';
    element.style.flexDirection = 'column';
    element.style.alignItems = 'center';
  });

  timerBoxValue.forEach(element => {
    element.style.fontSize = '32px';
  });
  timerBoxLabel.forEach(element => {
    element.style.fontSize = '12px';
  });
}

// Convert milliseconds per days, hours, minutes, seconds
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
