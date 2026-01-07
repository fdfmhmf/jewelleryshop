import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// --- YOUR CONFIGURATION ---
const firebaseConfig = {
    apiKey: "AIzaSyBvQgm3un6m67VHU7TAWO5NZUpk_C3mnQ4",
    authDomain: "she-s-style.firebaseapp.com",
    projectId: "she-s-style",
    storageBucket: "she-s-style.firebasestorage.app",
    messagingSenderId: "326287686768",
    appId: "1:326287686768:web:3e5a373d314832b1a108b5",
    measurementId: "G-132LJYJNLB"
};

// Initialize
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const productsCollection = collection(db, "products");

// Export for other files to use
export { db, productsCollection, addDoc, deleteDoc, doc, getDocs };

// --- SHARED: LOAD PRODUCTS FUNCTION ---
export async function loadProducts(containerId, isEditMode = false) {
    const container = document.getElementById(containerId);
    if(!container) return;

    container.innerHTML = '<div class="loader">Loading...</div>';

    try {
        const snapshot = await getDocs(productsCollection);
        container.innerHTML = ''; // Clear loader

        if(snapshot.empty) {
            container.innerHTML = '<p style="padding:20px; text-align:center; color:#888;">No products found.</p>';
            return;
        }

        snapshot.forEach(doc => {
            const data = doc.data();
            const id = doc.id;

            // Render different HTML depending on if it's Admin or Store
            if(isEditMode) {
                // Admin View (List with Delete)
                container.innerHTML += `
                    <div class="inv-item">
                        <div class="inv-left">
                            <img src="${data.image}" class="inv-thumb">
                            <span>${data.name}</span>
                        </div>
                        <button class="del-btn" onclick="window.deleteItem('${id}')">Delete</button>
                    </div>
                `;
            } else {
                // Store View (Card with Click)
                const card = document.createElement('div');
                card.className = 'card';
                card.onclick = () => window.openProductDetail({id, ...data});
                card.innerHTML = `
                    <img src="${data.image}" loading="lazy">
                    <h3>${data.name}</h3>
                    <p>$${data.price}</p>
                `;
                container.appendChild(card);
            }
        });

    } catch (e) {
        console.error(e);
        container.innerHTML = '<p>Error loading data.</p>';
    }
}