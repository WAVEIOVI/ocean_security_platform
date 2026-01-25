import { Phone, Mail, MapPin, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { useLanguage } from "../context/LanguageContext";

export default function Support() {
    const { t } = useLanguage();

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-2xl font-bold text-brand-primary">{t('nav.support')}</h1>
                <p className="text-slate-500 text-sm">{t('support.subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('support.contact_us')}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700">{t('support.name')}</label>
                                        <input className="w-full h-10 px-3 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20" placeholder={t('support.name')} defaultValue="Skander Jrad" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700">{t('support.email')}</label>
                                        <input className="w-full h-10 px-3 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20" placeholder={t('support.email')} defaultValue="ahmed.bs@demo.tn" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">{t('support.subject')}</label>
                                    <select className="w-full h-10 px-3 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 bg-white">
                                        <option>{t('missions.request')}</option>
                                        <option>{t('support.report_issue')}</option>
                                        <option>{t('support.sales_inquiry')}</option>
                                        <option>{t('support.other')}</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">{t('support.message')}</label>
                                    <textarea className="w-full h-32 px-3 py-2 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20" placeholder={t('support.message')} />
                                </div>
                                <Button className="w-full md:w-auto">
                                    <Send size={16} /> {t('support.send')}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-0 h-[300px] bg-slate-100 flex items-center justify-center relative overflow-hidden rounded-xl">
                            <MapPin size={48} className="text-slate-300 mb-2" />
                            <span className="text-slate-500 font-medium z-10">{t('support.hq_map')}</span>
                            {/* Simulated Map Background */}
                            <div className="absolute inset-0 bg-slate-200 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-100 to-slate-200" />
                            {/* Grid Pattern */}
                            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px', opacity: 0.5 }}></div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card className="bg-brand-primary text-white border-none shadow-lg shadow-brand-primary/20">
                        <CardContent className="pt-6">
                            <h3 className="font-bold text-lg mb-4">{t('support.emergency_contact')}</h3>
                            <p className="text-brand-secondary text-sm mb-6">{t('support.emergency_text')}</p>
                            <div className="flex items-center gap-3 text-2xl font-bold bg-white/10 p-4 rounded-lg">
                                <Phone size={24} />
                                <span>74 299 518</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader><CardTitle>{t('support.office_info')}</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex gap-3">
                                <MapPin className="text-brand-primary shrink-0" size={20} />
                                <div>
                                    <p className="font-medium text-slate-900">{t('support.company_name')}</p>
                                    <p className="text-slate-500 text-sm whitespace-pre-line">{t('support.hq_address')}</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Mail className="text-brand-primary shrink-0" size={20} />
                                <div>
                                    <p className="font-medium text-slate-900">{t('support.email')}</p>
                                    <p className="text-slate-500 text-sm">contact@oceansecurity.tn</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
