export const USERS = {
    demo: {
        id: 1,
        name: "Ahmed Ben Salah",
        role: "Facility Manager",
        company: "DEMO Manufacturing Company",
        email: "ahmed.bs@demo-manufacturing.tn",
        avatar: "https://ui-avatars.com/api/?name=Ahmed+Ben+Salah&background=0A2540&color=fff"
    }
};

export const SITES = [
    {
        id: 1,
        name: "Tunis Industrial Zone",
        address: "Zone Industrielle Charguia II, Tunis",
        equipmentCount: 18,
        lastInspection: "2025-12-15",
        nextInspection: "2026-06-15",
        status: "compliant",
        coordinates: { lat: 36.85, lng: 10.2 }
    },
    {
        id: 2,
        name: "Sfax Factory",
        address: "Route de Gabès km 4, Sfax",
        equipmentCount: 15,
        lastInspection: "2025-11-20",
        nextInspection: "2026-05-20",
        status: "compliant",
        coordinates: { lat: 34.74, lng: 10.76 }
    },
    {
        id: 3,
        name: "Sousse Warehouse",
        address: "Zone Industrielle Sidi Abdelhamid, Sousse",
        equipmentCount: 12,
        lastInspection: "2026-01-05",
        nextInspection: "2026-07-05",
        status: "attention",
        coordinates: { lat: 35.82, lng: 10.64 }
    }
];

export const EQUIPMENT = [
    // Tunis Site (ID 1)
    { id: "EQ-TN-001", type: "Extincteur Eau", category: "Extincteur", location: "Hall d'entrée", siteId: 1, status: "active", lastMaintenance: "2025-12-15", weight: "9kg", pressure: "14 bar", manufactureDate: "2022" },
    { id: "EQ-TN-002", type: "Extincteur CO2", category: "Extincteur", location: "Salle Serveurs", siteId: 1, status: "active", lastMaintenance: "2025-12-15", weight: "5kg", pressure: "55 bar", manufactureDate: "2023" },
    { id: "EQ-TN-003", type: "RIA", category: "RIA", location: "Couloir A", siteId: 1, status: "active", lastMaintenance: "2025-12-15", weight: "N/A", pressure: "4 bar", manufactureDate: "2020" },
    { id: "EQ-TN-004", type: "Extincteur Poudre", category: "Extincteur", location: "Atelier", siteId: 1, status: "attention", lastMaintenance: "2025-12-15", weight: "6kg", pressure: "12 bar", manufactureDate: "2019" },
    { id: "EQ-TN-005", type: "Détection Incendie", category: "Autre", location: "Bureaux", siteId: 1, status: "active", lastMaintenance: "2025-12-15", weight: "N/A", pressure: "N/A", manufactureDate: "2021" },
    { id: "EQ-TN-006", type: "Extincteur CO2", category: "Extincteur", location: "Cuisine", siteId: 1, status: "active", lastMaintenance: "2025-12-15", weight: "2kg", pressure: "55 bar", manufactureDate: "2023" },
    { id: "EQ-TN-007", type: "Bloc Secours", category: "Autre", location: "Escaliers", siteId: 1, status: "out_of_work", lastMaintenance: "2025-12-15", weight: "N/A", pressure: "N/A", manufactureDate: "2018" },
    { id: "EQ-TN-008", type: "Extincteur Eau", category: "Extincteur", location: "Zone Livraison", siteId: 1, status: "active", lastMaintenance: "2025-12-15", weight: "9kg", pressure: "14 bar", manufactureDate: "2022" },

    // Sfax Site (ID 2)
    { id: "EQ-SF-001", type: "Extincteur Poudre", category: "Extincteur", location: "Production", siteId: 2, status: "active", lastMaintenance: "2025-11-20", weight: "50kg", pressure: "15 bar", manufactureDate: "2021" },
    { id: "EQ-SF-002", type: "Extincteur Poudre", category: "Extincteur", location: "Production", siteId: 2, status: "active", lastMaintenance: "2025-11-20", weight: "6kg", pressure: "14 bar", manufactureDate: "2022" },
    { id: "EQ-SF-003", type: "RIA", category: "RIA", location: "Entrée", siteId: 2, status: "active", lastMaintenance: "2025-11-20", weight: "N/A", pressure: "4 bar", manufactureDate: "2020" },
    { id: "EQ-SF-004", type: "Sprinklers", category: "Autre", location: "Stockage", siteId: 2, status: "active", lastMaintenance: "2025-11-20", weight: "N/A", pressure: "6 bar", manufactureDate: "2019" },
    { id: "EQ-SF-005", type: "Extincteur CO2", category: "Extincteur", location: "Local Technique", siteId: 2, status: "inactive", lastMaintenance: "2025-11-20", weight: "5kg", pressure: "55 bar", manufactureDate: "2018" },
    { id: "EQ-SF-006", type: "Extincteur Eau", category: "Extincteur", location: "Bureaux Admin", siteId: 2, status: "active", lastMaintenance: "2025-11-20", weight: "6kg", pressure: "14 bar", manufactureDate: "2023" },

    // Sousse Site (ID 3)
    { id: "EQ-SO-001", type: "Extincteur Poudre", category: "Extincteur", location: "Quai 1", siteId: 3, status: "active", lastMaintenance: "2026-01-05", weight: "9kg", pressure: "14 bar", manufactureDate: "2024" },
    { id: "EQ-SO-002", type: "RIA", category: "RIA", location: "Quai 2", siteId: 3, status: "attention", lastMaintenance: "2026-01-05", weight: "N/A", pressure: "3 bar", manufactureDate: "2020" },
    { id: "EQ-SO-003", type: "Détection Incendie", category: "Autre", location: "Entrepôt", siteId: 3, status: "active", lastMaintenance: "2026-01-05", weight: "N/A", pressure: "N/A", manufactureDate: "2022" },
    { id: "EQ-SO-004", type: "Extincteur CO2", category: "Extincteur", location: "Poste Garde", siteId: 3, status: "active", lastMaintenance: "2026-01-05", weight: "2kg", pressure: "55 bar", manufactureDate: "2023" },
    { id: "EQ-SO-005", type: "Extincteur Eau", category: "Extincteur", location: "Vestiaires", siteId: 3, status: "active", lastMaintenance: "2026-01-05", weight: "6kg", pressure: "14 bar", manufactureDate: "2023" },
];

