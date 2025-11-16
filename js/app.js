/**
 * Ana Uygulama Kontrolcüsü
 * UI Yönetimi ve Kullanıcı Etkileşimleri
 */

class LGSQuestionGenerator {
    constructor() {
        this.currentQuestions = null;
        this.init();
    }

    /**
     * Uygulamayı başlat
     */
    init() {
        this.initializeElements();
        this.attachEventListeners();
        this.loadApiKeyFromStorage();
        this.checkApiKeyStatus();
    }

    /**
     * DOM elementlerini referansla
     */
    initializeElements() {
        // API Key bölümü
        this.apiKeyInput = document.getElementById('apiKeyInput');
        this.saveApiKeyBtn = document.getElementById('saveApiKey');
        this.clearApiKeyBtn = document.getElementById('clearApiKey');
        this.toggleApiKeyBtn = document.getElementById('toggleApiKey');
        this.apiStatus = document.getElementById('apiStatus');
        this.statusIndicator = document.getElementById('statusIndicator');
        this.statusText = document.getElementById('statusText');

        // Soru üretici bölümü
        this.questionGeneratorSection = document.getElementById('questionGeneratorSection');
        this.questionType = document.getElementById('questionType');
        this.difficulty = document.getElementById('difficulty');
        this.questionCount = document.getElementById('questionCount');
        this.topic = document.getElementById('topic');
        this.generateBtn = document.getElementById('generateQuestions');

        // Sonuç bölümü
        this.loadingSection = document.getElementById('loadingSection');
        this.resultsSection = document.getElementById('resultsSection');
        this.questionsOutput = document.getElementById('questionsOutput');
        this.copyBtn = document.getElementById('copyQuestions');
        this.downloadBtn = document.getElementById('downloadQuestions');
        this.printBtn = document.getElementById('printQuestions');
    }

