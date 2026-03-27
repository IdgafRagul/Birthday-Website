/* ═══════════════════════════════════════════════════════
   ✏️  SETTINGS — edit these to personalise
═══════════════════════════════════════════════════════ */
const PASSCODE  = "1825";                           // 4-digit unlock code
const BORN_DATE = new Date(2003, 2, 25, 0, 0, 0);  // March 25 2003  (month is 0-indexed)

// ✏️  Replace "" with a photo path e.g. "photos/us1.jpg"
//     captionEn / messageEn = English   (face 2)
//     captionTa / messageTa = Tamil     (face 1)
const CARDS = [
  {
    photo:     "src/IMG-20250429-WA0094.jpg",
    messageEn: "Jeeva, thank you so much for coming into my life",
    messageTa: "ஜீவா என் வாழ்க்கையில வந்ததுக்கு ரொம்ப நன்றி.",
  },
  {
    photo:     "src/IMG_20241005_184907650.jpg",
    messageEn: "We have gone through so many struggles between us. But no matter how many struggles came our way, you never left me. For that alone, I am forever indebted to you.",
    messageTa: "நமக்குள்ள எவ்வளவோ சண்டை வந்திருக்கு என்னதான் எவ்வளவு சண்டை வந்தாலும் நீ என்ன விட்டு போனதில்லை அதுக்காகவே உனக்கு நான் கடமைப்பட்டிருக்கிறேன்.",
  },
  {
    photo:     "src/IMG_20220325_093652.jpg",
    messageEn: "I never even dreamed or thought that we would be together for this many years. But now, you are here with me, and it feels just like a dream",
    messageTa: "இத்தனை வருஷம் நம்ம ஒண்ணா இருப்போமான்னு நான் கனவுல கூட நினைச்சு பார்க்கல ஆனா நீ இப்போ என் கூட ஒண்ணா இருக்க இது ஒரு கனவு மாதிரி இருக்கு.",
  },
  {
    photo:     "src/IMG_20250826_153601025.jpg",
    messageEn: "One day, I saw you at school by chance. I don't know what it was... just some kind of feeling. I didn't understand what it was then, but I understand that feeling now. What was it? It’s that I've liked you since then. That’s what it was.",
    messageTa: "ஏதோ ஒரு நாள் நான் உன்ன school எதேர்ச்சியா பார்த்தேன் என்னன்னு தெரியல ஏதோ ஒரு feeling என்னனு அது புரியல ஆனா இப்போ புரிஞ்சுச்சு என்ன feelings அது என்னன்னா உன்ன எனக்கு புடிச்சிருக்குன்னு தோணுச்சு போல அதான்.",
  },
  {
    photo:     "src/IMG-20250407-WA0014.jpg",
    messageEn: "I used to wonder,Will this girl ever love me? But now, you love me, and it has been 7 years already.Thank you so much..",
    messageTa: "இந்த பொண்ணு நான் நம்பல love பண்ணுமானு நான் யோசிச்சேன் ஆனா நீ இப்போ என்ன love பண்ணுற அதுவும் 7 வருஷமா thanks you so much.",
  },
  {
    photo:     "src/IMG_20250826_153600527.jpg",
    messageEn: "I love you Kuttachi.",
    messageTa: "❤️.",
  },
];


/* ═══════════════════════════════════════════════════════
   VAULT — ambient sparkles (light warm palette)
═══════════════════════════════════════════════════════ */
(function initVaultSparkles() {
  const cv  = document.getElementById("vault-sparkle");
  const ctx = cv.getContext("2d");

  function resize() { cv.width = innerWidth; cv.height = innerHeight; }
  resize();
  addEventListener("resize", resize);

  const particles = Array.from({ length: 70 }, () => ({
    x  : Math.random(),
    y  : Math.random(),
    r  : 0.4 + Math.random() * 2,
    a  : Math.random() * Math.PI * 2,
    da : (0.003 + Math.random() * 0.01) * (Math.random() > 0.5 ? 1 : -1),
    ci : Math.random() > 0.5 ? 0 : 1,
  }));
  const palette = ["rgba(201,147,58,", "rgba(192,65,90,"];

  (function draw() {
    ctx.clearRect(0, 0, cv.width, cv.height);
    particles.forEach(p => {
      p.a += p.da;
      const alpha = 0.04 + 0.18 * (0.5 + 0.5 * Math.sin(p.a));
      ctx.beginPath();
      ctx.arc(p.x * cv.width, p.y * cv.height, p.r, 0, Math.PI * 2);
      ctx.fillStyle = palette[p.ci] + alpha + ")";
      ctx.fill();
    });
    requestAnimationFrame(draw);
  })();
})();


