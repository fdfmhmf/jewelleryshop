import { db } from "./firebase.js";
import { collection, getDocs } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const grid=document.getElementById("productGrid");
const cart=document.getElementById("cart");
const cartItems=document.getElementById("cartItems");
const cartCount=document.getElementById("cartCount");

let products=[],cartData=[];

async function load(){
  const snap=await getDocs(collection(db,"products"));
  snap.forEach(d=>products.push({id:d.id,...d.data()}));
  render();
}

function render(){
  grid.innerHTML="";
  products.forEach(p=>{
    grid.innerHTML+=`
      <div class="card">
        <img src="${p.imageURL}">
        <h4>${p.name}</h4>
        <p>₹${p.price}</p>
        <button onclick="add('${p.id}')">🛒 Add to Cart</button>
      </div>`;
  });
}

window.add=id=>{
  cartData.push(products.find(p=>p.id===id));
  cartCount.textContent=cartData.length;
};

cartBtn.onclick=()=>cart.classList.toggle("show");

orderBtn.onclick=()=>{
  let msg="Hello, I want to order:%0A";
  cartData.forEach(p=>msg+=`• ${p.name} - ₹${p.price}%0A`);
  window.open(`https://wa.me/91XXXXXXXXXX?text=${msg}`);
};

load();
