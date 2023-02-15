const hour = document.querySelector('#hour');
const minute = document.querySelector('#minute');
const second = document.querySelector('#second');
const cs = document.querySelector('#cs');

const start = document.querySelector('#start');
const pause = document.querySelector('#pause');
const reset = document.querySelector('#reset');

let hourValue = 0;
let minuteValue = 0;
let secondValue = 0;
let csValue = 0;

let hourPrevious = 0;
let minutePrevious = 0;
let secondPrevious = 0;
let csPrevious = 0;

let watchState = null;
let watchStatePrevious = watchState;

const displayUpdate = (h, m, s, c) => {
  hour.textContent = h < 10 ? '0' + h : h;
  minute.textContent = m < 10 ? '0' + m : m;
  second.textContent = s < 10 ? '0' + s : s;
  cs.textContent = c < 10 ? '0' + c : c;
};

const startStopwatch = () => {
  let currentMomment = new Date();

  watchState = setInterval(() => {
    let nexMoment = new Date();

    let moment = nexMoment - currentMomment;

    hourValue = hourPrevious + Math.floor(moment / 1000 / 3600);
    minuteValue = Math.floor(
      (minutePrevious + Math.floor(((moment / 1000) % 3600) / 60)) % 60
    );
    secondValue = Math.floor(
      secondPrevious + (Math.floor(((moment / 1000) % 3600) % 60) % 60)
    );
    csValue = Math.floor((csPrevious + Math.floor((moment / 10) % 100)) % 100);

    displayUpdate(hourValue, minuteValue, secondValue, csValue);
  });
};

const pauseStopwatch = () => {
  hourPrevious = hourValue;
  minutePrevious = minuteValue;
  secondPrevious = secondValue;
  csPrevious = csValue;

  clearInterval(watchState);

  watchStatePrevious = watchState;
};

const resetStopwatch = () => {
  hourPrevious = 0;
  minutePrevious = 0;
  secondPrevious = 0;
  csPrevious = 0;

  clearInterval(watchState);

  watchStatePrevious = watchState;

  displayUpdate(hourPrevious, minutePrevious, secondPrevious, csPrevious);
};

start.addEventListener('click', () => {
  if (watchStatePrevious !== watchState) return;

  startStopwatch();
});

pause.addEventListener('click', () => {
  pauseStopwatch();
});

reset.addEventListener('click', () => {
  resetStopwatch();
});
