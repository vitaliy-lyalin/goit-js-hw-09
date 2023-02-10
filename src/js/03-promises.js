import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formSubmit = document.querySelector('.form');

formSubmit.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  const {
    elements: { delay, step, amount },
  } = event.currentTarget;
  let newDelay = Number(delay.value);

  for (let i = 1; i <= amount.value; i += 1) {
    // console.log(amount.value);
    createPromise(i, newDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    newDelay += Number(step.value);
    // console.log(newDelay);
  }
  formSubmit.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setInterval(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
