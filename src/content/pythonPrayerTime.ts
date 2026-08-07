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
        pitch: "API web FastAPI dan CLI yang menghitung waktu salat berdasarkan astronomi matahari mentah — tanggal Julian, deklinasi matahari, sudut jam — dibangun khusus untuk mempelajari perhitungan ini dari dasar sebelum diporting ke kalkulator aplikasi mobile Prayer Time berbasis React Native. Secara otomatis mendeteksi metode perhitungan maupun zona waktu dari koordinat mentah, dan menerapkan lima strategi fallback lintang tinggi yang berbeda untuk lokasi di mana rumus sudut matahari standar tidak memiliki solusi.",

        featureGroups: [
            {
                label: "Mesin perhitungan",
                items: [
                    "17 metode perhitungan bawaan (MWL, ISNA, Mesir, KEMENAG, Singapura, JAKIM, Makkah, Qatar, Kuwait, Dubai, Teheran, Turki, Prancis, Rusia, London, Karachi) dengan pemilihan metode otomatis berdasarkan negara",
                    "Alur perhitungan lengkap tanggal Julian → deklinasi matahari → sudut jam yang menghasilkan Fajr hingga Isya plus Tengah Malam dan Imsak",
                    "Dukungan mazhab Asar Standar vs. Hanafi",
                ],
            },
            {
                label: "Penanganan lintang tinggi",
                items: [
                    "Lima aturan fallback untuk lokasi di mana rumus sudut matahari standar tidak memiliki solusi: SEVENTH_OF_NIGHT, MIDDLE_OF_NIGHT, NEAREST_LATITUDE, TWILIGHT_ANGLE, dan NEAREST_DAY (Aqrab al-Ayyam)",
                    "NEAREST_DAY mencari ke luar hari demi hari untuk menemukan tanggal terdekat dengan solusi valid, mempertahankan waktu tersebut selama periode senja tetap berlangsung, lalu otomatis kembali ke perhitungan harian yang sesungguhnya",
                    "Lokasi matahari tengah malam sejati dengan benar mengembalikan N/A alih-alih waktu buatan — lihat Keterbatasan yang Diketahui",
                ],
            },
            {
                label: "Antarmuka",
                items: [
                    "Server web FastAPI dengan dokumentasi OpenAPI interaktif di /docs, mendeteksi zona waktu dan negara otomatis dari koordinat mentah",
                    "Sudah di-deploy dan live di Vercel — /docs bisa langsung dicoba di browser tanpa setup lokal",
                    "Pencarian kota di /times (?city=Jakarta) sebagai alternatif lat/lng, di-resolve secara offline terhadap dataset ~34 ribu kota dengan disambiguasi eksplisit lewat parameter country opsional",
                    "CLI main.py untuk perhitungan cepat lewat terminal, tanpa perlu menjalankan server",
                ],
            },
            {
                label: "Pengujian & verifikasi",
                items: [
                    "26 tes pytest: penjaga regresi terhadap dua bug di bawah, validasi input, resolusi/disambiguasi pencarian kota, dan kasus tepi lintang tinggi",
                    "Diperiksa silang terhadap 11 lokasi dunia nyata yang mencakup setiap benua dan kedua belahan bumi, 5 metode perhitungan, dan 3 offset zona waktu tidak lazim (termasuk UTC+5:30, UTC+5:45), cocok dengan referensi independen yang dipublikasikan hingga selisih 1-3 menit",
                ],
            },
        ],

        stackGroups: [
            {
                label: "Inti",
                items: ["Python", "FastAPI", "Uvicorn"],
            },
            {
                label: "Perhitungan",
                items: [
                    "Astronomi deklinasi matahari / sudut jam kustom — implementasi sendiri, tanpa library waktu salat pihak ketiga",
                ],
            },
            {
                label: "Lokasi & waktu",
                items: [
                    "reverse_geocode untuk pencarian negara dari koordinat",
                    "geonamescache untuk pencarian nama kota secara offline (~34 ribu tempat berpenduduk)",
                    "tzfpy + tzdata untuk resolusi zona waktu offline lewat zoneinfo",
                    "country_converter untuk normalisasi kode negara",
                ],
            },
            {
                label: "Pengujian",
                items: ["pytest + httpx — 26 tes mencakup lapisan kalkulator dan API"],
            },
            {
                label: "Deployment",
                items: ["Vercel"],
            },
        ],

        studyTitle: "Studi Kasus: Menemukan dan Memperbaiki Dua Bug Lintang Tinggi yang Tersembunyi",
        story: [
            {
                label: "Sinyal pertama",
                body: "Mesin perhitungan lolos pengujian santai selama berbulan-bulan — setiap kota berlintang rendah dan menengah selalu cocok. Bug-bug ini baru muncul ke permukaan setelah aplikasi mobile pendamping (porting TypeScript dari kalkulator yang sama) diuji secara intensif terhadap referensi waktu salat independen yang dipublikasikan, untuk kota-kota yang belum tercakup dalam pengujian awal. Tromsø, Norwegia pada bulan Juli mengembalikan waktu Fajr sebelum Maghrib pada malam yang sama — jelas keliru, karena Fajr seharusnya adalah fajar hari berikutnya.",
            },
            {
                label: "Akar masalah: dua bug terpisah",
                body: "Menelusuri `resolve_time()`, bug pertama adalah variabel yang salah label: `night_duration = 2 * ha_sun` sebenarnya menghitung panjang siang, bukan malam (`ha_sun` adalah sudut jam dari tengah hari matahari hingga terbenam, sehingga menggandakannya justru mencakup seluruh periode siang). Di Tromsø pada bulan Juli, ini menggelembungkan 'durasi malam' menjadi lebih dari 21 jam padahal malam sesungguhnya hanya ~2,5 jam — angka ini langsung masuk ke perhitungan offset fallback Fajr/Isya. Bug kedua lebih berdampak: sebuah safety clamp yang seharusnya hanya untuk kasus tepi ekstrem justru berjalan tanpa syarat pada setiap perhitungan untuk semua aturan kecuali `NEAREST_LATITUDE`, diam-diam menimpa hasil mentah yang sebenarnya sudah benar setiap kali dinilai terlalu jauh dari waktu matahari terbit/terbenam. New York City (40.7°LU) pada bulan Juli sama sekali tidak memiliki masalah lintang tinggi yang sesungguhnya, namun clamp tersebut tetap menggantikan nilai yang benar dengan nilai yang keliru.",
            },
            {
                label: "Memastikan perbaikan, bukan sekadar jawaban berbeda",
                body: "Kedua perbaikan diverifikasi lewat empat cara: menjalankan ulang kota-kota uji yang sama melalui porting TypeScript paralel dan memastikan hasilnya identik; memeriksa silang terhadap kalkulator independen yang dipublikasikan untuk kota-kota yang belum pernah dipakai selama pengembangan awal (New York, Winnipeg, Doha, Mumbai, Kathmandu, Nairobi), cocok hingga selisih 1-3 menit — variansi normal antar implementasi independen; memverifikasi bahwa kota-kota yang sebelumnya sudah benar (Jakarta, Riyadh) tidak berubah sama sekali; dan mengunci semuanya dalam rangkaian tes regresi pytest agar kedua bug tidak bisa muncul kembali secara diam-diam.",
            },
            {
                label: "Celah lanjutan",
                body: "Meninjau ulang perbaikan ini memunculkan celah desain terkait: string `high_latitude_rule` yang tidak dikenali diam-diam meruntuhkan Fajr menjadi waktu Terbit dan Isya menjadi Maghrib tanpa error apa pun, karena perhitungan offset jatuh melewati semua cabang ke nilai default `0`. Keluaran itu terlihat masuk akal — sebuah waktu yang nyata, hanya saja keliru — persis jenis kegagalan yang mudah bersembunyi di produksi. Diperbaiki dengan validasi dini saat konstruksi objek, didukung oleh `config.py` yang dikoreksi, yang secara terpisah ternyata belum memuat satu dari empat opsi aturan yang didokumentasikan (`TWILIGHT_ANGLE`).",
            },
            {
                label: "Memperluas fitur secara hati-hati",
                body: "`NEAREST_DAY` (Aqrab al-Ayyam) ditambahkan untuk menangani lokasi senja tetap — waktu terbit/terbenam matahari yang sesungguhnya masih terjadi, tetapi sudut Fajr/Isya tidak dapat dicapai. Versi awal mencoba memperluas substitusi yang sama ke Terbit/Maghrib untuk kasus matahari tengah malam sejati, dan sempat merilis bug nyata selama pengembangan: pencarian hari-terdekat-valid milik Fajr dan Terbit berjalan independen dan mendarat di hari yang berbeda, menghasilkan jadwal dengan Fajr muncul setelah Terbit. Tertangkap oleh pemeriksaan sanity otomatis sebelum rilis, dan diperbaiki dengan membatasi cakupan fitur secara benar, bukan menambal gejalanya.",
            },
        ],

        notes: [
            {
                title: "Matahari tengah malam sejati tetap mengembalikan N/A",
                body: "`NEAREST_DAY` hanya menggantikan Fajr/Isya untuk senja tetap, di mana terbit/terbenam matahari biasa masih terjadi. Matahari tengah malam sejati — di mana matahari tidak pernah terbenam sama sekali — tidak memiliki aturan yang menghasilkan jawaban yang bisa dipakai, secara sengaja; perluasan ke arah itu pernah dicoba dan dibatalkan setelah menghasilkan jadwal yang tidak konsisten secara internal (lihat studi kasus di atas).",
            },
            {
                title: "Reverse-geocoding melemah secara diam-diam untuk koordinat terpencil",
                body: "`reverse_geocode` selalu mengembalikan titik terdekat yang diketahui terlepas dari jarak sesungguhnya, sehingga koordinat di tengah laut lepas bisa diatribusikan ke daratan terdekat mana pun — yang bisa jadi sangat jauh — tanpa ambang batas jarak atau kepercayaan untuk menolkannya.",
            },
            {
                title: "Pencarian kota hanya mencakup dataset geonamescache",
                body: "Sekitar 34 ribu tempat berpenduduk di atas ambang batas ukuran tertentu — kota atau desa kecil di bawah itu tidak akan ter-resolve dan mengembalikan `404`; gunakan koordinat untuk kasus tersebut. Nama yang ambigu (mis. \"Paris\") secara default memakai kecocokan paling padat penduduknya alih-alih error, meski `meta.city` selalu melaporkan persis kota mana yang dipakai sehingga disambiguasi yang keliru tetap terlihat, bukan tersembunyi.",
            },
            {
                title: "Tidak ada tanggal kalender Hijriah",
                body: "Hanya tanggal Masehi yang dihitung. Aplikasi mobile pendamping memiliki konversi Hijriah lewat modul terpisah; modul itu belum diporting kembali ke API ini.",
            },
            {
                title: "Tidak ada caching atau rate limiting",
                body: "Setiap permintaan menghitung ulang dari awal dan memanggil library geocoding setiap kali — cukup untuk penggunaan pribadi atau skala kecil, tetapi perlu perhatian tambahan sebelum digunakan pada trafik tinggi.",
            },
        ],
    },
} as const;
