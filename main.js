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

const target = new Date(2025, 9, 13, 0, 0, 0);
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
const launchDate = new Date(2025, 9, 13, 0, 0, 0); // Oct 13, 2025

function updateGate() {
  const now = new Date();
  const diff = launchDate - now;

  if (diff <= 0) {
    // time reached: hide gate, show real site
    document.getElementById("gate").style.display = "none";
    document.getElementById("realContent").style.display = "block";
    return;
  }

  // Otherwise keep updating the gate countdown
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);

  document.getElementById("gateDays").textContent = days;
  document.getElementById("gateHours").textContent = hours;
  document.getElementById("gateMins").textContent = mins;
  document.getElementById("gateSecs").textContent = secs;

  setTimeout(updateGate, 1000);
}

updateGate();
// block right click
document.addEventListener("contextmenu", (e) => e.preventDefault());

// block F12, Ctrl+Shift+I, etc.
document.addEventListener("keydown", (e) => {
  if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I")) {
    e.preventDefault();
  }
});

// detect devtools (rough)
setInterval(() => {
  if (
    window.outerHeight - window.innerHeight > 200 ||
    window.outerWidth - window.innerWidth > 200
  ) {
    alert("No peeking 👀");
    window.location.reload();
  }
}, 1000);
