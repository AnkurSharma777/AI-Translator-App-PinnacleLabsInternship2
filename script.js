// Check for browser support
if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    alert('Your browser does not support speech recognition. Please use a modern browser like Chrome or Edge.');
}

if (!('speechSynthesis' in window)) {
    alert('Your browser does not support speech synthesis. Please use a modern browser like Chrome or Edge.');
}

// Initialize speech recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = false;
recognition.interimResults = false;
recognition.lang = 'en-US'; // Default language

// DOM elements
const inputText = document.getElementById('input-text');
const outputText = document.getElementById('output-text');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const translateBtn = document.getElementById('translate-btn');
const speakBtn = document.getElementById('speak-btn');
const switchBtn = document.getElementById('switch-btn');
const sourceLang = document.getElementById('source-lang');
const targetLang = document.getElementById('target-lang');

// Speech recognition event listeners
recognition.onstart = () => {
    startBtn.disabled = true;
    stopBtn.disabled = false;
    startBtn.textContent = '🎤 Listening...';
};

recognition.onend = () => {
    startBtn.disabled = false;
    stopBtn.disabled = true;
    startBtn.textContent = '🎤 Start Voice Input';
};

recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    inputText.value = transcript;
};

// Curated phrase map for common phrases (en to multiple languages)
const phraseMap = {
    'hi': {
        'good morning': 'सुप्रभात',
        'thank you': 'धन्यवाद',
        'how are you': 'आप कैसे हैं',
        'see you later': 'फिर मिलेंगे',
        'i love you': 'मैं तुमसे प्यार करता हूँ',
        'good night': 'शुभ रात्रि',
        'excuse me': 'क्षमा करें',
        'hello': 'नमस्ते',
        'goodbye': 'अलविदा',
        'please': 'कृपया',
        'sorry': 'माफ़ कीजिए',
        'yes': 'हाँ',
        'no': 'नहीं',
        'what is your name': 'आपका नाम क्या है',
        'where are you from': 'आप कहाँ से हैं'
    },
    'bn': {
        'good morning': 'শুভ প্রভাত',
        'thank you': 'ধন্যবাদ',
        'how are you': 'সুপ্রভাত',
        'see you later': 'পরে দেখা হবে',
        'i love you': 'bangla bf',
        'good night': 'শুভরাত্রি',
        'excuse me': 'সত্যি যদি আমাকে পাঠান',
        'hello': 'অলহ্বা',
        'goodbye': 'বিদায়'
    },
    'ta': {
        'see you later': 'velaiku poganum',
        'i love you': 'i love',
        'good night': 'இரவு வணக்கம்',
        'excuse me': 'yenna pode'
    },
    'es': {
        'good morning': 'buenos días',
        'thank you': 'gracias',
        'how are you': 'cómo estás',
        'see you later': 'hasta luego',
        'i love you': 'te amo',
        'good night': 'buenas noches',
        'excuse me': 'disculpe',
        'hello': 'hola',
        'goodbye': 'adiós',
        'please': 'por favor',
        'sorry': 'lo siento',
        'yes': 'sí',
        'no': 'no',
        'what is your name': '¿cuál es tu nombre?',
        'where are you from': '¿de dónde eres?'
    },
    'fr': {
        'good morning': 'bonjour',
        'thank you': 'merci',
        'how are you': 'comment allez-vous',
        'see you later': 'à plus tard',
        'i love you': 'je t\'aime',
        'good night': 'bonne nuit',
        'excuse me': 'excusez-moi',
        'hello': 'bonjour',
        'goodbye': 'au revoir',
        'please': 's\'il vous plaît',
        'sorry': 'désolé',
        'yes': 'oui',
        'no': 'non',
        'what is your name': 'quel est votre nom',
        'where are you from': 'd\'où venez-vous'
    },
    'de': {
        'good morning': 'guten morgen',
        'thank you': 'danke',
        'how are you': 'wie geht es dir',
        'see you later': 'bis später',
        'i love you': 'ich liebe dich',
        'good night': 'gute nacht',
        'excuse me': 'entschuldigung',
        'hello': 'hallo',
        'goodbye': 'auf wiedersehen',
        'please': 'bitte',
        'sorry': 'entschuldigung',
        'yes': 'ja',
        'no': 'nein',
        'what is your name': 'wie heißt du',
        'where are you from': 'woher kommst du'
    },
    'it': {
        'good morning': 'buongiorno',
        'thank you': 'grazie',
        'how are you': 'come stai',
        'see you later': 'ci vediamo dopo',
        'i love you': 'ti amo',
        'good night': 'buona notte',
        'excuse me': 'scusa',
        'hello': 'ciao',
        'goodbye': 'arrivederci',
        'please': 'per favore',
        'sorry': 'mi dispiace',
        'yes': 'sì',
        'no': 'no',
        'what is your name': 'come ti chiami',
        'where are you from': 'da dove vieni'
    },
    'pt': {
        'good morning': 'bom dia',
        'thank you': 'obrigado',
        'how are you': 'como você está',
        'see you later': 'até logo',
        'i love you': 'eu te amo',
        'good night': 'boa noite',
        'excuse me': 'desculpe',
        'hello': 'olá',
        'goodbye': 'adeus',
        'please': 'por favor',
        'sorry': 'desculpe',
        'yes': 'sim',
        'no': 'não',
        'what is your name': 'qual é o seu nome',
        'where are you from': 'de onde você é'
    },
    'ru': {
        'good morning': 'доброе утро',
        'thank you': 'спасибо',
        'how are you': 'как дела',
        'see you later': 'до свидания',
        'i love you': 'я люблю тебя',
        'good night': 'спокойной ночи',
        'excuse me': 'извините',
        'hello': 'привет',
        'goodbye': 'до свидания',
        'please': 'пожалуйста',
        'sorry': 'извините',
        'yes': 'да',
        'no': 'нет',
        'what is your name': 'как тебя зовут',
        'where are you from': 'откуда ты'
    },
    'ja': {
        'good morning': 'おはようございます',
        'thank you': 'ありがとう',
        'how are you': 'お元気ですか',
        'see you later': 'また後で',
        'i love you': '愛してる',
        'good night': 'おやすみなさい',
        'excuse me': 'すみません',
        'hello': 'こんにちは',
        'goodbye': 'さようなら',
        'please': 'お願いします',
        'sorry': 'ごめんなさい',
        'yes': 'はい',
        'no': 'いいえ',
        'what is your name': 'お名前は何ですか',
        'where are you from': 'どちらから来ましたか'
    },
    'ko': {
        'good morning': '좋은 아침이에요',
        'thank you': '감사합니다',
        'how are you': '어떻게 지내세요',
        'see you later': '나중에 봐요',
        'i love you': '사랑해요',
        'good night': '안녕히 주무세요',
        'excuse me': '실례합니다',
        'hello': '안녕하세요',
        'goodbye': '안녕히 가세요',
        'please': '부탁합니다',
        'sorry': '미안합니다',
        'yes': '네',
        'no': '아니요',
        'what is your name': '이름이 뭐예요',
        'where are you from': '어디에서 왔어요'
    },
    'zh': {
        'good morning': '早上好',
        'thank you': '谢谢',
        'how are you': '你好吗',
        'see you later': '再见',
        'i love you': '我爱你',
        'good night': '晚安',
        'excuse me': '对不起',
        'hello': '你好',
        'goodbye': '再见',
        'please': '请',
        'sorry': '对不起',
        'yes': '是的',
        'no': '不',
        'what is your name': '你叫什么名字',
        'where are you from': '你从哪里来'
    }
};

