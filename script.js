const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#nav');
function closeMenu() { menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Abrir menu'); nav.classList.remove('is-open'); }
menuButton.addEventListener('click', () => { const open = menuButton.getAttribute('aria-expanded') !== 'true'; menuButton.setAttribute('aria-expanded', String(open)); menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu'); nav.classList.toggle('is-open', open); });
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if(event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {closeMenu(); menuButton.focus();} });
window.matchMedia('(min-width: 761px)').addEventListener('change', closeMenu);
const filters = [...document.querySelectorAll('[data-filter]')];
function filterMenu(category) { filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === category))); let count = 0; document.querySelectorAll('.product').forEach(card => { const show = category === 'all' || card.dataset.category === category; card.hidden = !show; if(show) count++; }); document.querySelector('#filter-status').textContent = count === 1 ? '1 favorito encontrado.' : `${count} favoritos encontrados.`; }
filters.forEach(button => button.addEventListener('click', () => filterMenu(button.dataset.filter)));
document.querySelectorAll('[data-jump-filter]').forEach(link => link.addEventListener('click', () => filterMenu(link.dataset.jumpFilter)));
const products = {
  bigmac: {title:'Big Mac®', category:'O CLÁSSICO DOS SANDUÍCHES', image:'assets/big-mac.png', description:'Pão com gergelim, dois hambúrgueres e aquela combinação de camadas que faz do Big Mac um favorito. Para quem gosta de reencontrar um sabor conhecido.'},
  fries: {title:'McFritas®', category:'O ACOMPANHAMENTO FAVORITO', image:'assets/fries.png', description:'Douradas e crocantes, as McFritas combinam com uma boa conversa, com seu sanduíche favorito e com aquela vontade de beliscar. Dividir é opcional.'},
  sundae: {title:'Sundae de Chocolate', category:'UMA PAUSA MAIS DOCE', image:'assets/sundae.png', description:'A combinação de uma sobremesa cremosa e gelada com cobertura de chocolate. Um jeito simples de dar um final doce ao seu momento.'}
};
const dialog = document.querySelector('#product-dialog');
let lastTrigger;
document.querySelectorAll('[data-product]').forEach(button => button.addEventListener('click', () => { const product = products[button.dataset.product]; lastTrigger = button; document.querySelector('#dialog-title').textContent = product.title; document.querySelector('#dialog-category').textContent = product.category; document.querySelector('#dialog-description').textContent = product.description; const image = document.querySelector('#dialog-image'); image.src = product.image; image.alt = product.title; dialog.showModal(); document.body.classList.add('modal-open'); }));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
document.querySelector('#dialog-done').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if(event.target === dialog) { const rect = dialog.getBoundingClientRect(); if(event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
dialog.addEventListener('close', () => { document.body.classList.remove('modal-open'); lastTrigger?.focus(); });