export const MISSIONS = [
    // Upcoming / Recent
    {
        id: 1,
        reference: "MISSION-260105",
        date: "2026-01-05",
        type: "Mission d'Intervention",
        trigger: "Scheduled (6-month)",
        siteId: 3,
        status: "completed",
        technician: "Sami Mansour",
        description: "Inspection semestrielle réglementaire."
    },
    {
        id: 2,
        reference: "MISSION-260120",
        date: "2026-01-20",
        type: "Mission d'Intervention",
        trigger: "Client Request",
        siteId: 2,
        status: "scheduled",
        technician: "Karim Ben Ali",
        description: "Réparation système RIA signalée."
    },
    {
        id: 3,
        reference: "MISSION-260615",
        date: "2026-06-15",
        type: "Mission d'Intervention",
        trigger: "Scheduled (6-month)",
        siteId: 1,
        status: "scheduled",
        technician: "Sami Mansour",
        description: "Inspection semestrielle réglementaire."
    },
    // Past
    {
        id: 4,
        reference: "MISSION-251215",
        date: "2025-12-15",
        type: "Mission d'Intervention",
        trigger: "Scheduled (6-month)",
        siteId: 1,
        status: "completed",
        technician: "Ahmed Tounsi",
        description: "Inspection semestrielle réglementaire."
    },
    {
        id: 5,
        reference: "MISSION-251120",
        date: "2025-11-20",
        type: "Mission d'Intervention",
        trigger: "Scheduled (6-month)",
        siteId: 2,
        status: "completed",
        technician: "Karim Ben Ali",
        description: "Inspection semestrielle réglementaire."
    }
];

