export const sumzContent = {
    en: {
        eyebrow: "software · next.js · ai / ml",
        pitch: "A modern web application that turns any article URL into a concise, 3–4 sentence AI summary. Instead of relying on opaque third-party scrapers or fragile client-side proxies, Sumz implements a self-hosted extraction pipeline using Mozilla's Readability and jsdom on a Next.js 16 App Router backend, summarizes clean article text using Google Gemini (gemini-2.5-flash), and is hardened with SSRF protection, robots.txt compliance, and in-memory rate limiting — a complete ground-up rebuild of my first-ever AI project from 2023.",

        featureGroups: [
            {
                label: "URL-to-Summary Pipeline",
                items: [
                    "Self-hosted article extraction: fetches raw HTML server-side and parses the main content using Mozilla's Readability (the engine behind Firefox Reader View) — zero reliance on third-party scraper endpoints",
                    "Direct Google Gemini 2.5 Flash integration via the official `@google/genai` SDK for concise, coherent summarization",
                    "Graceful, granular error surfacing: specific human-readable feedback for unreachable URLs, non-HTML responses, client-rendered JS pages, and AI rate limits",
                ],
            },
            {
                label: "Security & Guardrails",
                items: [
                    "SSRF Hardening: resolves target hostnames before fetching and immediately rejects loopback, RFC1918 private subnets, and cloud metadata endpoints (169.254.169.254)",
                    "Robots.txt Compliance: inspects target site robots.txt policies for the user agent and respects disallowed paths",
                    "In-memory rate limiting: caps requests per IP to 10 req/min on `/api/summarize` to prevent quota exhaustion and downstream abuse",
                ],
            },
            {
                label: "User Interface & Experience",
                items: [
                    "Responsive interface with smooth dark/light theme switching powered by next-themes and Lucide React icons",
                    "Typography paired with Fredoka display font, self-hosted and optimized via next/font",
                    "Local history cache: previously summarized articles persist in localStorage with one-click URL copy and instant recap",
                ],
            },
        ],

        stackGroups: [
            {
                label: "Core Framework & Build",
                items: ["Next.js 16 (App Router)", "React 19", "TypeScript"],
            },
            {
                label: "Styling & UI",
                items: ["TailwindCSS v4", "next-themes", "Lucide React", "Fredoka Font"],
            },
            {
                label: "Article Extraction & Security",
                items: [
                    "jsdom (server-side DOM parser)",
                    "@mozilla/readability (Firefox Reader View core)",
                    "Custom SSRF address validator & DNS resolver",
                    "Robots.txt parser & compliance checker",
                ],
            },
            {
                label: "AI Engine",
                items: ["Google Gemini (gemini-2.5-flash via @google/genai SDK)"],
            },
            {
                label: "Deployment & Quality",
                items: ["Vercel", "ESLint 9"],
            },
        ],

        studyTitle: "Case Study: From 2023 OpenAI Prototype to Hardened 2026 Next.js Architecture",
        story: [
            {
                label: "Origins (July 2023): First AI Project",
                body: "Sumz was originally created during my semester break in July 2023, right when OpenAI's `gpt-3.5-turbo` and the early wave of LLMs took off. It was the first time I ever incorporated AI capabilities into any software project. The original prototype was a Vite + React SPA using Redux Toolkit Query to invoke a free RapidAPI-hosted scraper endpoint that wrapped an OpenAI summarizer.",
            },
            {
                label: "The Breaking Point with Third-Party Scrapers",
                body: "Shipping API keys directly in client-side Vite bundles (`VITE_*` env vars) and depending on an unmaintained RapidAPI mirror quickly exposed major vulnerabilities. When that third-party scraping mirror went down, the entire app broke silently with no way to fix or debug the crawler without owning the extraction layer.",
            },
            {
                label: "Architectural Rebuild (September 2026 Revision)",
                body: "The 2026 rebuild tackled these flaws head-on. Moving to Next.js 16 App Router enabled server-side route handlers (`/api/summarize`), keeping API credentials strictly server-side. Transitioning to Google Gemini's free tier via `@google/genai` ensured reliable, high-speed LLM generation without subscription bottlenecks.",
            },
            {
                label: "Extraction-First vs. Asking the Model Directly",
                body: "While modern LLMs can browse URLs directly, doing so is an opaque black box with zero control over paywalls, cookie prompts, or navigation overhead leaking into prompts. By combining `jsdom` with `@mozilla/readability` (the algorithm powering Firefox Reader View), Sumz parses raw HTML into clean article text before Gemini ever sees it — keeping the pipeline deterministic, inspectable, and model-agnostic.",
            },
            {
                label: "Defensive Security: SSRF & Robots.txt",
                body: "Allowing users to submit arbitrary URLs to a server-side fetcher introduces severe Server-Side Request Forgery (SSRF) vulnerabilities. Sumz resolves DNS records prior to fetching, explicitly disallowing private IP ranges (RFC1918) and cloud instance metadata addresses (`169.254.169.254`). It also respects `robots.txt` crawler policies before initiating fetches.",
            },
        ],

        notes: [
            {
                title: "Client-Side Rendered SPAs (No Headless Browser)",
                body: "Extraction is performed via plain server-side HTTP `fetch`. Single-page applications (SPAs) that require client-side JavaScript execution to render article text will return empty content. Fully parsing those requires a headless browser fallback (e.g. Playwright), which was intentionally excluded to keep the serverless footprint lightweight.",
            },
            {
                title: "In-Memory Rate Limiting Scope",
                body: "The 10 requests/minute per IP rate limiter operates in server process memory. On isolated serverless instances (such as Vercel Functions), state is not globally shared across concurrent instances. A distributed datastore (like Upstash Redis) would be required for strict global rate capping.",
            },
            {
                title: "DNS Rebinding Window",
                body: "While hostnames are resolved and validated before fetching, standard `fetch()` performs an independent DNS resolution during connection. Mitigating the theoretical DNS rebinding window completely requires a custom HTTP dispatcher pinning the validated IP address.",
            },
            {
                title: "Bot-Protected Shorteners & Paywalls",
                body: "URL shorteners fronted by aggressive bot detection (e.g., TinyURL returning 403) and hard paywalls cannot be scraped without browser emulation or authenticated sessions.",
            },
        ],

        screenshotAlts: {
            "sumz-home-dark": "Sumz home screen in dark mode with URL input field and theme switcher",
            "sumz-home-light": "Sumz home screen in light mode with gradient accent background",
            "sumz-summary-result": "Article summary result for a Wikipedia page with recent search history",
            "sumz-history-list": "Persistent search history displaying multiple previously summarized articles",
        },
    },

    id: {
        eyebrow: "perangkat lunak · next.js · ai / ml",
        pitch: "Aplikasi *web* modern yang merangkum artikel panjang dari URL menjadi ringkasan 3–4 kalimat berbasis AI yang padat dan informatif. Alih-alih bergantung pada *scraper* pihak ketiga atau *proxy* sisi klien yang rapuh, Sumz mengimplementasikan alur ekstraksi mandiri berbasis Mozilla Readability dan jsdom pada *backend* Next.js 16 *App Router*, merangkum teks artikel bersih dengan Google Gemini (gemini-2.5-flash), serta diperkuat dengan proteksi SSRF, kepatuhan *robots.txt*, dan pembatasan laju pemanggilan (*rate limiting*) — dibangun ulang secara menyeluruh dari proyek AI pertama saya tahun 2023.",

        featureGroups: [
            {
                label: "Alur Perangkuman URL ke AI",
                items: [
                    "Ekstraksi artikel mandiri: mengunduh HTML mentah di sisi server dan menguraikan konten utama menggunakan Mozilla Readability (mesin di balik *Firefox Reader View*) — tanpa ketergantungan pada API *scraper* pihak ketiga",
                    "Integrasi langsung Google Gemini 2.5 Flash via SDK resmi `@google/genai` untuk menghasilkan ringkasan yang ringkas dan runtut",
                    "Penanganan pesan kesalahan yang jelas: memberikan umpan balik spesifik untuk URL yang tidak dapat diakses, respons *non-HTML*, halaman yang dirender via *client-side JavaScript*, dan batas kuota (*rate limit*) AI",
                ],
            },
            {
                label: "Keamanan & Pembatasan Akses",
                items: [
                    "Proteksi SSRF (*Server-Side Request Forgery*): memvalidasi resolusi DNS *hostname* target sebelum mengunduh dan secara tegas menolak alamat *loopback*, *subnet* privat RFC1918, dan *endpoint* metadata *cloud* (169.254.169.254)",
                    "Kepatuhan *Robots.txt*: memeriksa aturan *robots.txt* situs target untuk *user agent* sebelum melakukan ekstraksi",
                    "Pembatasan laju pemanggilan (*Rate Limiting*): membatasi 10 permintaan/menit per IP pada rute `/api/summarize` guna melindungi kuota Gemini dan mencegah penyalahgunaan",
                ],
            },
            {
                label: "Antarmuka & Pengalaman Pengguna",
                items: [
                    "Tampilan responsif dengan dukungan tema terang/gelap yang mulus menggunakan next-themes dan ikon Lucide React",
                    "Tipografi dinamis dengan *font* Fredoka yang dioptimalkan langsung via `next/font`",
                    "Riwayat lokal persisten: artikel yang telah dirangkum tersimpan di `localStorage` dengan fitur salin URL satu klik",
                ],
            },
        ],

        stackGroups: [
            {
                label: "Kerangka Utama & Lingkungan Eksekusi",
                items: ["Next.js 16 (App Router)", "React 19", "TypeScript"],
            },
            {
                label: "Tampilan & Gaya",
                items: ["TailwindCSS v4", "next-themes", "Lucide React", "Fredoka Font"],
            },
            {
                label: "Ekstraksi Artikel & Keamanan",
                items: [
                    "jsdom (parser DOM sisi server)",
                    "@mozilla/readability (mesin Firefox Reader View)",
                    "Validator alamat IP & SSRF kustom",
                    "Parser kepatuhan Robots.txt",
                ],
            },
            {
                label: "Mesin Kecerdasan Buatan (AI)",
                items: ["Google Gemini (gemini-2.5-flash via @google/genai SDK)"],
            },
            {
                label: "Deployment & Kualitas Kode",
                items: ["Vercel", "ESLint 9"],
            },
        ],

        studyTitle: "Sorotan Teknis: Dari Prototipe OpenAI 2023 ke Arsitektur Next.js 2026 yang Tangguh",
        story: [
            {
                label: "Awal Mula (Juli 2023): Proyek AI Pertama",
                body: "Sumz pertama kali dibuat pada liburan semester di bulan Juli 2023, tepat saat API `gpt-3.5-turbo` milik OpenAI dan gelombang awal LLM mulai diperkenalkan ke publik. Ini merupakan proyek pertama dalam perjalanan pemrograman saya yang memanfaatkan kecerdasan buatan. Versi awal tersebut adalah aplikasi SPA (*single-page application*) berbasis Vite + React dengan Redux Toolkit Query yang memanggil *endpoint scraper* RapidAPI pembungkus model OpenAI.",
            },
            {
                label: "Kelemahan Scraper Pihak Ketiga",
                body: "Menyertakan *API key* langsung pada berkas klien Vite (`VITE_*`) serta bergantung pada *scraper* gratis RapidAPI menimbulkan celah keamanan dan kerentanan stabilitas. Ketika server *mirror* pihak ketiga tersebut mati, aplikasi berhenti berfungsi total tanpa kemampuan untuk memperbaiki atau mengontrol proses *crawler* di balik layar.",
            },
            {
                label: "Pembangunan Ulang Arsitektur (Revisi September 2026)",
                body: "Revisi 2026 dibangun untuk mengatasi seluruh kelemahan tersebut dari fondasi. Migrasi ke Next.js 16 *App Router* memungkinkan pemrosesan *route handler* di sisi server (`/api/summarize`), mengamankan *API key* sepenuhnya. Integrasi ke Google Gemini (*tier* gratis) via `@google/genai` menghadirkan performa inferensi yang cepat dan andal.",
            },
            {
                label: "Filosofi Ekstraksi Mandiri vs. Penelusuran Model Mentah",
                body: "Meskipun beberapa LLM modern dapat menelusuri URL secara langsung, alur tersebut bersifat tertutup dan rentan memasukkan elemen *cookie banner*, *paywall*, atau kode *markup* berlebih ke dalam *prompt*. Menggabungkan `jsdom` dengan `@mozilla/readability` (algoritma di balik *Firefox Reader View*) memungkinkan Sumz menyaring teks artikel inti terlebih dahulu sebelum diteruskan ke Gemini — menjaga alur tetap terukur, transparan, dan independen dari model.",
            },
            {
                label: "Lapisan Keamanan Defensif: SSRF & Robots.txt",
                body: "Memberikan kebebasan input URL dari pengguna pada fungsi *fetch* server membuka risiko *Server-Side Request Forgery* (SSRF). Sumz memeriksa resolusi DNS target sebelum melakukan unduhan, memblokir alamat IP privat (RFC1918) dan *endpoint metadata cloud* (`169.254.169.254`), serta mematuhi batasan perayapan pada berkas `robots.txt`.",
            },
        ],

        notes: [
            {
                title: "Keterbatasan Situs Render Klien (SPA Tanpa Headless Browser)",
                body: "Ekstraksi artikel mengandalkan fungsi HTTP *fetch* standar di server. Situs SPA yang membutuhkan eksekusi JavaScript browser untuk menampilkan isi teks tidak akan mengembalikan artikel lengkap. Dukungan penuh untuk kasus tersebut memerlukan *headless browser* (seperti Playwright), yang sengaja ditiadakan demi menjaga efisiensi lingkungan *serverless*.",
            },
            {
                title: "Cakupan Rate Limiting Berbasis Memori",
                body: "Pembatasan 10 permintaan/menit per IP disimpan dalam memori proses server lokal (*in-memory*). Pada lingkungan *serverless* terdistribusi (seperti Vercel Functions), status memori tidak dibagikan antar-instansi aktif. Diperlukan penyimpanan terpusat (seperti Upstash Redis) untuk pembatasan kuota global yang ketat.",
            },
            {
                title: "Celah Teoretis DNS Rebinding",
                body: "Meskipun *hostname* divalidasi sebelum diunduh, pemanggilan `fetch()` standar melakukan resolusi DNS kedua saat membuat koneksi TCP. Menutup celah *DNS rebinding* secara mutlak memerlukan *dispatcher* HTTP kustom yang mengunci alamat IP tervalidasi.",
            },
            {
                title: "Pemendek URL dengan Proteksi Bot & Paywall",
                body: "Layanan pemendek URL dengan proteksi *bot* ketat (seperti TinyURL yang mengembalikan kode 403) dan artikel berbayar (*paywall*) tidak dapat diekstrak tanpa sesi otentikasi *browser* penuh.",
            },
        ],

        screenshotAlts: {
            "sumz-home-dark": "Layar utama Sumz dalam tema gelap dengan kolom input URL dan tombol pengganti tema",
            "sumz-home-light": "Layar utama Sumz dalam tema terang dengan latar belakang gradien halus",
            "sumz-summary-result": "Hasil ringkasan artikel pada halaman Wikipedia beserta riwayat pencarian terbaru",
            "sumz-history-list": "Daftar riwayat pencarian persisten yang menampilkan beberapa artikel yang telah dirangkum",
        },
    },
} as const;

export const sumzScreenshotOrder = [
    "sumz-home-dark",
    "sumz-home-light",
    "sumz-summary-result",
    "sumz-history-list",
] as const;
