document.addEventListener("DOMContentLoaded", () => {
  initLoader();
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initCounters();
  initSmoothScrolling();
  initWhatsAppTracking();
  initProductAnimations();
  initFloatingEffects();
});

/* ==========================
   LOADER
========================== */
function initLoader() {
  const loader = document.querySelector(".loader");
  if (!loader) return;

  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.style.opacity = "0";
      loader.style.pointerEvents = "none";
      setTimeout(() => loader.remove(), 700);
    }, 1200);
  });
}

/* ==========================
   NAVBAR SCROLL EFFECT
========================== */
function initNavbar() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.style.background = "rgba(0,0,0,.92)";
      navbar.style.backdropFilter = "blur(20px)";
    } else {
      navbar.style.background = "rgba(0,0,0,.75)";
    }
  });
}

/* ==========================
   MOBILE MENU
========================== */
function initMobileMenu() {
  const menuBtn = document.getElementById("menuBtn");
  const mobileNav = document.getElementById("mobileNav");
  if (!menuBtn || !mobileNav) return;

  menuBtn.addEventListener("click", () => {
    mobileNav.classList.toggle("open");
    menuBtn.textContent = mobileNav.classList.contains("open") ? "✕" : "☰";
  });

  // Close on link click
  mobileNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("open");
      menuBtn.textContent = "☰";
    });
  });
}

/* ==========================
   SCROLL REVEAL
========================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll(
    ".section-header, .product-card, .collection-card, .trust-card, .festival-card, .testimonial-card, .contact-card, .store-content, .store-image"
  );

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-active");
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach(el => {
    el.classList.add("reveal");
    observer.observe(el);
  });
}

/* ==========================
   ANIMATED COUNTERS
========================== */
function initCounters() {
  const counters = document.querySelectorAll(".trust-card h3");

  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  });

  counters.forEach(counter => counterObserver.observe(counter));
}

function animateCounter(el) {
  const hasPlus = el.textContent.includes("+");
  const target = parseInt(el.textContent.replace("+", "").replace(",", ""));
  if (isNaN(target)) return;

  let current = 0;
  const increment = Math.ceil(target / 80);
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = hasPlus ? current + "+" : current;
  }, 20);
}

/* ==========================
   SMOOTH SCROLL
========================== */
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (!target) return;
      target.scrollIntoView({ behavior: "smooth" });
    });
  });
}

/* ==========================
   WHATSAPP TRACKING
========================== */
function initWhatsAppTracking() {
  document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener("click", () => {
      console.log("WhatsApp CTA Clicked:", link.href);
    });
  });
}

/* ==========================
   PRODUCT HOVER (CSS handles most, JS as fallback)
========================== */
function initProductAnimations() {
  // CSS :hover handles this — JS fallback for touch devices
  document.querySelectorAll(".product-card").forEach(card => {
    card.addEventListener("touchstart", () => {
      card.style.transform = "translateY(-8px)";
      card.style.boxShadow = "0 25px 60px rgba(212,175,55,.2)";
    });
    card.addEventListener("touchend", () => {
      setTimeout(() => {
        card.style.transform = "";
        card.style.boxShadow = "";
      }, 500);
    });
  });
}

/* ==========================
   COLLECTION FLOAT EFFECT
========================== */
function initFloatingEffects() {
  document.querySelectorAll(".collection-card").forEach((card, index) => {
    setInterval(() => {
      card.animate(
        [
          { transform: "translateY(0px)" },
          { transform: "translateY(-5px)" },
          { transform: "translateY(0px)" }
        ],
        { duration: 3500 + index * 300, iterations: 1 }
      );
    }, 5000 + index * 500);
  });
}

/* ==========================
   COLLECTION SLIDERS
========================== */
function initCollectionSliders() {
  document.querySelectorAll(".collection-slider").forEach(slider => {
    const slides = slider.querySelectorAll(".slide");
    const dots   = slider.querySelectorAll(".dot");
    const prev   = slider.querySelector(".slider-prev");
    const next   = slider.querySelector(".slider-next");
    let current  = 0;
    let timer    = null;

    function goTo(index) {
      slides[current].classList.remove("active");
      dots[current].classList.remove("active");
      current = (index + slides.length) % slides.length;
      slides[current].classList.add("active");
      dots[current].classList.add("active");
    }

    function startAuto() {
      timer = setInterval(() => goTo(current + 1), 3000);
    }

    function stopAuto() {
      clearInterval(timer);
    }

    prev.addEventListener("click", () => { stopAuto(); goTo(current - 1); startAuto(); });
    next.addEventListener("click", () => { stopAuto(); goTo(current + 1); startAuto(); });
    dots.forEach((dot, i) => dot.addEventListener("click", () => { stopAuto(); goTo(i); startAuto(); }));

    // Touch swipe support
    let touchStartX = 0;
    slider.addEventListener("touchstart", e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    slider.addEventListener("touchend", e => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) { stopAuto(); goTo(diff > 0 ? current + 1 : current - 1); startAuto(); }
    });

    startAuto();
  });
}

document.addEventListener("DOMContentLoaded", initCollectionSliders);