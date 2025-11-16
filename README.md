# 🎓 LGS İngilizce Soru Üretici

**Gemini 2.5 Pro ile Profesyonel LGS İngilizce Sınavı Soruları**

MEB standartlarında ve üzerinde kalitede, 8. sınıf LGS İngilizce hazırlık soruları üreten yapay zeka destekli web uygulaması.

---

## ✨ Özellikler

### 🤖 Yapay Zeka Gücü
- **Gemini 2.5 Pro** entegrasyonu
- MEB LGS standartlarında profesyonel soru kalitesi
- Akıllı prompt mühendisliği ile optimize edilmiş çıktılar

### 📚 Soru Tipleri
1. **Reading Comprehension** (Okuma Parçası) - 60-100 kelimelik özgün metinler
2. **Grammar** (Dilbilgisi) - 8. sınıf müfredatına uygun yapılar
3. **Vocabulary** (Kelime Bilgisi) - Bağlamsal kelime testleri
4. **Dialogue Completion** (Diyalog Tamamlama) - Gerçekçi konuşma durumları
5. **Sentence Completion** (Cümle Tamamlama) - Mantıksal tamamlama
6. **Visual-Based** (Görsel Tabanlı) - Afiş, duyuru, harita soruları
7. **Mixed** (Karışık) - Tüm tiplerden çeşitli sorular

### ⚙️ Esneklik
- **Zorluk Seviyeleri**: Kolay, Orta (LGS Standart), Zor (LGS Üstü)
- **Soru Sayısı**: 1-20 arası özelleştirilebilir
- **Tema Seçimi**: İsteğe bağlı konu/tema belirleme
- **Açıklamalar**: Her soru için detaylı Türkçe açıklama

### 🎨 Kullanıcı Dostu Arayüz
- Modern, responsive tasarım
- Koyu mor gradyan arka plan
- Mobil uyumlu
- Yazdırma desteği
- Tek tıkla kopyalama ve indirme

---

## 🚀 Kurulum ve Kullanım

### 1. Projeyi İndirin
```bash
git clone https://github.com/kullaniciadi/soruuretici.git
cd soruuretici
```

### 2. Uygulamayı Başlatın
Herhangi bir HTTP sunucusu ile çalıştırabilirsiniz:

#### Python ile:
```bash
python -m http.server 8000
```

#### Node.js ile (http-server):
```bash
npx http-server
```

#### VS Code Live Server:
- `index.html`'i sağ tıklayın → "Open with Live Server"

### 3. Tarayıcıda Açın
```
http://localhost:8000
```

---

## 🔑 API Key Alma

1. [Google AI Studio](https://aistudio.google.com/app/apikey)'ya gidin
2. Google hesabınızla giriş yapın
3. **"Create API Key"** butonuna tıklayın
4. Oluşan API Key'i kopyalayın
5. Uygulamada ilgili alana yapıştırıp **"Kaydet"** butonuna tıklayın

> ⚠️ **Güvenlik Notu**: API Key'inizi kimseyle paylaşmayın. LocalStorage'da güvenli şekilde saklanır.

---

## 📖 Kullanım Kılavuzu

### Adım 1: API Key Girişi

1. Gemini API Key'inizi girin
2. "Kaydet" butonuna tıklayın
3. Sistem otomatik doğrulama yapacak

### Adım 2: Soru Parametrelerini Ayarlayın

1. **Soru Tipi**: İstediğiniz soru tipini seçin
2. **Zorluk Seviyesi**: Kolay, Orta veya Zor
3. **Soru Sayısı**: 1-20 arası
4. **Tema** (opsiyonel): Örn: "Daily Routines", "Weather", "Shopping"

### Adım 3: Soru Üretin
1. "🚀 Soru Üret" butonuna tıklayın
2. AI soruları hazırlarken bekleyin (10-30 saniye)
3. Sorular otomatik olarak görüntülenecek

### Adım 4: Soruları Kullanın
- **📋 Kopyala**: Tüm soruları panoya kopyala
- **💾 İndir**: TXT formatında indir
- **🖨️ Yazdır**: Doğrudan yazdır

---

## 🎯 Soru Kalite Standartları

### MEB LGS Uyumluluğu
✅ 8. sınıf İngilizce müfredatına tam uyum
✅ A1-A2 CEFR seviyesi
✅ Güncel ve ilgi çekici içerikler
✅ Net, anlaşılır soru yapısı
✅ Mantıklı çeldiriciler
✅ Tek doğru cevap prensibi

### Pedagojik Değer
✅ Her soru bir öğrenme çıktısı sağlar
✅ Detaylı Türkçe açıklamalar
✅ Neden-sonuç ilişkisi öğretimi
✅ Motivasyon artırıcı içerik

### Çeşitlilik
✅ Farklı temalar ve konular
✅ Kültürel tarafsızlık
✅ Yaşa uygun içerik
✅ Gerçek hayat bağlantısı

---

## 🛠️ Teknik Detaylar

### Teknoloji Stack
- **Frontend**: Vanilla JavaScript (ES6+)
- **UI**: Modern CSS3 (Grid, Flexbox, Animations)
- **API**: Google Gemini 2.5 Pro
- **Storage**: LocalStorage (API Key)
- **Format**: JSON response parsing

### Proje Yapısı
```
soruuretici/
├── index.html          # Ana sayfa
├── css/
│   └── style.css       # Stil dosyası
├── js/
│   ├── app.js          # Ana uygulama kontrolcüsü
│   ├── gemini.js       # Gemini API entegrasyonu
│   └── prompts.js      # Profesyonel soru promptları
├── README.md           # Dokümantasyon
└── .gitignore          # Git ignore kuralları
```

### API Konfigürasyonu
```javascript
{
    model: 'gemini-2.0-flash-exp',
    temperature: 0.9,      // Yaratıcılık
    topP: 0.95,            // Çeşitlilik
    topK: 40,              // Kelime seçimi
    maxOutputTokens: 8192  // Maksimum çıktı
}
```

---

## 📝 Örnek Çıktı

### Reading Comprehension Sorusu
```
📖 OKUMA PARÇASI:
Last summer, my family and I visited Cappadocia. It was an amazing
experience! We stayed in a cave hotel, which was very interesting...

❓ SORU:
According to the text, why did people build underground cities?

A) To watch hot air balloons
B) To protect themselves from enemies ✓
C) To live in cave hotels
D) To learn about Turkish history

💡 AÇIKLAMA:
Metinde 'People built these cities thousands of years ago to
protect themselves from enemies.' ifadesi yer almaktadır...
```

---

## 🤝 Katkıda Bulunma

Projeye katkıda bulunmak isterseniz:

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add some amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

---

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

---

## 🙏 Teşekkürler

- **Google Gemini AI** - Güçlü dil modeli
- **MEB** - LGS standartları
- **Türkiye'deki tüm öğretmenler** - İlham kaynağı

---

## 🎓 Eğitim Hedefi

Bu uygulama, öğrencilerin LGS İngilizce sınavına en iyi şekilde hazırlanmasına yardımcı olmak için geliştirilmiştir. Yapay zeka destekli soru üretimi sayesinde:

- ♾️ Sınırsız soru çeşitliliği
- 🎯 Hedefli pratik
- 📈 Sürekli gelişim
- 🧠 Akıllı öğrenme

**Başarılar dileriz! 🚀**

---

Made with ❤️ for Turkish students
