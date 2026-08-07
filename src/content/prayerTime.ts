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
        pitch: "Aplikasi pendamping salat yang sepenuhnya offline-first, dibangun dengan React Native dan Expo — tanpa backend, semua dihitung langsung di perangkat atau disertakan sebagai data statis. Mencakup perhitungan waktu salat astronomis kustom, deteksi GPS ke zona waktu secara offline, pembaca Al-Qur'an dengan data kaidah tajwid yang telah diverifikasi di seluruh 6.236 ayat, fitur Adhkar, dan penjadwalan notifikasi yang tetap berjalan di latar belakang — semuanya tersimpan secara lokal, dengan dukungan dwibahasa (Indonesia/Inggris) dan mode terang/gelap penuh.",

        featureGroups: [
            {
                label: "Waktu Salat",
                items: [
                    "Perhitungan astronomis kustom — beragam metode, mazhab Asar, penanganan lintang tinggi",
                    "Lokasi lewat GPS atau input manual, deteksi negara/zona waktu tanpa koneksi internet",
                    "Hitung mundur salat berikutnya, tanggal Hijriah, jadwal mingguan/bulanan, kompas kiblat",
                    "Pelacakan runtutan salat + checklist puasa Ramadan, hanya tampil saat Ramadan berlangsung",
                ],
            },
            {
                label: "Al-Qur'an",
                items: [
                    "Teks lengkap dalam bahasa Arab, Inggris, Indonesia, serta transliterasi — per Surah atau per Juz, dengan pencarian",
                    "Bookmark dengan catatan opsional per ayat, pelacakan posisi baca terakhir",
                    "Ukuran font Arab yang dapat disesuaikan, header surah yang menempel (sticky)",
                    "Pewarnaan tajwid — sudah dibangun dan datanya terverifikasi, saat ini dinonaktifkan sementara menunggu perbaikan performa (lihat studi kasus)",
                ],
            },
            {
                label: "Adhkar",
                items: [
                    "Asma ul Husna (99 Nama) — dapat dicari, Arab + transliterasi + Inggris + Indonesia, digabung dari dua sumber dan diperiksa silang pada 9 titik",
                    "Penghitung tasbih — jumlah tersimpan per frasa, target yang dapat dipilih, getaran saat target tercapai",
                    "Doa & Dzikir — data sudah dibangun (108 doa, 67 entri dzikir) namun ditahan sementara menunggu sumber bahasa Inggris",
                ],
            },
            {
                label: "Pengaturan & Onboarding",
                items: [
                    "Tema (terang/gelap/sistem) + 5 warna aksen, metode perhitungan, mazhab Asar, aturan lintang tinggi",
                    "Audio Adzan per waktu salat (rekaman Doha, Qatar, domain publik), dengan pratinjau per waktu salat",
                    "Pemilih bahasa saat pertama kali dibuka yang otomatis menyesuaikan bahasa sistem, dapat dipicu ulang kapan saja",
                ],
            },
        ],

        stackGroups: [
            {
                label: "Inti",
                items: [
                    "Expo (managed → EAS dev build)",
                    "React Native",
                    "TypeScript",
                ],
            },
            {
                label: "Perhitungan salat",
                items: [
                    "AdvancedPrayerCalculator kustom — implementasi sendiri atas metodologi astronomis, bukan library pihak ketiga",
                    "Beragam metode perhitungan, mazhab Asar (Standar/Hanafi), kasus tepi lintang tinggi",
                ],
            },
            {
                label: "Lokasi",
                items: [
                    "expo-location untuk GPS",
                    "Reverse-geocoding sepenuhnya offline — pencarian batas negara kustom + resolusi zona waktu, tanpa perlu koneksi jaringan",
                ],
            },
            {
                label: "Notifikasi",
                items: [
                    "expo-notifications untuk penjadwalan lokal, pengingat bertahap 30/15/5 menit",
                    "expo-task-manager + expo-background-task untuk penjadwalan multi-hari yang diperbarui di latar belakang",
                ],
            },
            {
                label: "Data & rendering Al-Qur'an",
                items: [
                    "Teks/terjemahan dari quran-json / Tanzil dan quran-meta (Arab Utsmani, Inggris, Indonesia, transliterasi)",
                    "Data kaidah tajwid dari AlQuranCloud, diverifikasi independen kaidah demi kaidah, parser divalidasi terhadap seluruh 6.236 ayat",
                    "react-native-webview untuk penggabungan huruf Arab yang benar di antara span berwarna — lihat studi kasus di bawah",
                ],
            },
            {
                label: "Penyimpanan & state",
                items: [
                    "AsyncStorage di seluruh aplikasi — pengaturan, bookmark, log salat/Ramadan, hitungan tasbih, preferensi bahasa",
                    "Navigasi buatan sendiri — bottom tab bar + state komponen lokal, tanpa React Navigation",
                ],
            },
            {
                label: "i18n & tipografi",
                items: [
                    "Kamus terjemahan kustom kecil + context (bukan i18next)",
                    "expo-localization untuk deteksi bahasa sistem saat pertama kali dibuka",
                    "Amiri Quran (SIL Open Font License) untuk tipografi Arab",
                ],
            },
        ],

        studyTitle: "Studi Kasus: Rendering Tajwid vs. Performa",
        story: [
            {
                label: "Masalah",
                body: "Kaidah tajwid ditampilkan sebagai span berwarna di dalam teks Arab — huruf atau kelompok huruf tertentu diberi warna berbeda tergantung kaidah pelafalannya. Pendekatan yang paling wajar, yaitu `<Text>` native dengan span anak berwarna di dalamnya, ternyata merusak rendering Arab: begitu huruf-huruf dalam satu kata kursif dipecah ke beberapa node `<Text>` yang gayanya berbeda-beda, mesin shaping gagal menyambung hurufnya (letter joining). Hal ini telah dikonfirmasi langsung di perangkat — kata-kata terlihat menyatu atau tumpang tindih di setiap titik pergantian warna. Masalahnya terjadi jauh sebelum tahap layout: shaping glyph berlangsung sebelum layout diproses, sehingga penyesuaian spacing atau margin sebanyak apa pun tidak akan memperbaikinya.",
            },
            {
                label: "Perbaikan ketepatan",
                body: "Mesin browser mampu membentuk huruf Arab dengan benar meski dipisah oleh batas `<span>` berstyle — dan memang untuk itulah HTML/CSS dirancang. Ayat berwarna tajwid pun dipindahkan agar dirender melalui `react-native-webview`, bukan teks native — menghasilkan HTML dengan kaidah warna diterapkan sebagai styling pada span. Pendekatan ini menyelesaikan masalah ketepatan sepenuhnya: ke-17 kaidah tajwid masing-masing diverifikasi silang secara independen terhadap sumber penandaan terpisah, dan parser-nya divalidasi terhadap seluruh 6.236 ayat tanpa satu pun kesalahan.",
            },
            {
                label: "Regresi performa",
                body: "Namun rendering yang benar ini datang dengan konsekuensi nyata: setiap ayat menjadi satu instance WebView penuh, dan setiap kali instance tersebut dimuat, font yang disematkan harus di-parse ulang. Uji A/B yang terkontrol (surah sama, kedalaman scroll sama, tajwid aktif vs. nonaktif) mengonfirmasi bahwa lag tersebut nyata dan spesifik pada mode tajwid, bukan masalah scrolling secara umum.",
            },
            {
                label: "Mitigasi yang dicoba",
                body: "Dua perbaikan dicoba. Pertama, me-resolve font ke path file asli melalui `expo-asset`, bukan menyematkannya sebagai base64 di HTML setiap ayat — dengan asumsi mesin WebView akan menyimpan cache data font yang sudah di-parse berdasarkan path-nya, lintas pemuatan halaman. Pendekatan ini diuji langsung pada dev build sesungguhnya, bukan sekadar dugaan teoretis, namun ternyata tidak menyelesaikan masalahnya. Kedua, virtualisasi list (FlashList) dipertimbangkan namun dikesampingkan setelah ditelusuri lebih jauh — teknik ini menyasar daur ulang list, sementara biaya performa di sini berada pada proses parsing font milik mesin WebView sendiri, lapisan yang tidak dapat dipengaruhi oleh FlashList.",
            },
            {
                label: "Keputusan",
                body: "Daripada merilis fitur yang secara teknis benar namun terasa berat digunakan, pewarnaan tajwid untuk saat ini dinonaktifkan melalui satu feature flag (`TAJWEED_FEATURE_ENABLED`) — tombol toggle dan legenda disembunyikan, dan jalur WebView dipaksa nonaktif terlepas dari preferensi tersimpan apa pun. Tidak ada pekerjaan yang terbuang: data kaidah yang telah diverifikasi, parser, dan pipeline rendering tetap utuh sepenuhnya, sehingga mengaktifkannya kembali nanti hanya soal membalik satu konstanta, bukan membangun ulang fitur dari awal. Perbaikan yang kemungkinan besar benar-benar menyelesaikan masalah ini — menggabungkan beberapa ayat ke dalam lebih sedikit instance WebView, bukan satu per ayat — merupakan perombakan layout yang cukup besar, bukan tambalan cepat, sehingga untuk saat ini dijadwalkan lebih dulu daripada dikerjakan terburu-buru.",
            },
        ],

        notes: [
            {
                title: "Notifikasi latar belakang, dijelaskan apa adanya",
                body: "Notifikasi multi-hari mengandalkan penjadwalan latar belakang tingkat OS (`expo-task-manager` + `expo-background-task`), bukan server push. Baik iOS maupun Android memiliki batasan nyata terhadap eksekusi di latar belakang — BGTaskScheduler pada iOS bersifat oportunistik tanpa jaminan waktu pasti, dan pengelola baterai bawaan sejumlah perangkat Android dapat memblokirnya secara diam-diam. Untuk menoleransi eksekusi yang terlewat, penjadwal selalu memesan slot 3 hari ke depan pada setiap eksekusi yang berhasil — ini mengurangi risikonya, namun tidak menghilangkannya sepenuhnya.",
            },
            {
                title: "Adzan otomatis hanya berbunyi saat aplikasi terbuka",
                body: "Rekaman Adzan per waktu salat sudah disertakan dan dapat didengarkan melalui pratinjau di Pengaturan, tetapi memutar Adzan penuh secara otomatis dari notifikasi latar belakang belum dapat dilakukan tanpa pekerjaan tambahan pada sesi audio native, di luar cakupan dev build Expo standar. Keterbatasan ini dinyatakan secara terus terang, bukan diisyaratkan seolah-olah sudah berjalan otomatis di latar belakang.",
            },
            {
                title: "Cakupan terjemahan masih sebagian",
                body: "Infrastruktur dwibahasa (context, kamus terjemahan, preferensi tersimpan) telah dibangun sepenuhnya, tetapi baru navigation bar dan layar onboarding yang tersambung ke sana — bagian aplikasi lainnya masih menampilkan teks bahasa Inggris terlepas dari pengaturan bahasa. Memperluas cakupan ini tinggal soal menambahkan key kamus per layar, bukan perubahan desain.",
            },
            {
                title: "Doa & Dzikir sudah dibangun tapi ditahan",
                body: "108 doa dan 67 entri dzikir telah dikurasi lengkap dalam bahasa Arab dan Indonesia, namun fitur ini belum dirilis — belum ada sumber bahasa Inggris yang terverifikasi dan sesuai, dan merilis versi berbahasa Indonesia saja secara diam-diam bukan pilihan yang diambil.",
            },
            {
                title: "Berpindah tab mengulang state layar lokal",
                body: "Hanya tab aktif yang di-mount pada satu waktu, sehingga berpindah tab lalu kembali akan mengulang posisi scroll dan state UI lokal tab tersebut. Ini merupakan trade-off yang disadari dan diterima dari pendekatan navigasi ini, bukan kelalaian.",
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
