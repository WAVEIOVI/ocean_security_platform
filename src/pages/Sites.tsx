import {
    ArrowRight,
    MapPin,
    PieChart as PieChartIcon,
    BarChart as BarChartIcon
} from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Modal } from "../components/ui/Modal";
import { useLanguage } from "../context/LanguageContext";
import { SITES, EQUIPMENT } from "../data/mockData";

import { useState } from "react";

export default function Sites() {
    const { t } = useLanguage();
    const [selectedSite, setSelectedSite] = useState<typeof SITES[0] | null>(null);

    // Helper to get stats for a site
    const getSiteStats = (siteId: number) => {
        const siteEquip = EQUIPMENT.filter((e) => e.siteId === siteId);
        return {
            total: siteEquip.length,
            active: siteEquip.filter(e => e.status === 'active').length,
            inactive: siteEquip.filter(e => e.status === 'inactive').length,
            attention: siteEquip.filter(e => e.status === 'attention').length,
            outOfWork: siteEquip.filter(e => e.status === 'out_of_work').length,
            byType: [
                { name: 'Extincteurs', value: siteEquip.filter(e => e.category === 'Extincteur').length },
                { name: 'RIA DN 33', value: siteEquip.filter(e => e.type === 'RIA DN 33').length },
                { name: 'Lance Canon', value: siteEquip.filter(e => e.type === 'Lance Canon').length },
                { name: 'Poteaux Incendie', value: siteEquip.filter(e => e.type === 'Poteau Incendie').length },
            ],
            extincteursByType: [
                { name: 'Poudre', value: siteEquip.filter(e => e.type.toLowerCase().includes('poudre')).length },
                { name: 'CO2', value: siteEquip.filter(e => e.type.toLowerCase().includes('co2')).length },
            ]
        };
    };

    const COLORS = ['#0A2540', '#00A9A5', '#94a3b8', '#3b82f6'];



    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-2xl font-bold text-brand-primary">{t('nav.sites')}</h1>
                <p className="text-slate-500 text-sm">{t('sites.subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {SITES.map((site) => (
                    <Card key={site.id} className="group hover:shadow-md transition-all duration-300 border-slate-200 cursor-pointer">
                        <div className="h-40 bg-slate-100 relative overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                                <MapPin size={48} className="opacity-20" />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60" />
                            <div className="absolute bottom-3 left-4 text-white">
                                <Badge variant={getSiteStats(site.id).attention > 0 ? 'warning' : 'success'} className="mb-1 border-0">
                                    {getSiteStats(site.id).attention > 0 ? t('status.attention') : t('status.compliant')}
                                </Badge>
                            </div>
                        </div>

                        <CardContent className="space-y-4">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-primary transition-colors">{site.name}</h3>
                                <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                                    <MapPin size={14} /> {site.address}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="p-3 bg-slate-50 rounded-lg">
                                    <span className="block text-slate-500 text-xs">{t('stats.total_equipment')}</span>
                                    <span className="font-semibold text-slate-900">{getSiteStats(site.id).total}</span>
                                </div>
                                <div className="p-3 bg-slate-50 rounded-lg">
                                    <span className="block text-slate-500 text-xs">{t('sites.last_inspection')}</span>
                                    <span className="font-semibold text-slate-900">{site.lastInspection}</span>
                                </div>
                            </div>

                            <Button
                                className="w-full justify-between group-hover:bg-brand-primary group-hover:text-white"
                                variant="outline"
                                onClick={() => setSelectedSite(site)}
                            >
                                {t('common.view_details')} <ArrowRight size={16} />
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Site Details Modal */}
            <Modal isOpen={!!selectedSite} onClose={() => setSelectedSite(null)} className="max-w-4xl max-h-[90vh] overflow-y-auto">
                {selectedSite && (
                    <div className="p-6">
                        <div className="flex flex-col md:flex-row justify-between gap-4 mb-8 border-b border-slate-100 pb-6">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <h2 className="text-2xl font-bold text-slate-900">{selectedSite.name}</h2>
                                    <Badge variant={getSiteStats(selectedSite.id).attention > 0 ? 'warning' : 'success'}>
                                        {getSiteStats(selectedSite.id).attention > 0 ? t('status.attention') : t('status.compliant')}
                                    </Badge>
                                </div>
                                <p className="text-slate-500 flex items-center gap-1">
                                    <MapPin size={16} /> {selectedSite.address}
                                </p>
                            </div>
                            <div className="flex gap-3 items-start">
                                <div className="text-right">
                                    <p className="text-xs text-slate-500">{t('sites.last_inspection')}</p>
                                    <p className="font-semibold text-slate-900">{selectedSite.lastInspection}</p>
                                </div>
                                <div className="text-right border-l border-slate-200 pl-4">
                                    <p className="text-xs text-slate-500">{t('sites.next_inspection')}</p>
                                    <p className="font-semibold text-brand-primary">{selectedSite.nextInspection}</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                            {/* Site Specific Stats */}
                            <Card className="bg-slate-50 border-none shadow-none">
                                <CardContent className="p-4">
                                    <p className="text-sm text-slate-500">{t('stats.total_equipment')}</p>
                                    <p className="text-2xl font-bold text-slate-900">{getSiteStats(selectedSite.id).total}</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-emerald-50 border-none shadow-none">
                                <CardContent className="p-4">
                                    <p className="text-sm text-emerald-600">{t('stats.active')}</p>
                                    <p className="text-2xl font-bold text-emerald-700">{getSiteStats(selectedSite.id).active}</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-orange-50 border-none shadow-none">
                                <CardContent className="p-4">
                                    <p className="text-sm text-orange-600">{t('status.attention')}</p>
                                    <p className="text-2xl font-bold text-orange-700">{getSiteStats(selectedSite.id).attention}</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-slate-100 border-none shadow-none">
                                <CardContent className="p-4">
                                    <p className="text-sm text-slate-500">{t('stats.inactive')}</p>
                                    <p className="text-2xl font-bold text-slate-700">{getSiteStats(selectedSite.id).outOfWork + getSiteStats(selectedSite.id).inactive}</p>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Category Chart */}
                            <div className="h-[300px]">
                                <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                    <PieChartIcon size={18} /> {t('sites.equipment_by_category')}
                                </h3>
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={getSiteStats(selectedSite.id).byType}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {getSiteStats(selectedSite.id).byType.map((_, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend verticalAlign="bottom" height={36} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Extincteurs by Type Chart */}
                            <div className="h-[300px]">
                                <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                    <PieChartIcon size={18} /> Extincteurs par catégories
                                </h3>
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={getSiteStats(selectedSite.id).extincteursByType}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {getSiteStats(selectedSite.id).extincteursByType.map((_, index) => (
                                                <Cell key={`cell-ext-${index}`} fill={COLORS[(index + 3) % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend verticalAlign="bottom" height={36} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Zone Distribution */}
                            <div className="md:col-span-2">
                                <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                    <BarChartIcon size={18} /> {t('sites.zone_distribution')}
                                </h3>
                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-dashed border-slate-300">
                                    <span className="text-sm font-medium text-slate-600 italic">Zones non identifiées</span>
                                    <Badge variant="neutral">Report Pending</Badge>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
