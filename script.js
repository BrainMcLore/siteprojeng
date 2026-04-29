const glossaryTerms = [
  { icon: "cpu", short: "CPU", term: "CPU", definition: "Central Processing Unit: the part that executes instructions and controls operations." },
  { icon: "ram", short: "RAM", term: "RAM", definition: "Random Access Memory: temporary memory used for active programs and data." },
  { icon: "storage", short: "SSD", term: "SSD", definition: "Solid-State Drive: fast storage that keeps files even when the computer is off." },
  { icon: "disk", short: "HDD", term: "Hard Drive", definition: "A storage device that saves large amounts of data on magnetic disks." },
  { icon: "gpu", short: "GPU", term: "GPU", definition: "Graphics Processing Unit: hardware that processes images, video, and 3D graphics." },
  { icon: "window", short: "OS", term: "Operating System", definition: "The main software that manages hardware and lets users run applications." },
  { icon: "app", short: "APP", term: "Application", definition: "A software program designed to help a user perform a specific task." },
  { icon: "network", short: "NET", term: "Network", definition: "A group of connected computers or devices that share data and resources." },
  { icon: "lan", short: "LAN", term: "LAN", definition: "Local Area Network: a network that connects devices in a small area like a school or office." },
  { icon: "browser", short: "WEB", term: "Browser", definition: "Software used to open and explore websites on the internet." },
  { icon: "database", short: "DB", term: "Database", definition: "An organized collection of data that can be stored, searched, and updated." },
  { icon: "cloud", short: "CLD", term: "Cloud Computing", definition: "Using servers on the internet to store data or run software instead of a local computer." },
  { icon: "bug", short: "BUG", term: "Bug", definition: "An error in software or hardware that causes a problem or unexpected result." },
  { icon: "debug", short: "FIX", term: "Debugging", definition: "The process of finding and correcting errors in a program." },
  { icon: "code", short: "COD", term: "Code", definition: "Instructions written in a programming language for a computer to follow." },
  { icon: "algorithm", short: "ALG", term: "Algorithm", definition: "A step-by-step method for solving a problem or completing a task." },
  { icon: "shield", short: "SEC", term: "Cybersecurity", definition: "The protection of systems, networks, and data from digital attacks." },
  { icon: "interface", short: "UI", term: "Interface", definition: "The visual and interactive layer that lets people use software or devices." },
  { icon: "api", short: "API", term: "API", definition: "Application Programming Interface: a set of rules that allows programs to communicate." },
  { icon: "dns", short: "DNS", term: "DNS", definition: "Domain Name System: the service that turns website names into IP addresses." },
  { icon: "ip", short: "IP", term: "IP Address", definition: "A unique number that identifies a device on a network." },
  { icon: "bot", short: "BOT", term: "Robot", definition: "A programmable machine or software agent that can perform tasks automatically." },
  { icon: "ai", short: "AI", term: "Artificial Intelligence", definition: "Technology that enables machines to perform tasks that usually require human intelligence." },
  { icon: "io", short: "I/O", term: "Input / Output", definition: "The communication between a computer and the outside world through devices or signals." }
];

const glossaryGrid = document.getElementById("glossary-grid");
const termsMarquee = document.getElementById("terms-marquee");
const termsViewport = document.getElementById("terms-viewport");
const termsPrevButton = document.getElementById("terms-prev");
const termsNextButton = document.getElementById("terms-next");
const scrollTopButton = document.getElementById("scroll-top");
const canvas = document.getElementById("stream-canvas");
const context = canvas.getContext("2d");
const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