// AI-powered translation using LibreTranslate API
async function translateText(text, from, to) {
    if (!text.trim()) {
        return 'Please enter text to translate.';
    }

    // Convert language codes to match LibreTranslate format (e.g., 'en-US' -> 'en')
    from = from.split('-')[0];
    to = to.split('-')[0];

    // Check curated phrase map first for exact matches
    const lowerText = text.toLowerCase().trim();
    if (phraseMap[to] && phraseMap[to][lowerText]) {
        return phraseMap[to][lowerText];
    }

    const API_URL = 'https://api.mymemory.translated.net/get';
    
    try {
        console.log('Calling translation API...', {
            text: text.trim(),
            from,
            to
        });

        // Using local proxy to avoid CORS issues and pick best translation
        const proxyUrl = `http://localhost:3000/mymemory?q=${encodeURIComponent(text.trim())}&langpair=${from}|${to}`;
        const response = await fetch(proxyUrl);

        console.log('Proxy response status:', response.status);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('MyMemory (via proxy) response:', data);

        // Helper to pick best from MyMemory matches
        const pickFromMatches = (matches) => {
            if (!matches || !matches.length) return null;
            const devanagariRegex = /[\u0900-\u097F]/;
            const scored = matches.map(m => {
                const t = (m.translation || '').trim();
                const wordCount = t.split(/\s+/).filter(Boolean).length;
                const hasGreetingPrefix = /\bसभी\b|\bसब\b|\bआप सभी\b/.test(t);
                const quality = parseFloat(m.quality) || (m.match ? m.match * 100 : 0);
                const score = (100 - wordCount * 10) + quality - (hasGreetingPrefix ? 30 : 0);
                return { t, score, devanagari: devanagariRegex.test(t) };
            }).sort((a,b) => b.score - a.score);

            // Prefer Devanagari candidate
            const d = scored.find(s => s.devanagari);
            if (d) return d.t.split(/[।.!?]/)[0].trim();
            // else return top short candidate
            const top = scored.find(s => s.t && s.t.split(/\s+/).length <= 4);
            if (top) return top.t.split(/[।.!?]/)[0].trim();
            return scored[0] ? scored[0].t.split(/[।.!?]/)[0].trim() : null;
        };

        let mymemoryChoice = null;
        if (data && data.matches) {
            mymemoryChoice = pickFromMatches(data.matches);
        }
        // fallback to responseData
        if (!mymemoryChoice && data.responseData && data.responseData.translatedText) {
            mymemoryChoice = data.responseData.translatedText.split(/[।.!?]/)[0].trim();
        }

        // If MyMemory produced a good Devanagari result, use it. Otherwise call Libre for a safer translation.
        const devanagariRegex = /[\u0900-\u097F]/;
        if (mymemoryChoice && devanagariRegex.test(mymemoryChoice)) {
            return mymemoryChoice;
        }

        // Call Libre fallback via proxy
        try {
            const libreResp = await fetch('http://localhost:3000/libre', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ q: text.trim(), source: from, target: to })
            });
            if (libreResp.ok) {
                const libreData = await libreResp.json();
                if (libreData && libreData.translatedText) {
                    const libreText = libreData.translatedText.trim();
                    // If Libre returns Devanagari, prefer it
                    if (devanagariRegex.test(libreText)) return libreText.split(/[।.!?]/)[0].trim();
                    // else if MyMemoryChoice exists, prefer it
                    if (mymemoryChoice) return mymemoryChoice;
                    return libreText.split(/[।.!?]/)[0].trim();
                }
            } else {
                console.warn('Libre fallback error', await libreResp.text().catch(()=>''));
            }
        } catch (e) {
            console.warn('Libre call failed:', e.message);
        }

        // final fallback
        if (mymemoryChoice) return mymemoryChoice;

        throw new Error('No suitable translation found');
    } catch (error) {
        console.error('Translation error:', error);

        if (!window.navigator.onLine) {
            return 'No internet connection. Please check your connection and try again.';
        }

        // Specific error messages based on common scenarios
        if (error.message.includes('Daily translation limit exceeded')) {
            return 'Daily translation limit reached. Please try again tomorrow.';
        }
        if (error.message.includes('429')) {
            return 'Too many requests. Please wait a moment and try again.';
        }
        if (error.message.includes('403')) {
            return 'Service temporarily unavailable. Please try again in a few minutes.';
        }
        if (error.message.includes('404')) {
            return 'Translation service not found. Please try again later.';
        }

        // Generic error with more helpful message
        return 'Translation service is experiencing issues. Please try again in a few moments.';
    }
}

