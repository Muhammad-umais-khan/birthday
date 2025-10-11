const messages = [
  "Happy Birthday, baby, i made this for you!",
  "I hope this day is as special as you are 🥺.",
  "Click the cards and the gift, there's a surprise 😊",
];
const typedEl = document.getElementById("typed");
let mI = 0,
  chI = 0;
function typeLoop() {
  const m = messages[mI];
  typedEl.textContent = m.slice(0, chI);
  chI++;
  if (chI > m.length) {
    setTimeout(() => {
      chI = 0;
      mI = (mI + 1) % messages.length;
    }, 1200);
  }
  setTimeout(typeLoop, 65);
}
typeLoop();

// October is month 10, but in JS months are 0-based (9 = October).
const target = new Date("2025-10-13T00:00:00Z"); // Z = UTC
function updateCountdown() {
  const now = new Date();
  let diff = Math.max(0, target - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= days * (1000 * 60 * 60 * 24);
  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * (1000 * 60 * 60);
  const mins = Math.floor(diff / (1000 * 60));
  diff -= mins * (1000 * 60);
  const secs = Math.floor(diff / 1000);
  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("mins").textContent = String(mins).padStart(2, "0");
  document.getElementById("secs").textContent = String(secs).padStart(2, "0");
}
updateCountdown();
setInterval(updateCountdown, 1000);

function flip(el) {
  const face = el.querySelector(".card-face");
  if (!face.classList.contains("flipped")) {
    face.style.transform = "rotateY(180deg)";
    face.classList.add("flipped");
  } else {
    face.style.transform = "";
    face.classList.remove("flipped");
  }
}

const heartsContainer = document.getElementById("hearts");
function createHeart() {
  const h = document.createElement("div");
  h.className = "heart";
  h.textContent = "❤";
  const size = 10 + Math.floor(Math.random() * 22);
  h.style.fontSize = size + "px";
  h.style.left = Math.random() * 100 + "%";
  h.style.top = "-" + (10 + Math.random() * 40) + "px";
  h.style.opacity = 0.8 + Math.random() * 0.2;
  const dur = 6 + Math.random() * 6;
  h.style.animationDuration = dur + "s";
  h.style.transform = `translateY(-20px) rotate(${Math.random() * 360}deg)`;
  heartsContainer.appendChild(h);
  setTimeout(() => h.remove(), dur * 1000 + 200);
}
setInterval(() => {
  for (let i = 0; i < 3; i++) createHeart();
}, 900);

const giftEl = document.getElementById("gift");
const revealBtn = document.getElementById("revealBtn");
revealBtn.addEventListener("click", () => {
  giftEl.textContent = "hop on roblox, lemme show u :)";
  revealBtn.textContent = "Shown";
  for (let i = 0; i < 20; i++) createHeart();
});

(function () {
  const IMAGES = [
    "my baby/1st fav.jpg",
    "my baby/2nd fav.jpg",
    "my baby/3rd fav.jpg",
    "my baby/4th fav.jpg",
    "my baby/5th fav.jpg",
  ].map((u) => encodeURI(u));

  if (!IMAGES.length) return;

  const CHANGE_INTERVAL = 4000;
  const TRANSITION_MS = 900;

  const slideA = document.getElementById("slideA");
  const slideB = document.getElementById("slideB");
  const photoText = document.getElementById("photoText");

  let currentIndex = 0;
  let current = slideA;
  let next = slideB;

  current.style.backgroundImage = `url("${IMAGES[0]}")`;
  current.classList.add("show");
  if (photoText) photoText.classList.add("hidden-text");

  function showNext() {
    const nextIndex = (currentIndex + 1) % IMAGES.length;
    next.style.backgroundImage = `url("${IMAGES[nextIndex]}")`;

    void next.offsetWidth;

    next.classList.add("show");
    current.classList.add("out");

    setTimeout(() => {
      current.classList.remove("show", "out");
      current.style.backgroundImage = "";
      const tmp = current;
      current = next;
      next = tmp;
      currentIndex = nextIndex;
    }, TRANSITION_MS + 40);
  }

  let timer = setInterval(showNext, CHANGE_INTERVAL);

  const photo = document.getElementById("photo");
  photo.addEventListener("mouseenter", () => clearInterval(timer));
  photo.addEventListener(
    "mouseleave",
    () => (timer = setInterval(showNext, CHANGE_INTERVAL))
  );
})();
document.addEventListener(
  "contextmenu",
  function (e) {
    e.preventDefault();
    // optionally show a small message:
    // alert('Right-click is disabled on this site.');
  },
  { passive: false }
);

// Disable select / copy keyboard shortcuts and devtools keys
document.addEventListener(
  "keydown",
  function (e) {
    // F12
    if (e.key === "F12" || e.keyCode === 123) {
      e.preventDefault();
      return;
    }
    // Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+U / Ctrl+S / Ctrl+Shift+C
    if (
      e.ctrlKey &&
      e.shiftKey &&
      (e.key === "I" || e.key === "J" || e.key === "C")
    ) {
      e.preventDefault();
      return;
    }
    if (e.ctrlKey && (e.key === "U" || e.key === "S")) {
      e.preventDefault();
      return;
    }
    // Cmd on Mac
    if (e.metaKey && e.altKey && e.key === "I") {
      e.preventDefault();
      return;
    }
  },
  { passive: false }
);

// Optional: very crude "devtools open" detection (heuristic, not reliable)
(function detectDevTools() {
  let open = false;
  const threshold = 160;
  function check() {
    const widthDiff = window.outerWidth - window.innerWidth;
    const heightDiff = window.outerHeight - window.innerHeight;
    // if devtools docked, these diffs often become large
    if (widthDiff > threshold || heightDiff > threshold) {
      if (!open) {
        open = true;
        console.warn("DevTools detected (heuristic)."); // visible in console only
        // take action: redirect, obfuscate, or show a cover — be careful with UX
        // window.location.href = '/'; // example extreme action (not recommended)
      }
    } else {
      open = false;
    }
  }
  // check periodically (cheap)
  setInterval(check, 1000);
})();