export const REPORTS = [
    {
        id: 101,
        missionId: 4,
        reference: "Mission Report 251215",
        title: "Rapport Technique - Tunis",
        date: "2025-12-15",
        siteId: 1,
        status: "available",
        size: "1.2 MB",
        technician: "Ahmed Tounsi",
        technicianTeam: ["Ahmed Tounsi", "Ridha Weslaty"],
        logistics: {
            vehicle: "Fiat Doblo 170 TN 4502",
            start: "08:30",
            end: "14:45",
            distance: "25km"
        },
        summary: "Inspection complète effectuée. 2 extincteurs rechargés. Système de détection fonctionnel.",
        findings: [
            { equipment: "EQ-TN-004", issue: "Pression basse", action: "Recharge effectuée", status: "resolved" },
            { equipment: "EQ-TN-007", issue: "Batterie HS", action: "À remplacer", status: "pending" }
        ],
        technicalData: {
            devicesChecked: 35,
            devicesRecharged: 2,
            devicesReplaced: 0,
            verificationPoints: [
                { name: "Accessibilité", status: "OK" },
                { name: "Signalisation", status: "OK" },
                { name: "État mécanique", status: "Attention" },
                { name: "Pression", status: "OK" }
            ]
        },
        recommendations: [
            "Prévoir le remplacement des batteries bloc secours sous 30 jours.",
            "Dégager l'accès au RIA du Couloir A (encombré par des palettes).",
            "Mise à jour du plan d'évacuation recommandée."
        ],
        improvements: [
            "Nettoyage complet des têtes de détection effectué.",
            "Formation rapide du personnel sur place à l'utilisation du nouvel extincteur CO2."
        ],
        clientSatisfaction: {
            rating: 5,
            comment: "Intervention rapide et professionnelle. Merci pour les conseils.",
            signatory: "M. Ahmed Ben Salah"
        }
    },
    {
        id: 102,
        missionId: 5,
        reference: "Mission Report 251120",
        title: "Rapport Technique - Sfax",
        date: "2025-11-20",
        siteId: 2,
        status: "available",
        size: "0.8 MB",
        technician: "Karim Ben Ali",
        technicianTeam: ["Karim Ben Ali"],
        logistics: {
            vehicle: "Peugeot Partner 165 TN 8890",
            start: "09:00",
            end: "12:30",
            distance: "145km"
        },
        summary: "Maintenance préventive standard. Aucun défaut majeur constaté.",
        findings: [],
        technicalData: {
            devicesChecked: 42,
            devicesRecharged: 0,
            devicesReplaced: 0,
            verificationPoints: [
                { name: "Accessibilité", status: "OK" },
                { name: "Signalisation", status: "OK" },
                { name: "État mécanique", status: "OK" },
                { name: "Pression", status: "OK" }
            ]
        },
        recommendations: [
            "Aucune action corrective urgente requise.",
            "Prochaine visite préventive à planifier pour Mai 2026."
        ],
        improvements: [
            "Vérification supplémentaire des vannes d'arrêt du système Sprinkler."
        ],
        clientSatisfaction: {
            rating: 4,
            comment: "Bien, RAS.",
            signatory: "M. Imed Trabelsi"
        }
    },
    {
        id: 103,
        missionId: 1,
        reference: "Mission Report 260105",
        title: "Rapport Technique - Sousse",
        date: "2026-01-05",
        siteId: 3,
        status: "available",
        size: "1.5 MB",
        technician: "Sami Mansour",
        technicianTeam: ["Sami Mansour", "Ali Khemiri"],
        logistics: {
            vehicle: "Isuzu D-Max 180 TN 3321",
            start: "10:15",
            end: "16:00",
            distance: "90km"
        },
        summary: "Inspection semestrielle. 1 RIA nécessite un changement de joint.",
        findings: [
            { equipment: "EQ-SO-002", issue: "Fuite légère", action: "Joint à commander", status: "pending" }
        ],
        technicalData: {
            devicesChecked: 28,
            devicesRecharged: 0,
            devicesReplaced: 0,
            verificationPoints: [
                { name: "Accessibilité", status: "OK" },
                { name: "Signalisation", status: "Attention" },
                { name: "État mécanique", status: "OK" },
                { name: "Pression", status: "OK" }
            ]
        },
        recommendations: [
            "Remplacement du joint RIA Quai 2 (Devis envoyé).",
            "Remplacer l'affiche de consigne de sécurité décolorée au poste de garde."
        ],
        improvements: [
            "Graissage des vannes RIA effectué.",
            "Test de débit réel sur 3 bouches d'incendie : Conforme."
        ],
        clientSatisfaction: {
            rating: 5,
            comment: "Techniciens ponctuels et très compétents.",
            signatory: "Mme. Lobna Jendoubi"
        }
    }
];

export const CERTIFICATES = [
    {
        id: "CERT-251215",
        missionId: 4,
        reference: "Certificate - Mission 251215",
        type: "Certificat de Conformité",
        siteId: 1,
        issueDate: "2025-12-15",
        expiryDate: "2026-06-15",
        status: "active"
    },
    {
        id: "CERT-251120",
        missionId: 5,
        reference: "Certificate - Mission 251120",
        type: "Certificat de Conformité",
        siteId: 2,
        issueDate: "2025-11-20",
        expiryDate: "2026-05-20",
        status: "active"
    },
    {
        id: "CERT-260105",
        missionId: 1,
        reference: "Certificate - Mission 260105",
        type: "Certificat de Conformité",
        siteId: 3,
        issueDate: "2026-01-05",
        expiryDate: "2026-07-05",
        status: "active"
    }
];