// Speech synthesis function with improved language support
function speakText(text, lang) {
    if (!text.trim()) {
        alert('No translated text to speak.');
        return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    utterance.pitch = 1;
    utterance.volume = 1;

    // Map language codes to speech synthesis voices
    const langMap = {
        'en': ['en-US', 'en-GB'],
        'es': ['es-ES', 'es-US'],
        'fr': ['fr-FR'],
        'de': ['de-DE'],
        'hi': ['hi-IN'],
        'bn': ['bn-IN'],
        'te': ['te-IN'],
        'ru': ['ru-RU'],
        'ja': ['ja-JP'],
        'ko': ['ko-KR'],
        'zh': ['zh-CN', 'zh-TW']
    };

    const voices = speechSynthesis.getVoices();
    const preferredVoices = langMap[lang] || [lang];

    for (const prefLang of preferredVoices) {
        const voice = voices.find(v => v.lang.startsWith(prefLang));
        if (voice) {
            utterance.voice = voice;
            break;
        }
    }

    speechSynthesis.speak(utterance);
}

// Language switch functionality
function switchLanguages() {
    const tempLang = sourceLang.value;
    const tempText = inputText.value;

    sourceLang.value = targetLang.value;
    targetLang.value = tempLang;

    inputText.value = outputText.textContent;
    outputText.textContent = tempText;

    // Update speech recognition language
    recognition.lang = sourceLang.value + '-US';
}

// Event listeners
startBtn.addEventListener('click', () => {
    recognition.lang = sourceLang.value + '-US';
    recognition.start();
});

stopBtn.addEventListener('click', () => {
    recognition.stop();
});

translateBtn.addEventListener('click', async () => {
    const text = inputText.value.trim();
    if (!text) {
        alert('Please enter some text to translate.');
        return;
    }

    translateBtn.disabled = true;
    translateBtn.textContent = '🔄 Translating...';

    try {
        const translated = await translateText(text, sourceLang.value, targetLang.value);
        outputText.textContent = translated;
        console.log('Translation completed successfully');
    } catch (error) {
        console.error('Translation error:', error);
        outputText.textContent = 'Translation failed. Please try again.';
    } finally {
        translateBtn.disabled = false;
        translateBtn.textContent = '🔄 Translate';
    }
});

speakBtn.addEventListener('click', () => {
    const text = outputText.textContent.trim();
    speakText(text, targetLang.value);
});

switchBtn.addEventListener('click', switchLanguages);

// Load voices when available
speechSynthesis.onvoiceschanged = () => {
    console.log('Voices loaded:', speechSynthesis.getVoices().length);
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('Translator App initialized');
});
