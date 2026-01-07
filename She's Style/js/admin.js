import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  collection, addDoc, getDocs, deleteDoc, doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.login = () => {
  signInWithEmailAndPassword(auth,
    email.value,
    password.value
  ).then(() => alert("Admin logged in"));
};

window.addProduct = async () => {
  await addDoc(collection(db, "products"), {
    name: name.value,
    price: price.value,
    image: image.value
  });
  loadAdminProducts();
};

const loadAdminProducts = async () => {
  const snapshot = await getDocs(collection(db, "products"));
  adminProducts.innerHTML = "";
  snapshot.forEach(d => {
    adminProducts.innerHTML += `
      <p>${d.data().name}
      <button onclick="deleteProduct('${d.id}')">Delete</button></p>
    `;
  });
};

window.deleteProduct = async (id) => {
  await deleteDoc(doc(db, "products", id));
  loadAdminProducts();
};

loadAdminProducts();
