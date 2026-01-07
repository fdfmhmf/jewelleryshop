import { db } from "./firebase.js";
import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

const productsDiv = document.getElementById("products");

async function loadProducts() {
  const querySnapshot = await getDocs(collection(db, "products"));
  productsDiv.innerHTML = "";

  querySnapshot.forEach((doc) => {
    const p = doc.data();
    productsDiv.innerHTML += `
      <div class="card">
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <button>Order</button>
      </div>
    `;
  });
}

loadProducts();
