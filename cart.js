import { products } from "./products.js";
import { showPopupMessage } from "./popup.js";

let cart = [];

// Function to add item to inventory (cart)
export function addToInventory(productId, buttonElement = null) {
    const product = products.find(p => p.id === productId);
    if (!product || product.quantity <= 0) return; // Prevent adding if out of stock

    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    product.quantity--; // ✅ Reduce stock
    updateCartUI();
    updateProductUI(); // ✅ Update product display

    showPopupMessage("Your item has been added to your inventory!");

    // ✅ Change button text and disable if out of stock
    if (buttonElement) {
        buttonElement.textContent = "Added!";
        buttonElement.disabled = true;
        setTimeout(() => {
            if (product.quantity > 0) {
                buttonElement.textContent = "Add to Inventory";
                buttonElement.disabled = false;
            } else {
                buttonElement.textContent = "Out of Stock";
                buttonElement.disabled = true;
            }
        }, 3000);
    }
}

// Function to remove or decrease item quantity
export function removeFromInventory(productId) {
    const cartIndex = cart.findIndex(item => item.id === productId);
    const product = products.find(p => p.id === productId);

    if (cartIndex !== -1) {
        if (cart[cartIndex].quantity > 1) {
            cart[cartIndex].quantity--;
        } else {
            cart.splice(cartIndex, 1); // Remove item if quantity reaches 0
        }
        product.quantity++; // ✅ Increase stock back
    }

    updateCartUI();
    updateProductUI(); // ✅ Update product display
}

// Function to finalize purchase
export function purchaseItems() {
    if (cart.length === 0) {
        showPopupMessage("Your inventory is empty!");
        return;
    }

    showPopupMessage("Purchase Complete!");
    cart = []; // ✅ Clear inventory after purchase
    updateCartUI();
}

// Function to update inventory UI
export function updateCartUI() {
    const cartCount = document.getElementById("cart-count");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartContainer = document.getElementById("cart-container");

    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    cartItems.innerHTML = "";

    let totalPrice = 0;
    cart.forEach(item => {
        totalPrice += item.price * item.quantity;

        const li = document.createElement("li");
        li.innerHTML = `
            ${item.name} x${item.quantity} - ₱${(item.price * item.quantity).toFixed(2)}
            <button class="increase-item" data-id="${item.id}">➕</button>
            <button class="decrease-item" data-id="${item.id}">➖</button>
        `;
        cartItems.appendChild(li);
    });

    cartTotal.textContent = totalPrice.toFixed(2);

    // Attach event listeners to new buttons
    document.querySelectorAll(".increase-item").forEach(button => {
        button.addEventListener("click", (e) => {
            const productId = parseInt(e.target.dataset.id);
            addToInventory(productId);
        });
    });

    document.querySelectorAll(".decrease-item").forEach(button => {
        button.addEventListener("click", (e) => {
            const productId = parseInt(e.target.dataset.id);
            removeFromInventory(productId);
        });
    });

    // ✅ Add Purchase Button if not already there
    if (!document.getElementById("purchase-button")) {
        const purchaseBtn = document.createElement("button");
        purchaseBtn.textContent = "Purchase";
        purchaseBtn.id = "purchase-button";
        purchaseBtn.style.marginTop = "10px";
        purchaseBtn.style.padding = "10px";
        purchaseBtn.style.backgroundColor = "#28a745";
        purchaseBtn.style.color = "white";
        purchaseBtn.style.border = "none";
        purchaseBtn.style.borderRadius = "5px";
        purchaseBtn.style.cursor = "pointer";

        purchaseBtn.addEventListener("click", () => {
            purchaseItems();
        });

        cartContainer.appendChild(purchaseBtn);
    }
}

// ✅ Function to update product display (stock)
export function updateProductUI() {
    document.querySelectorAll(".product-card").forEach(card => {
        const productId = parseInt(card.querySelector(".add-to-cart").dataset.id);
        const product = products.find(p => p.id === productId);

        if (product) {
            card.querySelector("p:nth-child(4)").textContent = `Stock: ${product.quantity}`;
            const button = card.querySelector(".add-to-cart");

            if (product.quantity === 0) {
                button.textContent = "Out of Stock";
                button.disabled = true;
            } else {
                button.textContent = "Add to Inventory";
                button.disabled = false;
            }
        }
    });
}
