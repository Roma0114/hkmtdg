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

  // ---- Doğum günü olan kişi (ortadaki taçlı karakter) ----
  // img: fotoğraf yolu. pos: yüzün fotoğraftaki yeri ("yatay dikey").
  // zoom: yüze yakınlaştırma (1 = normal, 1.5 = daha yakın)
  hero: { img: "characters/hikmet.jpg", pos: "50% 45%", zoom: 1.15, shirt: "#ffd166" },

  // ---- Kutlamaya gelen ekip (Manifest kızları) ----
  // Fotoğrafları "characters" klasörüne koyup adlarını buraya yaz.
  // Fotoğraf yoksa yerine çılgın bir emoji surat çıkar.
  crew: [
    { img: "characters/manifest1.jpg", pos: "50% 25%", zoom: 1.3, shirt: "#ff6fa8" },
    { img: "characters/manifest2.jpg", pos: "50% 25%", zoom: 1.3, shirt: "#7cc6ff" },
    { img: "characters/manifest3.jpg", pos: "50% 25%", zoom: 1.3, shirt: "#7be0c3" },
    { img: "characters/manifest4.jpg", pos: "50% 25%", zoom: 1.3, shirt: "#c39bff" },
    { img: "characters/manifest5.jpg", pos: "50% 25%", zoom: 1.3, shirt: "#ff9a6b" },
    { img: "characters/manifest6.jpg", pos: "50% 25%", zoom: 1.3, shirt: "#ff5d5d" },
  ],

  // ---- Konuşmalar ({name} yerine isim gelir) ----
  // Açılışta sırayla: "hero" = doğum günü olan, sayı = ekipten kaçıncı kişi (0'dan başlar)
  intro: [
    ["hero", "ne oluyor burada 😐"],
    [0, "SÜRPRİİİİZ!!! 🎉"],
    [1, "{name} seni tanımıyoruz ama İYİ Kİ DOĞDUN"],
    [2, "menajer zorla getirdi 😭"],
    ["hero", "evime nasıl girdiniz"],
    [3, "kaç yaşına girdin? ...dur söyleme korkuyoruz"],
    [4, "MUMLARI ÜFLE YOKSA ŞARKI SÖYLERİZ 🎤"],
  ],
  // Sonra rastgele dönen laflar
  crewLines: [
    "pastadan bana da ayır 🍰",
    "dilek tut. gerçekleşmezse biz sorumlu değiliz",
    "yaşlanıyorsun ama kimseye söylemeyiz 🤫",
    "hediye mi? BİZ GELDİK YA",
    "BU YAŞ SENİN YAŞIN!!! (ne demekse)",
    "bir yaş daha. tebrikler, hayatta kaldın 🏆",
    "şu an konserde olmamız lazımdı",
    "biz gerçek değiliz, bütçe yetmedi 💸",
    "YAŞASIN {name}!!!",
    "kedi pastaya bastı, sorun yok",
    "AAAAAAAAAA 🎉",
    "{name} kral/kraliçe ilan edildi 👑",
    "kimse mumları saymasın lütfen",
    "ben burada ne arıyorum",
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
  boomLines: ["PASTA PATLADI 💥", "kim yaptı bunu", "kedi yaptı 🐱", "İYİ Kİ DOĞDUN {name}!!!", "çok güzel oldu bence"],

  // "photos" klasöründeki fotoğraflar (kalp şeklinde gösterilir).
  // Az fotoğraf varsa kalbi doldurmak için tekrar edilir.
  photos: [
    "photos/1.jpg",
    "photos/2.jpg",
    "photos/3.jpg",
  ],

  // Kendi şarkın: "music/sarki.mp3" gibi. Boşsa hazır 8-bit melodi çalar.
  musicFile: "",
};
