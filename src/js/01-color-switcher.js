const refs = {
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};

let colorInterval;
refs.btnStop.disabled = true;

refs.btnStart.addEventListener('click', Start);
refs.btnStop.addEventListener('click', Stop);

function Start() {
  refs.btnStart.disabled = true;
  refs.btnStop.disabled = false;

  colorInterval = setInterval(() => {
    function getRandomHexColor() {
      return `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, 0)}`;
    }
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 100);
}

function Stop() {
  refs.btnStart.disabled = false;
  refs.btnStop.disabled = true;
  clearInterval(colorInterval);
}
