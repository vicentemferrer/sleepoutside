import { qs } from "./utils.mjs";

function removeAlert(e) {
  e.currentTarget.parentElement.remove();
}

function alertTemplate(message) {
  const template = qs("#alertTemplate");
  const clone = template.content.cloneNode(true);

  qs("p", clone).textContent = message;

  qs("button", clone).addEventListener("click", removeAlert);

  return clone;
}

export function alertMessage(message, scroll = true) {
  const main = qs("main");
  const alert = alertTemplate(message);

  main.prepend(alert);

  if (scroll) window.scrollTo(0, 0);
}
