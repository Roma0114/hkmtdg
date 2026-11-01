# 🎂 AÇMA.

GitHub Pages'te yayınlanan, kaotik bir doğum günü sayfası.

- 🎁 "AÇMA." yazan, titreyen bir hediye kutusu
- 🤪 Kafası fotoğraf, gövdesi çizgi film olan karakterler: dans ediyor, takla atıyor, kafaları büyüyor, konuşma balonlarıyla saçmalıyor
- 👑 Ortada taçlı doğum günü insanı ("ne oluyor burada 😐")
- 🎂 Şaka mumlar: ilk üflemede kendi kendine yanıyor, ikincide pasta patlıyor, yerinde kedi çıkıyor
- 🎤 Mikrofona üfleyerek de söndürülebilir
- 🐱 Ekranı çığlık atarak koşup geçen kediler, kenarlarda dans eden kediler
- 🎊 İki yandan konfeti, havai fişek, 🤡💀🐱 emoji yağmuru, ekran sarsıntısı
- 💖 Aşağıda kalp şeklinde fotoğraflar
- 🎵 8-bit "Happy Birthday" (ya da kendi mp3'ün)

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

### Konuşmalar
`intro` (açılış diyaloğu), `crewLines`, `heroLines`, `trickLines`, `boomLines` listelerini istediğin gibi değiştir. `{name}` yazan yere isim gelir.

### Kalp fotoğraflar
`photos/` klasörüne `1.jpg`, `2.jpg`… şeklinde koy. Kare fotoğraflar en iyi durur.

## Bilgisayarda deneme

```bash
python -m http.server 8080
```
Sonra `http://localhost:8080` adresini aç.

## Yayınlama
Repo: **Settings → Pages → Source: Deploy from a branch → `main` / `(root)` → Save**.
Birkaç dakika sonra site `https://roma0114.github.io/hkmtdg/` adresinde açılır.

## Notlar
- Müzik, kutuya dokununca başlar (tarayıcılar kendiliğinden ses çalmaya izin vermez).
- Mikrofon sadece `https` (GitHub Pages) veya `localhost` üzerinde çalışır, tarayıcı izin ister.
