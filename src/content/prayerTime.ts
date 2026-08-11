export const prayerTimeContent = {
    en: {
        pitch: "A fully offline-first prayer companion built with React Native and Expo — no backend, everything computed on-device or bundled as static data. Custom astronomical prayer-time calculations, offline GPS-to-timezone resolution, a Quran reader with tajweed recitation-rule data verified across all 6,236 verses, an Adhkar toolkit, and background-aware notification scheduling — all persisted locally, with bilingual (English/Indonesian) and full light/dark support.",

        featureGroups: [
            {
                label: "Prayer Times",
                items: [
                    "Custom astronomical calculation — multiple methods, Asr madhab, high-latitude handling",
                    "GPS or manual location, offline country/timezone resolution",
                    "Next-prayer countdown, Hijri date, weekly/monthly schedule, Qibla compass",
                    "Prayer streak tracking + Ramadan fasting checklist, shown only while Ramadan is underway",
                ],
            },
            {
                label: "Quran",
                items: [
                    "Full text in Arabic, English, Indonesian, plus transliteration — by Surah or by Juz, with search",
                    "Bookmarks with optional per-verse notes, continue-reading position tracking",
                    "Adjustable Arabic font size, sticky surah headers",
                    "Tajweed coloring — built and data-verified, currently gated off pending a performance fix (see case study)",
                ],
            },
            {
                label: "Adhkar",
                items: [
                    "Asma ul Husna (99 Names) — searchable, Arabic + transliteration + English + Indonesian, merged from two sources and cross-checked at 9 points",
                    "Tasbih counter — per-phrase persistent counts, selectable targets, vibration on completion",
                    "Duas & Dhikr — data built (108 duas, 67 dhikr entries) but withheld pending an English source",
                ],
            },
            {
                label: "Settings & Onboarding",
                items: [
                    "Theme (light/dark/system) + 5 accent colors, calculation method, Asr madhab, high-latitude rule",
                    "Bundled Adhan audio per-prayer (Doha, Qatar recordings, public domain), with per-prayer preview",
                    "First-launch language picker matching system language automatically, re-triggerable anytime",
                ],
            },
        ],

        stackGroups: [
            {
                label: "Core",
                items: [
                    "Expo (managed → EAS dev build)",
                    "React Native",
                    "TypeScript",
                ],
            },
            {
                label: "Prayer calculation",
                items: [
                    "Custom AdvancedPrayerCalculator — own implementation of the astronomical methodology, not a third-party library",
                    "Multiple calculation methods, Asr madhab (Standard/Hanafi), high-latitude edge cases",
                ],
            },
            {
                label: "Location",
                items: [
                    "expo-location for GPS",
                    "Fully offline reverse-geocoding — custom country-boundary lookup + timezone resolution, no network call required",
                ],
            },
            {
                label: "Notifications",
                items: [
                    "expo-notifications for local scheduling, staged 30/15/5-minute reminders",
                    "expo-task-manager + expo-background-task for background-refreshed multi-day scheduling",
                ],
            },
            {
                label: "Quran data & rendering",
                items: [
                    "Text/translations from quran-json / Tanzil and quran-meta (Arabic Uthmani, English, Indonesian, transliteration)",
                    "Tajweed rule data from AlQuranCloud, independently verified rule-by-rule, parser validated against all 6,236 verses",
                    "react-native-webview for correct Arabic letter-shaping across colored spans — see case study below",
                ],
            },
            {
                label: "Storage & state",
                items: [
                    "AsyncStorage throughout — settings, bookmarks, prayer/Ramadan logs, tasbih counts, language preference",
                    "Hand-rolled navigation — bottom tab bar + local component state, no React Navigation",
                ],
            },
            {
                label: "i18n & type",
                items: [
                    "Small custom translation dictionary + context (not i18next)",
                    "expo-localization for system-language detection on first launch",
                    "Amiri Quran (SIL Open Font License) for Arabic typography",
                ],
            },
        ],

        studyTitle: "Case Study: Tajweed Rendering vs. Performance",
        story: [
            {
                label: "Problem",
                body: "Tajweed rules are shown as colored spans within Arabic text — specific letters or letter groups get a distinct color depending on which pronunciation rule applies. The obvious approach, native `<Text>` with nested colored child spans, breaks Arabic rendering: splitting one cursive word's letters across multiple styled `<Text>` nodes breaks the shaping engine's letter joining. Confirmed on-device — words visibly ran together or overlapped at every color boundary. This is upstream of layout entirely; glyph shaping happens before layout even starts, so no amount of spacing/margin tweaking fixes it.",
            },
            {
                label: "Correctness fix",
                body: "A browser engine shapes Arabic correctly across styled `<span>` boundaries — exactly what HTML/CSS is built for. Tajweed-colored verses were moved to render through a `react-native-webview` instead of native text, generating HTML with the color rules applied as span styling. This fixed the correctness problem outright: the 17 tajweed rules were each independently cross-verified against a separate tagging source, and the parser was validated against all 6,236 verses with zero errors.",
            },
            {
                label: "Performance regression",
                body: "Correct rendering came with a real cost: each verse became a full WebView instance, and mounting one re-parses the embedded font. A clean A/B test (same surah, same scroll depth, tajweed on vs. off) confirmed the lag was real and specific to tajweed mode, not a general scrolling issue.",
            },
            {
                label: "Mitigations attempted",
                body: "Two fixes were tried. First, resolving the font to a real file path via `expo-asset` instead of embedding it as base64 in every verse's HTML, on the bet that the WebView engine would cache parsed font data by path across page loads — tested on the actual dev build, not just in theory. That didn't resolve it. Second, list virtualization (FlashList) was investigated and ruled out on inspection — it targets list recycling, but the cost here sits inside the WebView engine's own font parsing, a layer FlashList has no influence over.",
            },
            {
                label: "Decision",
                body: "Rather than ship a feature that's technically correct but feels broken to use, tajweed coloring is currently disabled behind a single feature flag (`TAJWEED_FEATURE_ENABLED`) — the toggle and legend buttons are hidden, and the WebView path is forced off regardless of any saved preference. Nothing about the underlying work was thrown away: the verified rule data, the parser, and the rendering pipeline are fully intact, so re-enabling it later is flipping one constant back, not rebuilding a feature. The likely real fix — batching multiple verses into fewer WebView instances instead of one per verse — is a genuine layout redesign, not a quick patch, so it's queued rather than rushed.",
            },
        ],

        notes: [
            {
                title: "Background notifications, honestly scoped",
                body: "Multi-day notifications rely on OS-level background scheduling (`expo-task-manager` + `expo-background-task`) rather than a server push. Both iOS and Android impose real limits on background execution — iOS's BGTaskScheduler is opportunistic with no fixed-time guarantee, and Android OEM battery managers can silently block it. The scheduler books 3 days ahead on every successful run specifically to tolerate missed executions, but that reduces the risk rather than eliminating it.",
            },
            {
                title: "Adhan audio auto-play is app-open only",
                body: "Per-prayer Adhan recordings are bundled and previewable in Settings, but auto-playing the full Adhan through a background notification isn't possible without deeper native audio session work beyond a standard Expo dev build — stated plainly rather than implied to work silently in the background.",
            },
            {
                title: "Translation coverage is partial",
                body: "The bilingual infrastructure (context, dictionary, persisted preference) is fully built, but only the navigation bar and onboarding screens are wired up to it so far — the rest of the app is still English-only text regardless of language setting. Expanding coverage is a matter of adding dictionary keys screen by screen, not a design change.",
            },
            {
                title: "Duas & Dhikr is built but withheld",
                body: "108 duas and 67 dhikr entries are fully curated in Arabic and Indonesian, but the feature isn't shipped — there's no verified matching English source yet, and an Indonesian-only version wasn't shipped silently on purpose.",
            },
            {
                title: "Tab switches reset local screen state",
                body: "Only the active bottom tab is mounted at a time, so switching tabs and back resets that tab's scroll position and any local UI state. A known, accepted tradeoff of the navigation approach rather than an oversight.",
            },
        ],

        screenshotAlts: {
            "prayer-times-home": "Prayer times home screen with next-prayer countdown, dark theme",
            "prayer-times-light": "Prayer times home screen in light theme",
            "prayer-schedule-7days": "7-day prayer schedule table",
            "prayer-schedule-30days": "30-day prayer schedule table",
            "prayer-streak": "Prayer streak tracker with daily checklist",
            "qibla-direction": "Qibla direction compass with distance to the Kaaba",
            "set-location-search": "Set location by city search",
            "set-location-coordinates": "Set location by raw latitude/longitude coordinates",
            "quran-hub-surah": "Quran hub browsing by Surah",
            "quran-hub-juz": "Quran hub browsing by Juz",
            "quran-reader": "Quran reader showing Al-Fatihah in Arabic and English",
            "bookmarks": "Saved Quran bookmarks list",
            "asma-ul-husna": "Asma ul Husna — the 99 names of Allah, searchable list",
            "tasbih-list": "Tasbih phrase selection list",
            "tasbih-counter": "Tasbih counter with target selection",
            "adhkar-hub": "Adhkar hub — Asma ul Husna, Tasbih counter, Duas & Dhikr",
            "settings-appearance": "Settings — theme, accent color, language, Adhan audio",
            "settings-notifications": "Settings — prayer notifications and calculation method",
            "settings-asr-madhab": "Settings — Asr madhab and high-latitude rule",
            "onboarding-language": "First-launch language picker",
        },
    },

    id: {
        pitch: "Sebuah aplikasi pendamping ibadah salat mobile berbasis offline-first yang dibangun menggunakan React Native dan Expo tanpa ketergantungan pada server backend — seluruh kalkulasi astronomi dihitung secara dinamis langsung di perangkat pengguna (on-device). Aplikasi ini menyediakan modul kalkulasi waktu salat astronomis kustom, pencarian reverse-geocoding dan resolusi zona waktu secara offline tanpa koneksi internet, pembaca Al-Qur'an lengkap 30 Juz dengan verifikasi kaidah tajwid pada seluruh 6.236 ayat, perkakas Adhkar & Tasbih digital, serta sistem penjadwalan notifikasi lokal pintar berlatar belakang. Seluruh preferensi dan data pengguna tersimpan secara aman di penyimpanan lokal, disajikan dalam antarmuka dwibahasa (Indonesia/Inggris) dengan dukungan tema terang dan gelap penuh.",

        featureGroups: [
            {
                label: "Kalkulasi Waktu Salat & Lokasi",
                items: [
                    "Mesin perhitungan astronomi kustom — mendukung 17 metode standar internasional, penyesuaian mazhab Asar (Standar/Hanafi), serta lima penanganan khusus wilayah lintang tinggi.",
                    "Integrasi lokasi otomatis via GPS atau input kustom manual, dilengkapi resolusi batas negara dan zona waktu secara offline tanpa perlu panggilan API jaringan.",
                    "Hitung mundur waktu salat berikutnya secara real-time, kalender Hijriah, tabel jadwal mingguan/bulanan, dan kompas penunjuk arah kiblat presisi.",
                    "Fitur pemantau runtutan salat (prayer streak) dan checklist ibadah puasa harian yang secara otomatis tampil khusus selama bulan suci Ramadan.",
                ],
            },
            {
                label: "Al-Qur'an Digital & Tajweed Interaktif",
                items: [
                    "Teks Al-Qur'an lengkap dalam bahasa Arab (Utsmani), terjemahan bahasa Indonesia, Inggris, serta teks transliterasi latin — dapat dijelajahi per Surah maupun per Juz dengan fitur pencarian teks.",
                    "Penyimpanan bookmark ayat dengan catatan kustom personal, serta pelacak posisi bacaan terakhir untuk melanjutkan bacaan dengan mudah.",
                    "Kustomisasi ukuran font Arab, serta header nama surah yang tetap menempel di posisi atas layar (sticky header) saat membaca.",
                    "Pewarnaan tajwid interaktif — data kaidah tajwid telah dibangun dan diverifikasi secara independen untuk seluruh 6.236 ayat (dinonaktifkan sementara demi optimasi performa render).",
                ],
            },
            {
                label: "Modul Adhkar & Penghitung Tasbih",
                items: [
                    "Asmaul Husna (99 Nama Allah) — dilengkapi fitur pencarian, teks Arab, transliterasi, terjemahan Indonesia & Inggris yang diverifikasi silang pada 9 sumber acuan.",
                    "Penghitung Tasbih digital — menyimpan akumulasi hitungan per frasa secara permanen, target hitungan yang dapat dikonfigurasi, serta respons getaran haptik saat target tercapai.",
                    "Koleksi Doa & Dzikir harian — struktur data telah dibangun (108 doa dan 67 dzikir) siap dirilis setelah integrasi terjemahan lengkap.",
                ],
            },
            {
                label: "Pengaturan & Personalisasi",
                items: [
                    "Kustomisasi tema antarmuka (gelap/terang/mengikuti sistem) dipadukan dengan 5 variasi warna aksen, metode perhitungan salat, mazhab Asar, dan aturan lintang tinggi.",
                    "Audio adzan lengkap per waktu salat (rekaman kualitas tinggi dari Doha, Qatar) dengan fitur pratinjau suara langsung.",
                    "Pengalih bahasa otomatis yang mendeteksi bahasa sistem smartphone saat pertama kali dibuka, serta dapat diubah kapan saja melalui menu Pengaturan.",
                ],
            },
        ],

        stackGroups: [
            {
                label: "Inti Framework",
                items: [
                    "Expo (managed workflow → EAS dev build)",
                    "React Native",
                    "TypeScript",
                ],
            },
            {
                label: "Mesin Kalkulasi Salat",
                items: [
                    "AdvancedPrayerCalculator kustom — implementasi mandiri berbasis rumus trigonometri matahari, tanpa pustaka eksternal.",
                    "Dukungan multi-metode internasional, opsi mazhab Asar (Standar/Hanafi), dan resolusi kasus tepi lintang tinggi.",
                ],
            },
            {
                label: "Geolokasi & Offline Map",
                items: [
                    "expo-location untuk akses sensor GPS",
                    "Reverse-geocoding offline — modul pencarian batas negara kustom dan resolusi zona waktu tanpa permintaan jaringan.",
                ],
            },
            {
                label: "Sistem Notifikasi",
                items: [
                    "expo-notifications untuk penjadwalan alarm lokal bertahap (pengingat 30, 15, dan 5 menit sebelum salat).",
                    "expo-task-manager + expo-background-task untuk pembaruan jadwal multi-hari di latar belakang.",
                ],
            },
            {
                label: "Data & Rendering Al-Qur'an",
                items: [
                    "Teks dan terjemahan Al-Qur'an dari quran-json / Tanzil dan quran-meta (Arab Utsmani, Inggris, Indonesia, transliterasi).",
                    "Data kaidah tajwid dari AlQuranCloud yang diverifikasi independen kaidah demi kaidah pada seluruh 6.236 ayat.",
                    "react-native-webview untuk menjamin ketepatan penggabungan huruf kursif Arab pada teks berwarna — lihat studi kasus.",
                ],
            },
            {
                label: "Penyimpanan Lokal & Navigation",
                items: [
                    "AsyncStorage untuk seluruh persistensi data — preferensi pengaturan, bookmark, log ibadah, hitungan tasbih, dan preferensi bahasa.",
                    "Arsitektur navigasi buatan sendiri — bottom tab bar + pengelolaan state komponen lokal tanpa React Navigation.",
                ],
            },
            {
                label: "i18n & Tipografi",
                items: [
                    "Kamus terjemahan kustom berbasis context ringan (tanpa i18next).",
                    "expo-localization untuk deteksi otomatis bahasa sistem perangkat saat onboarding.",
                    "Amiri Quran (SIL Open Font License) untuk rendering tipografi Arab yang elegan.",
                ],
            },
        ],

        studyTitle: "Studi Kasus Rekayasa: Rendering Tajwid Interaktif vs. Performa Antarmuka",
        story: [
            {
                label: "Permasalahan Shaping Glyph Huruf Arab",
                body: "Penerapan kaidah tajwid mengharuskan huruf atau kelompok huruf tertentu dalam ayat Al-Qur'an diberi warna yang berbeda sesuai hukum pelafalannya. Pendekatan awal menggunakan komponen `<Text>` native React Native dengan span anak (`<Text style={{color}}>`) berwarna ternyata merusak mekanisme penyambungan huruf Arab (letter joining/shaping glyph). Begitu huruf-huruf dalam satu kata kursif dipecah ke dalam beberapa node `<Text>` bermerek beda, mesin penata grafis OS gagal menyambungkan karakter Arab, menyebabkan kata-kata terputus, tumpang tindih, atau terpisah secara tidak alami pada titik pergantian warna. Masalah ini terjadi pada tingkat font shaper sebelum proses layout CSS, sehingga tidak dapat diperbaiki hanya dengan pengaturan margin atau letter-spacing.",
            },
            {
                label: "Solusi Ketepatan Visual Berbasis WebView Engine",
                body: "Mesin rendering browser HTML/CSS dirancang secara native untuk mampu menyambungkan huruf Arab kursif secara sempurna meskipun dipisahkan oleh tag `<span>` ber-style. Oleh karena itu, rendering ayat dengan pewarnaan tajwid dipindahkan menggunakan komponen `react-native-webview`. Pada pendekatan ini, setiap ayat dikonversi menjadi dokumen HTML ringkas dengan styling kelas CSS pada elemen span. Solusi ini berhasil menyelesaikan masalah visual ketepatan huruf Arab 100%: seluruh 17 kaidah tajwid divalidasi silang terhadap sumber data terpisah dan parser terverifikasi di seluruh 6.236 ayat Al-Qur'an tanpa kesalahan visual.",
            },
            {
                label: "Analisis Regresi Performa & Beban Memori",
                body: "Meskipun secara visual sempurna, pendekatan WebView menimbulkan dampak regresi performa scrolling yang signifikan. Setiap ayat Al-Qur'an diproses sebagai satu instance WebView terisolasi, yang berarti mesin WebView harus mengurai (parse) dan memuat ulang data berkas font Arab Amiri setiap kali instance baru dimuat saat scrolling. Pengujian A/B yang terkontrol (menggunakan surah yang sama, kecepatan scroll yang sama, membandingkan mode tajwid aktif vs. non-aktif) mengonfirmasi adanya penurunan frame-rate (lag) secara konsisten yang bersumber spesifik dari proses instansiasi WebView dan parsing font.",
            },
            {
                label: "Evaluasi Mitigasi & Eksperimen Teknis",
                body: "Dua langkah optimasi dicoba untuk mengatasi masalah ini. Pertama, pengubahan metode pemuatan font dari penyematan string base64 menjadi penunjukan path berkas lokal via `expo-asset` — dengan hipotesis bahwa mesin WebView dapat menyimpan cache font berdasarkan URI berkas. Eksperimen diuji langsung pada perangkat pengembangan, namun hasil menunjukkan bahwa WebView tetap mem-parse ulang font pada tiap instance baru. Kedua, penggunaan teknik virtualisasi daftar (FlashList) dianalisis, namun dikesalkan karena FlashList mengoptimalkan daur ulang node DOM native, sementara hambatan utama berada di dalam siklus internal internal mesin WebView yang berada di luar jangkauan virtualisasi.",
            },
            {
                label: "Keputusan Arsitektur & Strategi Fitur Flag",
                body: "Demi menjaga responsivitas dan kenyamanan pengguna saat membaca Al-Qur'an, fitur pewarnaan tajwid untuk sementara waktu dinonaktifkan secara aman menggunakan konstanta feature flag (`TAJWEED_FEATURE_ENABLED`). Seluruh UI toggle tajwid disembunyikan dan alur rendering dipaksa menggunakan teks native yang cepat. Keputusan ini diambil tanpa membuang hasil kerja yang ada: seluruh data parser 6.236 ayat, pustaka warna, dan struktur HTML tetap utuh di basis kode. Solusi jangka panjang — yaitu merestrukturisasi alur WebView agar merender satu halaman atau satu surah penuh dalam satu instance WebView tunggal alih-alih per ayat — telah dijadwalkan untuk tahap pengembangan berikutnya.",
            },
        ],

        notes: [
            {
                title: "Keterbatasan Penjadwalan Latar Belakang OS",
                body: "Penjadwalan notifikasi waktu salat multi-hari mengandalkan fitur eksekusi latar belakang tingkat OS (`expo-task-manager` + `expo-background-task`). Sistem operasi iOS (`BGTaskScheduler`) dan sistem penghemat baterai agresif pada produsen Android tertentu memiliki kebijakan pemblokiran tugas latar belakang yang tidak dapat diprediksi. Untuk menoleransi pemblokiran ini, sistem secara otomatis memasang pengingat cadangan hingga 3 hari ke depan setiap kali aplikasi dibuka.",
            },
            {
                title: "Audio Adzan Otomatis & Sesi Native",
                body: "Berkas suara Adzan lengkap telah disertakan dalam aplikasi dan dapat diputar melalui fitur pratinjau di menu Pengaturan. Namun, pemutaran suara Adzan penuh secara otomatis dari notifikasi layar terkunci (background notification) memerlukan integrasi sesi audio native khusus yang berada di luar batas kapabilitas build standar Expo.",
            },
            {
                title: "Kelengkapan Cakupan Terjemahan Antarmuka",
                body: "Infrastruktur lokalisasi dwibahasa (context, kamus terjemahan, dan penyimpanan preferensi) telah diimplementasikan sepenuhnya di tingkat arsitektur. Saat ini terjemahan bahasa Indonesia telah diterapkan pada bilah navigasi, onboarding, dan studi kasus, sementara beberapa submenu detail akan diperluas pada rilis berikutnya.",
            },
            {
                title: "Status Modul Doa & Dzikir Harian",
                body: "Koleksi 108 doa dan 67 entri dzikir telah selesai dikurasi dalam teks Arab dan terjemahan Indonesia. Rilis fitur ini sengaja ditunda sampai ketersediaan terjemahan bahasa Inggris yang tervalidasi selesai dilakukan demi menjaga standar kualitas rilis dwibahasa.",
            },
            {
                title: "Pengelolaan State Layanan Navigasi Tab",
                body: "Demi efisiensi konsumsi memori perangkat, hanya tab aktif yang di-mount ke dalam memori pada satu waktu. Berpindah tab akan melepaskan (unmount) tampilan sebelumnya, sehingga posisi scroll akan kembali ke atas saat tab dibuka ulang. Ini merupakan keputusan desain yang disengaja untuk menjaga performa perangkat spek rendah.",
            },
        ],

        screenshotAlts: {
            "prayer-times-home": "Layar utama waktu salat dengan hitung mundur salat berikutnya, tema gelap",
            "prayer-times-light": "Layar utama waktu salat dalam tema terang",
            "prayer-schedule-7days": "Tabel jadwal salat 7 hari",
            "prayer-schedule-30days": "Tabel jadwal salat 30 hari",
            "prayer-streak": "Pelacak runtutan salat dengan checklist harian",
            "qibla-direction": "Kompas arah kiblat dengan jarak ke Ka'bah",
            "set-location-search": "Mengatur lokasi lewat pencarian kota",
            "set-location-coordinates": "Mengatur lokasi lewat koordinat lintang/bujur langsung",
            "quran-hub-surah": "Hub Al-Qur'an dengan penjelajahan per Surah",
            "quran-hub-juz": "Hub Al-Qur'an dengan penjelajahan per Juz",
            "quran-reader": "Pembaca Al-Qur'an menampilkan Al-Fatihah dalam bahasa Arab dan Inggris",
            "bookmarks": "Daftar bookmark Al-Qur'an tersimpan",
            "asma-ul-husna": "Asma ul Husna — 99 nama Allah, daftar yang dapat dicari",
            "tasbih-list": "Daftar pilihan frasa tasbih",
            "tasbih-counter": "Penghitung tasbih dengan pemilihan target",
            "adhkar-hub": "Hub Adhkar — Asma ul Husna, penghitung Tasbih, Doa & Dzikir",
            "settings-appearance": "Pengaturan — tema, warna aksen, bahasa, audio Adzan",
            "settings-notifications": "Pengaturan — notifikasi salat dan metode perhitungan",
            "settings-asr-madhab": "Pengaturan — mazhab Asar dan aturan lintang tinggi",
            "onboarding-language": "Pemilih bahasa saat pertama kali dibuka",
        },
    },
} as const;

export const screenshotOrder = [
    "prayer-times-home",
    "prayer-times-light",
    "prayer-schedule-7days",
    "prayer-schedule-30days",
    "prayer-streak",
    "qibla-direction",
    "set-location-search",
    "set-location-coordinates",
    "quran-hub-surah",
    "quran-hub-juz",
    "quran-reader",
    "bookmarks",
    "asma-ul-husna",
    "tasbih-list",
    "tasbih-counter",
    "adhkar-hub",
    "settings-appearance",
    "settings-notifications",
    "settings-asr-madhab",
    "onboarding-language",
] as const;
