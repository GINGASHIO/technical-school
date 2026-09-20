if (window.lucide) {
  window.lucide.createIcons({
    attrs: {
      "stroke-width": 2.2,
    },
  });
}

const header = document.querySelector(".site-header");
const progress = document.querySelector(".reading-progress");
const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
let scrollFrame = null;

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 20);
  if (progress) {
    const scrollRange = document.documentElement.scrollHeight - window.innerHeight;
    const fraction = scrollRange > 0 ? window.scrollY / scrollRange : 0;
    progress.style.transform = `scaleX(${Math.max(0, Math.min(1, fraction))})`;
  }
  scrollFrame = null;
};

const queueScrollUpdate = () => {
  if (scrollFrame === null) {
    scrollFrame = window.requestAnimationFrame(updateHeader);
  }
};

updateHeader();
window.addEventListener("scroll", queueScrollUpdate, { passive: true });
window.addEventListener("resize", queueScrollUpdate);
if ("ResizeObserver" in window) {
  new ResizeObserver(queueScrollUpdate).observe(document.body);
}

document.querySelectorAll(
  ".outside-grid, .pillar-grid, .impact-row, .proof-grid, .session-timeline, .training-grid, .open-grid, .flow-grid"
).forEach((group) => {
  [...group.children].forEach((child, index) => {
    child.style.setProperty("--reveal-delay", `${Math.min(index, 3) * 90}ms`);
  });
});

const revealTargets = document.querySelectorAll(
  [
    ".section-heading",
    ".outside-panel",
    ".outside-grid article",
    ".coach-copy",
    ".coach-credential",
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
    ".faq-list",
    ".flow-grid article",
    ".price-card",
    ".final-cta",
  ].join(",")
);

let revealObserver;

if ("IntersectionObserver" in window && !motionPreference.matches) {
  revealTargets.forEach((target) => target.classList.add("reveal"));
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );

  revealTargets.forEach((target) => revealObserver.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
}

motionPreference.addEventListener("change", (event) => {
  if (event.matches) {
    revealObserver?.disconnect();
    revealTargets.forEach((target) => target.classList.add("is-visible"));
  }
});
