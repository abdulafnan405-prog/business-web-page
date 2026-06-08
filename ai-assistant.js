/* ==========================
   AI ASSISTANT — Toggle + WhatsApp
========================== */

const assistantToggle = document.getElementById("assistantToggle");
const assistantBody   = document.getElementById("assistantBody");

if (assistantToggle && assistantBody) {
  assistantToggle.addEventListener("click", () => {
    assistantBody.classList.toggle("open");
  });
}

// Wire up each option button to WhatsApp
const options = document.querySelectorAll(".assistant-options button");

options.forEach(button => {
  button.addEventListener("click", () => {
    const choice = button.getAttribute("data-msg") || button.innerText.trim();
    const phone  = "919052200518";
    const text   = `Hello RIGHT CHOICE, I am interested in ${choice}. Please help me.`;
    const url    = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  });
});