const iconLibrary = {
  cpu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="7" width="10" height="10" rx="2"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3"/></svg>`,
  ram: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8h18v8H3z"/><path d="M7 8v8M11 8v8M15 8v8M19 8v8M6 16v2M10 16v2M14 16v2M18 16v2"/></svg>`,
  storage: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="5" width="16" height="14" rx="2"/><path d="M8 9h8M8 13h5"/></svg>`,
  disk: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M16 8h.01"/></svg>`,
  gpu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="15" height="10" rx="2"/><path d="M18 10h2l1 1v2l-1 1h-2M7 17v2M11 17v2"/></svg>`,
  window: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M12 4v16M4 12h16"/></svg>`,
  app: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/></svg>`,
  network: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="6" r="2"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/><path d="M12 8v4M8 16l3-2M16 16l-3-2"/></svg>`,
  lan: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 17h16M7 17V9h10v8M10 9V6h4v3"/></svg>`,
  browser: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8"/><path d="M4.5 9h15M9 20c1.5-2 2.5-5 2.5-8S10.5 6 9 4M15 4c-1.5 2-2.5 5-2.5 8s1 6 2.5 8"/></svg>`,
  database: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6"/><path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/></svg>`,
  cloud: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 18a4 4 0 1 1 .8-7.9A5 5 0 0 1 18 11a3.5 3.5 0 1 1 0 7Z"/></svg>`,
  bug: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 9h6v7a3 3 0 1 1-6 0z"/><path d="M12 5v4M5 13h4M15 13h4M7 7l2 2M17 7l-2 2M7 19l2-2M17 19l-2-2"/></svg>`,
  debug: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="6"/><path d="m20 20-4.2-4.2M11 8v3l2 2"/></svg>`,
  code: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 4l-4 16"/></svg>`,
  algorithm: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6h12M6 12h8M6 18h12"/><circle cx="4" cy="6" r="1"/><circle cx="4" cy="12" r="1"/><circle cx="4" cy="18" r="1"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 6 5v6c0 4 2.5 7 6 10 3.5-3 6-6 6-10V5z"/><path d="m9.5 12 1.7 1.7 3.8-3.8"/></svg>`,
  interface: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M8 15h3"/></svg>`,
  api: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7h10v10H7z"/><path d="M4 10h3M17 10h3M10 4v3M10 17v3M14 4v3M14 17v3"/></svg>`,
  dns: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8"/><path d="M4 12h16M12 4a12 12 0 0 1 0 16M12 4a12 12 0 0 0 0 16"/></svg>`,
  ip: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5v14"/><circle cx="12" cy="12" r="8"/></svg>`,
  bot: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="8" width="12" height="10" rx="3"/><path d="M12 4v4M9 12h.01M15 12h.01M9 16h6"/></svg>`,
  ai: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 8 9l4 3 4-3-4-6ZM8 15l4 6 4-6"/><path d="M5 14h14"/></svg>`,
  io: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v10M8 7l4-4 4 4M6 17h12M8 21h8"/></svg>`
};

function renderIcon(name) {
  return iconLibrary[name] || `<span>${name}</span>`;
}

function populateGlossary() {
  glossaryGrid.innerHTML = glossaryTerms
    .map(
      ({ icon, short, term, definition }) => `
        <article class="glossary-card reveal tilt-card">
          <div class="glossary-icon" aria-hidden="true">${renderIcon(icon)}</div>
          <h3>${term}</h3>
          <p>${definition}</p>
        </article>
      `
    )
    .join("");
}

function populateMarquee() {
  const markup = glossaryTerms
    .map(
      ({ icon, short, term }) => `
        <article class="term-chip">
          ${renderIcon(icon)}
          <strong>${short}</strong>
          <span>${term}</span>
        </article>
      `
    )
    .join("");

  termsMarquee.innerHTML = markup;
}

