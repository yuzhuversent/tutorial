const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");
const list = document.querySelector("#todo-list");
const themeToggle = document.querySelector("#theme-toggle");
const themeIcon = themeToggle.querySelector("span");

const DARK_CLASS = "dark-theme";
const STORAGE_KEY = "theme";

const applyTheme = (isDark) => {
  document.documentElement.classList.toggle(DARK_CLASS, isDark);
  themeIcon.textContent = isDark ? "☀️" : "🌙";
  themeToggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
};

const savedTheme = localStorage.getItem(STORAGE_KEY);
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
applyTheme(savedTheme ? savedTheme === "dark" : prefersDark);

themeToggle.addEventListener("click", () => {
  const isDark = !document.documentElement.classList.contains(DARK_CLASS);
  applyTheme(isDark);
  localStorage.setItem(STORAGE_KEY, isDark ? "dark" : "light");
});

const buildTodoItem = (text) => {
  const item = document.createElement("li");
  item.className = "todo-item";

  const toggle = document.createElement("input");
  toggle.type = "checkbox";
  toggle.className = "todo-toggle";
  toggle.setAttribute("aria-label", "Mark complete");

  const label = document.createElement("span");
  label.className = "todo-text";
  label.textContent = text;

  toggle.addEventListener("change", () => {
    item.classList.toggle("is-complete", toggle.checked);
  });

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-btn";
  deleteButton.type = "button";
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    item.classList.add("is-removing");
    item.addEventListener("animationend", () => item.remove(), { once: true });
  });

  item.append(toggle, label, deleteButton);
  return item;
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = input.value.trim();
  if (!value) {
    return;
  }

  list.appendChild(buildTodoItem(value));
  form.reset();
  input.focus();
});
