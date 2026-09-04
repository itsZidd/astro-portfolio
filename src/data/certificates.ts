export interface CertificateItem {
    id: string;
    title: string;
    issuer: string;
    platform: "Esri" | "edX";
    issueDate: string;
    skills: string[];
    credentialUrl?: string;
    description?: {
        en: string;
        id: string;
    };
}

export const certificates: CertificateItem[] = [
    {
        id: "gis-image-analysis-alaska",
        title: "GIS3x: GIS Image Analysis in ArcGIS Pro",
        issuer: "University of Alaska Fairbanks (edX)",
        platform: "edX",
        issueDate: "Jan 2024",
        skills: ["ArcGIS Pro", "Image Classification", "Remote Sensing", "Multispectral Imagery"],
        description: {
            en: "Advanced satellite image analysis, raster pixel processing, raster classifications, and feature extraction in ArcGIS Pro.",
            id: "Analisis citra satelit tingkat lanjut, pemrosesan piksel raster, klasifikasi citra terawasi/tak terawasi, dan ekstraksi fitur di ArcGIS Pro.",
        },
    },
    {
        id: "spatial-data-science-esri",
        title: "Spatial Data Science: The New Frontier in Analytics",
        issuer: "Esri",
        platform: "Esri",
        issueDate: "Oct 2023",
        skills: ["Spatial Statistics", "Machine Learning", "ArcGIS Spatial Analyst", "Predictive Modeling"],
        description: {
            en: "Applying spatial statistics, spatial machine learning algorithms, clustering techniques, and predictive modeling for complex geographic data.",
            id: "Penerapan statistik spasial, algoritma *machine learning* spasial, teknik *clustering*, dan pemodelan prediktif untuk data geografis kompleks.",
        },
    },
    {
        id: "imagery-in-action-esri",
        title: "Imagery in Action",
        issuer: "Esri",
        platform: "Esri",
        issueDate: "Oct 2023",
        skills: ["Satellite Imagery", "Earth Observation", "Raster Analytics", "Lidar Processing"],
        description: {
            en: "Hands-on workflows for handling earth observation data, optical imagery, radar, and 3D elevation rasters within the ArcGIS ecosystem.",
            id: "Alur kerja praktis pengolahan data observasi bumi, citra optik, radar satelit, dan model elevasi digital dalam ekosistem ArcGIS.",
        },
    },
    {
        id: "gis-climate-change-esri",
        title: "GIS for Climate Change",
        issuer: "Esri",
        platform: "Esri",
        issueDate: "Nov 2023",
        skills: ["Climate Modeling", "Vulnerability Mapping", "Environmental GIS", "Risk Mitigation"],
        description: {
            en: "Spatial analysis methods for mapping environmental vulnerabilities, sea level rise simulations, and climate resilience planning.",
            id: "Metodologi analisis spasial untuk pemetaan kerentanan lingkungan, simulasi kenaikan muka air laut, dan perencanaan mitigasi iklim.",
        },
    },
    {
        id: "tropical-coastal-queensland",
        title: "Tropical Coastal Ecosystems",
        issuer: "The University of Queensland (edX)",
        platform: "edX",
        issueDate: "Dec 2023",
        skills: ["Coastal Ecosystems", "Marine Spatial Planning", "Ecosystem Monitoring", "Conservation"],
        description: {
            en: "Scientific monitoring and spatial management of coral reefs, mangroves, and tropical coastal ecosystems under environmental stress.",
            id: "Pemantauan saintifik dan pengelolaan spasial ekosistem terumbu karang, mangrove, dan kawasan pesisir tropis berkelanjutan.",
        },
    },
];
