if (window.lucide) {
  window.lucide.createIcons({
    attrs: {
      "stroke-width": 2.2,
    },
  });
}

const header = document.querySelector(".site-header");

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 20);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const revealTargets = document.querySelectorAll(
  [
    ".section-heading",
    ".outside-panel",
    ".outside-grid article",
    ".pillar-grid article",
    ".problem-list article",
    ".impact-row article",
    ".proof-grid span",
    ".session-timeline article",
    ".training-grid article",
    ".rule-card",
    ".growth-visual",
    ".growth-copy",
    ".check-list span",
    ".open-panel",
    ".open-grid article",
    ".flow-grid article",
    ".price-card",
    ".final-cta",
  ].join(",")
);

revealTargets.forEach((target) => target.classList.add("reveal"));

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealTargets.forEach((target) => observer.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
}
