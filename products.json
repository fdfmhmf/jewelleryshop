// product detail page script
// reads ?id=... , loads products.json, finds product and renders details
// supports add-to-cart using same localStorage schema

const cartCountEl = document.querySelector('#cart-count');
let cart = JSON.parse(localStorage.getItem('cart') || '[]');
function updateCartCount(){ cartCountEl.textContent = cart.length; }
updateCartCount();

document.getElementById('year').textContent = new Date().getFullYear();

const currency = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 });

function getQueryParam(name){
  const params = new URLSearchParams(location.search);
  return params.get(name);
}

async function loadAndRender(){
  const id = getQueryParam('id');
  if(!id){
    document.getElementById('product-container').innerHTML = '<p>Product not specified. <a href="/">Back to shop</a></p>';
    return;
  }

  try {
    const res = await fetch('products.json');
    if(!res.ok) throw new Error('Products not found');
    const products = await res.json();
    const product = products.find(p=>p.id === id);
    if(!product){
      document.getElementById('product-container').innerHTML = '<p>Product not found. <a href="/">Back to shop</a></p>';
      return;
    }
    renderProduct(product);
  } catch (e) {
    console.error(e);
    document.getElementById('product-container').innerHTML = '<p>Error loading product. <a href="/">Back to shop</a></p>';
  }
}

function renderProduct(p){
  const container = document.getElementById('product-container');
  container.innerHTML = `
    <div class="product-detail">
      <div class="detail-media">
        <img src="${p.image}" alt="${escapeHtml(p.name)}" onerror="this.src='https://via.placeholder.com/1200x900?text=${encodeURIComponent(p.name)}'">
      </div>
      <div class="detail-info">
        <a href="/" style="text-decoration:none;color:var(--muted);font-size:0.95rem;">← Back to shop</a>
        <h2>${escapeHtml(p.name)}</h2>
        <div class="price">${currency.format(p.price)}</div>
        <p>${escapeHtml(p.description)}</p>
        <div style="margin-top:1rem;">
          <button id="add-to-cart" class="btn">Add to cart</button>
        </div>
      </div>
    </div>
  `;

  document.getElementById('add-to-cart').addEventListener('click', () => {
    cart.push(p);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showToast(`${p.name} added to cart.`);
  });
}

// small toast (same as index)
function showToast(msg){
  const t = document.createElement('div');
  t.textContent = msg;
  Object.assign(t.style, {
    position:'fixed', right:'1rem', bottom:'1rem',
    background:'#111', color:'#fff', padding:'0.6rem 0.9rem',
    borderRadius:'8px', boxShadow:'0 8px 26px rgba(0,0,0,0.2)', zIndex:1000, opacity:0, transition:'opacity .18s'
  });
  document.body.appendChild(t);
  requestAnimationFrame(()=>t.style.opacity=1);
  setTimeout(()=>{ t.style.opacity=0; setTimeout(()=>t.remove(),200) }, 1800);
}

function escapeHtml(str){
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

loadAndRender();