/* ═══════════════════════════════════════════════════════
   VAULT — falling petals
═══════════════════════════════════════════════════════ */
(function initVaultPetals() {
  const wrap   = document.getElementById("vault-petals");
  const colors = ["#f7d4d4","#f9c6d0","#f0c97a","#fce4ec","#e8b4bc","#ffd6e0"];

  for (let i = 0; i < 20; i++) {
    const p = document.createElement("div");
    p.className = "vpetal";
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      top:  ${-5 - Math.random() * 15}%;
      background: ${colors[~~(Math.random() * colors.length)]};
      width:  ${10 + Math.random() * 14}px;
      height: ${14 + Math.random() * 14}px;
      animation-duration: ${7 + Math.random() * 9}s;
      animation-delay:    ${Math.random() * 9}s;
      border-radius: ${Math.random() > 0.5 ? "50% 0 50% 0" : "0 50% 0 50%"};
    `;
    wrap.appendChild(p);
  }
})();


/* ═══════════════════════════════════════════════════════
   FLOATING HEARTS — spawned on every numpad tap
═══════════════════════════════════════════════════════ */
const HEART_CHARS = ["❤️","🩷","🧡","💛","🌸","💗","💖","💕","✨","🌹"];

function spawnHearts(anchorEl) {
  const rect = anchorEl.getBoundingClientRect();
  const cx   = rect.left + rect.width  / 2;
  const cy   = rect.top  + rect.height / 2;

  for (let i = 0; i < 4; i++) {
    const h = document.createElement("div");
    h.className   = "float-heart";
    h.textContent = HEART_CHARS[~~(Math.random() * HEART_CHARS.length)];
    h.style.cssText = `
      left: ${cx + (Math.random() - 0.5) * 80}px;
      top:  ${cy}px;
      font-size:          ${1.2 + Math.random() * 0.9}rem;
      animation-duration: ${1   + Math.random() * 0.6}s;
      animation-delay:    ${i * 0.07}s;
    `;
    document.body.appendChild(h);
    h.addEventListener("animationend", () => h.remove());
  }
}


/* ═══════════════════════════════════════════════════════
   VAULT PASSCODE
═══════════════════════════════════════════════════════ */
(function initVault() {
  let input = "";
  const dots   = [...document.querySelectorAll(".dot")];
  const errEl  = document.getElementById("vault-err");
  const iconEl = document.getElementById("vault-icon");
  const screen = document.getElementById("vault-screen");

  function updateDots() {
    dots.forEach((d, i) => {
      d.classList.toggle("filled", i < input.length);
      d.classList.remove("error");
    });
  }

  function shakeError() {
    dots.forEach(d => d.classList.add("error"));
    errEl.classList.add("show");
    setTimeout(() => dots.forEach(d => d.classList.remove("error")), 450);
    setTimeout(() => { input = ""; updateDots(); }, 560);
  }

  function unlock() {
    if (input !== PASSCODE) { shakeError(); return; }

    // ── correct ──
    iconEl.textContent = "🔓";
    iconEl.classList.add("open");
    errEl.classList.remove("show");
    dots.forEach(d => {
      d.classList.add("filled");
      d.style.background  = "linear-gradient(135deg,var(--gold),var(--rose))";
      d.style.boxShadow   = "0 0 14px rgba(192,65,90,.6)";
    });

    // burst hearts from centre
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        const h = document.createElement("div");
        h.className   = "float-heart";
        h.textContent = HEART_CHARS[~~(Math.random() * HEART_CHARS.length)];
        h.style.cssText = `
          left: ${30 + Math.random() * 40}%;
          top:  55%;
          font-size:          ${1.5 + Math.random() * 1.2}rem;
          animation-duration: 1.4s;
          animation-delay:    ${i * 0.08}s;
        `;
        document.body.appendChild(h);
        h.addEventListener("animationend", () => h.remove());
      }, i * 60);
    }

    setTimeout(() => screen.classList.add("unlocking"), 500);
    setTimeout(() => {
      screen.style.display = "none";
      document.getElementById("site").classList.add("revealed");
      initSite();
    }, 1700);
  }

  // numpad clicks
  document.getElementById("numpad").addEventListener("click", e => {
    const btn = e.target.closest(".num-btn");
    if (!btn) return;

    if (btn.id === "del-btn") {
      input = input.slice(0, -1);
      errEl.classList.remove("show");
    } else if (btn.id === "ok-btn") {
      if (input.length === 4) unlock();
    } else if (input.length < 4) {
      input += btn.dataset.n;
      spawnHearts(btn);
      if (input.length === 4) setTimeout(unlock, 220);
    }
    updateDots();
  });

  // keyboard support
  document.addEventListener("keydown", e => {
    if (!screen || screen.style.display === "none") return;
    if (e.key >= "0" && e.key <= "9" && input.length < 4) {
      input += e.key;
      updateDots();
      const btn = document.querySelector(`.num-btn[data-n="${e.key}"]`);
      if (btn) spawnHearts(btn);
      if (input.length === 4) setTimeout(unlock, 220);
    } else if (e.key === "Backspace") {
      input = input.slice(0, -1);
      errEl.classList.remove("show");
      updateDots();
    } else if (e.key === "Enter" && input.length === 4) {
      unlock();
    }
  });
})();


/* ═══════════════════════════════════════════════════════
   SITE INITIALISATION (called after vault unlocks)
═══════════════════════════════════════════════════════ */
function initSite() {
  spawnPetals();
  ambientSparkles();
  updateCountdown();
  setInterval(updateCountdown, 1000);
  buildCards();
  letterModal();
  setupFireworks();
  buildBalloons();
  setupBlowButton();
  setupMusic();          // ← background music

  document.getElementById("letter-date-stamp").textContent =
    new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}


/* ═══════════════════════════════════════════════════════
   BACKGROUND MUSIC
   — autoplays when the vault unlocks (user gesture ✓)
   — auto-pauses when birthday video plays
   — auto-resumes when birthday video pauses or ends
   — floating button toggles manually at any time
═══════════════════════════════════════════════════════ */
function setupMusic() {
  const audio = document.getElementById("bg-music");
  const btn   = document.getElementById("music-btn");
  const icon  = document.getElementById("music-icon");

  // track whether user manually muted so we don't resume against their wish
  let userMuted = false;

  // helper — start BGM + sync button state
  function playBGM() {
    audio.play().then(() => {
      btn.classList.add("playing");
      btn.classList.remove("muted");
    }).catch(() => {});
  }

  // helper — pause BGM + sync button state
  function pauseBGM() {
    audio.pause();
    btn.classList.remove("playing");
    btn.classList.add("muted");
  }

  // start at a gentle volume and autoplay on unlock
  audio.volume = 0.45;
  playBGM();

  // ── video ↔ BGM auto-sync ────────────────────────────
  // Wait for video element to exist (it's revealed later)
  // We use event delegation on the document so it works
  // even before the video section is shown.
  document.addEventListener("play", e => {
    if (e.target.id === "bday-video") {
      pauseBGM();         // video started  → pause BGM
    }
  }, true);

  document.addEventListener("pause", e => {
    if (e.target.id === "bday-video" && !userMuted) {
      playBGM();          // video paused   → resume BGM
    }
  }, true);

  document.addEventListener("ended", e => {
    if (e.target.id === "bday-video" && !userMuted) {
      playBGM();          // video finished → resume BGM
    }
  }, true);

  // ── manual toggle button ─────────────────────────────
  btn.addEventListener("click", () => {
    if (audio.paused) {
      userMuted = false;
      playBGM();
    } else {
      userMuted = true;
      pauseBGM();
    }
  });
}


/* ═══════════════════════════════════════════════════════
   SITE PETALS (hero section)
═══════════════════════════════════════════════════════ */
function spawnPetals() {
  const container = document.getElementById("petals");
  const colors    = ["#f7d4d4","#f9c6d0","#f0c97a","#fce4ec","#e8b4bc"];

  for (let i = 0; i < 20; i++) {
    const p = document.createElement("div");
    p.className = "petal";
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      top:  ${Math.random() * -20}%;
      background: ${colors[~~(Math.random() * colors.length)]};
      width:  ${12 + Math.random() * 14}px;
      height: ${16 + Math.random() * 14}px;
      animation-duration: ${6 + Math.random() * 8}s;
      animation-delay:    ${Math.random() * 7}s;
      border-radius: ${Math.random() > 0.5 ? "50% 0 50% 0" : "0 50% 0 50%"};
    `;
    container.appendChild(p);
  }
}


/* ═══════════════════════════════════════════════════════
   AMBIENT SPARKLES (full site overlay)
═══════════════════════════════════════════════════════ */
function ambientSparkles() {
  const cv  = document.getElementById("sparkle-canvas");
  const ctx = cv.getContext("2d");
  let W, H;

  function resize() { W = cv.width = innerWidth; H = cv.height = innerHeight; }
  resize();
  addEventListener("resize", resize);

  const rand = (a, b) => a + Math.random() * (b - a);
  const pts  = Array.from({ length: 60 }, () => ({
    x  : rand(0, 1), y: rand(0, 1),
    r  : rand(0.5, 2.5),
    a  : rand(0, Math.PI * 2),
    da : rand(0.005, 0.015) * (Math.random() > 0.5 ? 1 : -1),
  }));

  (function draw() {
    ctx.clearRect(0, 0, W, H);
    pts.forEach(p => {
      p.a += p.da;
      const al = 0.15 + 0.5 * (0.5 + 0.5 * Math.sin(p.a));
      ctx.beginPath();
      ctx.arc(p.x * W, p.y * H, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201,147,58,${al})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  })();
}


/* ═══════════════════════════════════════════════════════
   COUNTDOWN — years / months / days / h / m / s
═══════════════════════════════════════════════════════ */
function updateCountdown() {
  const now      = new Date();
  const diff     = now - BORN_DATE;

  if (diff < 0) {
    document.getElementById("cd-note").textContent = "A beautiful soul is on her way… 🌹";
    return;
  }

  // ── Total elapsed units ──
  const totalSecs  = Math.floor(diff / 1000);
  const totalMins  = Math.floor(totalSecs / 60);
  const totalHours = Math.floor(totalMins / 60);
  const totalDays  = Math.floor(totalHours / 24);

  // ── Years elapsed ──
  let years = now.getFullYear() - BORN_DATE.getFullYear();
  const thisYearBirthday = new Date(
    now.getFullYear(),
    BORN_DATE.getMonth(),
    BORN_DATE.getDate()
  );
  if (now < thisYearBirthday) years--;

  // ── Months elapsed (within current year) ──
  let months = now.getMonth() - BORN_DATE.getMonth();
  if (now.getDate() < BORN_DATE.getDate()) months--;
  if (months < 0) months += 12;

  // ── Days elapsed (within current month) ──
  // Find the most recent "anniversary of birth day-of-month"
  let anchorDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    BORN_DATE.getDate()
  );
  // If that date is in the future this month, go back one month
  if (anchorDate > now) {
    anchorDate = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      BORN_DATE.getDate()
    );
  }
  const days = Math.floor((now - anchorDate) / (1000 * 60 * 60 * 24));

  // ── Hours, Minutes, Seconds (live ticking) ──
  const hours = totalHours % 24;
  const mins  = totalMins  % 60;
  const secs  = totalSecs  % 60;

  // ── Smooth flip animation on change ──
  function setWithFlip(id, newVal) {
    const el = document.getElementById(id);
    const val = String(newVal);
    if (el.dataset.prev === val) return;   // no change → skip
    el.dataset.prev = val;

    el.animate(
      [
        { opacity: 1, transform: "translateY(0px)"   },
        { opacity: 0, transform: "translateY(-14px)" },
        { opacity: 0, transform: "translateY(14px)"  },
        { opacity: 1, transform: "translateY(0px)"   },
      ],
      { duration: 350, easing: "ease-in-out" }
    );

    // update text at the midpoint so it's invisible during swap
    setTimeout(() => { el.textContent = val; }, 175);
  }

  setWithFlip("cd-years",  years);
  setWithFlip("cd-months", months);
  setWithFlip("cd-days",   days);
  setWithFlip("cd-hours",  hours);
  setWithFlip("cd-mins",   String(mins).padStart(2, "0"));
  setWithFlip("cd-secs",   String(secs).padStart(2, "0"));

  document.getElementById("cd-note").textContent =
    `${totalDays.toLocaleString()} days of sunshine this world has been blessed with 🌹`;
}

/* ═══════════════════════════════════════════════════════
   FLIP CARDS  — 3-face cycle: Photo → Tamil → English
   Click (or tap) anywhere on a card to advance to next face.
   Click the placeholder face to upload a photo instead.
═══════════════════════════════════════════════════════ */
function buildCards() {
  const grid = document.getElementById("card-grid");

  CARDS.forEach((card, i) => {
    const el = document.createElement("div");
    el.className = "tri-card";

    // ── face 0: photo (default) ──────────────────────
    const face0 = document.createElement("div");
    face0.className = "tri-face tri-photo";
    face0.dataset.state = "active";
    face0.id = `face0-${i}`;

    if (card.photo) {
      face0.innerHTML = `
        <img src="${card.photo}" alt="Memory ${i + 1}" loading="lazy"/>
        <span class="tri-hint">tap ✦</span>
      `;
    } else {
      face0.innerHTML = `
        <div class="flip-front-placeholder" id="ph-${i}">
          <span class="icon">📷</span>
          <span class="ph-label">Add Photo ${i + 1}</span>
          <span class="upload-badge">tap to upload</span>
          <input type="file" accept="image/*" data-card="${i}"/>
        </div>
        <span class="tri-hint">tap ✦</span>
      `;
    }

    // ── face 1: Tamil ────────────────────────────────
    const face1 = document.createElement("div");
    face1.className = "tri-face tri-tamil";
    face1.dataset.state = "right";
    face1.innerHTML = `
      <div class="tri-lang-badge">தமிழ்</div>
      <div class="tri-quote">"</div>
      <p class="tri-message">${card.messageTa}</p>
      <p class="tri-caption">${card.captionTa}</p>
      <span class="tri-hint">tap ✦</span>
    `;

    // ── face 2: English ──────────────────────────────
    const face2 = document.createElement("div");
    face2.className = "tri-face tri-english";
    face2.dataset.state = "right";
    face2.innerHTML = `
      <div class="tri-lang-badge tri-lang-en">EN</div>
      <div class="tri-quote">"</div>
      <p class="tri-message">${card.messageEn}</p>
      <p class="tri-caption">${card.captionEn}</p>
      <span class="tri-hint">tap ✦</span>
    `;

    el.append(face0, face2, face1);
    grid.appendChild(el);

    // ── 3-state cycling ──────────────────────────────
    const faces = [face0, face2, face1];
    let current = 0;

    function advance() {
      const exiting  = current;
      const entering = (current + 1) % 3;
      current = entering;

      // outgoing: slide left
      faces[exiting].dataset.state = "left";

      // incoming: snap to right (no transition), then animate to centre
      faces[entering].style.transition = "none";
      faces[entering].dataset.state    = "right";
      requestAnimationFrame(() => requestAnimationFrame(() => {
        faces[entering].style.transition = "";
        faces[entering].dataset.state    = "active";
      }));
    }

    el.addEventListener("click", e => {
      if (e.target.tagName === "INPUT") return;   // let file-picker open
      advance();
    });

    // ── photo upload wiring ───────────────────────────
    if (!card.photo) {
      const input = face0.querySelector(`input[data-card="${i}"]`);
      input.addEventListener("change", () => {
        const file = input.files[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        face0.innerHTML = `
          <img src="${url}" alt="Memory ${i + 1}" style="width:100%;height:100%;object-fit:cover;display:block;border-radius:20px;"/>
          <span class="tri-hint">tap ✦</span>
        `;
        // re-bind click so advance still works after innerHTML swap
        face0.addEventListener("click", () => {});
      });
    }
  });
}


/* ═══════════════════════════════════════════════════════
   LETTER MODAL
═══════════════════════════════════════════════════════ */
function letterModal() {
  const btn     = document.getElementById("letter-btn");
  const overlay = document.getElementById("letter-overlay");
  const closeEl = document.getElementById("letter-close");

  btn.addEventListener("click",  () => overlay.classList.add("open"));
  closeEl.addEventListener("click", () => overlay.classList.remove("open"));
  overlay.addEventListener("click", e => { if (e.target === overlay) overlay.classList.remove("open"); });
}


/* ═══════════════════════════════════════════════════════
   BALLOONS
═══════════════════════════════════════════════════════ */
function buildBalloons() {
  const wrap  = document.getElementById("balloons-wrap");
  const defs  = [
    { c: "#e05070", sh: "rgba(255,170,180,.6)", st: "#c03050" },
    { c: "#f0c040", sh: "rgba(255,240,140,.6)", st: "#b08820" },
    { c: "#9060d0", sh: "rgba(200,150,255,.5)", st: "#7040b0" },
    { c: "#40b080", sh: "rgba(130,255,190,.5)", st: "#288060" },
    { c: "#e07040", sh: "rgba(255,195,120,.55)",st: "#b05020" },
  ];

  defs.forEach(b => {
    const item = document.createElement("div");
    item.className = "balloon-item";
    item.innerHTML = `
      <svg class="balloon-svg" width="60" height="80" viewBox="0 0 60 80">
        <ellipse cx="30" cy="34" rx="26" ry="30" fill="${b.c}"/>
        <ellipse cx="21" cy="20" rx="8"  ry="7"  fill="${b.sh}" transform="rotate(-20 21 20)"/>
        <polygon points="26,64 30,73 34,64" fill="${b.c}"/>
        <line x1="30" y1="73" x2="30" y2="80" stroke="${b.st}" stroke-width="1.5"/>
      </svg>
      <div class="balloon-string"></div>
    `;
    item.addEventListener("click", () => {
      if (item.classList.contains("popped")) return;
      item.classList.add("popped");
      const r = item.getBoundingClientRect();
      burstParticles(r.left + r.width / 2, r.top + r.height / 2);
    });
    wrap.appendChild(item);
  });
}

function burstParticles(cx, cy) {
  const colors = ["#e05070","#f0c040","#9060d0","#40b080","#e07040","#ff8888","#ffe066","#ffb3c6"];

  for (let i = 0; i < 20; i++) {
    const p = document.createElement("div");
    p.style.cssText = `
      position: fixed; left: ${cx}px; top: ${cy}px;
      width:  ${5 + Math.random() * 9}px;
      height: ${5 + Math.random() * 9}px;
      border-radius: ${Math.random() > 0.5 ? "50%" : "3px"};
      background: ${colors[~~(Math.random() * colors.length)]};
      pointer-events: none; z-index: 999;
    `;
    document.body.appendChild(p);

    const angle  = Math.random() * Math.PI * 2;
    const dist   = 50 + Math.random() * 90;
    const dur    = 450 + Math.random() * 380;

    p.animate(
      [
        { transform: "translate(-50%,-50%) scale(1)", opacity: 1 },
        { transform: `translate(calc(-50% + ${Math.cos(angle)*dist}px), calc(-50% + ${Math.sin(angle)*dist}px)) scale(0)`, opacity: 0 },
      ],
      { duration: dur, easing: "ease-out", fill: "forwards" }
    ).onfinish = () => p.remove();
  }
}


/* ═══════════════════════════════════════════════════════
   CANDLE BLOW  →  VIDEO AUTOPLAY
═══════════════════════════════════════════════════════ */
let candlesOut   = 0;
const TOTAL_CANDLES = 5;

function setupBlowButton() {
  const btn = document.getElementById("blow-btn");

  // tap individual flames
  for (let i = 1; i <= TOTAL_CANDLES; i++) {
    const flame = document.getElementById("f" + i);
    if (flame) flame.addEventListener("click", () => blowCandle(i));
  }

  // blow all at once
  btn.addEventListener("click", () => {
    let delay = 0;
    for (let i = 1; i <= TOTAL_CANDLES; i++) {
      const flame = document.getElementById("f" + i);
      if (flame && !flame.classList.contains("out")) {
        setTimeout(() => blowCandle(i), delay);
        delay += 200;
      }
    }
  });
}

function blowCandle(i) {
  const flame = document.getElementById("f" + i);
  const smoke = document.getElementById("s" + i);
  if (!flame || flame.classList.contains("out")) return;

  flame.classList.add("out");
  if (smoke) {
    smoke.classList.add("show");
    setTimeout(() => smoke.classList.remove("show"), 2200);
  }

  candlesOut++;
  if (candlesOut === TOTAL_CANDLES) onAllCandlesOut();
}

function onAllCandlesOut() {
  const btn = document.getElementById("blow-btn");
  btn.textContent = "🕯️ All Wishes Made!";
  btn.classList.add("done");
  setTimeout(revealVideoSection, 700);
}


/* ── Reveal video section + autoplay ── */
function revealVideoSection() {
  const section = document.getElementById("video-section");
  section.classList.add("show");
  triggerMegaBurst();

  const video = document.getElementById("bday-video");
  const audio = document.getElementById("bg-music");
  const btn   = document.getElementById("music-btn");

  // automatically pause BGM when video starts playing
  if (!audio.paused) {
    audio.pause();
    btn.classList.remove("playing");
    btn.classList.add("muted");
  }

  video.play().catch(() => {});

  // smooth scroll to video
  setTimeout(() => section.scrollIntoView({ behavior: "smooth", block: "center" }), 300);
}





/* ═══════════════════════════════════════════════════════
   FIREWORKS (finale section canvas)
═══════════════════════════════════════════════════════ */
let fwCtx, fwCv, fwParticles = [], fwLastBurst = 0, fwRunning = false;
let megaBurstFn = null;

function setupFireworks() {
  fwCv  = document.getElementById("cracker-canvas");
  fwCtx = fwCv.getContext("2d");

  const section = document.getElementById("finale");
  function resize() { fwCv.width = section.offsetWidth; fwCv.height = section.offsetHeight; }
  resize();
  addEventListener("resize", resize);

  const colors = [
    "#f0c97a","#e07b8a","#fff0d8","#c9933a",
    "#f9c6d0","#ffee55","#ff9999","#fffacd","#ffb3c6","#ffd700","#ffaacc",
  ];

  function burst(x, y, count = 80) {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 / count) * i + Math.random() * 0.25;
      const speed = 2 + Math.random() * 7;
      fwParticles.push({
        x, y,
        vx    : Math.cos(angle) * speed,
        vy    : Math.sin(angle) * speed,
        r     : 1.5 + Math.random() * 3.5,
        color : colors[~~(Math.random() * colors.length)],
        alpha : 1,
        decay : 0.009 + Math.random() * 0.02,
        shape : Math.random() > 0.55 ? "star" : "circle",
      });
    }
  }

  megaBurstFn = function () {
    for (let i = 0; i < 6; i++) {
      setTimeout(
        () => burst(60 + Math.random() * (fwCv.width - 120), 20 + Math.random() * (fwCv.height * 0.55), 110),
        i * 160
      );
    }
  };

  function drawStar(x, y, r, color) {
    fwCtx.save();
    fwCtx.translate(x, y);
    fwCtx.beginPath();
    for (let i = 0; i < 5; i++) {
      const a  = (Math.PI * 2 * i / 5) - Math.PI / 2;
      const ai = a + Math.PI / 5;
      i === 0
        ? fwCtx.moveTo(Math.cos(a) * r, Math.sin(a) * r)
        : fwCtx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
      fwCtx.lineTo(Math.cos(ai) * r * 0.4, Math.sin(ai) * r * 0.4);
    }
    fwCtx.closePath();
    fwCtx.fillStyle = color;
    fwCtx.fill();
    fwCtx.restore();
  }

  // start fireworks when section scrolls into view
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !fwRunning) { fwRunning = true; animateFireworks(); }
    });
  }, { threshold: 0.2 });
  observer.observe(section);

  function animateFireworks(ts = 0) {
    fwCtx.clearRect(0, 0, fwCv.width, fwCv.height);

    if (ts - fwLastBurst > 680) {
      burst(60 + Math.random() * (fwCv.width - 120), 25 + Math.random() * (fwCv.height * 0.5));
      fwLastBurst = ts;
    }

    fwParticles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.09;   // gravity
      p.alpha -= p.decay;
      p.r *= 0.97;

      fwCtx.globalAlpha = Math.max(p.alpha, 0);
      if (p.shape === "star") {
        drawStar(p.x, p.y, Math.max(p.r, 0), p.color);
      } else {
        fwCtx.beginPath();
        fwCtx.arc(p.x, p.y, Math.max(p.r, 0), 0, Math.PI * 2);
        fwCtx.fillStyle = p.color;
        fwCtx.fill();
      }
    });

    fwCtx.globalAlpha = 1;
    fwParticles = fwParticles.filter(p => p.alpha > 0);
    requestAnimationFrame(animateFireworks);
  }
}

function triggerMegaBurst() {
  if (megaBurstFn) megaBurstFn();
}