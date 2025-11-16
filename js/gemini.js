/**
 * Gemini API Entegrasyon Modülü
 * Google Gemini 2.5 Pro API ile iletişim
 */

class GeminiAPI {
    constructor() {
        this.apiKey = null;
        this.baseURL = 'https://generativelanguage.googleapis.com/v1beta/models';
        this.model = 'gemini-2.0-flash-exp'; // Gemini 2.5 Pro equivalent
        this.maxRetries = 3;
        this.retryDelay = 1000; // 1 saniye
    }

    /**
     * API Key'i ayarla
     */
    setApiKey(key) {
        if (!key || key.trim() === '') {
            throw new Error('API Key boş olamaz');
        }
        this.apiKey = key.trim();
    }

    /**
     * API Key'in geçerliliğini kontrol et
     */
    async validateApiKey() {
        if (!this.apiKey) {
            return { valid: false, error: 'API Key girilmedi' };
        }

        try {
            const response = await fetch(
                `${this.baseURL}/${this.model}:generateContent?key=${this.apiKey}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: 'Test'
                            }]
                        }]
                    })
                }
            );

            if (response.ok) {
                return { valid: true };
            } else if (response.status === 400) {
                const errorData = await response.json();
                return {
                    valid: false,
                    error: `API Hatası: ${errorData.error?.message || 'Geçersiz API Key'}`
                };
            } else if (response.status === 403) {
                return {
                    valid: false,
                    error: 'API Key geçersiz veya yetkilendirme hatası'
                };
            } else {
                return {
                    valid: false,
                    error: `HTTP ${response.status}: ${response.statusText}`
                };
            }
        } catch (error) {
            return {
                valid: false,
                error: `Bağlantı hatası: ${error.message}`
            };
        }
    }

    /**
     * Soru üretimi için Gemini API'ye istek gönder
     */
    async generateQuestions(prompt, options = {}) {
        if (!this.apiKey) {
            throw new Error('API Key ayarlanmamış. Lütfen önce API Key girin.');
        }

        const {
            temperature = 0.9,
            topP = 0.95,
            topK = 40,
            maxOutputTokens = 8192,
        } = options;

        const requestBody = {
            contents: [{
                parts: [{
                    text: prompt
                }]
            }],
            generationConfig: {
                temperature,
                topP,
                topK,
                maxOutputTokens,
                responseMimeType: "application/json"
            },
            safetySettings: [
                {
                    category: "HARM_CATEGORY_HARASSMENT",
                    threshold: "BLOCK_NONE"
                },
                {
                    category: "HARM_CATEGORY_HATE_SPEECH",
                    threshold: "BLOCK_NONE"
                },
                {
                    category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                    threshold: "BLOCK_NONE"
                },
                {
                    category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                    threshold: "BLOCK_NONE"
                }
            ]
        };

        let lastError = null;

        // Retry mekanizması
        for (let attempt = 0; attempt < this.maxRetries; attempt++) {
            try {
                const response = await fetch(
                    `${this.baseURL}/${this.model}:generateContent?key=${this.apiKey}`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(requestBody)
                    }
                );

                if (!response.ok) {
                    const errorData = await response.json();
                    const errorMessage = errorData.error?.message || response.statusText;

                    // Rate limit hatası için daha uzun bekle
                    if (response.status === 429) {
                        if (attempt < this.maxRetries - 1) {
                            await this.sleep(this.retryDelay * (attempt + 2));
                            continue;
                        }
                    }

                    throw new Error(`API Hatası (${response.status}): ${errorMessage}`);
                }

                const data = await response.json();

                // Yanıtı parse et
                if (data.candidates && data.candidates.length > 0) {
                    const content = data.candidates[0].content;
                    if (content && content.parts && content.parts.length > 0) {
                        const textResponse = content.parts[0].text;

                        try {
                            // JSON parse et
                            const parsedQuestions = JSON.parse(textResponse);
                            return {
                                success: true,
                                data: parsedQuestions
                            };
                        } catch (parseError) {
                            // JSON parse hatası, metin yanıt döndür
                            return {
                                success: false,
                                error: 'API yanıtı JSON formatında değil',
                                rawResponse: textResponse
                            };
                        }
                    }
                }

                throw new Error('API yanıtı beklenen formatta değil');

            } catch (error) {
                lastError = error;

                // Son deneme değilse, bekle ve tekrar dene
                if (attempt < this.maxRetries - 1) {
                    await this.sleep(this.retryDelay * (attempt + 1));
                    continue;
                }
            }
        }

        // Tüm denemeler başarısız
        return {
            success: false,
            error: lastError?.message || 'Bilinmeyen hata oluştu'
        };
    }

    /**
     * Bekleme fonksiyonu (retry için)
     */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * API kullanım istatistiklerini al (eğer varsa)
     */
    async getUsageStats() {
        // Gemini API'de kullanım istatistikleri için özel endpoint olabilir
        // Şu an için placeholder
        return {
            available: false,
            message: 'Kullanım istatistikleri şu an mevcut değil'
        };
    }

    /**
     * Desteklenen modelleri listele
     */
    getSupportedModels() {
        return [
            {
                name: 'gemini-2.0-flash-exp',
                description: 'Gemini 2.0 Flash Experimental - En yeni ve hızlı model',
                recommended: true
            },
            {
                name: 'gemini-1.5-pro-latest',
                description: 'Gemini 1.5 Pro - Güçlü ve dengeli performans',
                recommended: false
            },
            {
                name: 'gemini-1.5-flash-latest',
                description: 'Gemini 1.5 Flash - Hızlı yanıt süreleri',
                recommended: false
            }
        ];
    }

    /**
     * Kullanılan modeli değiştir
     */
    setModel(modelName) {
        const supportedModels = this.getSupportedModels();
        const model = supportedModels.find(m => m.name === modelName);

        if (!model) {
            throw new Error(`Desteklenmeyen model: ${modelName}`);
        }

        this.model = modelName;
        return true;
    }

    /**
     * Mevcut konfigürasyonu al
     */
    getConfig() {
        return {
            model: this.model,
            hasApiKey: !!this.apiKey,
            baseURL: this.baseURL,
            maxRetries: this.maxRetries
        };
    }
}

// Global instance
const geminiAPI = new GeminiAPI();
