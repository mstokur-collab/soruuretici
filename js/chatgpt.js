/**
 * OpenAI ChatGPT API Entegrasyon Modülü
 * OpenAI GPT-4 API ile iletişim
 */

class ChatGPTAPI {
    constructor() {
        this.apiKey = null;
        this.baseURL = 'https://api.openai.com/v1';
        this.model = 'gpt-4-turbo-preview'; // GPT-4 Turbo model
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
                `${this.baseURL}/chat/completions`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.apiKey}`
                    },
                    body: JSON.stringify({
                        model: this.model,
                        messages: [{
                            role: 'user',
                            content: 'Test'
                        }],
                        max_tokens: 5
                    })
                }
            );

            if (response.ok) {
                return { valid: true };
            } else if (response.status === 401) {
                return {
                    valid: false,
                    error: 'API Key geçersiz veya yetkilendirme hatası'
                };
            } else if (response.status === 429) {
                return {
                    valid: false,
                    error: 'Rate limit aşıldı. Lütfen daha sonra tekrar deneyin.'
                };
            } else {
                const errorData = await response.json();
                return {
                    valid: false,
                    error: `API Hatası: ${errorData.error?.message || response.statusText}`
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
     * Soru üretimi için ChatGPT API'ye istek gönder
     */
    async generateQuestions(prompt, options = {}) {
        if (!this.apiKey) {
            throw new Error('API Key ayarlanmamış. Lütfen önce API Key girin.');
        }

        const {
            temperature = 0.9,
            maxTokens = 4000,
        } = options;

        const requestBody = {
            model: this.model,
            messages: [
                {
                    role: 'system',
                    content: 'Sen profesyonel bir LGS İngilizce sınav soru hazırlama uzmanısın. Verilen talimatlara göre JSON formatında sorular üretiyorsun.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            temperature: temperature,
            max_tokens: maxTokens,
            response_format: { type: "json_object" }
        };

        let lastError = null;

        // Retry mekanizması
        for (let attempt = 0; attempt < this.maxRetries; attempt++) {
            try {
                const response = await fetch(
                    `${this.baseURL}/chat/completions`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${this.apiKey}`
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
                if (data.choices && data.choices.length > 0) {
                    const content = data.choices[0].message.content;

                    try {
                        // JSON parse et
                        const parsedQuestions = JSON.parse(content);
                        return {
                            success: true,
                            data: parsedQuestions
                        };
                    } catch (parseError) {
                        // JSON parse hatası, metin yanıt döndür
                        return {
                            success: false,
                            error: 'API yanıtı JSON formatında değil',
                            rawResponse: content
                        };
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
     * API kullanım istatistiklerini al
     */
    async getUsageStats() {
        // OpenAI API'de kullanım istatistikleri için ayrı endpoint gerekebilir
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
                name: 'gpt-4-turbo-preview',
                description: 'GPT-4 Turbo - En güçlü ve güncel model',
                recommended: true
            },
            {
                name: 'gpt-4',
                description: 'GPT-4 - Yüksek kaliteli yanıtlar',
                recommended: false
            },
            {
                name: 'gpt-3.5-turbo',
                description: 'GPT-3.5 Turbo - Hızlı ve ekonomik',
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
const chatgptAPI = new ChatGPTAPI();
