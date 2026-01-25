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


export interface Equipment {
    id: string;
    siteId: number;
    type: string;
    category: string;
    location: string;
    status: 'active' | 'inactive' | 'attention' | 'out_of_work';
    lastMaintenance: string;
    pressure?: string;
    weight?: string;
    manufactureDate?: string;
}

const generateEquipment = (): Equipment[] => {
    const items: Equipment[] = [];

    // Inventaire Réel du Rapport : 170 Unités
    // Extincteurs (Poudre + CO2): 144
    // 108 Poudre: 9 (1kg), 9 (6kg), 66 (9kg), 24 (50kg)
    // 36 CO2: 7 (2kg), 29 (5kg)
    // RIA DN 33: 3
    // Lance Canon: 3
    // Poteaux Incendie: 20

    // Poudre 1kg (9)
    for (let i = 1; i <= 9; i++) {
        items.push({
            id: `EXT-P01-${i.toString().padStart(2, '0')}`,
            siteId: 1,
            type: "Extincteur 1kg Poudre ABC",
            category: "Extincteur",
            location: "Zone non identifiée",
            status: i === 1 ? 'out_of_work' : 'active',
            lastMaintenance: "2026-01-15",
            weight: '1 kg',
            manufactureDate: '2024'
        });
    }

    // Poudre 6kg (9)
    for (let i = 1; i <= 9; i++) {
        items.push({
            id: `EXT-P06-${i.toString().padStart(2, '0')}`,
            siteId: 1,
            type: "Extincteur 6kg Poudre ABC",
            category: "Extincteur",
            location: "Zone non identifiée",
            status: 'active',
            lastMaintenance: "2026-01-15",
            weight: '6 kg',
            manufactureDate: '2024'
        });
    }

    // Poudre 9kg (66)
    for (let i = 1; i <= 66; i++) {
        items.push({
            id: `EXT-P09-${i.toString().padStart(2, '0')}`,
            siteId: 1,
            type: "Extincteur 9kg Poudre ABC",
            category: "Extincteur",
            location: "Zone non identifiée",
            status: 'active',
            lastMaintenance: "2026-01-15",
            weight: '9 kg',
            manufactureDate: '2024'
        });
    }

    // Poudre 50kg (24)
    for (let i = 1; i <= 24; i++) {
        items.push({
            id: `EXT-P50-${i.toString().padStart(2, '0')}`,
            siteId: 1,
            type: "Extincteur 50kg Poudre ABC",
            category: "Extincteur",
            location: "Zone non identifiée",
            status: 'active',
            lastMaintenance: "2026-01-15",
            weight: '50 kg',
            manufactureDate: '2024'
        });
    }

    // CO2 2kg (7)
    for (let i = 1; i <= 7; i++) {
        items.push({
            id: `EXT-C02-${i.toString().padStart(2, '0')}`,
            siteId: 1,
            type: "Extincteur 2kg CO2",
            category: "Extincteur",
            location: "Zone non identifiée",
            status: 'active',
            lastMaintenance: "2026-01-15",
            weight: '2 kg',
            manufactureDate: '2024'
        });
    }

    // CO2 5kg (29)
    for (let i = 1; i <= 29; i++) {
        items.push({
            id: `EXT-C05-${i.toString().padStart(2, '0')}`,
            siteId: 1,
            type: "Extincteur 5kg CO2",
            category: "Extincteur",
            location: "Zone non identifiée",
            status: 'active',
            lastMaintenance: "2026-01-15",
            weight: '5 kg',
            manufactureDate: '2024'
        });
    }

    // RIA DN 33 (3)
    for (let i = 1; i <= 3; i++) {
        items.push({
            id: `RIA-${i.toString().padStart(3, '0')}`,
            siteId: 1,
            type: "RIA DN 33",
            category: "RIA",
            location: "Zone non identifiée",
            status: 'active',
            lastMaintenance: "2026-01-15"
        });
    }

    // Lance Canon (3)
    for (let i = 1; i <= 3; i++) {
        items.push({
            id: `CAN-${i.toString().padStart(3, '0')}`,
            siteId: 1,
            type: "Lance Canon",
            category: "Autre",
            location: "Zone non identifiée",
            status: 'active',
            lastMaintenance: "2026-01-15"
        });
    }

    // Poteau Incendie (20)
    for (let i = 1; i <= 20; i++) {
        items.push({
            id: `POT-${i.toString().padStart(3, '0')}`,
            siteId: 1,
            type: "Poteau Incendie",
            category: "Autre",
            location: "Zone non identifiée",
            status: 'active',
            lastMaintenance: "2026-01-15"
        });
    }

    return items;
};

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
        endDate: "2026-07-19",
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
        status: "attention",
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
            { equipment: "EXT-P01-01", issue: "Déformation, corrosion massive", action: "Réforme immédiate", status: "resolved" }
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
            "01 Urgence immédiate : Remplacement des joints d'étanchéité des poteaux d'incendie.",
            "01 Court terme : Remplacement de la vanne d'arrêt sur Lance canon et bouchon DN60.",
            "01 Long terme : Mise en place d'un système informatique de suivi."
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
