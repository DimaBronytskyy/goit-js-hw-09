import Notiflix from 'notiflix';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      const result = { position, delay };

      if (shouldResolve) {
        resolve(result); // Виконано проміс
      } else {
        reject(result); // Відхилено проміс
      }
    }, delay);
  });
}

// Обробка події сабміту форми
document.querySelector('.form').addEventListener('submit', function (event) {
  event.preventDefault();

  const delay = +this.elements.delay.value; // Початкова затримка
  const step = +this.elements.step.value; // Крок збільшення затримки
  const amount = +this.elements.amount.value; // Кількість промісів

  // Перевірка, щоб уникнути від'ємних значень
  if (delay <= 0 || step <= 0 || amount <= 0) {
    Notiflix.Notify.failure('Please enter positive values.');
    return;
  }

  // Очистка попередніх повідомлень
  Notiflix.Notify.closeAll();

  // Створення та обробка промісів
  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay + (i - 1) * step)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
});