const canvas = document.querySelector('#paint-canvas');
const context = canvas.getContext('2d');
const colorInput = document.querySelector('#color');
const sizeInput = document.querySelector('#brush-size');
const sizeOutput = document.querySelector('#brush-value');
let drawing = false;
let tool = 'brush';
let history = [];

context.fillStyle = '#eeeae2';
context.fillRect(0, 0, canvas.width, canvas.height);

function saveState() {
  if (history.length > 15) history.shift();
  history.push(context.getImageData(0, 0, canvas.width, canvas.height));
}
function point(event) {
  const bounds = canvas.getBoundingClientRect();
  return { x: (event.clientX - bounds.left) * canvas.width / bounds.width, y: (event.clientY - bounds.top) * canvas.height / bounds.height };
}
function draw(event) {
  if (!drawing) return;
  const { x, y } = point(event);
  context.fillStyle = tool === 'eraser' ? '#eeeae2' : colorInput.value;
  context.beginPath();
  context.arc(x, y, Number(sizeInput.value) / 2, 0, Math.PI * 2);
  context.fill();
}
canvas.addEventListener('pointerdown', (event) => { drawing = true; canvas.setPointerCapture(event.pointerId); saveState(); draw(event); });
canvas.addEventListener('pointermove', draw);
canvas.addEventListener('pointerup', () => { drawing = false; });
canvas.addEventListener('pointerleave', () => { drawing = false; });
sizeInput.addEventListener('input', () => { sizeOutput.value = `${sizeInput.value} px`; sizeOutput.textContent = `${sizeInput.value} px`; });
document.querySelectorAll('.tool-button').forEach((button) => button.addEventListener('click', () => { tool = button.dataset.tool; document.querySelectorAll('.tool-button').forEach((item) => item.classList.toggle('active', item === button)); }));
document.querySelector('#undo-button').addEventListener('click', () => { const previous = history.pop(); if (previous) context.putImageData(previous, 0, 0); });
document.querySelector('#clear-button').addEventListener('click', () => { saveState(); context.fillStyle = '#eeeae2'; context.fillRect(0, 0, canvas.width, canvas.height); });
document.querySelector('#download-button').addEventListener('click', () => { const link = document.createElement('a'); link.download = 'aurelia-custom-hoodie.png'; link.href = canvas.toDataURL('image/png'); link.click(); });
document.querySelector('#custom-buy').addEventListener('click', () => { localStorage.setItem('aureliaCart', JSON.stringify([{ name: 'Custom Graphic Hoodie', price: 198, custom: true }])); localStorage.setItem('aureliaCustomDesign', canvas.toDataURL('image/png')); window.location.href = 'checkout.html'; });
