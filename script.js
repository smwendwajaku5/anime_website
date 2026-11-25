const filterButtons = document.querySelectorAll(".filter-chip");
const storyCards = document.querySelectorAll(".story-card");
const searchInput = document.querySelector("#story-search");
const emptyState = document.querySelector("#empty-state");
let activeFilter = "all";

function updateStories() {
  const query = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  storyCards.forEach((card) => {
    const matchesFilter = activeFilter === "all" || card.dataset.type === activeFilter;
    const matchesSearch = card.dataset.title.toLowerCase().includes(query);
    const visible = matchesFilter && matchesSearch;

    card.hidden = !visible;
    if (visible) visibleCount += 1;
  });

  emptyState.hidden = visibleCount > 0;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle("selected", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    updateStories();
  });
});

searchInput.addEventListener("input", updateStories);

document.querySelectorAll(".save-button").forEach((button) => {
  button.addEventListener("click", () => {
    const saved = button.getAttribute("aria-pressed") !== "true";
    button.setAttribute("aria-pressed", String(saved));
    button.textContent = saved ? "✓" : "+";
    button.setAttribute(
      "aria-label",
      `${saved ? "Remove" : "Add"} ${button.closest(".story-card").dataset.title} ${saved ? "from" : "to"} your list`
    );
  });
});

const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");

menuToggle.addEventListener("click", () => {
  const expanded = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(expanded));
  primaryNav.classList.toggle("open", expanded);
});

primaryNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    primaryNav.classList.remove("open");
  });
});
