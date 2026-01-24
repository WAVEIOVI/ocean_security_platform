export const USERS = {
    demo: {
        id: 1,
        name: "Skander Jrad",
        role: "Responsable QHSE",
        company: "SERINUS TUNISIA B.V.",
        email: "skander.jrad@serinus.tn",
        avatar: "https://ui-avatars.com/api/?name=Skander+Jrad&background=0A2540&color=fff"
    }
};

export const SITES = [
    {
        id: 1,
        name: "Chouech Essaida et station El Borma",
        address: "Sud Tunisien, Tataouine",
        equipmentCount: 170,
        lastInspection: "2026-01-19",
        nextInspection: "2026-07-09",
        status: "compliant",
        coordinates: { lat: 31.3000, lng: 9.8000 }
    }
];

// ... (EQUIPMENT generation code remains the same)

export const EQUIPMENT = generateEquipment();

export const MISSIONS = [
    {
        id: 1,
        reference: "MR-2026-001-SERINUS",
        date: "2026-01-09",
        endDate: "2026-01-19",
        type: "Vérification Périodique",
        trigger: "Scheduled (6-month)",
        siteId: 1,
        status: "completed",
        technician: "M. Kallel, M. Chafei",
        description: "Inspection et entretien (09/01 - 19/01). Durée: 11 jours."
    },
    {
        id: 2,
        reference: "MISSION-260709",
        date: "2026-07-09",
        type: "Vérification Périodique",
        trigger: "Scheduled (6-month)",
        siteId: 1,
        status: "scheduled",
        technician: "À définir",
        description: "Prochaine inspection semestrielle réglementaire."
    }
];

export const REPORTS = [
    {
        id: 101,
        missionId: 1,
        reference: "MR-2026-001-SERINUS",
        title: "Rapport de Mission - SERINUS TUNISIA",
        date: "2026-01-24",
        siteId: 1,
        status: "compliant",
        size: "3.2 MB",
        technician: "M. Kallel",
        technicianTeam: ["M. Kallel", "M. Chafei"],
        logistics: {
            vehicle: "Véhicule client 4x4",
            start: "09/01/2026",
            end: "19/01/2026",
            distance: "~950 km"
        },
        summary: "Taux global de conformité : 99,4%. 170 équipements inspectés.",
        findings: [
            { equipment: "112", issue: "Déformation, corrosion massive", action: "Réforme immédiate", status: "resolved" },
            { equipment: "9", issue: "Perforation importante", action: "Remplacement complet", status: "resolved" }
        ],
        technicalData: {
            devicesChecked: 170,
            devicesRecharged: 12,
            devicesReplaced: 2,
            verificationPoints: [
                { name: "Cohérence type", status: "OK" },
                { name: "Numérotation", status: "OK" },
                { name: "Signalétique", status: "OK" },
                { name: "Pression", status: "OK" }
            ]
        },
        recommendations: [
            "Remplacement systématique des joints d'étanchéité des poteaux d'incendie.",
            "Remplacement de la vanne d'arrêt défaillante sur Lance canon.",
            "Mise en place d'un système informatique de suivi."
        ],
        improvements: [
            "Les extincteurs vides ont été rechargés.",
            "La poudre périmée a été remplacée.",
            "Les pièces défectueuses ont été remplacées."
        ],
        clientSatisfaction: {
            rating: 5,
            comment: "Mission effectuée avec succès.",
            signatory: "M. Skander Jrad"
        },
        fileUrl: "/reports/mission-report-fr.html",
        downloadUrl: "/reports/mission-report.pdf"
    }
];

export const CERTIFICATES = [
    {
        id: "CERT-MR-2026-001",
        missionId: 1,
        reference: "Certificat de Conformité - SERINUS",
        type: "Certificat de Conformité",
        siteId: 1,
        issueDate: "2026-01-24",
        expiryDate: "2027-01-20",
        status: "active",
        fileUrl: "/reports/certificate.html",
        downloadUrl: "/reports/certificate.pdf"
    }
];
