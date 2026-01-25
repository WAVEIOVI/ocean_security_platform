import { useState } from "react";
import { FileText, Download, Filter, Search, ChevronDown, Calendar, MapPin } from "lucide-react";
import { REPORTS, SITES } from "../data/mockData";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Modal } from "../components/ui/Modal";
import { useLanguage } from "../context/LanguageContext";

export default function Reports() {
    const { t } = useLanguage();
    const [selectedReport, setSelectedReport] = useState<typeof REPORTS[0] | null>(null);

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

            {/* Comprehensive Technical Report Modal */}
            <Modal isOpen={!!selectedReport} onClose={() => setSelectedReport(null)} className="max-w-7xl">
                {selectedReport && (
                    <div className="h-full flex flex-col">
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-white border-b border-slate-100 p-6 flex justify-between items-start z-10">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900">{t('report.mission_report')}</h2>
                                <p className="text-slate-500 mt-1 flex items-center gap-2">
                                    <span className="bg-slate-100 px-2 py-0.5 rounded text-xs font-mono">{selectedReport.reference}</span>
                                    <span>•</span>
                                    <span>{selectedReport.date}</span>
                                </p>
                            </div>
                            <div className="flex gap-2 pr-10">
                                {selectedReport.fileUrl && (
                                    <Button variant="secondary" onClick={() => window.open(`${import.meta.env.BASE_URL}${selectedReport.fileUrl.replace(/^\/+/, '')}`, '_blank')}>
                                        <FileText size={18} className="mr-2" />
                                        {t('common.view')}
                                    </Button>
                                )}
                                <Button variant="outline" onClick={() => selectedReport.downloadUrl && window.open(`${import.meta.env.BASE_URL}${selectedReport.downloadUrl.replace(/^\/+/, '')}`, '_blank')}>
                                    <Download size={18} className="mr-2" />
                                    {t('common.download')}
                                </Button>
                            </div>
                        </div>

                        {/* Report Content - Actual HTML via Iframe */}
                        <div className="flex-1 overflow-hidden">
                            <iframe
                                src={`${import.meta.env.BASE_URL}reports/mission-report-fr.html`}
                                className="w-full h-full border-0"
                                title="Mission Report"
                            />
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