    /**
     * Event listener'ları bağla
     */
    attachEventListeners() {
        // API Key yönetimi
        this.saveApiKeyBtn.addEventListener('click', () => this.saveApiKey());
        this.clearApiKeyBtn.addEventListener('click', () => this.clearApiKey());
        this.toggleApiKeyBtn.addEventListener('click', () => this.toggleApiKeyVisibility());
        this.apiKeyInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.saveApiKey();
        });

        // Soru üretimi
        this.generateBtn.addEventListener('click', () => this.generateQuestions());

        // Sonuç işlemleri
        this.copyBtn.addEventListener('click', () => this.copyQuestions());
        this.downloadBtn.addEventListener('click', () => this.downloadQuestions());
        this.printBtn.addEventListener('click', () => this.printQuestions());
    }

    /**
     * LocalStorage'dan API Key yükle
     */
    loadApiKeyFromStorage() {
        const savedKey = localStorage.getItem('openai_api_key');
        if (savedKey) {
            this.apiKeyInput.value = savedKey;
            chatgptAPI.setApiKey(savedKey);
        }
    }

    /**
     * API Key durumunu kontrol et
     */
    async checkApiKeyStatus() {
        const savedKey = localStorage.getItem('openai_api_key');

        if (!savedKey) {
            this.updateApiStatus(false, 'API Key girilmedi');
            this.questionGeneratorSection.style.display = 'none';
            return;
        }

        this.updateApiStatus(null, 'Kontrol ediliyor...');

        const validation = await chatgptAPI.validateApiKey();

        if (validation.valid) {
            this.updateApiStatus(true, 'API Key aktif ve geçerli ✓');
            this.questionGeneratorSection.style.display = 'block';
        } else {
            this.updateApiStatus(false, `Hata: ${validation.error}`);
            this.questionGeneratorSection.style.display = 'none';
        }
    }

    /**
     * API durumunu güncelle
     */
    updateApiStatus(isActive, message) {
        this.statusText.textContent = message;

        if (isActive === true) {
            this.statusIndicator.classList.add('active');
            this.statusIndicator.style.background = 'var(--success-color)';
        } else if (isActive === false) {
            this.statusIndicator.classList.remove('active');
            this.statusIndicator.style.background = 'var(--danger-color)';
        } else {
            this.statusIndicator.classList.remove('active');
            this.statusIndicator.style.background = 'var(--warning-color)';
        }
    }

    /**
     * API Key'i kaydet
     */
    async saveApiKey() {
        const apiKey = this.apiKeyInput.value.trim();

        if (!apiKey) {
            this.showNotification('Lütfen bir API Key girin', 'error');
            return;
        }

        this.updateApiStatus(null, 'Doğrulanıyor...');
        this.saveApiKeyBtn.disabled = true;

        try {
            chatgptAPI.setApiKey(apiKey);
            const validation = await chatgptAPI.validateApiKey();

            if (validation.valid) {
                localStorage.setItem('openai_api_key', apiKey);
                this.updateApiStatus(true, 'API Key başarıyla kaydedildi ✓');
                this.questionGeneratorSection.style.display = 'block';
                this.showNotification('API Key başarıyla kaydedildi!', 'success');
            } else {
                this.updateApiStatus(false, `Geçersiz: ${validation.error}`);
                this.showNotification(`API Key geçersiz: ${validation.error}`, 'error');
            }
        } catch (error) {
            this.updateApiStatus(false, error.message);
            this.showNotification(`Hata: ${error.message}`, 'error');
        } finally {
            this.saveApiKeyBtn.disabled = false;
        }
    }

    /**
     * API Key'i temizle
     */
    clearApiKey() {
        if (!confirm('API Key\'i silmek istediğinizden emin misiniz?')) {
            return;
        }

        this.apiKeyInput.value = '';
        localStorage.removeItem('openai_api_key');
        chatgptAPI.setApiKey('');
        this.updateApiStatus(false, 'API Key temizlendi');
        this.questionGeneratorSection.style.display = 'none';
        this.resultsSection.style.display = 'none';
        this.showNotification('API Key temizlendi', 'info');
    }

    /**
     * API Key görünürlüğünü değiştir
     */
    toggleApiKeyVisibility() {
        const type = this.apiKeyInput.type;
        this.apiKeyInput.type = type === 'password' ? 'text' : 'password';
        this.toggleApiKeyBtn.textContent = type === 'password' ? '🙈' : '👁️';
    }

    /**
     * Soru üret
     */
    async generateQuestions() {
        const type = this.questionType.value;
        const difficultyLevel = this.difficulty.value;
        const count = parseInt(this.questionCount.value);
        const topicValue = this.topic.value.trim();

        // Validasyon
        if (count < 1 || count > 20) {
            this.showNotification('Soru sayısı 1-20 arasında olmalıdır', 'error');
            return;
        }

        // UI güncelle
        this.resultsSection.style.display = 'none';
        this.loadingSection.style.display = 'block';
        this.generateBtn.disabled = true;

        try {
            // Prompt oluştur
            const prompt = generatePrompt(type, difficultyLevel, count, topicValue);

            console.log('Gönderilen prompt:', prompt);

            // API çağrısı
            const result = await chatgptAPI.generateQuestions(prompt, {
                temperature: 0.9,
                maxTokens: 4000
            });

            if (result.success) {
                // ChatGPT yanıtını işle - eğer "questions" anahtarı varsa onu kullan
                let questionsData = result.data;
                if (questionsData.questions) {
                    questionsData = questionsData.questions;
                }

                this.currentQuestions = questionsData;
                this.displayQuestions(questionsData, type);
                this.showNotification('Sorular başarıyla oluşturuldu!', 'success');
            } else {
                throw new Error(result.error || 'Soru üretimi başarısız');
            }

        } catch (error) {
            console.error('Soru üretim hatası:', error);
            this.showNotification(`Hata: ${error.message}`, 'error');
        } finally {
            this.loadingSection.style.display = 'none';
            this.generateBtn.disabled = false;
        }
    }

    /**
     * Soruları görüntüle
     */
    displayQuestions(questions, type) {
        // Array değilse array'e çevir
        const questionsArray = Array.isArray(questions) ? questions : [questions];

        let html = '';

        questionsArray.forEach((q, index) => {
            html += this.renderQuestion(q, index + 1);
        });

        this.questionsOutput.innerHTML = html;
        this.resultsSection.style.display = 'block';

        // Sonuç bölümüne scroll
        this.resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    /**
     * Tek bir soruyu render et
     */
    renderQuestion(question, number) {
        const type = question.type || 'general';
        const correctIndex = question.correctAnswer.charCodeAt(0) - 65; // A=0, B=1, C=2, D=3

        let html = `<div class="question-item">`;
        html += `<div class="question-number">Soru ${number} ${this.getTypeEmoji(type)}</div>`;

        // Reading passage varsa ekle
        if (question.passage) {
            html += `<div class="reading-passage">${this.escapeHtml(question.passage)}</div>`;
        }

        // Visual description varsa ekle
        if (question.visualDescription) {
            html += `<div class="reading-passage" style="border-left-color: var(--primary-color);">
                       <strong>📷 Görsel Açıklaması:</strong><br>
                       ${this.escapeHtml(question.visualDescription).replace(/\\n/g, '<br>')}
                     </div>`;
        }

        // Dialogue varsa ekle
        if (question.dialogue) {
            html += `<div class="reading-passage" style="border-left-color: #9c27b0;">
                       <strong>💬 Diyalog:</strong><br>
                       ${question.dialogue}
                     </div>`;
        }

        // Soru
        html += `<div class="question-text"><strong>Soru:</strong> ${this.escapeHtml(question.question)}</div>`;

        // Şıklar
        html += `<div class="options">`;
        question.options.forEach((option, idx) => {
            const letter = String.fromCharCode(65 + idx);
            const isCorrect = idx === correctIndex;
            const optionClass = isCorrect ? 'option correct' : 'option';
            html += `<div class="${optionClass}">
                       <strong>${letter})</strong> ${this.escapeHtml(option)}
                     </div>`;
        });
        html += `</div>`;

        // Doğru cevap
        html += `<div class="answer-section">
                   <div class="answer-label">✓ Doğru Cevap: ${question.correctAnswer}</div>
                 </div>`;

        // Açıklama
        if (question.explanation) {
            html += `<div class="explanation">
                       <div class="explanation-label">💡 Açıklama:</div>
                       ${this.escapeHtml(question.explanation)}
                     </div>`;
        }

        html += `</div>`;

        return html;
    }

    /**
     * Soru tipine göre emoji getir
     */
    getTypeEmoji(type) {
        const emojis = {
            reading: '📖',
            grammar: '📚',
            vocabulary: '📝',
            dialogue: '💬',
            sentence: '✍️',
            visual: '🖼️',
            mixed: '🎲'
        };
        return emojis[type] || '📄';
    }

    /**
     * HTML escape
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Soruları kopyala
     */
    async copyQuestions() {
        const text = this.questionsOutput.innerText;

        try {
            await navigator.clipboard.writeText(text);
            this.showNotification('Sorular panoya kopyalandı!', 'success');
        } catch (error) {
            // Fallback method
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            this.showNotification('Sorular kopyalandı!', 'success');
        }
    }

    /**
     * Soruları indir (JSON veya TXT)
     */
    downloadQuestions() {
        if (!this.currentQuestions) {
            this.showNotification('İndirilecek soru bulunamadı', 'error');
            return;
        }

        const questionsArray = Array.isArray(this.currentQuestions)
            ? this.currentQuestions
            : [this.currentQuestions];

        // Formatted text oluştur
        let textContent = 'LGS İNGİLİZCE SORULARI\n';
        textContent += '='.repeat(50) + '\n\n';

        questionsArray.forEach((q, index) => {
            textContent += `SORU ${index + 1}\n`;
            textContent += '-'.repeat(50) + '\n';

            if (q.passage) {
                textContent += `OKUMA PARÇASI:\n${q.passage}\n\n`;
            }

            if (q.visualDescription) {
                textContent += `GÖRSEL AÇIKLAMASI:\n${q.visualDescription}\n\n`;
            }

            if (q.dialogue) {
                textContent += `DİYALOG:\n${q.dialogue.replace(/<br>/g, '\n')}\n\n`;
            }

            textContent += `${q.question}\n\n`;

            q.options.forEach((option, idx) => {
                const letter = String.fromCharCode(65 + idx);
                textContent += `${letter}) ${option}\n`;
            });

            textContent += `\nDOĞRU CEVAP: ${q.correctAnswer}\n`;
            textContent += `\nAÇIKLAMA: ${q.explanation}\n\n`;
            textContent += '='.repeat(50) + '\n\n';
        });

        // Dosya oluştur ve indir
        const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `LGS_Sorulari_${new Date().toISOString().slice(0, 10)}.txt`;
        a.click();
        URL.revokeObjectURL(url);

        this.showNotification('Sorular indirildi!', 'success');
    }

    /**
     * Soruları yazdır
     */
    printQuestions() {
        window.print();
    }

    /**
     * Bildirim göster
     */
    showNotification(message, type = 'info') {
        // Basit alert yerine daha gelişmiş bir notification sistemi eklenebilir
        const colors = {
            success: '#0f9d58',
            error: '#db4437',
            warning: '#f4b400',
            info: '#4285f4'
        };

        // Custom notification div oluştur
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${colors[type] || colors.info};
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 10000;
            font-weight: 600;
            animation: slideIn 0.3s ease;
            max-width: 400px;
        `;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Animasyon keyframes ekle
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Sayfa yüklendiğinde uygulamayı başlat
document.addEventListener('DOMContentLoaded', () => {
    window.app = new LGSQuestionGenerator();
    console.log('LGS Soru Üretici başlatıldı!');
});
