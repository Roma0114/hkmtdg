# 🎂 AÇMA.

GitHub Pages'te yayınlanan, kaotik bir doğum günü sayfası.

- 🎁 "AÇMA." yazan, titreyen bir hediye kutusu
- 👑 Sahnede taçlı Hikmet (kafası fotoğraf, gövdesi çizgi film) sakince sallanıyor
- 📱 Tek ekran, kaydırma yok, başta ses yok
- 🎂 Mumlar **sadece mikrofona üfleyerek** sönüyor; üfleyemezse birkaç saniye sonra "sanırım nefesin yetmedi, tuşa basarak üfle" butonu çıkıyor
- 💃 Üfleyince pasta patlıyor, kızlar iki yandan içeri giriyor, ekran toz pembe oluyor, şarkı (22.–59. saniyeler) çalıyor
- 🎤 Kızlar şarkının vuruşlarına göre koreografi yapıyor: sağ-sol adım, ortak hareketler, dalga, diziliş değişimi
- 💋 Şarkı bitince diğerleri "doğum günün kutlu olsun Hikmet" deyip çıkıyor, iki kız Hikmet'i öpüp gidiyor ("muaaaaaaahh", "mcuk")
- 💖 Pastanın yerinde kalp şeklinde fotoğraflar
- 🐱 Ekranı koşup geçen kediler, kenarlarda dans eden kediler
- 🎊 İki yandan konfeti, havai fişek, emoji yağmuru

## Kişiselleştirme (`config.js`)

### Karakter fotoğrafları
`characters/` klasörüne at:

| Dosya | Kim |
|---|---|
| `characters/hikmet.jpg` | Doğum günü olan (ortadaki taçlı) |
| `characters/manifest1.jpg` … `manifest6.jpg` | Kutlamaya gelen ekip |

- Fotoğraf yoksa yerine emoji surat çıkar, site yine çalışır.
- Yüz ortada olmazsa `pos` ayarını değiştir: `"50% 20%"` yukarı, `"50% 50%"` orta demek. `zoom` büyüdükçe yüze yaklaşır.
- `toon: true` yüzlere çizgi film gibi sert renkler verir. İstemezsen `false` yap.
- Dosya adları büyük/küçük harfe duyarlıdır: `1.JPG` ile `1.jpg` aynı değildir.

### Şarkı
`music/tozpembe.mp3`, orijinal şarkının 22.–59. saniyeleri kesilerek hazırlandı (37 sn).
Başka bir aralık istersen `songStart` / `songEnd` ile dosyanın içinde başlangıç ve bitiş saniyesini ayarlayabilirsin.
Veda sözleri `goodbye`, `kissLeft`, `kissRight` alanlarında. Not: repo herkese açık olduğu için mp3 dosyası da indirilebilir.

### Kalp fotoğraflar
`photos/` klasörüne `1.jpg`, `2.jpg`… şeklinde koy ve `photos` listesine ekle. Kare fotoğraflar en iyi durur.

## Bilgisayarda deneme

```bash
python -m http.server 8080
```
Sonra `http://localhost:8080` adresini aç.

## Yayınlama
Repo: **Settings → Pages → Source: Deploy from a branch → `main` / `(root)` → Save**.
Birkaç dakika sonra site `https://roma0114.github.io/hkmtdg/` adresinde açılır.

## Notlar
- Müzik ve mikrofon izni kutuya dokununca başlar (tarayıcılar kendiliğinden ses çalmaya izin vermez).
- Mikrofon sadece `https` (GitHub Pages) veya `localhost` üzerinde çalışır, tarayıcı izin ister.
