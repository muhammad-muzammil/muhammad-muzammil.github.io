document.addEventListener("DOMContentLoaded", () => {

  const buttons = document.querySelectorAll(".cite-btn");
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const content = this.closest("li").querySelector(".cite-content");
      if (!content) return;
      const isOpen = content.classList.contains("show");
      content.classList.toggle("show", !isOpen);
      this.textContent = isOpen ? "Cite" : "Hide";

      if (!isOpen && !content.querySelector(".copy-btn")) {
        const bibtex = content.textContent.trim();
        const copyBtn = document.createElement("button");
        copyBtn.className = "copy-btn";
        copyBtn.textContent = "Copy";
        copyBtn.addEventListener("click", () => {
          navigator.clipboard.writeText(bibtex).then(() => {
            copyBtn.textContent = "Copied!";
            copyBtn.classList.add("copied");
            setTimeout(() => {
              copyBtn.textContent = "Copy";
              copyBtn.classList.remove("copied");
            }, 2000);
          });
        });
        content.prepend(copyBtn);
      }
    });
  });


  const WORKER_BASE = "https://winter-tooth-f8c7.muzammil1035.workers.dev";

  // Extra client-side context sent with every event
  const clientMeta = {
    screen: `${screen.width}x${screen.height}`,
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
    lang: navigator.language || "",
    ref_domain: document.referrer
      ? (() => { try { return new URL(document.referrer).hostname; } catch { return ""; } })()
      : "",
  };

  // Pageview pixel — append client meta as query params
  (function () {
    const params = new URLSearchParams({
      page: location.href,
      screen: clientMeta.screen,
      viewport: clientMeta.viewport,
      tz: clientMeta.tz,
      lang: clientMeta.lang,
      ref_domain: clientMeta.ref_domain,
    });
    const img = new Image();
    img.referrerPolicy = "no-referrer-when-downgrade";
    img.src = `${WORKER_BASE}/p.gif?${params}`;
  })();

  function isPdfHref(href) {
    try {
      const u = new URL(href, location.href);
      return u.pathname.toLowerCase().endsWith(".pdf");
    } catch {
      return false;
    }
  }

  function sendEvent(payload) {
    const body = JSON.stringify({ ...clientMeta, ...payload });

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

  // Track cite button clicks
  document.querySelectorAll(".cite-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const li = this.closest("li");
      const title = li ? (li.querySelector(".pub-title") || {}).textContent || "" : "";
      sendEvent({
        event: "cite_click",
        page: location.href,
        pub_title: title.trim().slice(0, 120),
      });
    }, { capture: true });
  });

  // Track all link/PDF clicks
  document.addEventListener(
    "click",
    (e) => {
      const a = e.target.closest ? e.target.closest("a") : null;
      if (!a) return;

      const hrefAttr = a.getAttribute("href") || "";
      if (!hrefAttr || hrefAttr.startsWith("#") || hrefAttr.startsWith("javascript:")) return;

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
