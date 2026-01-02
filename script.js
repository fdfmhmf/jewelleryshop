// Simple client-side app: loads products.json, renders products, modal & cart.
const productsEl = document.getElementById('products');
const categoryFilter = document.getElementById('category-filter');
const sortSelect = document.getElementById('sort-select');
const searchInput = document.getElementById('search');
const cartCountEl = document.getElementById('cart-count');

let products = [];
let cart = JSON.parse(localStorage.getItem('cart') || '[]');

function updateCartCount(){ cartCountEl.textContent = cart.length }
updateCartCount();

async function loadProducts(){
  const res = await fetch('products.json');
  products = await res.json();
  populateCategories();
  renderProducts(products);
}

function populateCategories(){
  const categories = Array.from(new Set(products.map(p=>p.category || 'Other')));
  categories.forEach(c=>{
    const opt = document.createElement('option');
    opt.value = c;
    opt.textContent = c;
    categoryFilter.appendChild(opt);
  });
}

function renderProducts(list){
  productsEl.innerHTML = '';
  if(!list.length){ productsEl.innerHTML = '<p>No products found.</p>'; return }
  list.forEach(p=>{
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <img data-src="${p.image}" alt="${p.name}" loading="lazy" />
      <div class="card-body">
        <h4>${p.name}</h4>
        <p>${p.description}</p>
        <div class="price">₹${p.price.toFixed(2)}</div>
        <div class="actions">
          <button class="btn details">View</button>
          <button class="btn secondary add">Add</button>
        </div>
      </div>
    `;
    const img = card.querySelector('img');
    img.src = p.image;
    // fallback placeholder if image fails
    img.onerror = () => {
      img.src = `https://via.placeholder.com/600x400?text=${encodeURIComponent(p.name)}`;
    };
    card.querySelector('.details').addEventListener('click',()=>openModal(p));
    card.querySelector('.add').addEventListener('click',()=>addToCart(p));
    productsEl.appendChild(card);
  });
}

function openModal(p){
  const modal = document.getElementById('product-modal');
  modal.setAttribute('aria-hidden','false');
  document.getElementById('modal-image').src = p.image;
  document.getElementById('modal-image').onerror = ()=>document.getElementById('modal-image').src = `https://via.placeholder.com/800x600?text=${encodeURIComponent(p.name)}`;
  document.getElementById('modal-title').textContent = p.name;
  document.getElementById('modal-desc').textContent = p.description;
  document.getElementById('modal-price').textContent = `₹${p.price.toFixed(2)}`;
  document.getElementById('add-to-cart').onclick = ()=>{ addToCart(p); closeModal(); };
}

function closeModal(){
  document.getElementById('product-modal').setAttribute('aria-hidden','true');
}

document.getElementById('modal-close').addEventListener('click', closeModal);
document.getElementById('product-modal').addEventListener('click', (e)=>{
  if(e.target.id === 'product-modal') closeModal();
});

function addToCart(p){
  cart.push(p);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert(`${p.name} added to cart.`);
}

document.getElementById('cart-btn').addEventListener('click', ()=>{
  if(!cart.length){ alert('Cart is empty'); return }
  const summary = cart.map((c,i)=>`${i+1}. ${c.name} — ₹${c.price.toFixed(2)}`).join('\n');
  alert(`Cart items:\n\n${summary}\n\nTotal: ₹${cart.reduce((s,x)=>s+x.price,0).toFixed(2)}`);
});

// filters
categoryFilter.addEventListener('change', applyFilters);
sortSelect.addEventListener('change', applyFilters);
searchInput.addEventListener('input', applyFilters);

function applyFilters(){
  const cat = categoryFilter.value;
  const sort = sortSelect.value;
  const q = searchInput.value.trim().toLowerCase();
  let list = products.slice();
  if(cat !== 'all') list = list.filter(p=>p.category === cat);
  if(q) list = list.filter(p=>p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
  if(sort === 'price-asc') list.sort((a,b)=>a.price-b.price);
  if(sort === 'price-desc') list.sort((a,b)=>b.price-a.price);
  renderProducts(list);
}

document.getElementById('year').textContent = new Date().getFullYear();

// initial load
loadProducts();