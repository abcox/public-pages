const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");
const mobileLinks = document.querySelectorAll(".mobile-link");

menuBtn?.addEventListener("click", () => {
  mobileNav.classList.toggle("hidden");
});

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileNav.classList.add("hidden");
  });
});

// Progressive section reveal for a more dynamic first impression.
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

const filterButtons = document.querySelectorAll(".filter-btn");
const bikeCards = document.querySelectorAll(".bike-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selected = button.dataset.filter;

    filterButtons.forEach((btn) => {
      btn.classList.remove("border-ember-500", "bg-ember-500/20");
      btn.classList.add("border-white/25");
    });

    button.classList.remove("border-white/25");
    button.classList.add("border-ember-500", "bg-ember-500/20");

    bikeCards.forEach((card) => {
      const tag = card.dataset.tag;
      const show = selected === "all" || selected === tag;
      card.classList.toggle("hidden", !show);
    });
  });
});

const bikeDialog = document.getElementById("bikeDialog");
const dialogImg = document.getElementById("dialogImg");
const closeDialog = document.getElementById("closeDialog");

bikeCards.forEach((card) => {
  card.addEventListener("click", () => {
    const image = card.querySelector("img");
    if (!image || !bikeDialog || !dialogImg) return;

    dialogImg.src = image.src;
    dialogImg.alt = image.alt;
    bikeDialog.showModal();
  });
});

closeDialog?.addEventListener("click", () => bikeDialog?.close());
bikeDialog?.addEventListener("click", (event) => {
  const rect = bikeDialog.getBoundingClientRect();
  const clickedInDialog =
    rect.top <= event.clientY &&
    event.clientY <= rect.top + rect.height &&
    rect.left <= event.clientX &&
    event.clientX <= rect.left + rect.width;

  if (!clickedInDialog) {
    bikeDialog.close();
  }
});

document.getElementById("year").textContent = String(new Date().getFullYear());
