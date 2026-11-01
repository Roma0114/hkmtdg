// =====================================================
//  BURAYI DÜZENLE — sitedeki tüm kişisel bilgiler burada
// =====================================================
window.BIRTHDAY = {
  // Doğum günü olan kişinin adı
  name: "Hikmet",

  // Pastadaki mum sayısı (1-12)
  candles: 6,

  // Yüzleri çizgi film gibi göstermek için (renkleri sertleştirir)
  toon: true,

  // Mikrofona üfleyemezse "tuşa basarak üfle" butonu kaç saniye sonra çıksın
  micFallbackDelay: 10,

  // ---- Pastadan sonraki konser şarkısı ----
  // Şarkı dosyasını "music" klasörüne koy. Bulunamazsa 8-bit melodi çalar.
  song: "music/tozpembe.mp3",
  // Şarkı kaçıncı saniyeden başlasın (ör. nakarat için 45)
  songStart: 0,

  // ---- Doğum günü olan kişi (ortadaki taçlı karakter) ----
  // img: fotoğraf yolu. pos: yüzün fotoğraftaki yeri ("yatay dikey").
  // zoom: yüze yakınlaştırma (1 = normal, 1.5 = daha yakın)
  hero: { img: "characters/hikmet.jpg", pos: "50% 45%", zoom: 1.15, shirt: "#ffd166" },

  // ---- Kutlamaya gelen kızlar (Manifest) ----
  // Fotoğrafları "characters" klasörüne koyup adlarını buraya yaz.
  // Fotoğraf yoksa yerine çılgın bir emoji surat çıkar.
  // dress: elbise rengi, hair: saç rengi
  crew: [
    { img: "characters/manifest1.jpg", pos: "50% 45%", zoom: 1.05, dress: "#f2c79b", hair: "#c89a62" },
    { img: "characters/manifest2.jpg", pos: "50% 45%", zoom: 1.05, dress: "#2b2b45", hair: "#1b2a4a" },
    { img: "characters/manifest3.jpg", pos: "50% 45%", zoom: 1.05, dress: "#c9a46a", hair: "#6b4428" },
    { img: "characters/manifest4.jpg", pos: "50% 45%", zoom: 1.05, dress: "#ffffff", hair: "#141414" },
    { img: "characters/manifest5.jpg", pos: "50% 45%", zoom: 1.05, dress: "#ffc2da", hair: "#e8dcc0" },
    { img: "characters/manifest6.jpg", pos: "50% 45%", zoom: 1.05, dress: "#2b2b45", hair: "#d08a52" },
  ],

  // ---- Konuşmalar ({name} yerine isim gelir) ----
  // "hero" = doğum günü olan, sayı = ekipten kaçıncı kız (0'dan başlar)
  intro: [
    ["hero", "ne oluyor burada 😐"],
    [0, "SÜRPRİİİİZ!!! 🎉"],
    [1, "{name} seni tanımıyoruz ama İYİ Kİ DOĞDUN"],
    [2, "menajer zorla getirdi 😭"],
    ["hero", "evime nasıl girdiniz"],
    [3, "pastadan sonra konser var 🎤 kaçma"],
    [4, "hadi mikrofona ÜFLE 🌬️"],
  ],
  // Pastadan önce rastgele dönen laflar
  crewLines: [
    "pastadan bana da ayır 🍰",
    "dilek tut. gerçekleşmezse biz sorumlu değiliz",
    "yaşlanıyorsun ama kimseye söylemeyiz 🤫",
    "hediye mi? BİZ GELDİK YA 💅",
    "bir yaş daha. tebrikler, hayatta kaldın 🏆",
    "şu an konserde olmamız lazımdı",
    "biz gerçek değiliz, bütçe yetmedi 💸",
    "YAŞASIN {name}!!!",
    "kedi pastaya bastı, sorun yok",
    "{name} kral ilan edildi 👑",
    "kimse mumları saymasın lütfen",
    "üfle de şarkıya geçelim artık 🎤",
  ],
  heroLines: [
    "kimsiniz siz",
    "tamam teşekkürler ama çıkın",
    "pasta benim 😤",
    "polisi arıyorum 📞",
    "bu kediler nereden çıktı",
    "...peki 🙂",
  ],
  // Mumlar kendiliğinden yanınca
  trickLines: ["HAHAHA ŞAKA MUM 🤡", "söndüremedin 😂", "ciğerler yaşlanmış", "BİR DAHA!!!", "hile mum aldık 💀"],
  // Pasta patlayınca
  boomLines: ["PASTA PATLADI 💥", "kim yaptı bunu", "kedi yaptı 🐱", "çok güzel oldu bence"],

  // ---- Konser ----
  concertIntro: [
    [0, "ŞİMDİ SIRA KONSERDE 🎤"],
    ["hero", "yine mi siz 😐"],
    [1, "kızlar sahneye 💅"],
  ],
  concertLines: [
    "TOZ PEMBEEEE 🩷",
    "bu şarkıyı {name} için söylüyoruz (söylemiyoruz)",
    "{name} koreografiyi bilmiyor 😭",
    "RİTİM TUT {name}!!!",
    "her yer pembe oldu, normal",
    "konser ücreti: 1 dilim pasta 🍰",
    "telifi {name} ödeyecek 💸",
    "playback değil yemin ederiz",
    "bis isteyen? 🙋‍♀️",
    "{name} sahneye çık!!!",
    "provasız çıktık belli oluyor mu",
  ],
  concertHeroLines: [
    "ben bu şarkıyı bilmiyorum",
    "neden her yer pembe",
    "ritim tutamıyorum 😭",
    "tamam bu iyiydi itiraf ediyorum",
    "bis yapmayın lütfen",
  ],

  // Pasta patladıktan sonra kalp şeklinde çıkan fotoğraflar.
  // Az fotoğraf varsa kalbi doldurmak için tekrar edilir.
  photos: [
    "photos/1.jpg",
    "photos/2.jpg",
    "photos/3.jpg",
  ],
};
