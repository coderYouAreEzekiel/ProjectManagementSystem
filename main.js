import { authenticate } from './user.js';
import { products } from "./products.js";
import { addToInventory, updateCartUI } from "./cart.js";

const loginForm = document.getElementById("form-id");

if (loginForm) {  // ✅ Check if loginForm exists
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const message = document.getElementById("message");

        if (authenticate(username, password)) {
            console.log("Authentication successful! Redirecting...");
            message.textContent = "Login successful!";
            message.style.color = "green";
            message.style.alignItems = "center";
            message.style.justifyContent = "center";
            message.style.display = "flex";
            setTimeout(() => {
                window.location.href = "./homepage.html";
            }, 1000); // Redirect after 1 second
        } else {
            console.log("Authentication failed!");
            message.textContent = "Login failed!";
            message.style.alignItems = "center";
            message.style.justifyContent = "center";
            message.style.display = "flex";
        }
    });
}

// Event Listener for Add to Inventory
document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById("product-list");

    // Render Product Cards
    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product-card");
        productDiv.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h4>${product.name}</h4>
            <p>Price: ₱${product.price}</p>
            <p>Stock: ${product.quantity}</p>
            <button class="add-to-cart" data-id="${product.id}">Add to Inventory</button>
        `;
        productList.appendChild(productDiv);
    });

    // Attach event listeners to "Add to Inventory" buttons
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            const productId = parseInt(this.dataset.id);
            addToInventory(productId, this);
            updateProductUI(); // ✅ Update stock display
        });
    });

    // Cart toggle logic
    const cartToggle = document.querySelector(".cart-toggle");
    const cartContainer = document.getElementById("cart-container");

    cartToggle.addEventListener("click", () => {
        cartContainer.style.display = cartContainer.style.display === "block" ? "none" : "block";
    });
});