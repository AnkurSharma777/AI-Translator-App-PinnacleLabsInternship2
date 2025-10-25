const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/mymemory', async (req, res) => {
  try {
    const { q, langpair } = req.query;
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(q)}&langpair=${langpair}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Robust LibreTranslate proxy endpoint: try local instance first, then public instances as fallback
app.post('/libre', async (req, res) => {
  try {
    const { q, source, target } = req.body;
    const endpoints = [
      'http://127.0.0.1:5002/translate',  // Local LibreTranslate instance
      'https://translate.argosopentech.com/translate',
      'https://libretranslate.de/translate'
    ];

    let lastErr = null;
    for (const endpoint of endpoints) {
      console.log(`Trying Libre endpoint: ${endpoint}`);
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          body: JSON.stringify({ q, source, target }),
          headers: { 'Content-Type': 'application/json' },
          timeout: 10000
        });

        console.log(`Response from ${endpoint}: status ${response.status}`);
        if (!response.ok) {
          const text = await response.text().catch(() => '');
          console.log(`Response text: ${text.substring(0, 200)}`);
          lastErr = new Error(`Libre endpoint ${endpoint} returned ${response.status}: ${text}`);
          continue;
        }

        const data = await response.json();
        console.log(`Data from ${endpoint}:`, data);
        // Normalize response to { translatedText }
        if (data && data.translatedText) {
          console.log(`Success from ${endpoint}`);
          return res.json({ translatedText: data.translatedText });
        }

        // Some instances return { translatedText } inside data, handle that
        if (data && data.data && data.data.translations && data.data.translations[0] && data.data.translations[0].translatedText) {
          console.log(`Success from ${endpoint} (nested)`);
          return res.json({ translatedText: data.data.translations[0].translatedText });
        }

        // Otherwise, try reading common field
        if (data && data.result) {
          console.log(`Success from ${endpoint} (result)`);
          return res.json({ translatedText: data.result });
        }

        lastErr = new Error(`Libre endpoint ${endpoint} returned unexpected JSON`);
        console.log(`Unexpected JSON from ${endpoint}:`, data);
      } catch (err) {
        console.log(`Error with ${endpoint}:`, err.message);
        lastErr = err;
        // try next endpoint
      }
    }

    res.status(502).json({ error: lastErr ? lastErr.message : 'All libre endpoints failed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('Proxy running on http://localhost:3000'));
