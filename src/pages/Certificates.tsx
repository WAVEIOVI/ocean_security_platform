import { Award, Download, Eye, CheckCircle2, MapPin, FileText } from "lucide-react";
import { CERTIFICATES, SITES, REPORTS } from "../data/mockData";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Modal } from "../components/ui/Modal";
import { useLanguage } from "../context/LanguageContext";
import { useState } from "react";

export default function Certificates() {
    const { t } = useLanguage();
    const [selectedCert, setSelectedCert] = useState<typeof CERTIFICATES[0] | null>(null);

    const getSiteName = (siteId: number) => SITES.find(s => s.id === siteId)?.name || 'Unknown Site';

    // Find associated report to get the summary/findings for the certificate view
    const getReportForCert = (missionId: number) => REPORTS.find(r => r.missionId === missionId);

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-2xl font-bold text-brand-primary">{t('nav.certificates')}</h1>
                <p className="text-slate-500 text-sm">{t('certificates.subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {CERTIFICATES.map(cert => (
                    <Card key={cert.id} className="relative overflow-hidden border-t-4 border-t-brand-primary group hover:shadow-lg transition-shadow">
                        {cert.status === 'expiring_soon' && (
                            <div className="absolute top-0 right-0 p-2">
                                <span className="flex h-3 w-3 relative">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                                </span>
                            </div>
                        )}
                        <CardContent className="pt-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-12 h-12 bg-brand-primary/10 text-brand-primary rounded-full flex items-center justify-center">
                                    <Award size={24} />
                                </div>
                                <Badge variant={cert.status === 'active' ? 'success' : 'warning'}>
                                    {cert.status === 'active' ? 'Active' : 'Expiring'}
                                </Badge>
                            </div>

                            <h3 className="font-bold text-lg text-slate-900 mb-1">{cert.reference}</h3>
                            <p className="text-sm text-slate-500 mb-4">{cert.type}</p>

                            <div className="bg-slate-50 rounded-lg p-3 mb-4 space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-slate-500">{t('certificates.issued')}:</span>
                                    <span className="text-slate-900 font-semibold">{cert.issueDate}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">{t('certificates.expires')}:</span>
                                    <span className={cert.status === 'expiring_soon' ? "text-amber-600 font-semibold" : "text-slate-900 font-semibold"}>
                                        {cert.expiryDate}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">{t('certificates.site')}:</span>
                                    <span className="text-slate-900 truncate max-w-[150px]">{getSiteName(cert.siteId)}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <Button variant="secondary" className="w-full gap-2" onClick={() => setSelectedCert(cert)}>
                                    <Eye size={16} /> {t('common.view')}
                                </Button>
                                <Button variant="outline" className="w-full gap-2">
                                    <Download size={16} /> {t('certificates.pdf')}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Certificate Viewer Modal (Reusing the previous Report Style layout as requested) */}
            <Modal isOpen={!!selectedCert} onClose={() => setSelectedCert(null)} className="max-w-3xl max-h-[90vh] overflow-y-auto">
                {selectedCert && (
                    <div className="bg-white min-h-[800px] flex flex-col text-sm border-t-8 border-brand-primary">
                        {/* Header */}
                        <div className="p-8 border-b border-slate-200 flex justify-between items-start">
                            <div className="flex items-center gap-3">
                                <img src="/assets/logoocean.png" alt="Ocean Security" className="h-16 w-auto object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />
                                <div>
                                    <h2 className="text-xl font-bold text-brand-primary">OCEAN SECURITY</h2>
                                    <p className="text-xs text-slate-500">Fire Safety & Prevention Services</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <h3 className="text-xl font-bold text-slate-900 mb-1">{t('certificates.cert_of_conformity')}</h3>
                                <p className="text-slate-500 font-mono">{selectedCert.reference}</p>
                                <p className="font-semibold text-slate-900 mt-2">{t('certificates.valid_until')}: {selectedCert.expiryDate}</p>
                            </div>
                        </div>

                        <div className="p-8 space-y-8">
                            {/* Info Grid */}
                            <div className="grid grid-cols-2 gap-8 bg-slate-50 p-6 rounded-lg border border-slate-100">
                                <div>
                                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{t('certificates.client_site')}</h4>
                                    <p className="font-semibold text-slate-900 text-lg">DEMO Manufacturing Company</p>
                                    <p className="text-slate-600 flex items-center gap-2 mt-1"><MapPin size={16} /> {getSiteName(selectedCert.siteId)}</p>
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{t('certificates.cert_details')}</h4>
                                    <p className="text-slate-900 font-medium">Type: {selectedCert.type}</p>
                                    <p className="text-slate-900 font-medium flex items-center gap-2 mt-1"><FileText size={16} /> {t('certificates.mission_ref')}: {selectedCert.reference.split(' - ')[1]}</p>
                                </div>
                            </div>

                            {/* Using the Report Summary Content Here */}
                            {(() => {
                                const report = getReportForCert(selectedCert.missionId);
                                return report ? (
                                    <>
                                        {/* Executive Summary */}
                                        <div>
                                            <h4 className="text-lg font-bold text-brand-primary mb-3 border-b border-slate-100 pb-2">{t('certificates.executive_summary')}</h4>
                                            <p className="text-slate-700 leading-relaxed">{report.summary}</p>
                                        </div>

                                        {/* Findings Table (as justification for certificate status) */}
                                        <div>
                                            <h4 className="text-lg font-bold text-brand-primary mb-3 border-b border-slate-100 pb-2">{t('certificates.inspection_findings')}</h4>
                                            {report.findings && report.findings.length > 0 ? (
                                                <table className="w-full text-left border-collapse">
                                                    <thead>
                                                        <tr className="border-b border-slate-200">
                                                            <th className="py-2 font-semibold text-slate-600">{t('report.equipment')}</th>
                                                            <th className="py-2 font-semibold text-slate-600">{t('table.issue')}</th>
                                                            <th className="py-2 font-semibold text-slate-600">{t('table.action_taken')}</th>
                                                            <th className="py-2 font-semibold text-slate-600">{t('common.status')}</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {report.findings.map((finding: any, i: number) => (
                                                            <tr key={i} className="border-b border-slate-100">
                                                                <td className="py-3 font-mono text-slate-600">{finding.equipment}</td>
                                                                <td className="py-3 text-red-600 font-medium">{finding.issue}</td>
                                                                <td className="py-3 text-slate-700">{finding.action}</td>
                                                                <td className="py-3">
                                                                    <Badge variant={finding.status === 'resolved' ? 'success' : 'warning'}>
                                                                        {finding.status}
                                                                    </Badge>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            ) : (
                                                <div className="p-4 bg-emerald-50 text-emerald-700 rounded-lg flex items-center gap-3">
                                                    <CheckCircle2 size={20} />
                                                    {t('certificates.no_issues')}
                                                </div>
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <p className="text-slate-500 italic">{t('certificates.no_data')}</p>
                                )
                            })()}

                            {/* Footer Signatures */}
                            <div className="grid grid-cols-2 gap-12 mt-12 pt-8 border-t border-slate-200">
                                <div>
                                    {/* Stamp Place */}
                                    <div className="w-40 h-20 mb-2 flex items-center justify-center border-2 border-brand-primary border-dashed rounded opacity-50 font-sans text-brand-primary font-bold -rotate-6">
                                        OCEAN SECURITY<br />{t('certificates.official_stamp')}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase mb-8">{t('certificates.auth_signature')}</p>
                                    <img src="/assets/logo_approuve.png" className="h-16 mb-4 object-contain" alt="Signature" onError={(e) => e.currentTarget.style.display = 'none'} />
                                    <div className="h-px bg-slate-300 mt-2"></div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-between items-center mt-auto">
                            <p className="text-xs text-slate-400">{t('certificates.generated_by')} • {new Date().getFullYear()}</p>
                            <Button className="gap-2">
                                <Download size={16} /> {t('certificates.download_pdf')}
                            </Button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
