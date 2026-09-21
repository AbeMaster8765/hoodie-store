const products = [
  { name: 'The Form Hoodie', price: 148, detail: 'Oatmeal / 500 GSM organic cotton', image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=200&q=80' },
  { name: 'The Signature Hoodie', price: 168, detail: 'Charcoal / brushed cotton fleece', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=200&q=80' },
  { name: 'The Atelier Zip', price: 188, detail: 'Stone / 480 GSM organic cotton', image: 'https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=200&q=80' }
];
const cart = JSON.parse(localStorage.getItem('aureliaCart') || '[]');
const items = document.querySelector('#summary-items');
let subtotal = 0;
if (!cart.length) {
  items.innerHTML = '<p class="summary-note">Your bag is currently empty. Return to the collection to choose a piece.</p>';
} else {
  cart.forEach((item) => {
    const product = products.find((entry) => entry.name === item.name) || products[0];
    subtotal += product.price;
    items.insertAdjacentHTML('beforeend', `<div class="summary-item"><img src="${product.image}" alt="${product.name}"><div><strong>${product.name}</strong><small>${product.detail}</small></div><b>$${product.price}</b></div>`);
  });
}
const shipping = subtotal >= 150 || subtotal === 0 ? 0 : 12;
document.querySelector('#subtotal').textContent = `$${subtotal}`;
document.querySelector('#shipping').textContent = shipping ? `$${shipping}` : 'Free';
document.querySelector('#total').textContent = `$${subtotal + shipping}`;

document.querySelector('#checkout-form').addEventListener('submit', (event) => {
  event.preventDefault();
  if (!cart.length) { window.location.href = 'index.html#collection'; return; }
  document.querySelector('#order-number').textContent = `AA-${Math.floor(100000 + Math.random() * 900000)}`;
  document.querySelector('#confirmation').classList.add('visible');
  localStorage.removeItem('aureliaCart');
});
