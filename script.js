document.addEventListener("DOMContentLoaded", () => {

  const buttons = document.querySelectorAll(".dropdown-btn");
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const dropdownContent = this.nextElementSibling;
      if (!dropdownContent) return;

      const isOpen = dropdownContent.classList.contains("show");
      dropdownContent.classList.toggle("show", !isOpen);
      this.textContent = isOpen ? "Show Citation" : "Hide Citation";
    });
  });


  const WORKER_BASE = "https://winter-tooth-f8c7.muzammil1035.workers.dev";

  function isPdfHref(href) {
    try {
      const u = new URL(href, location.href);
      return u.pathname.toLowerCase().endsWith(".pdf");
    } catch {
      return false;
    }
  }

  function sendEvent(payload) {
    const body = JSON.stringify(payload);

    // Best for navigation events
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: "application/json" });
      navigator.sendBeacon(`${WORKER_BASE}/e`, blob);
      return;
    }

    // Fallback
    fetch(`${WORKER_BASE}/e`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
      mode: "cors",
    }).catch(() => {});
  }

  // Use capture so we fire before navigation
  document.addEventListener(
    "click",
    (e) => {
      const a = e.target.closest ? e.target.closest("a") : null;
      if (!a) return;

      const hrefAttr = a.getAttribute("href") || "";
      if (!hrefAttr) return;

      // Ignore in-page anchors (#something)
      if (hrefAttr.startsWith("#")) return;

      // Ignore javascript: links
      if (hrefAttr.startsWith("javascript:")) return;

      // Resolve to absolute URL
      let hrefAbs = "";
      try {
        hrefAbs = new URL(hrefAttr, location.href).toString();
      } catch {
        return;
      }

      const pdf = isPdfHref(hrefAbs);

      sendEvent({
        event: pdf ? "pdf_click" : "link_click",
        page: location.href,
        href: hrefAbs,
        text: (a.textContent || "").trim().slice(0, 120),
        target: a.getAttribute("target") || "",
      });

      if (window.gtag) {
        window.gtag("event", pdf ? "pdf_click" : "link_click", {
          link_url: hrefAbs,
          link_text: (a.textContent || "").trim().slice(0, 120),
          page_location: location.href,
        });
      }
    },
    { capture: true }
  );
});
