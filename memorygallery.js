const slides = [
  {
    src: "ourpics/MY GOSH REMEMBER THIS OMDS.jpg",
    title: "OMDS DO YOU REMEMBER THIS 🥺",
    subtitle:
      "WHEN I HAD NO SKINS AND OUR PLAYING JOURNEY WAS JUST STARTING 😙 WHO KNEW WE WOULD GET THIS OBSESSED. 🥺",
  },
  {
    src: "ourpics/AAAAAAAAAAAAA.jpg",
    title: "remember this day?? 🥺",
    subtitle:
      "i remember thinking how much i wanna be in this position this second irl 🥺🥺",
  },
  {
    src: "ourpics/crang.jpg",
    title: "remember this pic?? 😫",
    subtitle: "i remember crying so so much HAHAHAHAHAH 😭😭😭😭",
  },
  {
    src: "ourpics/omds my no skin days.jpg",
    title: "remember when this game?? 😫",
    subtitle:
      " I REMEMBER HOW THIS GAME WAS BEATIFUL BUT I HAD NO SKINS AND I MESSED THE PIC AHHAHAHAHHA 😭",
  },
  {
    src: "ourpics/omds us.jpg",
    title:
      "I. REMEMBER. THIS. EXACT. MOMENT. THE. WHOLE. SESSION. SO CLEARLY. 😫",
    subtitle:
      " HOW MUCH TIME IT TOOK US TO SETUP THE GAME AHAHAHHA 😭 WE WERE VCING FOR THE VERY FIRST TIME (PROPERLY), I WAS SO NERVOUS OMDSSSSSSSSSSSSSSSS",
  },
  {
    src: "ourpics/peak cuteness.jpg",
    title:
      "STILL ONE OF THE MOST FUN AND CUTEST GAME WE HAVE PLAYED ON ROBLOX 😫",
    subtitle:
      " I REMEMBER HOW MUCH WE FAILED CERTAIN PARTS AND HOW THE GAME SOMETIMES THREW US HIGH IN THE AIR AHHAHAHAHA",
  },
  {
    src: "ourpics/MYFAV.jpg",
    title: "MY TOP 3 FAV PICS 🥺",
    subtitle:
      " I REMEMBER HOW HAPPY I WAS WHEN THIS PIC HAPPENED🥺 AND HOW MUCH I ENJOYED THAT SESSION🥺 I LOVED HOW WE SPIN AHAHHAHAH IT WAS SO CUTEEE 🥺🥺 ",
  },
  {
    src: "ourpics/roblox1.jpg",
    title: "DA HOOD... ",
    subtitle:
      " TRAUMA... AHHAHAHAHAHAHAHH BUT I LOVED EVERY SECOND CAUSE IT WAS WITH YOU AND YOU MADE ME CRY 😭😭😭😭",
  },
  {
    src: "ourpics/roblox2.jpg",
    title: "THIS PLACE WAS SO BEAUTIFULLLLL",
    subtitle:
      "I REMEMBER THE SCENERY AND US SAYING WE WANNA MEET IRL AT THIS LOCATION AND REMEMBER THAT GUY WHO TOLD US THE FUN FACT OR SMTH AHAHAHHAHA",
  },
  {
    src: "ourpics/EVADEEEEE.png",
    title:
      "I THANK YOU SO MUCH FOR THIS GAME OMDS I LOVE PLAYING EVADE WITH YOU HEHEHEH",
    subtitle:
      "I LOVE EVERY SECOND OF ITTTTTT. PLUS DO YOU REMEMBER HOW IT MAKES ME LOOK LIKE A WET CAT AND YOU CRY THEN ME CRY AND WE CRANG AHAHAHAHAH ",
  },
];

// DOM refs
const slideWrap = document.getElementById("slideWrap");
const caption = document.getElementById("caption");
const dotsContainer = document.getElementById("dots");
const progressText = document.getElementById("progressText");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let current = 0;
let autoplay = true;
let timer = null;
const AUTOPLAY_DELAY = 5000;

