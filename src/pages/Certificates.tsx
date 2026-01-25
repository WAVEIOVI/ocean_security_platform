import { Award, Download, Eye } from "lucide-react";
import { CERTIFICATES, SITES } from "../data/mockData";
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
                                <Button variant="outline" className="w-full gap-2" onClick={() => (cert as any).downloadUrl && window.open((cert as any).downloadUrl, '_blank')}>
                                    <Download size={16} /> {t('certificates.pdf')}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Certificate Viewer Modal */}
            <Modal isOpen={!!selectedCert} onClose={() => setSelectedCert(null)} className="max-w-7xl">
                {selectedCert && (
                    <div className="h-full flex flex-col">
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-white border-b border-slate-100 p-6 flex justify-between items-start z-10">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900">{t('certificates.cert_of_conformity')}</h2>
                                <p className="text-slate-500 mt-1 flex items-center gap-2">
                                    <span className="bg-slate-100 px-2 py-0.5 rounded text-xs font-mono">{selectedCert.reference}</span>
                                    <span>•</span>
                                    <span>{selectedCert.issueDate}</span>
                                </p>
                            </div>
                            <div className="flex gap-2 pr-10">
                                {(selectedCert as any).fileUrl && (
                                    <Button variant="secondary" onClick={() => window.open(`${import.meta.env.BASE_URL}${(selectedCert as any).fileUrl.replace(/^\/+/, '')}`, '_blank')}>
                                        <Eye size={18} className="mr-2" />
                                        {t('common.view')}
                                    </Button>
                                )}
                                <Button variant="outline" onClick={() => (selectedCert as any).downloadUrl && window.open(`${import.meta.env.BASE_URL}${(selectedCert as any).downloadUrl.replace(/^\/+/, '')}`, '_blank')}>
                                    <Download size={18} className="mr-2" />
                                    {t('certificates.pdf')}
                                </Button>
                            </div>
                        </div>

                        {/* Certificate Content - Actual HTML via Iframe */}
                        <div className="flex-1 overflow-hidden min-h-[600px]">
                            <iframe
                                src={`${import.meta.env.BASE_URL}reports/certificate.html`}
                                className="w-full h-full border-0"
                                title="Certificate of Conformity"
                            />
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
