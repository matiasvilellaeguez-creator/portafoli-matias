"use strict";
document.documentElement.classList.add("js");
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#navegacio");
menuButton.hidden = false;
function closeMenu() {
  menuButton.setAttribute("aria-expanded", "false");
  navigation.classList.remove("is-open");
}
menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(open));
  navigation.classList.toggle("is-open", open);
});
navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMenu();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navigation.classList.contains("is-open")) {
    closeMenu();
    menuButton.focus();
  }
});
window.matchMedia("(min-width: 641px)").addEventListener("change", closeMenu);
const cards = [...document.querySelectorAll(".project-card")];
const filters = [...document.querySelectorAll("[data-filter]")];
const empty = document.querySelector("#empty-state");
const count = document.querySelector("#result-count");
document.querySelector(".project-tools").hidden = false;
function filterProjects(category) {
  let visibleCount = 0;
  cards.forEach((card) => {
    const categories = (card.dataset.category || "").split(" ");
    card.hidden = category !== "all" && !categories.includes(category);
    if (!card.hidden) visibleCount += 1;
  });
  filters.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.filter === category));
  });
  empty.hidden = visibleCount > 0;
  empty.textContent = cards.length === 0 ? "Encara no tinc projectes" : "No hi ha projectes en aquesta categoria.";
  count.hidden = cards.length === 0;
  count.textContent = visibleCount + (visibleCount === 1 ? " projecte visible" : " projectes visibles");
}
filters.forEach((button) => {
  button.addEventListener("click", () => filterProjects(button.dataset.filter));
});
filterProjects("all");
const printButton = document.querySelector(".print-button");
printButton.hidden = false;
printButton.addEventListener("click", () => window.print());
document.querySelector("#year").textContent = new Date().getFullYear();
