// The anchors remain usable on their own when a browser does not support dialogs.
(() => {
  document.addEventListener("click", event => {
    const dialog = document.getElementById("about-image-viewer");
    if (!dialog || typeof dialog.showModal !== "function") return;

    const zoom = dialog.querySelector("[data-image-zoom]");
    const canvas = dialog.querySelector(".about-image-canvas");
    if (event.target === zoom) {
      const enlarged = dialog.classList.toggle("is-zoomed");
      zoom.setAttribute("aria-pressed", String(enlarged));
      zoom.textContent = enlarged ? "Fit image" : "Zoom in";
      if (enlarged) canvas.focus();
      return;
    }
    if (event.target === dialog) {
      dialog.close();
      return;
    }

    const link = event.target.closest("a[data-image-title]");
    if (!link || event.defaultPrevented || event.button !== 0 ||
        event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return;

    event.preventDefault();
    const picture = new Image();
    picture.alt = link.querySelector("img")?.alt || link.dataset.imageTitle;
    picture.src = link.href;
    canvas.replaceChildren(picture);
    dialog.querySelector("#about-image-title").textContent = link.dataset.imageTitle;
    dialog.classList.remove("is-zoomed");
    zoom.setAttribute("aria-pressed", "false");
    zoom.textContent = "Zoom in";
    canvas.scrollTo(0, 0);
    dialog.showModal();
  });
})();
