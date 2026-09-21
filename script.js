const countElement = document.querySelector('#cart-count');
let cart = JSON.parse(localStorage.getItem('aureliaCart') || '[]');
if (countElement) countElement.textContent = cart.length;

const customizeLink = document.createElement('a');
customizeLink.className = 'customize-cta';
customizeLink.href = 'custom.html';
customizeLink.innerHTML = '<span>✦</span> Create a custom graphic hoodie <b>↗</b>';
const collection = document.querySelector('#collection');
if (collection) collection.insertBefore(customizeLink, collection.querySelector('.product-grid'));

document.querySelectorAll('.add-button').forEach((button) => {
  button.innerHTML = 'Buy now <span>↗</span>';
  button.setAttribute('aria-label', `Buy ${button.dataset.product} now`);
  button.addEventListener('click', () => {
    cart = [{ name: button.dataset.product, price: Number(button.dataset.price) }];
    localStorage.setItem('aureliaCart', JSON.stringify(cart));
    window.location.href = 'checkout.html';
  });
});
const cartButton = document.querySelector('.cart-button');
if (cartButton) cartButton.addEventListener('click', () => { window.location.href = 'checkout.html'; });
const newsletterForm = document.querySelector('#newsletter-form');
if (newsletterForm) newsletterForm.addEventListener('submit', (event) => { event.preventDefault(); const message = document.querySelector('#form-message'); message.textContent = 'Thank you — welcome to the atelier.'; message.style.color = '#66856a'; event.target.reset(); });
const menuButton = document.querySelector('.menu-button');
if (menuButton) menuButton.addEventListener('click', () => document.querySelector('.main-nav').classList.toggle('mobile-open'));
