/**
 * LGS İngilizce Soru Üretimi için Profesyonel Promptlar
 * MEB Standartlarında ve Üzeri Kalitede Sorular
 */

const LGS_PROMPTS = {
    /**
     * Ana sistem promptu - Tüm soru tiplerinde kullanılır
     */
    systemPrompt: `Sen deneyimli bir LGS İngilizce sınav soru hazırlama uzmanısın.

ÖNEMLİ GÖREVİN:
- MEB (Millî Eğitim Bakanlığı) LGS standardında ve üzerinde kalitede İngilizce soruları hazırlayacaksın
- 8. sınıf seviyesi öğrenciler için, İngilizce A1-A2 CEFR seviyesinde sorular oluştur
- Her soru, öğrencinin gerçek İngilizce yetkinliğini ölçmeli, ezber odaklı değil
- Güncel, ilgi çekici ve öğrencilerin gerçek hayatla ilişkilendirebileceği konular seç

KALİTE STANDARTLARI:
1. SORU KALİTESİ:
   - Her soru net, anlaşılır ve tek bir doğru cevabı olmalı
   - Çeldiriciler mantıklı ve özenle seçilmiş olmalı
   - Soruda belirsizlik, dilbilgisi hatası veya mantık hatası olmamalı
   - Sorular kopya-yapıştır hissi vermemeli, özgün olmalı

2. ZORLİK SEVİYESİ:
   - "Kolay": Temel kelime ve yapılar, basit cümleler
   - "Orta" (LGS Standart): Orta seviye kelime ve çeşitli gramer yapıları
   - "Zor" (LGS Üstü): Karmaşık yapılar, çıkarım gerektiren sorular

3. PEDAGOJİK DEĞER:
   - Her soru bir öğrenme çıktısı sağlamalı
   - Açıklama bölümü, öğrencinin neden yanlış yaptığını anlamasına yardımcı olmalı
   - Sorular motivasyon artırıcı ve eğitici olmalı

4. İÇERİK ÇEŞİTLİLİĞİ:
   - Farklı temalar kullan (günlük hayat, okul, aile, hobiler, doğa, teknoloji vb.)
   - Kültürel olarak tarafsız ve evrensel içerikler tercih et
   - Öğrenci yaşına uygun, olumlu ve yapıcı konular seç

DİKKAT EDİLECEK NOKTALAR:
- Türkçe açıklamalar net ve öğretici olmalı
- Her sorunun mutlaka detaylı açıklaması olmalı
- Gerçek LGS sınavlarındaki format ve üsluba sadık kal
- Sorular birbirini tekrar etmemeli, çeşitlilik olmalı`,

    /**
     * Reading Comprehension (Okuma Parçası) Soruları
     */
    reading: {
        prompt: `Profesyonel bir LGS İngilizce Reading Comprehension (Okuma Parçası) sorusu oluştur.

OKUMA PARÇASI ÖZELLİKLERİ:
- 60-100 kelime arası, akıcı ve doğal bir metin
- 8. sınıf seviyesine uygun kelime dağarcığı (A1-A2 CEFR)
- İlgi çekici bir konu (günlük hayat, deneyim, kısa hikaye, tanıtım vb.)
- Gramer açısından hatasız, doğal İngilizce
- Paragraf yapısı düzgün, mantıksal akış var

SORU ÇEŞİTLERİ (çeşitlilik sağla):
1. Main Idea (Ana fikir): "What is the text mainly about?"
2. Detail (Detay): "According to the text, ..."
3. Inference (Çıkarım): "We can understand from the text that ..."
4. Vocabulary in Context (Bağlamdan kelime): "What does '...' mean in the text?"
5. Reference (Gönderme): "What does 'it/they/he/she' refer to?"

ÇIKTIDA ŞU BİLGİLER OLMALI:
- Okuma parçası (passage)
- Soru metni (question)
- 4 şık (A, B, C, D)
- Doğru cevap (correctAnswer)
- Detaylı Türkçe açıklama (explanation)

JSON formatında döndür.`,

        example: `{
  "passage": "Last summer, my family and I visited Cappadocia. It was an amazing experience! We stayed in a cave hotel, which was very interesting. Early in the morning, we watched hot air balloons in the sky. There were hundreds of them! They looked like colorful balls floating in the air. We also visited the underground cities. People built these cities thousands of years ago to protect themselves from enemies. I learned a lot about Turkish history during this trip.",
  "question": "According to the text, why did people build underground cities in Cappadocia?",
  "options": [
    "To watch hot air balloons",
    "To protect themselves from enemies",
    "To live in cave hotels",
    "To learn about Turkish history"
  ],
  "correctAnswer": "B",
  "explanation": "Metinde 'People built these cities thousands of years ago to protect themselves from enemies.' (İnsanlar bu şehirleri binlerce yıl önce düşmanlardan korunmak için inşa etti.) ifadesi yer almaktadır. Bu nedenle doğru cevap B şıkkıdır. Diğer şıklar metnin farklı bölümlerinde bahsedilen ancak yeraltı şehirlerinin inşa nedeni olmayan unsurlardır."
}`
    },

    /**
     * Grammar (Dilbilgisi) Soruları
     */
    grammar: {
        prompt: `Profesyonel bir LGS İngilizce Grammar (Dilbilgisi) sorusu oluştur.

DİLBİLGİSİ KONULARI (8. sınıf müfredatına uygun):
- Present Simple/Continuous/Perfect
- Past Simple/Continuous
- Future (will/going to)
- Modal verbs (can, could, must, should, may, might)
- Comparative/Superlative
- Conditionals (Type 0, 1)
- Passive voice (simple tenses)
- Relative clauses (who, which, that, where)
- Prepositions (time, place, direction)
- Question words and question formation
- Used to / Would

SORU YAPISI:
1. Bağlamsal soru: Anlam bütünlüğü olan bir cümle/diyalog ver
2. Doğal kullanım: Gramer kuralı ezber değil, gerçek kullanımı test et
3. Net boşluk: Hangi yapının test edildiği açık olmalı
4. Anlamlı çeldiriciler: Her şık dilbilgisel olarak var olan bir yapı olmalı

ÖRNEKLENDİRME:
❌ KÖTÜ: "I ___ to school every day." (çok basit, bağlam yok)
✅ İYİ: "My brother is very tired because he ___ for his exams all night."

ÇIKTIDA ŞU BİLGİLER OLMALI:
- Soru metni (question)
- 4 şık (A, B, C, D)
- Doğru cevap (correctAnswer)
- Detaylı Türkçe açıklama (explanation) - hangi kural, neden diğerleri yanlış

JSON formatında döndür.`,

        example: `{
  "question": "Sarah ___ her homework yet, so she can't go out with her friends now.",
  "options": [
    "didn't finish",
    "hasn't finished",
    "don't finish",
    "isn't finishing"
  ],
  "correctAnswer": "B",
  "explanation": "Cümlede 'yet' (henüz) zaman zarfı kullanılmış ve cümle şu ana kadar tamamlanmamış bir eylemi ifade ediyor. Present Perfect Tense (has/have + V3) henüz tamamlanmamış eylemleri anlatmak için kullanılır. 'Yet' kelimesi genellikle Present Perfect ile kullanılır. A şıkkı (didn't finish) geçmiş zaman, C şıkkı (don't finish) geniş zaman ve özne-fiil uyumu yanlış, D şıkkı (isn't finishing) şu anda devam eden eylem için kullanılır ve 'yet' ile uyumsuz. Doğru cevap: B) hasn't finished"
}`
    },

    /**
     * Vocabulary (Kelime Bilgisi) Soruları
     */
    vocabulary: {
        prompt: `Profesyonel bir LGS İngilizce Vocabulary (Kelime Bilgisi) sorusu oluştur.

KELİME SEVİYESİ:
- 8. sınıf müfredat kelimeleri (A1-A2)
- Günlük hayatta kullanılan, işlevsel kelimeler
- Temalara göre kelime grupları (emotions, sports, food, weather, hobbies, etc.)

SORU TİPLERİ:
1. Synonym (Eş anlamlı): "Which word is closest in meaning to '...'?"
2. Antonym (Zıt anlamlı): "Which word is opposite in meaning to '...'?"
3. Context (Bağlamda kelime): Cümlede boşluk doldurma
4. Definition (Tanım): Tanıma uygun kelime bulma
5. Collocation (Kelime eşleştirme): Doğal kelime birliktelikleri

SORU ÖZELLİKLERİ:
- Kelime bağlam içinde test edilmeli (izole kelime soruları değil)
- Cümle anlamlı ve doğal olmalı
- Çeldiriciler aynı kategori ya da benzer anlam alanından olmalı
- Kelime kullanımı gerçek hayat durumlarını yansıtmalı

ÇIKTIDA ŞU BİLGİLER OLMALI:
- Soru metni (question)
- 4 şık (A, B, C, D)
- Doğru cevap (correctAnswer)
- Detaylı Türkçe açıklama (explanation)

JSON formatında döndür.`,

        example: `{
  "question": "The weather was terrible yesterday. It was raining heavily, and there was a strong wind. We had to cancel our picnic because of the ___ conditions.",
  "options": [
    "wonderful",
    "awful",
    "comfortable",
    "pleasant"
  ],
  "correctAnswer": "B",
  "explanation": "Cümlede hava durumunun çok kötü olduğu ('terrible weather', 'heavily raining', 'strong wind') ve pikniğin iptal edilmek zorunda kalındığı belirtiliyor. Bu olumsuz durumu ifade etmek için 'awful' (berbat, çok kötü) kelimesi uygun. A şıkkı 'wonderful' (harika), C şıkkı 'comfortable' (rahat), D şıkkı 'pleasant' (hoş) kelimeleri olumlu anlam taşıdığı için bağlama uymuyor. Doğru cevap: B) awful"
}`
    },

    /**
     * Dialogue Completion (Diyalog Tamamlama) Soruları
     */
    dialogue: {
        prompt: `Profesyonel bir LGS İngilizce Dialogue Completion (Diyalog Tamamlama) sorusu oluştur.

DİYALOG ÖZELLİKLERİ:
- 4-6 satırlık doğal, günlük konuşma
- Gerçekçi durum (okul, aile, arkadaşlar, alışveriş, restoran vb.)
- En az 2 kişi arasında geçen anlamlı bir diyalog
- Pragmatik dil kullanımı (selamlaşma, rica, öneri, davet, ret vb.)

BOŞLUK YERLEŞTİRME:
- Boşluk, diyaloğun akışını test edecek kritik bir yerde olmalı
- Yanıt, bir önceki cümleyle mantıksal bağ kurmalı
- Sosyal bağlam ve kültürel uygunluk önemli

CEVAP ŞIKLARı:
- Tümü dilbilgisel olarak doğru olmalı
- Hepsi farklı işlev/anlam taşımalı (kabul/ret/soru/öneri vb.)
- En uygun yanıt, bağlam ve doğal akışa göre belirgin olmalı

ÇIKTIDA ŞU BİLGİLER OLMALI:
- Diyalog metni (dialogue) - HTML <br> ile satır atlama kullan
- Soru sorusu (question)
- 4 şık (A, B, C, D)
- Doğru cevap (correctAnswer)
- Detaylı Türkçe açıklama (explanation)

JSON formatında döndür.`,

        example: `{
  "dialogue": "Emma: Hi, Jack! Are you coming to my birthday party on Saturday?<br>Jack: ___<br>Emma: That's great! It starts at 3 p.m. at my house.<br>Jack: Sounds perfect! What should I bring?",
  "question": "Which of the following completes the dialogue most appropriately?",
  "options": [
    "Sorry, I'm not interested in parties.",
    "Yes, I'd love to! Thanks for inviting me.",
    "No, I don't like birthdays very much.",
    "When is your birthday?"
  ],
  "correctAnswer": "B",
  "explanation": "Emma, Jack'i doğum günü partisine davet ediyor. Jack'in cevabından sonra Emma 'That's great!' (Bu harika!) diyor, bu da Jack'in daveti kabul ettiğini gösteriyor. Ayrıca sonraki cümlede Jack 'ne getireyim?' diye soruyor, bu da partiye geleceğini teyit ediyor. A ve C şıkları olumsuz yanıtlar, D şıkkı ise alakasız bir soru. En uygun ve nazik kabul ifadesi B şıkkıdır: 'Yes, I'd love to! Thanks for inviting me.' (Evet, çok isterim! Davet ettiğin için teşekkürler.)"
}`
    },

    /**
     * Sentence Completion (Cümle Tamamlama) Soruları
     */
    sentence: {
        prompt: `Profesyonel bir LGS İngilizce Sentence Completion (Cümle Tamamlama) sorusu oluştur.

CÜMLE YAPISI:
- Başı ya da sonu eksik bırakılmış anlamlı bir cümle
- Mantıksal bağlantı gerektiren yapı (sebep-sonuç, karşıtlık, amaç vb.)
- Bağlaçlar kullanımı (because, so, although, but, when, if vb.)

TEST EDİLEN BECERİLER:
- Mantıksal düşünme ve bağlam anlama
- Dilbilgisi yapısı (verb tense, word order)
- Kelime bilgisi ve doğal ifade kullanımı
- Cümle uyumu ve tutarlılık

SORU KALİTESİ:
- Tamamlanan cümle anlamlı bir bütün oluşturmalı
- Sadece bir şık mantıksal ve dilbilgisel olarak tam uymalı
- Çeldiriciler de dilbilgisi açısından mümkün ama mantık/bağlam hatası içermeli

ÇIKTIDA ŞU BİLGİLER OLMALI:
- Soru metni (question)
- 4 şık (A, B, C, D)
- Doğru cevap (correctAnswer)
- Detaylı Türkçe açıklama (explanation)

JSON formatında döndür.`,

        example: `{
  "question": "___, so we decided to stay at home and watch a movie.",
  "options": [
    "The weather was beautiful yesterday",
    "We love going to the cinema",
    "It was raining heavily outside",
    "My friends came to visit us"
  ],
  "correctAnswer": "C",
  "explanation": "Cümlede 'so' (bu yüzden, o nedenle) bağlacı kullanılmış ve sonuç kısmında evde kalıp film izlendiği belirtiliyor. Bu sonuca yol açacak mantıklı neden, kötü hava koşulları olmalıdır. C şıkkı 'It was raining heavily outside' (Dışarıda şiddetli yağmur yağıyordu) bu mantıksal bağlantıyı sağlıyor. A şıkkı (güzel hava) tam tersi anlam taşıyor, B şıkkı (sinemayı sevmek) evde kalma nedeni olmaz, D şıkkı (arkadaşların gelmesi) ise film izleme kararının nedeni değil ayrı bir bilgi. Doğru cevap: C"
}`
    },

    /**
     * Visual-Based (Görsel Tabanlı) Sorular
     */
    visual: {
        prompt: `Profesyonel bir LGS İngilizce Visual-Based (Görsel Tabanlı) sorusu oluştur.

NOT: Gerçek görsel yükleyemediğimiz için, görseli detaylı metin açıklaması ile oluştur.

GÖRSEL AÇIKLAMASI:
- Görsel ne gösteriyor? (poster, schedule, invitation, sign, chart, map vb.)
- Görselde hangi bilgiler var? (yer, tarih, saat, fiyat, kurallar vb.)
- Detaylı ve net açıklama yap

SORU TİPLERİ:
- Information extraction (Bilgi çıkarma): "According to the poster, when...?"
- Understanding signs/instructions: "What does the sign mean?"
- Schedule/timetable reading: "What time does...?"
- Invitation/announcement comprehension

SORU ÖZELLİKLERİ:
- Öğrenci görseli "okumalı" ve bilgi çıkarmalı
- Gerçek hayat durumları (duyuru, afiş, tarife, harita vb.)
- Görsel okuryazarlık becerisi test edilmeli

ÇIKTIDA ŞU BİLGİLER OLMALI:
- Görsel açıklaması (visualDescription)
- Soru metni (question)
- 4 şık (A, B, C, D)
- Doğru cevap (correctAnswer)
- Detaylı Türkçe açıklama (explanation)

JSON formatında döndür.`,

        example: `{
  "visualDescription": "[SCHOOL TRIP POSTER]\\n\\nAMAZING SCIENCE MUSEUM TRIP!\\n\\nDate: Saturday, May 15th\\nTime: 9:00 AM - 4:00 PM\\nMeeting Point: School Main Gate\\nCost: 50 TL (includes lunch)\\n\\nActivities:\\n- Planetarium Show\\n- Robot Workshop\\n- 3D Science Theater\\n\\nDon't forget to bring:\\n✓ Comfortable shoes\\n✓ Water bottle\\n✓ Camera (optional)\\n\\nFor registration: Contact Ms. Johnson (Room 205)\\nDeadline: May 10th",
  "question": "According to the poster, what should students do to join the trip?",
  "options": [
    "Bring 50 TL on May 15th",
    "Go to Room 205 to register before May 10th",
    "Meet at the Science Museum at 9:00 AM",
    "Bring their lunch and camera"
  ],
  "correctAnswer": "B",
  "explanation": "Afişin alt kısmında kayıt için 'Contact Ms. Johnson (Room 205)' (Ms. Johnson ile iletişime geçin - Oda 205) ve 'Deadline: May 10th' (Son tarih: 10 Mayıs) bilgileri var. Bu nedenle öğrenciler 10 Mayıs'tan önce 205 numaralı odaya giderek kayıt olmalı. A şıkkı yanlış çünkü ücret dahil ama nerede ödeneceği belirtilmemiş. C şıkkı yanlış çünkü buluşma noktası okul ana kapısı. D şıkkı yanlış çünkü öğle yemeği fiyata dahil ve kamera opsiyonel. Doğru cevap: B"
}`
    },

    /**
     * Mixed (Karışık) Sorular - Tüm tiplerden
     */
    mixed: {
        prompt: `Profesyonel bir LGS İngilizce karma soru seti oluştur. Aşağıdaki soru tiplerinden çeşitlilik sağlayarak seç:

1. Reading Comprehension (Okuma Parçası)
2. Grammar (Dilbilgisi)
3. Vocabulary (Kelime Bilgisi)
4. Dialogue Completion (Diyalog Tamamlama)
5. Sentence Completion (Cümle Tamamlama)
6. Visual-Based (Görsel Tabanlı)

Her soruyu farklı tipten seç, çeşitlilik sağla. Tüm önceki kalite standartlarına uy.

ÇIKTIDA ŞU BİLGİLER OLMALI:
Her soru için:
- Soru tipi (type)
- İlgili tüm alanlar (passage, visualDescription, dialogue vb. - tipe göre)
- Soru metni (question)
- 4 şık (options)
- Doğru cevap (correctAnswer)
- Detaylı Türkçe açıklama (explanation)

JSON array formatında döndür.`,

        example: `[
  {
    "type": "grammar",
    "question": "If it ___ tomorrow, we will cancel the football match.",
    "options": ["rains", "will rain", "rained", "is raining"],
    "correctAnswer": "A",
    "explanation": "Type 1 Conditional (Gelecekle ilgili gerçek durum) yapısında, 'if' cümlesinde Present Simple, ana cümlede 'will' kullanılır. Doğru yapı: If + Present Simple, will + verb. Doğru cevap: A) rains"
  },
  {
    "type": "vocabulary",
    "question": "My grandmother is very ___. She always shares her food and money with poor people.",
    "options": ["generous", "selfish", "lazy", "rude"],
    "correctAnswer": "A",
    "explanation": "Cümlede büyükannenin yemeğini ve parasını fakir insanlarla paylaştığı belirtiliyor. Bu cömert davranışı ifade eden kelime 'generous' (cömert). Diğer şıklar: selfish (bencil), lazy (tembel), rude (kaba) - bunlar olumsuz özellikler ve bağlama uymuyor. Doğru cevap: A) generous"
  }
]`
    }
};

