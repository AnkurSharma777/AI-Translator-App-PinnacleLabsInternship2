# Translator Proxy

This small proxy avoids CORS issues when calling MyMemory (or other) translation APIs from the browser.

Install dependencies and run:

```bash
cd proxy
npm install
node proxy.js
```

The proxy will listen on http://localhost:3000 and expose a simple endpoint:
GET /mymemory?q=...&langpair=en|hi

Use it while running the frontend on http://localhost:8080
