(async function () {
  const mount = document.querySelector("[data-nav]");
  if (!mount) return;

  try {
    const res = await fetch("nav.html", { cache: "no-cache" });
    if (!res.ok) throw new Error("nav.html introuvable");
    mount.innerHTML = await res.text();

    // Active link simple (optionnel, joli)
    const links = mount.querySelectorAll(".nav-links a");
    const ids = Array.from(links).map(a => (a.getAttribute("href") || "").replace("#","")).filter(Boolean);

    const onScroll = () => {
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= 120) current = id;
      }
      links.forEach(a => {
        const id = (a.getAttribute("href") || "").replace("#","");
        a.classList.toggle("active", id === current);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  } catch (e) {
    // Si jamais ça fail, on ne casse pas la page
    console.warn(e);
  }
})();
