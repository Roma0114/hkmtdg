// =====================================================
//  BURAYI DÜZENLE — sitedeki tüm kişisel bilgiler burada
// =====================================================
window.BIRTHDAY = {
  // Doğum günü olan kişinin adı
  name: "Hikmet",

  // Pastadaki mum sayısı (1-12)
  candles: 6,

  // Mikrofona üfleyemezse "tuşa basarak üfle" butonu kaç saniye sonra çıksın
  micFallbackDelay: 10,

  // ---- Pasta söndükten sonra kızların dans ettiği şarkı ----
  // music/tozpembe.mp3 orijinal şarkının 22-59. saniyeleri kesilerek hazırlandı.
  // songStart / songEnd: dosyanın içinde kaçıncı saniyeden kaçıncıya kadar çalsın (null = sonuna kadar)
  song: "music/tozpembe.mp3",
  songStart: 0,
  songEnd: null,

  // Şarkı bitince: Hikmet'in solundaki kız ve sağdan 2. kız Hikmet'i öpüp gider,
  // diğerleri kutlayarak çıkar ({name} yerine isim gelir)
  goodbye: "doğum günün kutlu olsun {name} 🎉",
  kissLeft: "muaaaaaaahh 💋",
  kissRight: "mcuk 💋",

  // ---- Doğum günü olan kişi (ortadaki taçlı karakter) ----
  // img: fotoğraf yolu. pos: yüzün fotoğraftaki yeri ("yatay dikey").
  // zoom: yüze yakınlaştırma (1 = normal, 1.5 = daha yakın)
  hero: { img: "characters/hikmet.jpg", pos: "50% 45%", zoom: 1.15, shirt: "#ffd166" },

  // ---- Pasta söndükten sonra gelen kızlar (Manifest) ----
  // dress: elbise rengi, hair: saç rengi
  crew: [
    { img: "characters/manifest1.jpg", pos: "50% 45%", zoom: 1.05, dress: "#f2c79b", hair: "#c89a62" },
    { img: "characters/manifest2.jpg", pos: "50% 45%", zoom: 1.05, dress: "#2b2b45", hair: "#1b2a4a" },
    { img: "characters/manifest3.jpg", pos: "50% 45%", zoom: 1.05, dress: "#c9a46a", hair: "#6b4428" },
    { img: "characters/manifest4.jpg", pos: "50% 45%", zoom: 1.05, dress: "#ffffff", hair: "#141414" },
    { img: "characters/manifest5.jpg", pos: "50% 45%", zoom: 1.05, dress: "#ffc2da", hair: "#e8dcc0" },
    { img: "characters/manifest6.jpg", pos: "50% 45%", zoom: 1.05, dress: "#2b2b45", hair: "#d08a52" },
  ],

  // Pasta söndükten sonra kalp şeklinde çıkan fotoğraflar.
  // photos/N.jpg dosyalarından hazırlanan kalp kesimli halleri (telefonda kasmasın diye önceden kesildi).
  // Az fotoğraf varsa kalbi doldurmak için tekrar edilir.
  photos: [4, 5, 6, 7, 8, 9, 10, 1, 2, 3].map((n) => `photos/hearts/${n}.webp`),
};