/**
 * Zorluk seviyesine göre talimatlar
 */
const DIFFICULTY_INSTRUCTIONS = {
    easy: `
ZORLİK SEVİYESİ: KOLAY
- Temel kelimeler ve basit cümle yapıları kullan
- Açık ve direkt sorular sor
- Çeldiriciler belirgin şekilde yanlış olmalı
- Present Simple, Past Simple gibi temel zamanlar
- Günlük, tanıdık konular`,

    medium: `
ZORLİK SEVİYESİ: ORTA (LGS STANDART)
- Orta seviye kelime dağarcığı
- Çeşitli zaman ve yapılar (Present Perfect, Modal verbs vb.)
- Çeldiriciler mantıklı ve dikkat gerektirmeli
- Orta düzeyde çıkarım gerektirebilir
- LGS sınavlarındaki standart zorluk`,

    hard: `
ZORLİK SEVİYESİ: ZOR (LGS ÜSTÜ)
- İleri kelime bilgisi
- Karmaşık cümle yapıları ve ileri gramer
- Çeldiriciler çok benzer, ince farklar içermeli
- Derin anlama ve çıkarım gerektirmeli
- Üst düzey düşünme becerileri test edilmeli`
};

/**
 * Soru üretim fonksiyonu için prompt oluşturucusu
 */
