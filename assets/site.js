// Small enhancements shared by the six static pages and the portable preview.
(() => {
  function setMenu(button, open) {
    const navigation = document.getElementById(
      button.getAttribute("aria-controls"),
    );
    navigation.classList.toggle("is-open", open);
    button.setAttribute("aria-expanded", String(open));
    button.setAttribute(
      "aria-label",
      open ? "Close navigation" : "Open navigation",
    );
    button.firstChild.textContent = open ? "Close " : "Menu ";
    button.querySelector("span").textContent = open ? "×" : "☰";
  }

  function setAccordion(button, open) {
    const panel = document.getElementById(button.getAttribute("aria-controls"));
    const heading = button.closest("h3");
    const state = open ? "open" : "closed";
    button.setAttribute("aria-expanded", String(open));
    for (const part of [button, heading, heading.parentElement, panel]) {
      part.dataset.state = state;
    }
    panel.hidden = !open;
  }

  function selectTab(selected) {
    const group = selected.closest('[role="tablist"]');
    for (const tab of group.querySelectorAll('[role="tab"]')) {
      const active = tab === selected;
      tab.tabIndex = active ? 0 : -1;
      tab.setAttribute("aria-selected", String(active));
      document.getElementById(tab.getAttribute("aria-controls")).hidden =
        !active;
    }
  }

  document.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (button?.matches(".menu-button")) {
      setMenu(button, button.getAttribute("aria-expanded") !== "true");
    } else if (button?.matches(".accordion-trigger")) {
      setAccordion(button, button.getAttribute("aria-expanded") !== "true");
    } else if (button?.matches("[data-cycle]")) {
      selectTab(button);
    } else if (event.target.closest("#main-nav a")) {
      const menu = document.querySelector(".menu-button");
      if (menu?.getAttribute("aria-expanded") === "true") setMenu(menu, false);
    }
  });

  document.addEventListener("keydown", (event) => {
    const menu = document.querySelector('.menu-button[aria-expanded="true"]');
    if (event.key === "Escape" && menu) {
      setMenu(menu, false);
      menu.focus();
      return;
    }

    const current = event.target.closest("[data-cycle], .accordion-trigger");
    if (!current) return;
    const isTab = current.matches("[data-cycle]");
    const group = current.closest(
      isTab ? '[role="tablist"]' : ".sessions, .faq-list",
    );
    const controls = Array.from(
      group.querySelectorAll(isTab ? "[data-cycle]" : ".accordion-trigger"),
    );
    const index = controls.indexOf(current);
    const nextKey = isTab ? "ArrowRight" : "ArrowDown";
    const previousKey = isTab ? "ArrowLeft" : "ArrowUp";
    const positions = {
      [nextKey]: (index + 1) % controls.length,
      [previousKey]: (index + controls.length - 1) % controls.length,
      Home: 0,
      End: controls.length - 1,
    };
    if (!Object.hasOwn(positions, event.key)) return;
    event.preventDefault();
    const next = controls[positions[event.key]];
    if (isTab) selectTab(next);
    next.focus();
  });
})();
