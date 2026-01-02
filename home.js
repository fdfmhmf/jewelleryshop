import { db } from "./firebase.js";
import { collection, getDocs } from 
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const slides = document.querySelectorAll(".hero-slide");
let currentSlide = 0;

// Hero slider auto
setInterval(() => {
  slides[currentSlide].classList.remove("active");
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add("active");
}, 4000);

// Load products
const productGrid = document.getElementById("productGrid");

async function loadProducts() {
  const querySnapshot = await getDocs(collection(db, "products"));
  querySnapshot.forEach((doc, i) => {
    const { name, price, imageURL } = doc.data();
    const card = document.createElement("div");
    card.className = "card";
    card.style.animationDelay = `${i * 100}ms`;
    card.innerHTML = `
      <img src="${imageURL}" alt="${name}">
      <h3>${name}</h3>
      <p>₹${price}</p>
    `;
    productGrid.appendChild(card);
  });
}

loadProducts();
