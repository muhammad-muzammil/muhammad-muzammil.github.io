document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.dropdown-btn');

    buttons.forEach((button) => {
        button.addEventListener('click', function () {
            const dropdownContent = this.nextElementSibling;

            if (dropdownContent.classList.contains('show')) {
                dropdownContent.classList.remove('show'); // Collapse citation
                this.textContent = 'Show Citation'; // Update button text
            } else {
                dropdownContent.classList.add('show'); // Expand citation
                this.textContent = 'Hide Citation'; // Update button text
            }
        });
    });
});

(function () {
  const WORKER_BASE = "https://winter-tooth-f8c7.muzammil1035.workers.dev";

  function isPdf(href) {
    try {
      const u = new URL(href, location.href);
      return u.pathname.toLowerCase().endsWith(".pdf");
    } catch {
      return false;
    }
  }

  function sendEvent(payload) {
    const body = JSON.stringify(payload);

    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: "application/json" });
      navigator.sendBeacon(`${WORKER_BASE}/e`, blob);
      return;
    }

    fetch(`${WORKER_BASE}/e`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
      mode: "cors",
    }).catch(() => {});
  }

  document.addEventListener(
    "click",
    (e) => {
      const a = e.target.closest && e.target.closest("a");
      if (!a || !a.href) return;

      // Optional: ignore pure in-page anchors like href="#section"
      if (a.getAttribute("href") && a.getAttribute("href").startsWith("#")) return;

      sendEvent({
        event: isPdf(a.href) ? "pdf_click" : "link_click",
        page: location.href,
        href: a.href,
        text: (a.textContent || "").trim().slice(0, 120),
        target: a.target || "",
      });
    },
    { capture: true }
  );
})();
