/* ==========================
   LANGUAGE TOGGLE (EN / HI)
========================== */

const languageData = {
  en: {
    heroTitle:       "Fashion For\nEvery Generation",
    heroSub:         "From First Steps to Timeless Style.\nPremium Men's & Kids Wear crafted for every age, every occasion, and every season.",
    heroSubtitle:    "Serving Hyderabad Since 2008",
    btnExplore:      "Explore Collections",
    btnWhatsapp:     "Order On WhatsApp"
  },
  hi: {
    heroTitle:       "हर पीढ़ी के लिए\nफैशन",
    heroSub:         "पहले कदम से कालातीत शैली तक।\nहर उम्र, हर मौके और हर मौसम के लिए।",
    heroSubtitle:    "2008 से हैदराबाद की सेवा में",
    btnExplore:      "कलेक्शन देखें",
    btnWhatsapp:     "WhatsApp पर ऑर्डर करें"
  }
};

const langBtn = document.querySelector(".language-btn");
let currentLang = "en";

if (langBtn) {
  langBtn.addEventListener("click", () => {
    currentLang = currentLang === "en" ? "hi" : "en";
    langBtn.textContent = currentLang.toUpperCase();
    updateLanguage();
  });
}

function updateLanguage() {
  const data = languageData[currentLang];

  const heroTitle       = document.querySelector(".hero h1");
  const heroDescription = document.querySelector(".hero-description");
  const heroSubtitle    = document.querySelector(".hero-subtitle");

  if (heroTitle)       heroTitle.innerHTML       = data.heroTitle.replace("\n", "<br>");
  if (heroDescription) heroDescription.innerHTML = data.heroSub.replace("\n", "<br>");
  if (heroSubtitle)    heroSubtitle.textContent  = data.heroSubtitle;
}