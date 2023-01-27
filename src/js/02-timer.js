import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const timerBox = document.querySelector('.timer');
const timerBoxField = document.querySelectorAll('.field');
const timerBoxValue = document.querySelectorAll('.value');
const timerBoxLabel = document.querySelectorAll('.label');

// console.log(timerBox);
// console.log(timerBoxField);

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
