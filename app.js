const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const reveals = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("show");
    });
  },
  { threshold: 0.12 }
);
reveals.forEach((element) => revealObserver.observe(element));

const scrollLine = document.getElementById("scrollLine");
window.addEventListener("scroll", () => {
  if (!scrollLine) return;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const progress = max > 0 ? (window.scrollY / max) * 100 : 0;
  scrollLine.style.width = `${Math.min(progress, 100)}%`;
});

const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
const lbClose = document.getElementById("lbClose");

function openLightbox(src, alt = "Captura ampliada") {
  if (!lightbox || !lbImg) return;
  lbImg.src = src;
  lbImg.alt = alt;
  lightbox.classList.add("show");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  if (!lightbox || !lbImg) return;
  lightbox.classList.remove("show");
  lightbox.setAttribute("aria-hidden", "true");
  lbImg.src = "";
  document.body.style.overflow = "";
}

document.querySelectorAll("[data-img]").forEach((button) => {
  button.addEventListener("click", () => {
    const src = button.getAttribute("data-img");
    const img = button.querySelector("img");
    if (!src) return;
    openLightbox(src, img?.alt || "Captura ampliada");
  });
});

if (lbClose) lbClose.addEventListener("click", closeLightbox);
if (lightbox) {
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeLightbox();
});

const tiltCards = document.querySelectorAll(".tilt-card");
tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * 5;
    const rotateX = (0.5 - y) * 5;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
  });
});
