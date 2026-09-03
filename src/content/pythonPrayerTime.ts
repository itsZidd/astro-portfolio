export const pythonPrayerTimeContent = {
    en: {
        eyebrow: "software · python",
        pitch: "A FastAPI web API and CLI that calculates Islamic prayer times from raw solar astronomy — Julian date, solar declination, hour angles — built specifically to learn that calculation from first principles before it was ported into the React Native Prayer Time app's calculator. Auto-detects both calculation method and timezone from raw coordinates, and implements five distinct high-latitude fallback strategies for locations where the standard sun-angle formula has no solution.",

        featureGroups: [
            {
                label: "Calculation engine",
                items: [
                    "17 built-in calculation methods (MWL, ISNA, Egypt, KEMENAG, Singapore, JAKIM, Makkah, Qatar, Kuwait, Dubai, Tehran, Turkey, France, Russia, London, Karachi) with automatic method selection by country",
                    "Full Julian-date → solar declination → hour-angle pipeline computing Fajr through Isha plus Midnight and Imsak",
                    "Standard vs. Hanafi Asr madhab support",
                ],
            },
            {
                label: "High-latitude handling",
                items: [
                    "Five fallback rules for locations where the standard sun-angle formula has no solution: SEVENTH_OF_NIGHT, MIDDLE_OF_NIGHT, NEAREST_LATITUDE, TWILIGHT_ANGLE, and NEAREST_DAY (Aqrab al-Ayyam)",
                    "NEAREST_DAY searches outward day-by-day for the nearest date with a valid solution, holds that time steady through the persistent-twilight period, then resumes real per-day calculation automatically",
                    "Genuine midnight-sun locations correctly return N/A rather than a fabricated time — see Known Limitations",
                ],
            },
            {
                label: "Interfaces",
                items: [
                    "FastAPI web server with interactive OpenAPI docs at /docs, auto-detecting timezone and country from raw coordinates",
                    "Deployed and live on Vercel — /docs is runnable in-browser with no local setup",
                    "City search on /times (?city=Jakarta) as an alternative to lat/lng, resolved offline against a ~34k-city dataset with explicit disambiguation via an optional country param",
                    "main.py CLI for quick terminal calculations, no server needed",
                ],
            },
            {
                label: "Testing & verification",
                items: [
                    "26 pytest tests: regression guard against the two bugs below, input validation, city-search resolution/disambiguation, and high-latitude edge cases",
                    "Cross-checked against 11 real-world locations spanning every continent and both hemispheres, 5 calculation methods, and 3 unusual timezone offsets (incl. UTC+5:30, UTC+5:45), matching independent published references within 1-3 minutes",
                ],
            },
        ],

        stackGroups: [
            {
                label: "Core",
                items: ["Python", "FastAPI", "Uvicorn"],
            },
            {
                label: "Calculation",
                items: [
                    "Custom solar declination / hour-angle astronomy — own implementation, no third-party prayer-time library",
                ],
            },
            {
                label: "Location & time",
                items: [
                    "reverse_geocode for coordinate-to-country lookup",
                    "geonamescache for offline city-name search (~34k populated places)",
                    "tzfpy + tzdata for offline timezone resolution via zoneinfo",
                    "country_converter for country-code normalization",
                ],
            },
            {
                label: "Testing",
                items: ["pytest + httpx — 26 tests covering calculator and API layers"],
            },
            {
                label: "Deployment",
                items: ["Vercel"],
            },
        ],

        studyTitle: "Case Study: Finding and Fixing Two Silent High-Latitude Bugs",
        story: [
            {
                label: "The signal",
                body: "The calculation engine passed casual testing for months — every low- and mid-latitude city checked out fine. The bugs only surfaced once a companion mobile app (a TypeScript port of this same calculator) was stress-tested against real, independently published prayer-time references for cities the original testing hadn't covered. Tromsø, Norway in July returned a Fajr time before that same evening's Maghrib — obviously wrong, since Fajr is the following dawn.",
            },
            {
                label: "Root cause: two separate bugs",
                body: "Tracing through `resolve_time()`, the first bug was a mislabeled variable: `night_duration = 2 * ha_sun` actually computes the length of daylight, not night (`ha_sun` runs from solar noon to sunset, so doubling it spans the whole daylight period). At Tromsø in July this inflated 'night duration' to over 21 hours when the real night was ~2.5 — feeding directly into the Fajr/Isha fallback offset. The second bug was more consequential: a safety clamp meant only for genuine edge cases was running unconditionally on every calculation for every rule except `NEAREST_LATITUDE`, silently overriding a correct raw result whenever it was judged too far from sunrise/sunset. New York City (40.7°N) in July has no real high-latitude problem, yet the clamp was still substituting a wrong value over the correct one.",
            },
            {
                label: "Confirming the fix, not just a different answer",
                body: "Both fixes were checked four ways: re-running the same test cities through the parallel TypeScript port and confirming identical output; cross-checking against independent published calculators for cities never used during original development (New York, Winnipeg, Doha, Mumbai, Kathmandu, Nairobi), matching within 1-3 minutes — the normal variance between independent implementations; verifying the previously correct cities (Jakarta, Riyadh) were byte-for-byte unchanged; and pinning all of it down in a pytest regression suite so neither bug can silently return.",
            },
            {
                label: "A follow-up gap",
                body: "Reviewing the fix surfaced a related design gap: an unrecognized `high_latitude_rule` string silently collapsed Fajr to Sunrise and Isha to Maghrib with no error, because the offset calculation fell through every branch to a default of `0`. That output looks plausible — a real time, just the wrong one — which is exactly the failure mode that hides well in production. Fixed with eager validation at construction time, backed by a corrected `config.py`, which was separately missing one of its four documented rule options entirely (`TWILIGHT_ANGLE`).",
            },
            {
                label: "Extending carefully",
                body: "`NEAREST_DAY` (Aqrab al-Ayyam) was added to handle persistent-twilight locations — real sunrise/sunset still happen, but Fajr/Isha's angle can't be reached. An early version tried extending the same substitution to Sunrise/Maghrib for genuine midnight-sun cases too, and shipped a real bug during development: Fajr's and Sunrise's independent nearest-valid-day searches landed on different days, producing a schedule where Fajr appeared after Sunrise. Caught by an automated sanity check before release, and fixed by scoping the feature correctly rather than patching around the symptom.",
            },
        ],

        notes: [
            {
                title: "Genuine polar day/night still returns N/A",
                body: "`NEAREST_DAY` only substitutes Fajr/Isha for persistent twilight, where plain sunrise/sunset still occur. True midnight sun — where the sun never sets — has no rule that produces a usable answer, by design; extending it was attempted and reverted after producing internally inconsistent schedules (see the case study above).",
            },
            {
                title: "Reverse-geocoding degrades silently for remote coordinates",
                body: "`reverse_geocode` always returns the nearest known point regardless of actual distance, so genuine open-ocean coordinates get attributed to whatever land is nearest — potentially very far away — with no distance or confidence threshold to null that out.",
            },
            {
                title: "City search only covers geonamescache's dataset",
                body: "Roughly 34k populated places above a size threshold — small towns and villages below that won't resolve and return `404`; use coordinates for those instead. Ambiguous names (e.g. \"Paris\") default to the most populous match rather than erroring, though `meta.city` always reports exactly which one was used so a wrong disambiguation is visible, not silent.",
            },
            {
                title: "No Hijri calendar dates",
                body: "Only Gregorian dates are computed. The companion mobile app has Hijri conversion via a separate module; it hasn't been ported back into this API.",
            },
            {
                title: "No caching or rate limiting",
                body: "Every request recomputes from scratch and calls the geocoding libraries fresh — fine for personal or small-scale use, but would need attention before any high-traffic deployment.",
            },
        ],
    },

    id: {
        eyebrow: "perangkat lunak · python",
        pitch: "Sebuah aplikasi API *web* berbasis FastAPI dan antarmuka CLI yang menghitung waktu salat berdasarkan posisi astronomi matahari mentah secara langsung — mencakup konversi tanggal Julian, perhitungan deklinasi matahari, serta kalkulasi sudut jam. Aplikasi ini dibangun dari prinsip dasar matematis untuk memahami algoritma kalkulasi secara mendalam sebelum di-*porting* ke modul kalkulator React Native pada aplikasi *mobile* Prayer Time. Sistem ini secara otomatis mendeteksi metode kalkulasi terbaik dan zona waktu dari koordinat lokasi mentah, serta mengimplementasikan lima strategi *fallback* lintang tinggi untuk wilayah kutub di mana rumus sudut matahari standar tidak memiliki solusi matematis.",

        featureGroups: [
            {
                label: "Mesin Kalkulasi Astronomi",
                items: [
                    "17 metode kalkulasi bawaan internasional (MWL, ISNA, Mesir, KEMENAG, Singapura, JAKIM, Makkah, Qatar, Kuwait, Dubai, Teheran, Turki, Prancis, Rusia, London, Karachi) dengan pemilihan metode otomatis berdasar kode negara.",
                    "Alur kalkulasi lengkap: tanggal Julian → deklinasi matahari → sudut jam yang menghasilkan waktu Subuh, Terbit, Dzuhur, Asar, Maghrib, Isya, serta Tengah Malam dan Imsak.",
                    "Dukungan penuh untuk penyesuaian mazhab Asar (metode Standar vs. Hanafi).",
                ],
            },
            {
                label: "Penanganan Wilayah Lintang Tinggi",
                items: [
                    "Lima aturan *fallback* untuk lokasi kutub di mana rumus sudut matahari standar tidak menghasilkan solusi: `SEVENTH_OF_NIGHT`, `MIDDLE_OF_NIGHT`, `NEAREST_LATITUDE`, `TWILIGHT_ANGLE`, dan `NEAREST_DAY` (*Aqrab al-Ayyam*).",
                    "Aturan `NEAREST_DAY` secara iteratif menelusuri tanggal terdekat yang memiliki solusi valid, mempertahankan jadwal stabil selama periode senja abadi, lalu kembali ke kalkulasi harian biasa secara otomatis.",
                    "Lokasi dengan fenomena matahari tengah malam sejati (*polar day*) secara akurat mengembalikan respon N/A alih-alih menampilkan waktu buatan yang menyesatkan.",
                ],
            },
            {
                label: "Antarmuka Layanan & API",
                items: [
                    "Server *web* FastAPI dengan dokumentasi OpenAPI interaktif pada rute `/docs`, secara otomatis menentukan zona waktu dan negara dari koordinat *latitude*/*longitude*.",
                    "Sudah ter-*deploy* secara *live* di Vercel — dokumentasi interaktif di `/docs` dapat diuji langsung dari peramban *web* tanpa instalasi lokal.",
                    "Fitur pencarian nama kota pada *endpoint* `/times` (`?city=Jakarta`) sebagai alternatif koordinat, di-*resolve offline* menggunakan *dataset* ~34.000 kota dunia.",
                    "Antarmuka CLI pada `main.py` untuk kalkulasi instan langsung dari terminal tanpa perlu menjalankan server *web*.",
                ],
            },
            {
                label: "Pengujian & Verifikasi Presisi",
                items: [
                    "Pengujian regresi otomatis dengan 26 *suite test* pytest: menguji validasi input, pencarian kota, resolusi zona waktu, serta kasus tepi lintang tinggi.",
                    "Divalidasi silang terhadap 11 lokasi acuan dunia di seluruh benua dan belahan bumi, 5 metode kalkulasi utama, serta 3 *offset* zona waktu unik (seperti UTC+5:30 dan UTC+5:45), menghasilkan kecocokan hingga selisih 1–3 menit dari referensi resmi.",
                ],
            },
        ],

        stackGroups: [
            {
                label: "Inti Framework",
                items: ["Python 3.11+", "FastAPI", "Uvicorn"],
            },
            {
                label: "Kalkulasi Astronomi",
                items: [
                    "Algoritma deklinasi matahari & sudut jam kustom — implementasi mandiri dari dasar tanpa pustaka pihak ketiga.",
                ],
            },
            {
                label: "Geolokasi & Waktu",
                items: [
                    "reverse_geocode untuk pencarian negara berbasis koordinat",
                    "geonamescache untuk pencarian nama kota *offline* (~34.000 kota berpenduduk)",
                    "tzfpy + tzdata untuk resolusi zona waktu cepat via zoneinfo",
                    "country_converter untuk normalisasi standar kode negara ISO",
                ],
            },
            {
                label: "Pengujian Regresi",
                items: ["pytest + httpx — 26 pengujian mencakup logika kalkulator dan endpoint API"],
            },
            {
                label: "Deployment",
                items: ["Vercel Serverless"],
            },
        ],

        studyTitle: "Sorotan Teknis: Menemukan & Memperbaiki Bug Lintang Tinggi yang Tersembunyi",
        story: [
            {
                label: "Indikasi Awal dari Pengujian Intensif",
                body: "Mesin kalkulasi astronomi ini telah lolos pengujian *casual* selama berbulan-bulan — setiap uji coba pada kota-kota berlintang rendah dan menengah (seperti Jakarta atau Riyadh) selalu menghasilkan jadwal yang cocok dengan referensi resmi. Namun *bug* tersembunyi baru terungkap ketika *porting* kalkulator ini ke aplikasi *mobile* React Native diuji secara intensif menggunakan *dataset* acuan kota-kota lintang tinggi di Eropa Utara. Saat menguji kota Tromsø di Norwegia pada bulan Juli, sistem mengembalikan waktu Subuh yang jatuh sebelum waktu Maghrib malam sebelumnya — sebuah kalkulasi yang jelas keliru karena Subuh seharusnya merupakan waktu fajar pada keesokan harinya.",
            },
            {
                label: "Analisis Penelusuran Akar Masalah Bug Dualitas",
                body: "Melalui penelusuran alur fungsi `resolve_time()`, ditemukan dua *bug* terpisah yang saling tumpang tindih. *Bug* pertama merupakan kesalahan pelabelan variabel matematika: `night_duration = 2 * ha_sun` sebenarnya menghitung durasi siang hari (`ha_sun` adalah sudut jam dari tengah hari matahari hingga terbenam). Di Tromsø pada bulan Juli, kesalahan ini menggelembungkan 'durasi malam' menjadi 21 jam padahal malam sesungguhnya hanya berlangsung ~2,5 jam — angka salah ini langsung masuk ke rumus *offset* Subuh dan Isya. *Bug* kedua adalah pengaplikasian *clamp* pembatas yang berjalan tanpa syarat pada seluruh aturan kecuali `NEAREST_LATITUDE`, secara diam-diam menimpa kalkulasi mentah yang sebenarnya sudah akurat. Pada kota New York (40.7°LU) di bulan Juli yang tidak memiliki masalah lintang tinggi, *clamp* ini justru menimpa hasil yang benar dengan angka yang keliru.",
            },
            {
                label: "Metodologi Verifikasi Perbaikan Presisi",
                body: "Perbaikan kedua *bug* tersebut diverifikasi melalui empat tahap pengujian ketat: (1) menjalankan ulang uji coba pada *porting* TypeScript paralel untuk memastikan *output* numerik yang identik; (2) memeriksa silang terhadap data rujukan independen pada kota-kota di berbagai belahan bumi (New York, Winnipeg, Doha, Mumbai, Kathmandu, Nairobi) yang menunjukkan tingkat presisi selisih 1–3 menit; (3) memverifikasi bahwa kalkulasi kota berlintang normal (Jakarta, Riyadh) *byte-for-byte* tidak mengalami perubahan; serta (4) mengunci seluruh skenario kasus ke dalam *suite* pengujian regresi pytest agar *bug* tidak muncul kembali.",
            },
            {
                label: "Penanganan Celah Keamanan Konfigurasi",
                body: "Proses audit lanjutan mengungkap celah desain tambahan: apabila *string* `high_latitude_rule` yang tidak valid dimasukkan, sistem secara diam-diam menggugurkan kalkulasi Subuh menjadi Terbit dan Isya menjadi Maghrib tanpa melempar *exception*, karena perhitungan *offset* jatuh ke nilai *default* `0`. Keluaran tersebut tampak seperti waktu yang valid padahal keliru — jenis kegagalan yang paling berbahaya di lingkungan produksi. Masalah ini diperbaiki dengan menambahkan validasi skema ketat saat konstruksi objek konfigurasi dan memperbarui berkas `config.py` yang sebelumnya sempat melewatkan satu opsi aturan (`TWILIGHT_ANGLE`).",
            },
            {
                label: "Pengembangan Fitur & Pengendalian Efek Samping",
                body: "Fitur `NEAREST_DAY` (*Aqrab al-Ayyam*) ditambahkan khusus untuk lokasi dengan fenomena senja abadi di mana matahari terbenam namun tidak pernah mencapai sudut depresi Subuh/Isya. Pada versi prototipe awal, pengembangan sempat mencoba memperluas substitusi serupa untuk waktu Terbit/Maghrib pada lokasi *polar day* (matahari tidak pernah terbenam). Namun eksperimen tersebut menghasilkan *bug* baru di mana pencarian hari terdekat untuk Subuh dan Terbit jatuh di hari yang berbeda, menyebabkan Subuh tampil setelah Terbit. *Bug* tersebut ditangkap oleh uji otomatis sebelum rilis dan diperbaiki dengan membatasi cakupan fitur secara tepat.",
            },
        ],

        notes: [
            {
                title: "Respon Lokasi Polar Day / Night Sejati",
                body: "Aturan `NEAREST_DAY` dirancang khusus untuk kondisi senja abadi di mana matahari masih mengalami siklus terbit dan terbenam. Untuk kawasan kutub dengan matahari tengah malam sejati (*polar day*, di mana matahari tidak pernah terbenam selama 24 jam), sistem secara sengaja mengembalikan respon N/A untuk menghindari pembuatan waktu buatan yang tidak konsisten secara ilmiah.",
            },
            {
                title: "Batas Akurasi Offline Reverse-Geocoding",
                body: "Pustaka `reverse_geocode` mengembalikan titik daratan terdekat yang tercatat dalam *dataset* tanpa memedulikan jarak sebenarnya. Oleh karena itu, input koordinat di tengah samudera lepas akan diatribusikan ke daratan terdekat mana pun tanpa batas ambang jarak.",
            },
            {
                title: "Cakupan Dataset Pencarian Nama Kota",
                body: "Pencarian nama kota memanfaatkan *dataset* `geonamescache` yang mencakup ~34.000 wilayah berpenduduk di atas ambang batas populasi tertentu. Untuk desa atau kawasan kecil di bawah ambang batas tersebut, pengguna disarankan memasukkan koordinat *latitude*/*longitude* secara langsung.",
            },
            {
                title: "Fokus Konversi Kalender Masehi",
                body: "Layanan API ini berfokus khusus pada kalkulasi astronomi waktu salat berbasis kalender Masehi. Modul konversi kalender Hijriah diimplementasikan pada aplikasi *mobile* pendamping secara terpisah.",
            },
            {
                title: "Performa & Skalabilitas Serverless",
                body: "Setiap permintaan API diproses secara langsung (*on-demand*) untuk menjamin akurasi data terbaru. Untuk kebutuhan *deployment* skala besar dengan trafik tinggi, penambahan lapisan *caching* Redis disarankan.",
            },
        ],
    },
} as const;
