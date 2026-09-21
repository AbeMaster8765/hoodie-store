const countElement = document.querySelector('#cart-count');
const toast = document.querySelector('#toast');
let cartCount = 0;
let toastTimer;

document.querySelectorAll('.add-button').forEach((button) => {
  button.addEventListener('click', () => {
    cartCount += 1;
    countElement.textContent = cartCount;
    toast.firstChild.textContent = `${button.dataset.product} added to your bag `;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
  });
});

document.querySelector('#newsletter-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const message = document.querySelector('#form-message');
  message.textContent = 'Thank you — welcome to the atelier.';
  message.style.color = '#66856a';
  event.target.reset();
});

document.querySelector('.menu-button').addEventListener('click', () => {
  document.querySelector('.main-nav').classList.toggle('mobile-open');
});
