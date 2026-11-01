(() => {
  const cfg = window.BIRTHDAY || {};
  const $ = (sel) => document.querySelector(sel);
  const rand = (min, max) => Math.random() * (max - min) + min;
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const COLORS = ["#ff6fa8", "#ffd166", "#7be0c3", "#7cc6ff", "#c39bff", "#ff9a6b"];
  const PINKS = ["#ff6fa8", "#ffc2da", "#ff9ccf", "#ffffff", "#ffd166"];

  // "intro" → "cake" (mumlar) → "concert" (kızlar dans ediyor) → "end"
  let phase = "intro";

  // ---------------------------------------------------------------
  //  Efektler: konfeti, sarsıntı, flaş
  // ---------------------------------------------------------------
  const fire = window.confetti
    ? window.confetti.create($("#fx"), { resize: true, useWorker: true, disableForReducedMotion: true })
    : () => {};

  let emojiShapes = [];
  if (window.confetti && typeof window.confetti.shapeFromText === "function") {
    emojiShapes = ["🎂", "💖", "🎀", "🩷", "✨"].map((text) => window.confetti.shapeFromText({ text, scalar: 2 }));
  }

  // Sağdan ve soldan konfeti topları
  function sideCannons(duration = 2500, colors = COLORS) {
    const end = Date.now() + duration;
    (function frame() {
      fire({ particleCount: 4, angle: 60, spread: 60, startVelocity: 60, origin: { x: 0, y: 0.75 }, colors });
      fire({ particleCount: 4, angle: 120, spread: 60, startVelocity: 60, origin: { x: 1, y: 0.75 }, colors });
      if (Date.now() < end) setTimeout(frame, 16);
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
    if (!el) return;
    el.classList.remove(cls);
    void el.offsetWidth; // animasyonu baştan başlatmak için
    el.classList.add(cls);
  }

  const shake = () => restartClass($("#app"), "shake");
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
  const CREW_FACES = ["🤩", "😍", "🥳", "😎", "💃", "🌸"];
  const MOVES = ["m-spin", "m-jump", "m-flip", "m-shake", "m-grow", "m-squash"];
  let heroEl = null;
  const crewEls = [];

  // Hikmet: tişört + pantolon
  function boySVG(shirt) {
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

  // Kızlar: kabarık kollu, kloş etekli elbise
  function girlSVG(dress) {
    return `
<svg class="char-body" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <g class="leg-l"><line x1="44" y1="60" x2="41" y2="89" stroke="#ffd9b8" stroke-width="7" stroke-linecap="round"/><ellipse cx="38" cy="92" rx="8" ry="5" fill="#ff3f86" stroke="#1b1035" stroke-width="2"/></g>
  <g class="leg-r"><line x1="56" y1="60" x2="59" y2="89" stroke="#ffd9b8" stroke-width="7" stroke-linecap="round"/><ellipse cx="62" cy="92" rx="8" ry="5" fill="#ff3f86" stroke="#1b1035" stroke-width="2"/></g>
  <g class="arm-l"><line x1="32" y1="16" x2="12" y2="40" stroke="#ffd9b8" stroke-width="7" stroke-linecap="round"/><circle cx="11" cy="42" r="5.5" fill="#ffd9b8"/></g>
  <g class="arm-r"><line x1="68" y1="16" x2="88" y2="40" stroke="#ffd9b8" stroke-width="7" stroke-linecap="round"/><circle cx="89" cy="42" r="5.5" fill="#ffd9b8"/></g>
  <path d="M37 32 L63 32 L85 74 Q50 86 15 74 Z" fill="${dress}" stroke="#1b1035" stroke-width="3" stroke-linejoin="round"/>
  <circle cx="34" cy="62" r="2.6" fill="#fff" opacity="0.7"/><circle cx="50" cy="70" r="2.6" fill="#fff" opacity="0.7"/>
  <circle cx="64" cy="58" r="2.6" fill="#fff" opacity="0.7"/><circle cx="45" cy="50" r="2.6" fill="#fff" opacity="0.7"/>
  <path d="M35 8 Q50 3 65 8 L63 34 L37 34 Z" fill="${dress}" stroke="#1b1035" stroke-width="3" stroke-linejoin="round"/>
  <circle cx="33" cy="13" r="7.5" fill="${dress}" stroke="#1b1035" stroke-width="3"/>
  <circle cx="67" cy="13" r="7.5" fill="${dress}" stroke="#1b1035" stroke-width="3"/>
  <line x1="38" y1="33" x2="62" y2="33" stroke="#fff" stroke-width="3.5" stroke-linecap="round"/>
</svg>`;
  }

  function makeChar(spec, { hero = false, face = "🤩", x = 50, enter = "enter-l", delay = 0, back = false } = {}) {
    const el = document.createElement("div");
    el.className = `char ${enter}` + (hero ? " hero" : "") + (back ? " back" : "");
    el.style.left = `${x}%`;
    el.style.animationDelay = `${delay}s`;
    el.style.setProperty("--shirt", (hero ? spec.shirt : spec.dress) || pick(COLORS));
    el.style.setProperty("--hair", spec.hair || "#2b1a12");
    el.innerHTML = `
      <div class="bubble"></div>
      <div class="char-inner">
        ${hero ? '<span class="char-crown">👑</span>' : '<span class="char-hair"></span><span class="char-bow">🎀</span>'}
        <div class="char-head"></div>
        ${hero ? boySVG(spec.shirt || "#ffd166") : girlSVG(spec.dress || "#ff6fa8")}
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

    el.addEventListener("click", () => doMove(el));
    return el;
  }

  // Başta sahnede sadece taçlı Hikmet var
  function spawnHero() {
    if (cfg.toon) document.body.classList.add("toon");
    heroEl = makeChar(cfg.hero || {}, { hero: true, face: "🥳", x: 50, enter: "enter-d", delay: 0.2 });
    $("#stage").appendChild(heroEl);
  }

  // Önde 4, arkada 2 kız. Her satır bir dizilişte 6 kızın konumu (%).
  const BACK_ROW = [false, false, false, false, true, true];
  const FORMATIONS = [
    [12, 88, 30, 70, 40, 60], // düz sıra
    [22, 78, 36, 64, 44, 56], // ortada toplanma
    [8, 92, 24, 76, 33, 67], // açılma
    [30, 70, 12, 88, 60, 40], // yer değiştirme
  ];

  // Kızlar iki yandan koşarak girer
  function spawnCrew() {
    const stage = $("#stage");
    (cfg.crew || []).slice(0, 6).forEach((spec, i) => {
      const x = FORMATIONS[0][i];
      const el = makeChar(spec, {
        face: CREW_FACES[i % CREW_FACES.length],
        x,
        back: BACK_ROW[i],
        enter: x < 50 ? "enter-l" : "enter-r",
        delay: i * 0.18,
      });
      crewEls.push(el);
      stage.appendChild(el);
    });
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
    if (!ch) return;
    MOVES.forEach((m) => ch.classList.remove(m));
    void ch.offsetWidth;
    ch.classList.add(move);
    setTimeout(() => ch.classList.remove(move), 1700);
  }

  function startAmbient() {
    // Hikmet kendi kendine dans eder (konserde sahne kızların, kafa büyütmek yok)
    setInterval(() => {
      if (Math.random() > 0.45) return;
      doMove(heroEl, phase === "concert" ? pick(["m-jump", "m-squash", "m-shake"]) : undefined);
    }, 1500);
    // Arada bir kedi ekranı koşarak geçsin
    (async function dashLoop() {
      for (;;) {
        await sleep(rand(7000, 13000));
        if (!document.hidden) catDash();
      }
    })();
  }

  // ---------------------------------------------------------------
  //  Pasta & mumlar
  // ---------------------------------------------------------------
  const candleCount = Math.max(1, Math.min(12, cfg.candles || 6));
  let blown = false;

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

  // Pastayı orta alana sığacak kadar küçült
  function fitCake() {
    const box = $("#centerStage");
    const cake = $("#cake");
    if (!box || !cake.offsetHeight) return;
    const s = Math.min(1.25, (box.clientHeight - 10) / cake.offsetHeight, (box.clientWidth - 10) / cake.offsetWidth);
    $(".cake-wrap").style.scale = Math.max(0.4, s);
  }

  async function extinguish() {
    for (const c of document.querySelectorAll(".candle")) {
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
    if (phase !== "cake" || blown) return;
    blown = true;
    phase = "concert";
    clearTimeout(fallbackTimer);
    stopMic();
    $("#micHint").hidden = true;
    $("#blowBtn").hidden = true;

    await extinguish();
    await sleep(500);

    // Pasta patlar, yerine kalp fotoğraflar gelir, kızlar içeri girer
    $("#cake").classList.add("boom");
    await sleep(550);
    flash();
    shake();
    fireworks(6);
    sideCannons(2000);
    setTimeout(() => emojiRain(35), 300);
    await sleep(400);
    $(".cake-wrap").hidden = true;
    startConcert();
  }

  // ---------------------------------------------------------------
  //  Mikrofona üfleme (yedek: belli süre sonra "tuşa basarak üfle")
  // ---------------------------------------------------------------
  let micStream = null;
  let micTimer = 0;
  let fallbackTimer = 0;

  function showFallback() {
    if (phase === "cake") $("#blowBtn").hidden = false;
  }

  function armFallback(ms = (cfg.micFallbackDelay || 10) * 1000) {
    clearTimeout(fallbackTimer);
    fallbackTimer = setTimeout(showFallback, ms);
  }

  async function startMic() {
    const ctx = getAudioCtx();
    ctx.resume();
    try {
      micStream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: false, autoGainControl: false },
      });
    } catch {
      micStream = null;
      return false;
    }

    const analyser = ctx.createAnalyser();
    analyser.fftSize = 512;
    ctx.createMediaStreamSource(micStream).connect(analyser);
    const data = new Uint8Array(analyser.fftSize);
    let loudFrames = 0;

    micTimer = setInterval(() => {
      analyser.getByteTimeDomainData(data);
      let sum = 0;
      for (const v of data) sum += ((v - 128) / 128) ** 2;
      const rms = Math.sqrt(sum / data.length);
      loudFrames = rms > 0.16 ? loudFrames + 1 : Math.max(0, loudFrames - 1);
      // ~0.25 sn boyunca güçlü ses = üfleme
      if (loudFrames > 8) {
        loudFrames = 0;
        blowCandles();
      }
    }, 30);
    return true;
  }

  function stopMic() {
    clearInterval(micTimer);
    if (micStream) micStream.getTracks().forEach((t) => t.stop());
    micStream = null;
  }

  // ---------------------------------------------------------------
  //  Konser: şarkı + koreografi + toz pembe ekran
  // ---------------------------------------------------------------
  const CHOREO = ["m-jump", "m-squash", "m-spin", "m-shake", "m-flip", "m-grow"];
  let beatCount = 0;
  let formation = 0;

  function setFormation(f) {
    crewEls.forEach((ch, i) => (ch.style.left = `${FORMATIONS[f][i]}%`));
  }

  function onBeat() {
    if (phase !== "concert") return;
    beatCount++;
    const step = beatCount % 2 ? 10 : -10;

    crewEls.forEach((ch) => {
      ch.style.marginLeft = `${step}px`; // sağ-sol adım
      restartClass(ch, "beat");
    });
    restartClass(heroEl, "beat");
    restartClass($("#title"), "beat");
    restartClass($("#photoHeart"), "beat");

    // Her 4 vuruşta hepsi aynı hareket
    if (beatCount % 4 === 0) {
      const move = CHOREO[(beatCount / 4) % CHOREO.length];
      crewEls.forEach((ch) => doMove(ch, move));
    }
    // Her 8 vuruşta soldan sağa dalga
    if (beatCount % 8 === 6) {
      [...crewEls]
        .sort((a, b) => parseFloat(a.style.left) - parseFloat(b.style.left))
        .forEach((ch, i) => setTimeout(() => doMove(ch, "m-jump"), i * 70));
    }
    // Her 16 vuruşta yeni diziliş
    if (beatCount % 16 === 0) {
      formation = (formation + 1) % FORMATIONS.length;
      setFormation(formation);
      sideCannons(350, PINKS);
      emojiRain(12);
    }
  }

  function startConcert() {
    document.body.classList.add("concert");
    buildPhotoHeart();
    setTimeout(() => $("#photoHeart").classList.add("show"), 60);
    spawnCrew();
    sideCannons(1500, PINKS);
    playSong();
  }

  // Şarkı bitince kızlar vedalaşıp çıkar
  async function finishConcert() {
    if (phase !== "concert") return;
    phase = "end";
    clearInterval(beatTimer);
    $("#musicBtn").hidden = true;
    crewEls.forEach((ch) => (ch.style.marginLeft = "0px"));
    sideCannons(1200, PINKS);

    const order = shuffle(crewEls);
    order.forEach((ch, i) => setTimeout(() => say(ch, cfg.goodbye || "gidiyoruz biz 👋", 2600), i * 150));
    await sleep(2600);

    // Soldakiler sola, sağdakiler sağa yürüyüp çıkar
    crewEls.forEach((ch, i) => {
      const toLeft = parseFloat(ch.style.left) < 50;
      setTimeout(() => {
        ch.classList.add("leaving");
        ch.style.left = toLeft ? "-25%" : "125%";
      }, i * 120);
    });
    await sleep(2400);
    crewEls.forEach((ch) => ch.remove());
    crewEls.length = 0;
    document.body.classList.remove("concert");
  }

  // ---------------------------------------------------------------
  //  Şarkı (ritim algılamalı)
  // ---------------------------------------------------------------
  let audioCtx = null;
  let songAudio = null;
  let songFailed = false;
  let songGain = null;
  let beatTimer = 0;

  function getAudioCtx() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    return audioCtx;
  }

  // iOS'ta şarkının sonradan çalabilmesi için dokunuş anında "kilidi aç"
  function prepareSong() {
    if (!cfg.song) {
      songFailed = true;
      return;
    }
    songAudio = new Audio(cfg.song);
    songAudio.preload = "auto";
    songAudio.addEventListener("error", () => (songFailed = true));
    songAudio.addEventListener("ended", finishConcert);
    songAudio.muted = true;
    songAudio
      .play()
      .then(() => {
        songAudio.pause();
        songAudio.currentTime = 0;
        songAudio.muted = false;
      })
      .catch(() => (songAudio.muted = false));
  }

  function playSong() {
    if (songFailed || !songAudio) return silentConcert();
    try {
      songAudio.currentTime = cfg.songStart || 0;
    } catch {}
    songAudio.muted = false;
    songAudio
      .play()
      .then(() => {
        $("#musicBtn").hidden = false;
        listenToBeats();
      })
      .catch(silentConcert);
  }

  // Şarkı çalamazsa da kızlar 120 BPM'de dans edip 37 sn sonra gider
  function silentConcert() {
    beatTimer = setInterval(onBeat, 500);
    setTimeout(finishConcert, 37000);
  }

  // Şarkının baslarındaki vuruşları yakala, bitiş saniyesinde sesi kıs
  function listenToBeats() {
    const ctx = getAudioCtx();
    ctx.resume();
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 1024;
    analyser.smoothingTimeConstant = 0.5;
    songGain = ctx.createGain();
    ctx.createMediaElementSource(songAudio).connect(songGain);
    songGain.connect(analyser);
    analyser.connect(ctx.destination);

    const bins = new Uint8Array(analyser.frequencyBinCount);
    const history = [];
    let last = performance.now();
    let fading = false;

    beatTimer = setInterval(() => {
      const end = cfg.songEnd || songAudio.duration;
      if (!fading && end && songAudio.currentTime >= end - 1.2) {
        fading = true;
        songGain.gain.setValueAtTime(1, ctx.currentTime);
        songGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.2);
        setTimeout(() => {
          songAudio.pause();
          finishConcert();
        }, 1200);
      }
      if (songAudio.paused) return;

      analyser.getByteFrequencyData(bins);
      let energy = 0;
      for (let i = 1; i <= 5; i++) energy += bins[i]; // ~40-230 Hz
      energy /= 5;
      history.push(energy);
      if (history.length > 50) history.shift();
      const avg = history.reduce((a, b) => a + b, 0) / history.length;
      const now = performance.now();
      const isBeat = energy > avg * 1.12 && energy > 90 && now - last > 280;
      // Vuruş yakalanamazsa da dans dursun istemeyiz
      if (isBeat || now - last > 650) {
        last = now;
        onBeat();
      }
    }, 25);
  }

  function toggleMusic() {
    if (!songAudio || phase !== "concert") return;
    if (songAudio.paused) songAudio.play().catch(() => {});
    else songAudio.pause();
    $("#musicBtn").textContent = songAudio.paused ? "🔇" : "🔊";
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
      <path d="M53 77 Q56.5 81 60 77 Q63.5 81 67 77" stroke="#2b2133" stroke-width="1.8" fill="none" stroke-linecap="round"/>
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
    const themes = shuffle(CAT_THEMES);
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

  function catDash() {
    const el = document.createElement("div");
    el.className = "cat-dash" + (Math.random() < 0.5 ? " rev" : "");
    el.style.top = `${rand(20, 55)}vh`;
    el.innerHTML = catSVG(pick(CAT_THEMES));
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1800);
  }

  // ---------------------------------------------------------------
  //  Fotoğraflar (pasta söndükten sonra kalp şeklinde)
  // ---------------------------------------------------------------
  const PLACEHOLDER_EMOJI = ["📸", "💖", "🎀", "🎈", "✨", "🌸", "🎂", "🩷", "🦋", "🍰"];

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
      el.dataset.x = x;
      el.dataset.y = y;
      el.style.setProperty("--fromX", `${x < 0 ? -70 : 70}vw`);
      el.style.setProperty("--fromY", `${rand(-40, 40)}vh`);
      el.style.setProperty("--rot", `${rand(-180, 180)}deg`);
      el.style.setProperty("--delay", `${i * 0.12}s`);

      const img = document.createElement("img");
      img.alt = `Anı ${i + 1}`;
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

  // Kalbi orta alana sığdır ve ortala, fotoğrafları sayısına göre boyutlandır
  function sizePhotos() {
    const box = $("#photoHeart");
    const items = [...box.querySelectorAll(".ph")];
    if (!items.length) return;
    const W = Math.min(box.clientWidth * 0.96, 560);
    const H = box.clientHeight;
    const ys = items.map((el) => +el.dataset.y);
    const yMin = Math.min(...ys);
    const yMax = Math.max(...ys);
    const yMid = (yMin + yMax) / 2;

    const size = Math.min(W * 0.22, H * 0.3, ((W * 2.75) / items.length) * 1.05);
    const scale = Math.min((W - size) / 32, (H - size) / (yMax - yMin));
    items.forEach((el) => {
      el.style.setProperty("--size", `${size}px`);
      el.style.setProperty("--x", `${box.clientWidth / 2 + +el.dataset.x * scale}px`);
      el.style.setProperty("--y", `${H / 2 - (+el.dataset.y - yMid) * scale}px`);
    });
  }

  function openLightbox(src) {
    $("#lightboxImg").src = src;
    $("#lightbox").hidden = false;
    fire({ particleCount: 40, spread: 100, origin: { x: 0.5, y: 0.5 }, shapes: emojiShapes.length ? [emojiShapes[1]] : undefined, scalar: 1.6 });
  }

  // ---------------------------------------------------------------
  //  Arka planda süzülenler
  // ---------------------------------------------------------------
  const floaters = $("#floaters");
  const FLOAT_EMOJI = ["💖", "🎉", "⭐", "🎈", "✨", "🎂"];
  const CONCERT_EMOJI = ["🩷", "💖", "🎤", "🎀", "💅", "✨", "🌸"];

  function spawnFloater() {
    if (document.hidden || floaters.childElementCount > 22) return;
    const roll = Math.random();
    let el;
    if (roll < 0.3) {
      el = document.createElement("div");
      el.className = "floater balloon";
      el.style.background = pick(phase === "concert" ? PINKS : COLORS);
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
    } else if (roll < 0.42 && photoSrcs.some(Boolean)) {
      el = document.createElement("img");
      el.className = "floater photo-float";
      el.src = pick(photoSrcs.filter(Boolean));
      el.alt = "";
    } else {
      el = document.createElement("div");
      el.className = "floater";
      el.textContent = pick(phase === "concert" ? CONCERT_EMOJI : FLOAT_EMOJI);
      el.style.fontSize = `${rand(18, 34)}px`;
    }
    el.style.left = `${rand(0, 92)}vw`;
    const dur = rand(9, 16);
    el.style.animationDuration = `${dur}s`;
    floaters.appendChild(el);
    setTimeout(() => el.remove(), dur * 1000);
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

    // Şarkı ve mikrofon, kullanıcı dokunduğu anda hazırlanmalı (tarayıcı kuralı)
    getAudioCtx().resume();
    prepareSong();
    const micReady = startMic();

    setTimeout(() => {
      $("#gate").classList.add("gone");
      $("#app").hidden = false;
      buildTitle();
      buildCandles();
      spawnHero();
      spawnSideCats();
      requestAnimationFrame(fitCake);
      setTimeout(fitCake, 1400); // yazı tipi yüklendikten sonra tekrar
      sideCannons(2000);
      setInterval(spawnFloater, 800);
      setTimeout(startAmbient, 2500);

      phase = "cake";
      $("#micHint").hidden = false;
      micReady.then((ok) => armFallback(ok ? undefined : 3000));
    }, 600);
  }

  $("#gift").addEventListener("click", openGift);
  $("#blowBtn").addEventListener("click", blowCandles);
  $("#musicBtn").addEventListener("click", toggleMusic);
  $("#lightbox").addEventListener("click", () => ($("#lightbox").hidden = true));
  document.addEventListener("keydown", (e) => e.key === "Escape" && ($("#lightbox").hidden = true));
  addEventListener("resize", () => {
    fitCake();
    sizePhotos();
  });
})();
