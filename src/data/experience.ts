export interface ExperienceItem {
    id: string;
    period: string;
    role: {
        en: string;
        id: string;
    };
    organization: string;
    location: string;
    category: "agency" | "fieldwork" | "education";
    categoryLabel: {
        en: string;
        id: string;
    };
    metric?: {
        en: string;
        id: string;
    };
    bullets: {
        en: string[];
        id: string[];
    };
    techStack?: string[];
}

export const experiences: ExperienceItem[] = [
    {
        id: "bpbd-malang-2025",
        period: "2025",
        role: {
            en: "Disaster Risk Assessment Enumerator",
            id: "Enumerator Kajian Risiko Bencana",
        },
        organization: "Regional Disaster Management Agency (BPBD) Malang City",
        location: "Malang City, East Java",
        category: "agency",
        categoryLabel: {
            en: "Government / Agency",
            id: "Instansi Pemerintah",
        },
        metric: {
            en: "540 High-Risk Points Verified",
            id: "540 Titik Rawan Tervalidasi",
        },
        bullets: {
            en: [
                "Conducted spatial field validation and precision geo-tagging of 540 high-risk disaster points across 3 kecamatan (sub-districts).",
                "Assessed physical vulnerability, hazard exposure, and spatial infrastructure readiness to inform regional contingency and mitigation planning.",
            ],
            id: [
                "Melakukan validasi lapangan spasial dan *geo-tagging* presisi terhadap 540 titik rawan bencana di 3 kecamatan di Kota Malang.",
                "Mengidentifikasi kerentanan fisik, paparan bahaya, serta kesiapan infrastruktur spasial untuk memperkuat basis data rencana kontinjensi dan mitigasi daerah.",
            ],
        },
        techStack: ["GPS Field Tagging", "QGIS", "Spatial Risk Analysis", "Disaster Management"],
    },
    {
        id: "ditjen-tataruang-2024",
        period: "Feb 2024 — Jun 2024",
        role: {
            en: "Detailed Spatial Planning (RDTR) Drafting Team",
            id: "Tim Penyusun Rencana Detail Tata Ruang (RDTR)",
        },
        organization: "Directorate General of Spatial Planning (INSPIRING / MSIB Batch VI)",
        location: "Ministry of ATR/BPN",
        category: "agency",
        categoryLabel: {
            en: "Ministry Internship",
            id: "Magang Kementerian",
        },
        metric: {
            en: "12 Planning Maps · 92% Progress",
            id: "12 Peta Rencana · Progres 92%",
        },
        bullets: {
            en: [
                "Drafted and finalized 12 official *Peta Rencana* (Planning Maps) for the RDTR Tegalsari development planning project in accordance with national spatial regulations.",
                "Achieved 92% project completion across spatial zoning, land-use designation, and regulatory compliance within strict ministerial timelines.",
            ],
            id: [
                "Menyusun dan memfinalisasi 12 Peta Rencana resmi untuk dokumen perencanaan pengembangan RDTR Tegalsari sesuai standar regulasi Kementerian ATR/BPN.",
                "Mencapai 92% penyelesaian proyek perencanaan zonasi ruang, struktur ruang, dan kesesuaian pola ruang berdasarkan tenggat waktu kementerian.",
            ],
        },
        techStack: ["ArcGIS Pro", "RDTR Zoning", "Cartography", "Spatial Data Management", "Regulatory GIS"],
    },
    {
        id: "kkl-3-2024",
        period: "2024",
        role: {
            en: "KKL 3 Treasurer & Soil Research Specialist",
            id: "Bendahara KKL 3 & Spesialis Riset Tanah",
        },
        organization: "Universitas Negeri Malang (KKL 3)",
        location: "Krisik Village, Blitar, East Java",
        category: "fieldwork",
        categoryLabel: {
            en: "Geospatial Fieldwork",
            id: "Riset Lapangan",
        },
        metric: {
            en: "33.6% Cost Savings (IDR 11.16M saved)",
            id: "Efisiensi 33,6% (Hemat Rp11,16 Juta)",
        },
        bullets: {
            en: [
                "Conducted comprehensive soil physical and chemical surveys in Krisik Village, Blitar, to evaluate agricultural land suitability for sustainable high-yield crop production.",
                "Administered the total IDR 33.2M expedition budget with strict financial compliance, achieving 33.6% in cost savings (IDR 11.16M surplus) through rigorous cost management.",
            ],
            id: [
                "Melaksanakan survei sifat fisik dan kimia tanah di Desa Krisik, Blitar, guna menganalisis evaluasi kesesuaian lahan pertanian berkelanjutan dan komoditas unggulan.",
                "Mengelola total anggaran operasional ekspedisi sebesar Rp33,2 juta dengan pelaporan keuangan transparan, berhasil mencatat efisiensi biaya 33,6% (surplus Rp11,16 juta).",
            ],
        },
        techStack: ["Soil Suitability GIS", "Field Soil Sampling", "Budget Administration", "Spatial Land Eval"],
    },
    {
        id: "kkl-2-2023",
        period: "2023",
        role: {
            en: "KKL 2 Event Division & Hydro-Geophysics Team",
            id: "Divisi Acara & Tim Hidro-Geofisika KKL 2",
        },
        organization: "Universitas Negeri Malang (KKL 2)",
        location: "Watukarung Village, Pacitan, East Java",
        category: "fieldwork",
        categoryLabel: {
            en: "Geospatial Fieldwork",
            id: "Riset Lapangan",
        },
        metric: {
            en: "82 Field Participants Coordinated",
            id: "82 Peserta Lapangan Terkoordinasi",
        },
        bullets: {
            en: [
                "Estimated groundwater aquifer depth and potential in karst formations of Watukarung Village, Pacitan, using electrical resistivity and induced polarization (IP) geophysical methods.",
                "Planned, scheduled, and coordinated field operational workflows for 82 student researchers and faculty supervisors.",
            ],
            id: [
                "Mengestimasi potensi dan kedalaman akuifer air tanah di kawasan karst Desa Watukarung, Pacitan, menggunakan metode geofisika resistivitas (*geoelectric*) dan *induced polarization* (IP).",
                "Merancang susunan acara, koordinasi logistik lapangan, serta memimpin kelancaran alur kerja untuk 82 peserta ekspedisi dan dosen pembimbing.",
            ],
        },
        techStack: ["Geophysical Resistivity", "Induced Polarization", "Groundwater Modeling", "Field Coordination"],
    },
    {
        id: "kkl-1-2022",
        period: "2022",
        role: {
            en: "KKL 1 Logistics Division & Hydrology Team",
            id: "Divisi Logistik & Tim Hidrologi KKL 1",
        },
        organization: "Universitas Negeri Malang (KKL 1)",
        location: "Tutur Village, Pasuruan, East Java",
        category: "fieldwork",
        categoryLabel: {
            en: "Geospatial Fieldwork",
            id: "Riset Lapangan",
        },
        bullets: {
            en: [
                "Measured river discharge and water quality parameters across the Ngepring and Mbodo river systems in Tutur Village, Pasuruan, supporting watershed conservation analytics.",
                "Managed all technical survey instruments, safety equipment, and logistics procurement for the entire research cohort.",
            ],
            id: [
                "Melakukan pengukuran debit aliran sungai dan parameter kualitas air di Daerah Aliran Sungai (DAS) Sungai Ngepring dan Sungai Mbodo, Desa Tutur, Pasuruan.",
                "Mengelola inventarisasi instrumen teknis survei, peralatan keselamatan, dan kebutuhan logistik seluruh kontingen riset.",
            ],
        },
        techStack: ["Hydrological Gauging", "Water Quality Analysis", "Watershed Mapping", "Field Logistics"],
    },
    {
        id: "education-um",
        period: "2021 — Present",
        role: {
            en: "Bachelor of Science in Geography (Sains Geografi)",
            id: "Sarjana Sains Geografi (S.Si)",
        },
        organization: "State University of Malang (Universitas Negeri Malang)",
        location: "Malang, East Java",
        category: "education",
        categoryLabel: {
            en: "Higher Education",
            id: "Pendidikan Tinggi",
        },
        metric: {
            en: "GPA: 3.74 / 4.00",
            id: "IPK: 3,74 / 4,00",
        },
        bullets: {
            en: [
                "Focused on Geographic Information Systems (GIS), Satellite Remote Sensing, Spatial Planning, and Computational Geography.",
                "Bridging geospatial analytical methodologies with modern software engineering, automated data pipelines, and machine learning models.",
            ],
            id: [
                "Fokus pada Sistem Informasi Geografis (GIS), Penginderaan Jauh Satelit, Perencanaan Spasial Wilayah, dan Komputasi Geospasial.",
                "Menjembatani metodologi analisis geografi dengan rekayasa perangkat lunak modern, otomatisasi data *pipeline*, dan model *machine learning* spasial.",
            ],
        },
        techStack: ["ArcGIS Pro", "Google Earth Engine", "QGIS", "Python", "Spatial Data Science"],
    },
];
