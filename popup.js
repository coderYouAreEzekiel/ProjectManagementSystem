export function showPopupMessage(message) {
    const popup = document.createElement("div");
    popup.textContent = message;
    popup.style.position = "fixed";
    popup.style.bottom = "20px";
    popup.style.right = "20px";
    popup.style.background = "#28a745"; // Green for success
    popup.style.color = "white";
    popup.style.padding = "10px 15px";
    popup.style.borderRadius = "5px";
    popup.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.2)";
    popup.style.fontWeight = "bold";

    document.body.appendChild(popup);

    setTimeout(() => {
        popup.remove();
    }, 2000); // Remove pop-up after 2 seconds
}
