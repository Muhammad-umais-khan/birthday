function spawnHearts(count = 30) {
  const container = document.getElementById("hearts");
  for (let i = 0; i < count; i++) {
    const d = document.createElement("div");
    d.className = "heart";
    d.textContent = ["💖", "💍", "❤", "💘"][Math.floor(Math.random() * 4)];
    const size = 14 + Math.floor(Math.random() * 28);
    d.style.fontSize = size + "px";
    d.style.left = Math.random() * 100 + "%";
    d.style.top = -(10 + Math.random() * 30) + "px";
    d.style.animationDuration = 4 + Math.random() * 5 + "s";
    container.appendChild(d);
    setTimeout(() => d.remove(), 9000);
  }
}

// playful moving 'No' button behavior
const noBtn = document.getElementById("noBtn");
let dodge = true;
noBtn.addEventListener("mouseenter", () => {
  if (!dodge) return;
  // move it to a random nearby position inside its container
  const parentRect = noBtn.parentElement.getBoundingClientRect();
  const wrapRect = document.querySelector(".wrap").getBoundingClientRect();
  const maxX = Math.max(10, wrapRect.width - parentRect.width - 40);
  const offsetX = Math.random() * maxX - maxX / 2;
  noBtn.style.transform = `translateX(${offsetX}px) translateY(${
    Math.random() * 10 - 5
  }px)`;
});
noBtn.addEventListener("click", () => {
  dodge = false;
  noBtn.style.transform = "";
  noBtn.textContent = "Okay... 🥺";
});

// YES flow
const yesBtn = document.getElementById("yesBtn");
const modal = document.getElementById("modal");
const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");
const closeModal = document.getElementById("closeModal");

yesBtn.addEventListener("click", () => {
  spawnHearts(60);
  modal.style.display = "flex";
  // set default date
  const dateInput = document.getElementById("certDate");
  if (!dateInput.value) dateInput.value = new Date().toLocaleDateString();
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// const canvas = document.getElementById("certCanvas");
// const ctx = canvas.getContext("2d");
// initial draw
let canvas, ctx;

window.addEventListener("load", () => {
  canvas = document.getElementById("certCanvas");
  ctx = canvas.getContext("2d");
  drawCertificate("Umais", "Maria", new Date().toLocaleDateString());
});

function drawCertificate(your, their, dateStr) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#fffef7";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "#ffdce6";
  ctx.lineWidth = 14;
  roundRect(ctx, 10, 10, canvas.width - 20, canvas.height - 20, 18);
  ctx.stroke();

  ctx.fillStyle = "#ff8fb1";
  ctx.fillRect(40, 36, canvas.width - 80, 64);
  ctx.fillStyle = "#fff";
  ctx.font = "700 28px Poppins, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("Officially  Marriage Certificate", canvas.width / 2, 80);

  ctx.fillStyle = "#333";
  ctx.font = "500 18px Poppins, sans-serif";
  ctx.textAlign = "center";
  const line1 = `This certifies that ${your} and ${their}`;
  const line2 = `have agreed to be silly, kind, and to share pizza and Robux forever.`;
  ctx.fillText(line1, canvas.width / 2, 160);
  ctx.fillText(line2, canvas.width / 2, 190);

  ctx.font = "800 36px Poppins, sans-serif";
  ctx.fillStyle = "#8b1f53";
  ctx.fillText(your, canvas.width / 2, 260);
  ctx.fillText("&", canvas.width / 2, 305);
  ctx.fillText(their, canvas.width / 2, 350);

  ctx.font = "500 14px Poppins, sans-serif";
  ctx.fillStyle = "#444";
  ctx.fillText(`Date: ${dateStr}`, canvas.width / 3, 420);
  ctx.fillText("Official witness: The Internet", (canvas.width / 3) * 2, 420);

  ctx.strokeStyle = "#d8a2b8";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(120, 450);
  ctx.lineTo(320, 450);
  ctx.moveTo(480, 450);
  ctx.lineTo(680, 450);
  ctx.stroke();
  ctx.fillStyle = "#666";
  ctx.font = "12px Poppins, sans-serif";
  ctx.fillText(your, 220, 468);
  ctx.fillText(their, 580, 468);
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

generateBtn.addEventListener("click", () => {
  const your = document.getElementById("yourName").value || "You";
  const their = document.getElementById("theirName").value || "Your Love";
  const dateStr =
    document.getElementById("certDate").value ||
    new Date().toLocaleDateString();
  drawCertificate(your, their, dateStr);
});

downloadBtn.addEventListener("click", () => {
  const data = canvas.toDataURL("image/png");
  const a = document.createElement("a");
  a.href = data;
  a.download = "superOfficial-marriage-certificate.png";
  document.body.appendChild(a);
  a.click();
  a.remove();
});

printBtn.addEventListener("click", () => {
  const data = canvas.toDataURL("image/png");
  const w = window.open("", "_blank");
  w.document.write(`<img src="${data}" style="max-width:100%;height:auto">`);
  w.document.title = "Marriage Certificate";
  w.print();
});
