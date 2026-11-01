(() => {
  const cfg = window.BIRTHDAY || {};
  const $ = (sel) => document.querySelector(sel);
  const rand = (min, max) => Math.random() * (max - min) + min;
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const fmt = (text) => text.replaceAll("{name}", cfg.name || "");

  const COLORS = ["#ff6fa8", "#ffd166", "#7be0c3", "#7cc6ff", "#c39bff", "#ff9a6b"];

  // ---------------------------------------------------------------
  //  Efektler: konfeti, sarsıntı, flaş
  // ---------------------------------------------------------------
  const fire = window.confetti
    ? window.confetti.create($("#fx"), { resize: true, useWorker: true, disableForReducedMotion: true })
    : () => {};

  let emojiShapes = [];
  if (window.confetti && typeof window.confetti.shapeFromText === "function") {
    emojiShapes = ["🐱", "🎂", "💖", "🤡", "🎈", "💀"].map((text) => window.confetti.shapeFromText({ text, scalar: 2 }));
  }

  // Sağdan ve soldan konfeti topları
  function sideCannons(duration = 2500) {
    const end = Date.now() + duration;
    (function frame() {
      fire({ particleCount: 4, angle: 60, spread: 60, startVelocity: 60, origin: { x: 0, y: 0.75 }, colors: COLORS });
      fire({ particleCount: 4, angle: 120, spread: 60, startVelocity: 60, origin: { x: 1, y: 0.75 }, colors: COLORS });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  }

  function emojiRain(count = 30) {
    if (!emojiShapes.length) return;
    fire({ particleCount: count, spread: 160, startVelocity: 35, origin: { x: 0.5, y: 0.3 }, shapes: emojiShapes, scalar: 2, gravity: 0.7, ticks: 260 });
  }

  function fireworks(times = 6) {
    for (let i = 0; i < times; i++) {
      setTimeout(() => {
        fire({
          particleCount: 70,
          spread: 360,
          startVelocity: 32,
          ticks: 80,
          gravity: 0.6,
          origin: { x: rand(0.15, 0.85), y: rand(0.1, 0.45) },
          colors: [pick(COLORS), pick(COLORS), "#ffffff"],
        });
      }, i * 350);
    }
  }

  function restartClass(el, cls) {
    el.classList.remove(cls);
    void el.offsetWidth; // animasyonu baştan başlatmak için
    el.classList.add(cls);
  }

  const shake = () => restartClass($("#hero"), "shake");
  const flash = () => restartClass($("#flash"), "on");

  // ---------------------------------------------------------------
  //  Başlık
  // ---------------------------------------------------------------
  function buildTitle() {
    const name = (cfg.name || "").toLocaleUpperCase("tr");
    const title = $("#title");
    title.innerHTML = "İYİ Kİ DOĞDUN" + (name ? `<br><span class="name">${name}!</span>` : "");
    title.dataset.text = "İYİ Kİ DOĞDUN" + (name ? `\n${name}!` : "");
    document.title = cfg.name ? `İyi ki Doğdun ${cfg.name}! 🎂` : "İyi ki Doğdun! 🎂";
  }

  // ---------------------------------------------------------------
  //  Karakterler (kafası fotoğraf, gövdesi çizgi film)
  // ---------------------------------------------------------------
  const CREW_FACES = ["🤪", "😜", "🥳", "🤡", "😈", "👽", "🙀"];
  const MOVES = ["m-spin", "m-jump", "m-flip", "m-shake", "m-grow", "m-squash"];
  let heroEl = null;
  const crewEls = [];

  function bodySVG(shirt) {
    return `
<svg class="char-body" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <g class="leg-l"><line x1="42" y1="52" x2="38" y2="88" stroke="#2b2b45" stroke-width="11" stroke-linecap="round"/><ellipse cx="34" cy="92" rx="10" ry="6" fill="#1b1035"/></g>
  <g class="leg-r"><line x1="58" y1="52" x2="62" y2="88" stroke="#2b2b45" stroke-width="11" stroke-linecap="round"/><ellipse cx="66" cy="92" rx="10" ry="6" fill="#1b1035"/></g>
  <g class="arm-l"><line x1="32" y1="16" x2="10" y2="42" stroke="${shirt}" stroke-width="10" stroke-linecap="round"/><circle cx="9" cy="44" r="6.5" fill="#ffd9b8"/></g>
  <g class="arm-r"><line x1="68" y1="16" x2="90" y2="42" stroke="${shirt}" stroke-width="10" stroke-linecap="round"/><circle cx="91" cy="44" r="6.5" fill="#ffd9b8"/></g>
  <rect x="28" y="6" width="44" height="50" rx="16" fill="${shirt}" stroke="#1b1035" stroke-width="3"/>
  <path d="M40 22 L50 30 L60 22" stroke="#fff" stroke-width="3" fill="none" opacity="0.6"/>
</svg>`;
  }

  function makeChar(spec, { hero = false, face = "🤪", x = 50, enter = "enter-l", delay = 0, back = false } = {}) {
    const el = document.createElement("div");
    el.className = `char ${enter}` + (hero ? " hero" : "");
    el.style.left = `${x}%`;
    el.style.animationDelay = `${delay}s`;
    el.style.setProperty("--shirt", spec.shirt || pick(COLORS));
    el.style.setProperty("--hat", pick(COLORS));
    if (back) el.classList.add("back");
    el.innerHTML = `
      <div class="bubble"></div>
      <div class="char-inner">
        ${hero ? '<span class="char-crown">👑</span>' : '<span class="char-hat"></span>'}
        <div class="char-head"></div>
        ${bodySVG(spec.shirt || "#ff6fa8")}
      </div>`;

    const head = el.querySelector(".char-head");
    const showEmoji = () => (head.innerHTML = `<span class="face-emoji">${face}</span>`);
    if (spec.img) {
      const img = document.createElement("img");
      img.alt = "";
      img.style.setProperty("--pos", spec.pos || "50% 30%");
      img.style.setProperty("--zoom", spec.zoom || 1);
      img.onerror = showEmoji;
      img.src = spec.img;
      head.appendChild(img);
    } else {
      showEmoji();
    }

    el.addEventListener("click", () => {
      doMove(el);
      say(el, fmt(pick(el === heroEl ? cfg.heroLines || ["..."] : cfg.crewLines || ["🎉"])));
    });
    return el;
  }

  function spawnStage() {
    const stage = $("#stage");
    stage.innerHTML = "";
    if (cfg.toon) document.body.classList.add("toon");

    // Önde 4, arkada 2 kişi; taçlı kahraman ortada
    const slots = [
      { x: 12 }, { x: 88 }, { x: 31 }, { x: 69 }, { x: 40, back: true }, { x: 60, back: true },
    ];
    (cfg.crew || []).forEach((spec, i) => {
      const slot = slots[i % slots.length];
      const el = makeChar(spec, {
        face: CREW_FACES[i % CREW_FACES.length],
        x: slot.x,
        back: slot.back,
        enter: slot.x < 50 ? "enter-l" : "enter-r",
        delay: 0.5 + i * 0.25,
      });
      crewEls.push(el);
      stage.appendChild(el);
    });

    heroEl = makeChar(cfg.hero || {}, { hero: true, face: "😐", x: 50, enter: "enter-d", delay: 0.2 });
    stage.appendChild(heroEl);
  }

  // Konuşma balonu
  const bubbleTimers = new WeakMap();

  function say(ch, text, dur = 2600) {
    if (!ch) return;
    const bubble = ch.querySelector(".bubble");
    bubble.textContent = text;
    bubble.style.setProperty("--shift", "0px");

    // Balon ekrandan taşmasın (karakter yürürken bile hedef konumuna göre hesapla)
    const w = bubble.offsetWidth;
    const stage = $("#stage").getBoundingClientRect();
    const center = stage.left + (parseFloat(ch.style.left) / 100) * stage.width;
    const left = center - w / 2;
    let shift = 0;
    if (left < 8) shift = 8 - left;
    else if (left + w > innerWidth - 8) shift = innerWidth - 8 - (left + w);
    bubble.style.setProperty("--shift", `${shift}px`);

    bubble.classList.add("show");
    ch.classList.add("talking");
    clearTimeout(bubbleTimers.get(ch));
    bubbleTimers.set(
      ch,
      setTimeout(() => {
        bubble.classList.remove("show");
        ch.classList.remove("talking");
      }, dur)
    );
  }

  function doMove(ch, move = pick(MOVES)) {
    MOVES.forEach((m) => ch.classList.remove(m));
    void ch.offsetWidth;
    ch.classList.add(move);
    setTimeout(() => ch.classList.remove(move), 1700);
  }

  // Aynı anda birkaç kişi bağırsın
  let chorusUntil = 0;
  function chorus(lines, count = 3) {
    chorusUntil = Date.now() + 3200;
    const people = [...crewEls].sort(() => Math.random() - 0.5).slice(0, count);
    const shuffled = [...lines].sort(() => Math.random() - 0.5);
    people.forEach((ch, i) => {
      setTimeout(() => {
        say(ch, fmt(shuffled[i % shuffled.length]), 2800);
        doMove(ch);
      }, i * 280);
    });
  }

  async function runShow() {
    await sleep(2600);
    for (const [who, text] of cfg.intro || []) {
      const ch = who === "hero" ? heroEl : crewEls[who % crewEls.length];
      say(ch, fmt(text), 2300);
      if (Math.random() < 0.6) doMove(ch);
      await sleep(2300);
    }
    // Sonrasında rastgele laflar
    for (;;) {
      await sleep(rand(2000, 3400));
      if (Date.now() < chorusUntil || document.hidden) continue;
      if (Math.random() < 0.25) say(heroEl, fmt(pick(cfg.heroLines || ["..."])));
      else say(pick(crewEls), fmt(pick(cfg.crewLines || ["🎉"])));
    }
  }

  function startChaos() {
    // Rastgele çılgın hareketler
    setInterval(() => {
      const all = [...crewEls, heroEl];
      doMove(Math.random() < 0.2 ? heroEl : pick(all));
    }, 1100);
    // Ekip sahnede dolaşsın
    setInterval(() => {
      const ch = pick(crewEls);
      if (ch && !ch.classList.contains("talking")) ch.style.left = `${rand(11, 89)}%`;
    }, 2400);
    // Arada bir kedi ekranı koşarak geçsin
    (async function dashLoop() {
      for (;;) {
        await sleep(rand(6000, 12000));
        if (!document.hidden) catDash();
      }
    })();
  }

  // ---------------------------------------------------------------
  //  Pasta & mumlar (şaka mumlu)
  // ---------------------------------------------------------------
  const candleCount = Math.max(1, Math.min(12, cfg.candles || 6));
  let candlesLit = true;
  let busy = false;
  let blows = 0;

  function buildCandles() {
    const box = $("#candles");
    box.innerHTML = "";
    for (let i = 0; i < candleCount; i++) {
      const c = document.createElement("div");
      c.className = "candle";
      c.style.height = `${rand(32, 44)}px`;
      c.innerHTML = '<span class="flame"></span>';
      box.appendChild(c);
    }
  }

  async function extinguish() {
    for (const c of document.querySelectorAll(".candle")) {
      c.classList.remove("relit");
      c.classList.add("out");
      for (let s = 0; s < 3; s++) {
        const smoke = document.createElement("span");
        smoke.className = "smoke";
        smoke.style.setProperty("--dx", `${rand(-14, 14)}px`);
        smoke.style.animationDelay = `${s * 0.15}s`;
        c.appendChild(smoke);
        setTimeout(() => smoke.remove(), 2000);
      }
      await sleep(70);
    }
  }

  async function blowCandles() {
    if (!candlesLit || busy) return;
    busy = true;
    candlesLit = false;
    blows++;
    await extinguish();

    if (blows % 2 === 1) {
      // Şaka mum: kendi kendine yeniden yanar
      sideCannons(700);
      await sleep(1300);
      for (const c of document.querySelectorAll(".candle")) {
        c.classList.remove("out");
        c.classList.add("relit");
        await sleep(60);
      }
      shake();
      chorus(cfg.trickLines || ["🤡"]);
      setTimeout(() => say(heroEl, "NASIL YANI 😨", 2200), 900);
      candlesLit = true;
      busy = false;
      return;
    }

    // Pasta patlıyor
    setButtons(false);
    await sleep(250);
    $("#cake").classList.add("boom");
    await sleep(550);
    flash();
    shake();
    fireworks(8);
    sideCannons(3000);
    setTimeout(() => emojiRain(45), 400);
    chorus(cfg.boomLines || ["💥"], 4);
    doMove(heroEl, "m-flip");
    $("#hero").classList.add("party");

    await sleep(900);
    const cat = document.createElement("div");
    cat.className = "cake-cat";
    cat.innerHTML = catSVG(pick(CAT_THEMES));
    $(".cake-wrap").appendChild(cat);

    await sleep(6000);
    $("#hero").classList.remove("party");
    cat.remove();
    const cake = $("#cake");
    cake.classList.remove("boom");
    restartClass(cake, "regrow");
    buildCandles();
    candlesLit = true;
    busy = false;
    setButtons(true);
    say(heroEl, "yeni pasta geldi 🙂 bir daha?", 2600);
  }

  function setButtons(on) {
    $("#blowBtn").disabled = !on;
    $(".actions").style.visibility = on ? "visible" : "hidden";
  }

  // Mikrofona üfleyerek söndürme
  let micStream = null;
  let micRaf = 0;

  async function startMic() {
    const btn = $("#micBtn");
    const ctx = getAudioCtx();
    ctx.resume();
    try {
      micStream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: false, autoGainControl: false },
      });
    } catch {
      btn.textContent = "🚫";
      say(heroEl, "mikrofon izni vermedin 😤 butona bas o zaman");
      return;
    }
    btn.classList.add("listening");
    say(heroEl, "dinliyorum... ÜFLE! 🌬️", 2000);

    const analyser = ctx.createAnalyser();
    analyser.fftSize = 512;
    ctx.createMediaStreamSource(micStream).connect(analyser);
    const data = new Uint8Array(analyser.fftSize);
    let loudFrames = 0;

    (function listen() {
      analyser.getByteTimeDomainData(data);
      let sum = 0;
      for (const v of data) sum += ((v - 128) / 128) ** 2;
      const rms = Math.sqrt(sum / data.length);
      loudFrames = rms > 0.16 ? loudFrames + 1 : Math.max(0, loudFrames - 1);
      if (loudFrames > 8) {
        loudFrames = 0;
        blowCandles();
      }
      micRaf = requestAnimationFrame(listen);
    })();
  }

  function stopMic() {
    cancelAnimationFrame(micRaf);
    if (micStream) micStream.getTracks().forEach((t) => t.stop());
    micStream = null;
    $("#micBtn").classList.remove("listening");
  }

  // ---------------------------------------------------------------
  //  Kediler
  // ---------------------------------------------------------------
  const CAT_THEMES = [
    { fur: "#f4a259", belly: "#ffe8cc", eye: "#2b2133", hat: "#7cc6ff" },
    { fur: "#9aa5b1", belly: "#eef1f4", eye: "#2b2133", hat: "#ff6fa8" },
    { fur: "#3b3b4f", belly: "#5d5d75", eye: "#ffd166", hat: "#ffd166" },
    { fur: "#f7f2ee", belly: "#ffd9e6", eye: "#2b2133", hat: "#7be0c3" },
    { fur: "#c68b59", belly: "#f3dcc4", eye: "#2b2133", hat: "#c39bff" },
    { fur: "#e8c39e", belly: "#fff4e6", eye: "#2b2133", hat: "#ff9a6b" },
  ];

  function catSVG({ fur, belly, eye, hat }) {
    return `
<svg class="cat" viewBox="0 0 120 165" xmlns="http://www.w3.org/2000/svg">
  <g class="dancer">
    <path class="tail" d="M84 135 Q118 128 110 88" stroke="${fur}" stroke-width="10" fill="none" stroke-linecap="round"/>
    <ellipse cx="45" cy="155" rx="12" ry="7" fill="${fur}"/>
    <ellipse cx="75" cy="155" rx="12" ry="7" fill="${fur}"/>
    <ellipse cx="60" cy="125" rx="30" ry="30" fill="${fur}"/>
    <ellipse cx="60" cy="131" rx="17" ry="19" fill="${belly}"/>
    <ellipse class="arm-l" cx="33" cy="118" rx="7.5" ry="17" fill="${fur}"/>
    <ellipse class="arm-r" cx="87" cy="118" rx="7.5" ry="17" fill="${fur}"/>
    <g class="head">
      <polygon points="30,56 28,20 56,40" fill="${fur}"/>
      <polygon points="90,56 92,20 64,40" fill="${fur}"/>
      <polygon points="34,50 33,29 48,41" fill="#ffb3c7"/>
      <polygon points="86,50 87,29 72,41" fill="#ffb3c7"/>
      <circle cx="60" cy="64" r="32" fill="${fur}"/>
      <g class="eyes">
        <ellipse cx="48" cy="62" rx="4.5" ry="6" fill="${eye}"/>
        <ellipse cx="72" cy="62" rx="4.5" ry="6" fill="${eye}"/>
        <circle cx="49.5" cy="60" r="1.6" fill="#fff"/>
        <circle cx="73.5" cy="60" r="1.6" fill="#fff"/>
      </g>
      <circle cx="39" cy="74" r="5" fill="#ff8fb1" opacity="0.55"/>
      <circle cx="81" cy="74" r="5" fill="#ff8fb1" opacity="0.55"/>
      <polygon points="56.5,70 63.5,70 60,74" fill="#ff8fb1"/>
      <ellipse cx="60" cy="80" rx="5" ry="6" fill="#2b2133"/>
      <g stroke="${eye === "#ffd166" ? "#9a9ab0" : "#2b2133"}" stroke-width="1.2" stroke-linecap="round" opacity="0.6">
        <line x1="30" y1="70" x2="14" y2="67"/><line x1="30" y1="75" x2="14" y2="77"/>
        <line x1="90" y1="70" x2="106" y2="67"/><line x1="90" y1="75" x2="106" y2="77"/>
      </g>
      <polygon points="60,4 47,36 73,36" fill="${hat}"/>
      <path d="M53.5 20 L66.5 20 M50.5 28 L69.5 28" stroke="#fff" stroke-width="3" opacity="0.7"/>
      <circle cx="60" cy="4" r="5" fill="#fff"/>
    </g>
  </g>
</svg>`;
  }

  function spawnSideCats() {
    const themes = [...CAT_THEMES].sort(() => Math.random() - 0.5);
    [".cats-left", ".cats-right"].forEach((sel, side) => {
      const box = $(sel);
      box.innerHTML = "";
      for (let i = 0; i < 2; i++) {
        const wrap = document.createElement("div");
        wrap.className = "cat-wrap";
        wrap.style.animationDelay = `${1 + i * 0.35 + side * 0.2}s`;
        wrap.innerHTML = catSVG(themes[side * 2 + i]);
        box.appendChild(wrap);
      }
    });
  }

  const SCREAMS = ["AAAAAAA", "MİYAAAAV", "İYİ Kİ DOĞDUUUN", "🎂🎂🎂", "PASTA NEREDE"];

  function catDash() {
    const el = document.createElement("div");
    el.className = "cat-dash" + (Math.random() < 0.5 ? " rev" : "");
    el.style.top = `${rand(20, 65)}vh`;
    el.innerHTML = `<span class="scream">${pick(SCREAMS)}</span>${catSVG(pick(CAT_THEMES))}`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1800);
  }

  // ---------------------------------------------------------------
  //  Fotoğraflar (kalp şeklinde)
  // ---------------------------------------------------------------
  const PLACEHOLDER_EMOJI = ["📸", "💖", "🤡", "🎈", "✨", "🐱", "🎂", "💀", "🦋", "🍰"];

  function placeholder(i) {
    const a = COLORS[i % COLORS.length];
    const b = COLORS[(i + 2) % COLORS.length];
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'>
      <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='${a}'/><stop offset='1' stop-color='${b}'/></linearGradient></defs>
      <rect width='200' height='200' fill='url(#g)'/>
      <text x='100' y='118' font-size='64' text-anchor='middle'>${PLACEHOLDER_EMOJI[i % PLACEHOLDER_EMOJI.length]}</text></svg>`;
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }

  const photoSrcs = []; // gerçekten yüklenen fotoğraflar

  // Kalp eğrisi üzerinde eşit aralıklı N nokta
  function heartPoints(n) {
    const samples = [];
    const steps = 1000;
    for (let k = 0; k <= steps; k++) {
      const t = (k / steps) * Math.PI * 2;
      const x = 16 * Math.sin(t) ** 3;
      const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
      samples.push({ x, y });
    }
    const lens = [0];
    for (let k = 1; k < samples.length; k++) {
      lens.push(lens[k - 1] + Math.hypot(samples[k].x - samples[k - 1].x, samples[k].y - samples[k - 1].y));
    }
    const total = lens[lens.length - 1];
    const pts = [];
    let j = 0;
    for (let p = 0; p < n; p++) {
      const target = (p / n) * total;
      while (lens[j] < target) j++;
      pts.push(samples[j]);
    }
    return pts;
  }

  function buildPhotoHeart() {
    const box = $("#photoHeart");
    const photos = cfg.photos && cfg.photos.length ? [...cfg.photos] : [""];
    // Kalp şekli belli olsun diye en az 9 fotoğrafa tamamla
    for (let i = 0; photos.length < 9; i++) photos.push(photos[i]);
    const pts = heartPoints(photos.length);

    box.innerHTML = '<span class="center-heart">💖</span>';
    photos.forEach((src, i) => {
      const { x, y } = pts[i];
      const el = document.createElement("div");
      el.className = "ph";
      el.style.setProperty("--x", `${50 + (x / 16) * 40}%`);
      el.style.setProperty("--y", `${50 - ((y + 2.5) / 14.5) * 42}%`);
      el.style.setProperty("--fromX", `${x < 0 ? -70 : 70}vw`);
      el.style.setProperty("--fromY", `${rand(-40, 40)}vh`);
      el.style.setProperty("--rot", `${rand(-180, 180)}deg`);
      el.style.setProperty("--delay", `${i * 0.12}s`);

      const img = document.createElement("img");
      img.alt = `Anı ${i + 1}`;
      img.loading = "lazy";
      img.onload = () => (photoSrcs[i] = img.src);
      img.onerror = () => {
        img.onerror = null;
        img.onload = null;
        img.src = placeholder(i);
      };
      img.src = src || placeholder(i);

      el.appendChild(img);
      el.addEventListener("click", () => openLightbox(img.src));
      box.appendChild(el);
    });
    sizePhotos();
  }

  function sizePhotos() {
    const box = $("#photoHeart");
    const items = box.querySelectorAll(".ph");
    if (!items.length) return;
    const w = box.clientWidth;
    const perimeter = w * 2.75; // kalp çevresinin kutu genişliğine yaklaşık oranı
    const size = Math.min(w * 0.22, (perimeter / items.length) * 1.05);
    items.forEach((el) => el.style.setProperty("--size", `${size}px`));
  }

  function openLightbox(src) {
    $("#lightboxImg").src = src;
    $("#lightbox").hidden = false;
    fire({ particleCount: 40, spread: 100, origin: { x: 0.5, y: 0.5 }, shapes: emojiShapes.length ? [emojiShapes[2]] : undefined, scalar: 1.6 });
  }

  // ---------------------------------------------------------------
  //  Arka planda süzülenler
  // ---------------------------------------------------------------
  const floaters = $("#floaters");
  const FLOAT_EMOJI = ["💖", "🤡", "💀", "🙀", "🎉", "⭐", "😵‍💫", "🎈"];

  function spawnFloater() {
    if (document.hidden || floaters.childElementCount > 24) return;
    const roll = Math.random();
    let el;
    if (roll < 0.35) {
      el = document.createElement("div");
      el.className = "floater balloon";
      el.style.background = pick(COLORS);
      el.addEventListener("pointerdown", (e) => {
        fire({
          particleCount: 25,
          spread: 70,
          startVelocity: 20,
          origin: { x: e.clientX / innerWidth, y: e.clientY / innerHeight },
          colors: [el.style.background],
        });
        el.remove();
      });
    } else if (roll < 0.47 && photoSrcs.some(Boolean)) {
      el = document.createElement("img");
      el.className = "floater photo-float";
      el.src = pick(photoSrcs.filter(Boolean));
      el.alt = "";
    } else {
      el = document.createElement("div");
      el.className = "floater";
      el.textContent = pick(FLOAT_EMOJI);
      el.style.fontSize = `${rand(18, 34)}px`;
    }
    el.style.left = `${rand(0, 92)}vw`;
    const dur = rand(9, 16);
    el.style.animationDuration = `${dur}s`;
    floaters.appendChild(el);
    setTimeout(() => el.remove(), dur * 1000);
  }

  // ---------------------------------------------------------------
  //  Müzik (8-bit Happy Birthday ya da kendi dosyan)
  // ---------------------------------------------------------------
  let audioCtx = null;
  let musicOn = false;
  let musicTimer = 0;
  let musicGain = null;
  let fileAudio = null;

  function getAudioCtx() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    return audioCtx;
  }

  // Happy Birthday (kamu malı) — [midi nota, vuruş]
  const SONG = [
    [67, 0.75], [67, 0.25], [69, 1], [67, 1], [72, 1], [71, 2],
    [67, 0.75], [67, 0.25], [69, 1], [67, 1], [74, 1], [72, 2],
    [67, 0.75], [67, 0.25], [79, 1], [76, 1], [72, 1], [71, 1], [69, 2],
    [77, 0.75], [77, 0.25], [76, 1], [72, 1], [74, 1], [72, 3],
  ];
  const BEAT = 0.34;

  function playNote(ctx, out, midi, when, dur) {
    const freq = 440 * 2 ** ((midi - 69) / 12);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, when);
    gain.gain.exponentialRampToValueAtTime(0.07, when + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, when + dur * 0.95);
    gain.connect(out);
    const lead = ctx.createOscillator();
    lead.type = "square";
    lead.frequency.value = freq;
    lead.connect(gain);
    lead.start(when);
    lead.stop(when + dur);

    // Altta zıplayan bas
    const bass = ctx.createOscillator();
    const bg = ctx.createGain();
    bass.type = "triangle";
    bass.frequency.value = freq / 4;
    bg.gain.setValueAtTime(0.18, when);
    bg.gain.exponentialRampToValueAtTime(0.0001, when + Math.min(dur, 0.25));
    bass.connect(bg).connect(out);
    bass.start(when);
    bass.stop(when + 0.3);
  }

  function playSongLoop() {
    const ctx = getAudioCtx();
    const out = musicGain;
    let t = ctx.currentTime + 0.1;
    for (const [midi, beats] of SONG) {
      playNote(ctx, out, midi, t, beats * BEAT);
      t += beats * BEAT;
    }
    const total = SONG.reduce((s, [, b]) => s + b, 0) * BEAT;
    musicTimer = setTimeout(() => musicOn && out === musicGain && playSongLoop(), (total + 1) * 1000);
  }

  function startMusic() {
    musicOn = true;
    $("#musicBtn").textContent = "🔊";
    if (cfg.musicFile) {
      fileAudio = fileAudio || Object.assign(new Audio(cfg.musicFile), { loop: true, volume: 0.7 });
      fileAudio.play().catch(() => {});
      return;
    }
    const ctx = getAudioCtx();
    ctx.resume();
    musicGain = ctx.createGain();
    musicGain.connect(ctx.destination);
    playSongLoop();
  }

  function stopMusic() {
    musicOn = false;
    $("#musicBtn").textContent = "🔇";
    clearTimeout(musicTimer);
    if (fileAudio) fileAudio.pause();
    // Planlanmış notaları hemen susturmak için çıkışı kopar
    if (musicGain) musicGain.disconnect();
    musicGain = null;
  }

  // ---------------------------------------------------------------
  //  Akış
  // ---------------------------------------------------------------
  function openGift() {
    const gift = $("#gift");
    if (gift.classList.contains("open")) return;
    gift.classList.add("open");
    flash();
    fire({ particleCount: 160, spread: 130, startVelocity: 50, origin: { x: 0.5, y: 0.55 }, colors: COLORS });

    // Ses, kullanıcı dokunduğu anda başlamalı (tarayıcı kuralı)
    startMusic();

    setTimeout(() => {
      $("#gate").classList.add("gone");
      $("#app").hidden = false;
      $("#musicBtn").hidden = false;
      buildTitle();
      buildCandles();
      spawnStage();
      spawnSideCats();
      buildPhotoHeart();
      observePhotos();
      sideCannons(2500);
      setTimeout(() => emojiRain(25), 1200);
      setInterval(spawnFloater, 750);
      setTimeout(startChaos, 3000);
      runShow();
    }, 600);
  }

  function observePhotos() {
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        $("#photoHeart").classList.add("show");
        setTimeout(() => emojiRain(20), 1500);
      },
      { threshold: 0.3 }
    );
    io.observe($("#photoHeart"));
  }

  $("#gift").addEventListener("click", openGift);
  $("#blowBtn").addEventListener("click", blowCandles);
  $("#cake").addEventListener("click", blowCandles);
  $("#micBtn").addEventListener("click", () => (micStream ? stopMic() : startMic()));
  $("#musicBtn").addEventListener("click", () => (musicOn ? stopMusic() : startMusic()));
  $("#lightbox").addEventListener("click", () => ($("#lightbox").hidden = true));
  document.addEventListener("keydown", (e) => e.key === "Escape" && ($("#lightbox").hidden = true));
  addEventListener("resize", sizePhotos);
})();