function createSlideElement(slide, index) {
  const img = document.createElement("img");
  img.className = "slide";
  img.src = slide.src;
  img.alt = slide.title || `memory ${index + 1}`;
  img.loading = "lazy";
  img.style.opacity = 0;
  img.style.position = "absolute";
  img.style.left = 0;
  img.style.top = 0;
  img.style.width = "100%";
  img.style.height = "100%";
  img.style.objectFit = "cover";
  img.dataset.index = index;
  return img;
}

// initialize slides
slides.forEach((s, i) => {
  const el = createSlideElement(s, i);
  if (i === 0) {
    el.style.opacity = 1;
    el.style.transform = "scale(1)";
  } else {
    el.style.opacity = 0;
    el.style.transform = "scale(1.04)";
  }
  slideWrap.appendChild(el);

  // dot
  const dot = document.createElement("div");
  dot.className = "dot" + (i === 0 ? " active" : "");
  dot.dataset.index = i;
  dot.addEventListener("click", () => goTo(parseInt(dot.dataset.index)));
  dotsContainer.appendChild(dot);
});

function updateCaption(i) {
  const s = slides[i];
  caption.querySelector(".who")?.remove?.();
  caption.querySelector(".when")?.remove?.();
  const who = document.createElement("span");
  who.className = "who";
  who.textContent = s.title || "";
  const when = document.createElement("span");
  when.className = "when";
  when.textContent = s.subtitle || "";
  caption.prepend(when);
  caption.prepend(who);
}

function goTo(i) {
  if (i < 0) i = slides.length - 1;
  if (i >= slides.length) i = 0;
  if (i === current) return;

  const prev = slideWrap.querySelector('img[data-index="' + current + '"]');
  const next = slideWrap.querySelector('img[data-index="' + i + '"]');
  if (!next) return;

  // animate
  prev.style.transition =
    "opacity 520ms ease, transform 700ms cubic-bezier(.22,.9,.33,1)";
  next.style.transition =
    "opacity 520ms ease, transform 700ms cubic-bezier(.22,.9,.33,1)";
  prev.style.opacity = 0;
  prev.style.transform = "scale(1.04)";
  next.style.opacity = 1;
  next.style.transform = "scale(1)";

  // dots
  dotsContainer
    .querySelectorAll(".dot")
    .forEach((d) => d.classList.remove("active"));
  dotsContainer
    .querySelector('.dot[data-index="' + i + '"]')
    ?.classList.add("active");

  current = i;
  progressText.textContent = `${current + 1} / ${slides.length}`;
  updateCaption(current);
  resetAutoplay();
}

function next() {
  goTo(current + 1);
}
function prev() {
  goTo(current - 1);
}

prevBtn.addEventListener("click", prev);
nextBtn.addEventListener("click", next);

// keyboard nav
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") prev();
  if (e.key === "ArrowRight") next();
  if (e.key === " ") {
    autoplay = !autoplay;
    resetAutoplay();
  }
});

// autoplay
function resetAutoplay() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
  if (autoplay) timer = setInterval(() => next(), AUTOPLAY_DELAY);
}

// basic swipe support
(function addSwipe() {
  let startX = 0,
    startY = 0,
    moved = false;
  slideWrap.addEventListener(
    "touchstart",
    (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      moved = false;
    },
    { passive: true }
  );
  slideWrap.addEventListener(
    "touchmove",
    (e) => {
      moved = true;
    },
    { passive: true }
  );
  slideWrap.addEventListener("touchend", (e) => {
    if (!moved) return;
    const endX = (e.changedTouches && e.changedTouches[0].clientX) || 0;
    const dx = endX - startX;
    if (Math.abs(dx) > 30) {
      if (dx < 0) next();
      else prev();
    }
  });
})();

// small optimization: pre-load next image
function preloadNext() {
  const nextIndex = (current + 1) % slides.length;
  const nextSrc = slides[nextIndex].src;
  const i = new Image();
  i.src = nextSrc;
}

// start
updateCaption(0);
progressText.textContent = `1 / ${slides.length}`;
resetAutoplay();