function setupTermsSlider() {
  const getStep = () => {
    const firstCard = termsMarquee.querySelector(".term-chip");
    if (!firstCard) {
      return 320;
    }

    const gap = Number.parseFloat(window.getComputedStyle(termsMarquee).columnGap || window.getComputedStyle(termsMarquee).gap || "16");
    return firstCard.getBoundingClientRect().width + gap;
  };

  const moveSlider = (direction) => {
    termsMarquee.scrollBy({
      left: getStep() * direction,
      behavior: "smooth"
    });
  };

  termsPrevButton.addEventListener("click", () => moveSlider(-1));
  termsNextButton.addEventListener("click", () => moveSlider(1));

  let isDragging = false;
  let startX = 0;
  let startScrollLeft = 0;

  const startDrag = (clientX) => {
    isDragging = true;
    startX = clientX;
    startScrollLeft = termsMarquee.scrollLeft;
    termsViewport.style.cursor = "grabbing";
  };

  const moveDrag = (clientX) => {
    if (!isDragging) {
      return;
    }

    const distance = clientX - startX;
    termsMarquee.scrollLeft = startScrollLeft - distance;
  };

  const endDrag = () => {
    isDragging = false;
    termsViewport.style.cursor = "grab";
  };

  termsViewport.addEventListener("mousedown", (event) => startDrag(event.clientX));
  window.addEventListener("mousemove", (event) => moveDrag(event.clientX));
  window.addEventListener("mouseup", endDrag);
  termsViewport.addEventListener("mouseleave", endDrag);

  termsViewport.addEventListener("touchstart", (event) => {
    startDrag(event.touches[0].clientX);
  }, { passive: true });

  termsViewport.addEventListener("touchmove", (event) => {
    moveDrag(event.touches[0].clientX);
  }, { passive: true });

  termsViewport.addEventListener("touchend", endDrag, { passive: true });
}

function activateReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));
}

function setupTilt() {
  document.querySelectorAll(".tilt-card").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateY = ((x / rect.width) - 0.5) * 10;
      const rotateX = (0.5 - (y / rect.height)) * 10;
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });
}

function setupScrollTop() {
  const update = () => {
    scrollTopButton.classList.toggle("is-visible", window.scrollY > 800);
  };

  window.addEventListener("scroll", update, { passive: true });
  scrollTopButton.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  update();
}

function resizeCanvas() {
  canvas.width = window.innerWidth * window.devicePixelRatio;
  canvas.height = window.innerHeight * window.devicePixelRatio;
  context.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
  streams.forEach((stream, index) => {
    stream.x = (window.innerWidth / streams.length) * index;
  });
}

const streams = Array.from({ length: 26 }, (_, index) => ({
  x: (window.innerWidth / 26) * index,
  speed: 0.35 + Math.random() * 1.1,
  width: 1 + Math.random() * 2.2,
  amplitude: 12 + Math.random() * 36,
  offset: Math.random() * Math.PI * 2
}));

function drawStream(timestamp) {
  if (reduceMotionQuery.matches) {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    return;
  }

  context.clearRect(0, 0, window.innerWidth, window.innerHeight);

  streams.forEach((stream, index) => {
    context.beginPath();
    context.lineWidth = stream.width;
    context.strokeStyle = index % 5 === 0 ? "rgba(216,255,97,0.15)" : "rgba(104,255,243,0.12)";

    for (let y = -40; y <= window.innerHeight + 40; y += 10) {
      const drift = Math.sin((y * 0.01) + timestamp * 0.00065 * stream.speed + stream.offset) * stream.amplitude;
      const pulse = Math.cos((y * 0.008) + timestamp * 0.00045 + stream.offset) * 8;
      const x = stream.x + drift + pulse;

      if (y === -40) {
        context.moveTo(x, y);
      } else {
        context.lineTo(x, y);
      }
    }

    context.stroke();
  });

  requestAnimationFrame(drawStream);
}

function finishLoading() {
  document.body.classList.add("is-loaded");
}

populateGlossary();
populateMarquee();
setupTermsSlider();
activateReveal();
setupTilt();
setupScrollTop();
resizeCanvas();
requestAnimationFrame(drawStream);

window.addEventListener("load", finishLoading);

window.addEventListener("resize", resizeCanvas);
