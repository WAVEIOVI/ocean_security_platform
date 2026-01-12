import { useState } from "react";
import { FileText, Download, Filter, Search, ChevronDown, CheckCircle2, AlertTriangle, XCircle, Truck, Users, Calendar, MapPin, Wrench, Shield, ThumbsUp } from "lucide-react";
import { REPORTS, SITES, EQUIPMENT } from "../data/mockData";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { useLanguage } from "../context/LanguageContext";

export default function Reports() {
    const { t } = useLanguage();
    const [selectedReport, setSelectedReport] = useState<typeof REPORTS[0] | null>(null);

    // Derive equipment list for the selected report's site
    const equipmentList = selectedReport
        ? EQUIPMENT.filter(e => e.siteId === selectedReport.siteId)
        : [];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-brand-primary">{t('nav.reports')}</h1>
                    <p className="text-slate-500 text-sm">{t('reports.subtitle')}</p>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                    <div className="relative flex-1 sm:flex-initial">
                        <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder={t('common.search')}
                            className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary w-full"
                        />
                    </div>
                    <Button variant="outline" className="flex items-center gap-2">
                        <Filter size={18} />
                        <span className="hidden sm:inline">{t('common.filter')}</span>
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {REPORTS.map((report) => (
                    <div
                        key={report.id}
                        className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                        onClick={() => setSelectedReport(report)}
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                                <FileText size={24} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900">{report.reference}</h3>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-sm text-slate-500 mt-1">
                                    <span className="flex items-center gap-1">
                                        <Calendar size={14} /> {report.date}
                                    </span>
                                    <span className="hidden sm:inline">•</span>
                                    <span className="flex items-center gap-1">
                                        <MapPin size={14} /> {SITES.find(s => s.id === report.siteId)?.name}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                            <Badge variant={report.status === 'compliant' ? 'success' : 'warning'}>
                                {report.status === 'compliant' ? t('status.compliant') : t('status.attention')}
                            </Badge>
                            <Button variant="ghost" size="sm">
                                <ChevronDown size={20} className="text-slate-400" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Comprehensive Technical Report Modal (Long Scroll) */}
            {selectedReport && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-in zoom-in-50 duration-200 flex flex-col">

                        {/* Modal Header */}
                        <div className="sticky top-0 bg-white border-b border-slate-100 p-6 flex justify-between items-start z-10 rounded-t-2xl">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900">{t('report.mission_report')}</h2>
                                <p className="text-slate-500 mt-1 flex items-center gap-2">
                                    <span className="bg-slate-100 px-2 py-0.5 rounded text-xs font-mono">{selectedReport.reference}</span>
                                    <span>•</span>
                                    <span>{selectedReport.date}</span>
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" onClick={() => {/* Download Logic */ }}>
                                    <Download size={18} className="mr-2" />
                                    {t('common.download')}
                                </Button>
                                <button
                                    onClick={() => setSelectedReport(null)}
                                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                                >
                                    <XCircle size={24} className="text-slate-400" />
                                </button>
                            </div>
                        </div>

                        {/* Report Content - Long Scroll */}
                        <div className="p-8 space-y-10">

                            {/* 1. Header & Context */}
                            <div className="flex justify-between items-start border-b border-slate-100 pb-8">
                                <div className="flex items-center gap-4">
                                    <img src="/assets/logoocean.png" alt="Ocean Security" className="h-16 w-auto" />
                                    <div>
                                        <h3 className="font-bold text-brand-primary text-lg">OCEAN SECURITY</h3>
                                        <p className="text-sm text-slate-500">Tunis, Tunisie</p>
                                        <p className="text-sm text-slate-500">contact@oceansecurity.tn</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <h4 className="font-semibold text-slate-900">{t('report.client_info')}</h4>
                                    <p className="text-slate-600">Company XYZ</p>
                                    <p className="text-sm text-slate-500">{t('nav.sites')}: {SITES.find(s => s.id === selectedReport.siteId)?.name}</p>
                                </div>
                            </div>

                            {/* 2. Logistics & Team */}
                            <section>
                                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                    <Users className="text-brand-secondary" size={20} />
                                    {t('report.team_logistics')}
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">{t('report.technicians')}</p>
                                        <div className="font-medium text-slate-900">
                                            {selectedReport.technicianTeam?.join(', ')}
                                        </div>
                                    </div>
                                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">{t('report.transport')}</p>
                                        <div className="font-medium text-slate-900 flex items-center gap-2">
                                            <Truck size={16} />
                                            {selectedReport.logistics?.vehicle}
                                        </div>
                                    </div>
                                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">{t('report.duration')}</p>
                                        <div className="font-medium text-slate-900">
                                            {selectedReport.logistics?.start} - {selectedReport.logistics?.end}
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* 3. Technical Execution (Equipment Table) */}
                            <section>
                                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                    <Wrench className="text-brand-secondary" size={20} />
                                    {t('report.technical_execution')}
                                </h3>
                                <div className="overflow-hidden rounded-xl border border-slate-200">
                                    <table className="w-full text-sm">
                                        <thead className="bg-slate-50 text-slate-600 font-medium">
                                            <tr>
                                                <th className="p-3 text-left">{t('report.equipment')}</th>
                                                <th className="p-3 text-left">{t('report.location')}</th>
                                                <th className="p-3 text-center">{t('report.specs')}</th>
                                                <th className="p-3 text-center">{t('common.status')}</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {equipmentList.map((item, idx) => (
                                                <tr key={idx} className="hover:bg-slate-50/50">
                                                    <td className="p-3 font-medium text-slate-900">{item.type}</td>
                                                    <td className="p-3 text-slate-500">{item.location}</td>
                                                    <td className="p-3 text-center text-xs text-slate-400">
                                                        {item.pressure} • {item.weight} • {item.manufactureDate}
                                                    </td>
                                                    <td className="p-3 text-center">
                                                        <Badge variant={item.status === 'active' ? 'success' : item.status === 'attention' ? 'warning' : 'danger'} className="mx-auto">
                                                            {item.status === 'active' ? t('status.verified') : item.status === 'attention' ? t('status.recharged') : t('status.replaced')}
                                                        </Badge>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </section>

                            {/* 4. Analysis & Results */}
                            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                        <Shield className="text-brand-secondary" size={20} />
                                        {t('report.analysis')}
                                    </h3>

                                    <div className="space-y-4">
                                        {/* Recommendations (Critical) */}
                                        <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
                                            <h4 className="text-amber-800 font-semibold mb-2 flex items-center gap-2">
                                                <AlertTriangle size={16} /> {t('report.recommendations')}
                                            </h4>
                                            <ul className="list-disc list-inside text-sm text-amber-700 space-y-1">
                                                {selectedReport.recommendations?.map((rec, i) => (
                                                    <li key={i}>{rec}</li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Improvements (Positive) */}
                                        <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4">
                                            <h4 className="text-emerald-800 font-semibold mb-2 flex items-center gap-2">
                                                <CheckCircle2 size={16} /> {t('report.improvements')}
                                            </h4>
                                            <ul className="list-disc list-inside text-sm text-emerald-700 space-y-1">
                                                {selectedReport.improvements?.map((imp, i) => (
                                                    <li key={i}>{imp}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* 5. Client Satisfaction */}
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                        <ThumbsUp className="text-brand-secondary" size={20} />
                                        {t('report.client_satisfaction')}
                                    </h3>
                                    <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 text-center">
                                        <div className="flex justify-center gap-1 mb-2">
                                            {[...Array(5)].map((_, i) => (
                                                <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center ${i < (selectedReport.clientSatisfaction?.rating || 0) ? 'bg-yellow-400 text-white' : 'bg-slate-200 text-slate-400'}`}>
                                                    ★
                                                </div>
                                            ))}
                                        </div>
                                        <p className="text-slate-600 italic mb-6">"{selectedReport.clientSatisfaction?.comment}"</p>

                                        <div className="border-t border-slate-200 pt-6">
                                            <div className="flex justify-between items-end">
                                                <div className="text-left">
                                                    <p className="text-xs text-slate-400 uppercase">{t('report.approved_by')}</p>
                                                    <p className="font-handwriting text-2xl text-blue-900 mt-2 transform -rotate-2">Client Signature</p>
                                                </div>
                                                <img src="/assets/logo_approuve.png" alt="Approved" className="h-16 w-auto opacity-80" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
