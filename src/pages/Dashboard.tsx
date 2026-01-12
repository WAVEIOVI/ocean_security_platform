import { Activity, AlertTriangle, Package, TrendingUp, Clock, FileText, Award, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { EQUIPMENT, MISSIONS, REPORTS, CERTIFICATES } from "../data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useLanguage } from "../context/LanguageContext";
import { cn } from "../lib/utils";

export default function Dashboard() {
    const { t } = useLanguage();

    // Stats Calculations
    const totalEquipment = EQUIPMENT.length;
    const activeEquipment = EQUIPMENT.filter(e => e.status === 'active').length;
    const attentionEquipment = EQUIPMENT.filter(e => e.status === 'attention').length;
    const inactiveEquipment = EQUIPMENT.filter(e => ['inactive', 'out_of_work'].includes(e.status)).length;

    // Global Equipment Stats for Chart
    const equipmentStats = [
        { name: t('stats.active'), value: activeEquipment, color: '#10b981' }, // Emerald-500
        { name: t('status.attention'), value: attentionEquipment, color: '#f59e0b' }, // Amber-500
        { name: t('stats.inactive'), value: inactiveEquipment, color: '#ef4444' }, // Red-500
    ];

    const upcomingMissions = MISSIONS.filter(m => {
        const missionDate = new Date(m.date);
        const today = new Date();
        return missionDate >= today && missionDate.getFullYear() === 2026;
    }).length;

    // Combined Activity Feed
    const allActivity = [
        ...REPORTS.map(r => ({ type: 'report', date: r.date, ref: r.reference, siteId: r.siteId, id: r.id })),
        ...CERTIFICATES.map(c => ({ type: 'certificate', date: c.issueDate, ref: c.reference, siteId: c.siteId, id: c.id }))
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-2xl font-bold text-brand-primary">{t('dashboard.title')}</h1>
                <p className="text-slate-500 text-sm">{t('header.welcome')}, Ahmed Ben Salah</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">{t('stats.total_equipment')}</CardTitle>
                        <Package className="h-4 w-4 text-emerald-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900">{totalEquipment}</div>
                        <div className="flex gap-2 text-xs mt-1">
                            <span className="text-emerald-600 font-medium">{activeEquipment} {t('stats.active')}</span>
                            <span className="text-amber-600 font-medium">{attentionEquipment} {t('status.attention')}</span>
                            <span className="text-slate-400">{inactiveEquipment} {t('stats.inactive')}</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">{t('stats.compliance')}</CardTitle>
                        <Activity className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900">92%</div>
                        <p className="text-xs text-emerald-600 flex items-center mt-1">
                            <TrendingUp className="h-3 w-3 mr-1" /> +2% {t('dashboard.from_last_month')}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">{t('dashboard.pending_actions')}</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900">{attentionEquipment}</div>
                        <p className="text-xs text-slate-500 mt-1">{t('dashboard.requires_maintenance')}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">{t('stats.missions')} (2026)</CardTitle>
                        <Calendar className="h-4 w-4 text-brand-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900">{upcomingMissions}</div>
                        <p className="text-xs text-slate-500 mt-1">{t('dashboard.scheduled_year')}</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Global Equipment Overview Chart */}
                <Card className="col-span-1 lg:col-span-2">
                    <CardHeader>
                        <CardTitle>{t('dashboard.equipment_overview')}</CardTitle>
                        <p className="text-sm text-slate-500">{t('dashboard.by_status')}</p>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={equipmentStats} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    cursor={{ fill: 'transparent' }}
                                />
                                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={30}>
                                    {equipmentStats.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Recent Activity Feed */}
                <Card>
                    <CardHeader>
                        <CardTitle>{t('dashboard.recent_activity')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {allActivity.map((item, i) => (
                                <div key={i} className="flex items-start gap-3 pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                                    <div className={cn(
                                        "p-2 rounded-full",
                                        item.type === 'report' ? "bg-blue-50 text-blue-600" : "bg-emerald-50 text-emerald-600"
                                    )}>
                                        {item.type === 'report' ? <FileText size={14} /> : <Award size={14} />}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-900">{item.ref}</p>
                                        <div className="flex items-center text-xs text-slate-500 mt-0.5">
                                            <Clock size={10} className="mr-1" />
                                            {item.date}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
