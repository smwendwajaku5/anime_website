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

const authDialog = document.querySelector("#auth-dialog");
const openAuth = document.querySelector("#open-auth");
const closeAuth = document.querySelector("#auth-close");
const authForm = document.querySelector("#auth-form");
const authToggle = document.querySelector("#auth-toggle");
const authTitle = document.querySelector("#auth-title");
const authSubtitle = document.querySelector("#auth-subtitle");
const authSubmit = document.querySelector("#auth-submit");
const authToggleCopy = document.querySelector("#auth-toggle-copy");
const authStatus = document.querySelector("#auth-status");
const usernameField = document.querySelector("#username-field");
const confirmField = document.querySelector("#confirm-field");
const usernameInput = document.querySelector("#auth-username");
const passwordInput = document.querySelector("#auth-password");
const confirmInput = document.querySelector("#auth-confirm");
let isSignUp = true;

openAuth.addEventListener("click", () => authDialog.showModal());
closeAuth.addEventListener("click", () => authDialog.close());
authDialog.addEventListener("click", (event) => {
  if (event.target === authDialog) authDialog.close();
});

authToggle.addEventListener("click", () => {
  isSignUp = !isSignUp;
  usernameField.hidden = !isSignUp;
  confirmField.hidden = !isSignUp;
  usernameInput.required = isSignUp;
  confirmInput.required = isSignUp;
  passwordInput.autocomplete = isSignUp ? "new-password" : "current-password";
  confirmInput.value = "";
  confirmInput.setCustomValidity("");
  authTitle.textContent = isSignUp ? "Create your account" : "Welcome back";
  authSubtitle.textContent = isSignUp
    ? "Join the adventure. Your journey starts here."
    : "Sign in and continue your journey.";
  authSubmit.textContent = isSignUp ? "Create account" : "Sign in";
  authToggleCopy.textContent = isSignUp ? "Already have an account?" : "New to the adventure?";
  authToggle.textContent = isSignUp ? "Sign in" : "Create account";
  authStatus.textContent = "";
});

function validatePasswordMatch() {
  const matches = passwordInput.value === confirmInput.value;
  confirmInput.setCustomValidity(
    isSignUp && confirmInput.value && !matches ? "Passwords do not match." : ""
  );
}

passwordInput.addEventListener("input", validatePasswordMatch);
confirmInput.addEventListener("input", validatePasswordMatch);

authForm.addEventListener("submit", (event) => {
  event.preventDefault();
  authStatus.textContent = isSignUp
    ? "Account creation is ready to connect."
    : "Sign-in is ready to connect.";
});

document.querySelector("#auth-google").addEventListener("click", () => {
  authStatus.textContent = "Google sign-in is ready to connect.";
});