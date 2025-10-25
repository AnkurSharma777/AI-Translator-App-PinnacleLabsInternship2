# AI Translator App

This project is an AI-powered Translator application developed using HTML, CSS, and JavaScript. It aims to provide real-time translation services, breaking language barriers and promoting global communication and understanding.

## Project Structure

The project is organized as follows:

```
translator-app/
├── index.html              # Main HTML structure for the web application
├── styles.css              # CSS styles for the web application
├── script.js               # JavaScript logic for translation and speech features
├── TODO.md                 # Development tasks and progress tracking
├── proxy/                  # Proxy server to handle API requests and avoid CORS issues
│   ├── proxy.js            # Node.js proxy server
│   ├── package.json        # Node.js dependencies
│   ├── README.md           # Proxy documentation
│   └── ...                 # Additional proxy files
└── README.md               # This documentation file
```

## Features

- **Real-time Translation**: Translate text between multiple languages instantly using AI-powered APIs
- **Voice Input**: Speak directly into the app for hands-free translation using Web Speech API
- **Voice Output**: Listen to translated text in natural speech using Web Speech Synthesis API
- **Language Support**: Supports 20+ languages including Indian languages (Hindi, Bengali, Telugu, etc.) and major foreign languages
- **Phrase Map**: Curated translations for common phrases for better accuracy
- **Language Switching**: Easily swap source and target languages
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean, gradient-based design with smooth animations

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Translation APIs**: MyMemory Translation API and LibreTranslate API (via proxy)
- **Speech Recognition**: Web Speech API
- **Speech Synthesis**: Web Speech Synthesis API
- **Proxy Server**: Node.js with Express for handling CORS and API requests
- **Styling**: Custom CSS with gradients, animations, and responsive design

## Supported Languages

- **Indian Languages**: Hindi, Bengali, Telugu, Marathi, Tamil, Urdu, Gujarati, Kannada, Punjabi, Malayalam, Assamese
- **European Languages**: English, Spanish, French, German, Italian, Portuguese, Russian
- **Asian Languages**: Japanese, Korean, Chinese

## Setup Instructions

### Prerequisites

- Modern web browser (Chrome, Edge, Firefox recommended)
- Node.js (for running the proxy server)
- Internet connection for translation services

### Installation

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd translator-app
   ```

2. **Set up the Proxy Server**
   ```bash
   cd proxy
   npm install
   node proxy.js
   ```
   The proxy server will run on `http://localhost:3000`

3. **Run the Application**
   - Open `index.html` in your web browser, or
   - Use a local server (e.g., `python -m http.server 8080`) and navigate to `http://localhost:8080`

## Usage Guidelines

1. **Text Translation**:
   - Select source and target languages from the dropdowns
   - Type or paste text in the input area
   - Click "Translate" to get the translation

2. **Voice Translation**:
   - Select the source language
   - Click "🎤 Start Voice" and speak clearly
   - The spoken text will appear in the input area
   - Click "Translate" to get the translation

3. **Listen to Translation**:
   - After translation, click "🔊 Speak Translation" to hear the result

4. **Language Switching**:
   - Use the "⇅" button to swap source and target languages

## Browser Compatibility

- **Chrome/Edge**: Full support (recommended)
- **Firefox**: Partial support (speech synthesis may vary)
- **Safari**: Limited support (speech recognition not supported)

## API Usage

This app uses:
- **MyMemory Translation API**: Free, no API key required
- **LibreTranslate API**: Open-source translation service
- **Proxy Server**: Handles CORS issues and provides fallback translation options

## Overview of Functionality

The AI Translator App utilizes modern web APIs and translation services to provide:

- **Speech Recognition**: Captures voice input and converts to text
- **AI Translation**: Uses multiple translation APIs with intelligent fallback
- **Phrase Optimization**: Curated translations for common phrases
- **Speech Synthesis**: Natural voice output for translations
- **Language Detection**: Automatic language handling and voice selection

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any enhancements or bug fixes.

## Future Enhancements

- Add more languages and dialects
- Implement offline translation capabilities
- Add text-to-speech language detection
- Integrate with more advanced AI translation models
- Add history of translations
- Support for file translation (PDF, DOC, etc.)
- Real-time conversation mode

## License

This project is open source and available under the MIT License.