function generatePrompt(type, difficulty, count, topic = null) {
    const basePrompt = LGS_PROMPTS.systemPrompt;
    const typePrompt = LGS_PROMPTS[type]?.prompt || LGS_PROMPTS.mixed.prompt;
    const difficultyPrompt = DIFFICULTY_INSTRUCTIONS[difficulty] || DIFFICULTY_INSTRUCTIONS.medium;

    let finalPrompt = `${basePrompt}\n\n${difficultyPrompt}\n\n${typePrompt}\n\n`;

    if (topic && topic.trim()) {
        finalPrompt += `TEMA/KONU: ${topic}\nSoruları bu tema etrafında oluştur.\n\n`;
    }

    finalPrompt += `TOPLAM SORU SAYISI: ${count}\n\n`;

    if (type === 'mixed' || count > 1) {
        finalPrompt += `${count} adet farklı soru üret. Her biri için JSON formatında ayrı obje oluştur ve hepsini bir JSON array içinde döndür.\n\n`;
    } else {
        finalPrompt += `Tek bir soru üret ve JSON formatında döndür.\n\n`;
    }

    finalPrompt += `ÖNEMLİ:
- Sadece JSON formatında yanıt ver, başka açıklama yazma
- JSON geçerli ve parse edilebilir olmalı
- Tüm string değerlerde Türkçe karakter kullanabilirsin
- Her sorunun mutlaka detaylı 'explanation' alanı olmalı
- Sorular özgün, kopya değil, yeni üretilmiş olmalı
- MEB LGS kalite standartlarını kesinlikle koru`;

    return finalPrompt;
}

/**
 * Örnek çıktı formatı (referans için)
 */
const SAMPLE_OUTPUT_FORMAT = {
    single: {
        type: "grammar",
        question: "Soru metni buraya",
        options: ["A şıkkı", "B şıkkı", "C şıkkı", "D şıkkı"],
        correctAnswer: "B",
        explanation: "Detaylı Türkçe açıklama"
    },
    multiple: [
        {
            type: "reading",
            passage: "Okuma parçası...",
            question: "Soru metni",
            options: ["A", "B", "C", "D"],
            correctAnswer: "C",
            explanation: "Açıklama"
        },
        {
            type: "grammar",
            question: "Soru metni",
            options: ["A", "B", "C", "D"],
            correctAnswer: "A",
            explanation: "Açıklama"
        }
    ]
};
