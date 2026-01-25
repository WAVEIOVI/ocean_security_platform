import { useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, addMonths, subMonths } from "date-fns";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, MapPin, BadgeCheck, User } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { useLanguage } from "../context/LanguageContext";
import { MISSIONS, SITES } from "../data/mockData";
import { cn } from "../lib/utils";

export default function Missions() {
    const { t } = useLanguage();
    const [currentDate, setCurrentDate] = useState(new Date());

    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

    const startDay = monthStart.getDay(); // 0 = Sunday
    const paddingCount = startDay === 0 ? 6 : startDay - 1;
    const paddingArray = Array(paddingCount).fill(null);

    const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
    const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));

    const getMissionsForDay = (date: Date) => {
        return MISSIONS.filter(m => {
            const startDate = new Date(m.date);
            const endDate = m.endDate ? new Date(m.endDate) : startDate;
            return date >= startDate && date <= endDate;
        });
    };

    const getSiteName = (siteId: number) => SITES.find(s => s.id === siteId)?.name || 'Unknown Site';

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
                <div>
                    <h1 className="text-2xl font-bold text-brand-primary">{t('nav.missions')}</h1>
                    <p className="text-slate-500 text-sm">{t('missions.subtitle')}</p>
                </div>
                <Button>
                    <CalendarIcon size={16} /> {t('missions.request')}
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Calendar View */}
                <Card className="lg:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                        <CardTitle className="text-base font-semibold">
                            {format(currentDate, 'MMMM yyyy')}
                        </CardTitle>
                        <div className="flex gap-1">
                            <Button variant="outline" size="sm" onClick={prevMonth} className="h-8 w-8 p-0">
                                <ChevronLeft size={16} />
                            </Button>
                            <Button variant="outline" size="sm" onClick={nextMonth} className="h-8 w-8 p-0">
                                <ChevronRight size={16} />
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-7 gap-px bg-slate-200 rounded-lg overflow-hidden border border-slate-200">
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                                <div key={day} className="bg-slate-50 p-2 text-center text-xs font-semibold text-slate-500">
                                    {day}
                                </div>
                            ))}

                            {paddingArray.map((_, i) => (
                                <div key={`pad-${i}`} className="bg-white min-h-[100px]" />
                            ))}

                            {daysInMonth.map(day => {
                                const dayMissions = getMissionsForDay(day);
                                const isCurrentMonth = isSameMonth(day, currentDate);
                                return (
                                    <div
                                        key={day.toISOString()}
                                        className={cn(
                                            "bg-white min-h-[100px] p-2 transition-colors hover:bg-slate-50 relative group flex flex-col gap-1",
                                            !isCurrentMonth && "bg-slate-50/50 text-slate-400",
                                            isToday(day) && "bg-brand-primary/5"
                                        )}
                                    >
                                        <span className={cn(
                                            "text-sm font-medium w-6 h-6 flex items-center justify-center rounded-full mb-1",
                                            isToday(day) ? "bg-brand-primary text-white" : "text-slate-700"
                                        )}>
                                            {format(day, 'd')}
                                        </span>

                                        <div className="space-y-1">
                                            {dayMissions.map(mission => (
                                                <div key={mission.id} className="text-[10px] p-1.5 rounded-md bg-sky-100 text-sky-800 font-medium border-l-2 border-sky-500 shadow-sm cursor-pointer hover:bg-sky-200 transition-colors">
                                                    <div className="truncate font-bold">{mission.reference}</div>
                                                    <div className="truncate text-sky-600 font-normal">{getSiteName(mission.siteId)}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>

                {/* Upcoming / Details List */}
                <Card>
                    <CardHeader>
                        <CardTitle>{t('missions.upcoming_recent')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {MISSIONS.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 6).map(mission => (
                                <div key={mission.id} className="flex gap-3 pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                                    <div className={cn(
                                        "flex flex-col items-center justify-center w-12 h-12 rounded-lg shrink-0",
                                        new Date(mission.date) >= new Date() ? "bg-slate-100" : "bg-emerald-50 text-emerald-700"
                                    )}>
                                        <span className="text-xs uppercase font-bold opacity-60">{format(new Date(mission.date), 'MMM')}</span>
                                        <span className="text-lg font-bold">{format(new Date(mission.date), 'd')}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-semibold text-sm text-slate-900 truncate pr-2">{mission.reference}</h4>
                                            <Badge variant={mission.status === 'completed' ? 'success' : 'neutral'} className="text-[10px] px-1.5 py-0">
                                                {mission.status}
                                            </Badge>
                                        </div>

                                        <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                                            <MapPin size={12} /> {getSiteName(mission.siteId)}
                                        </div>
                                        <div className="flex items-center gap-1 text-xs text-brand-primary/80 mt-1 font-medium">
                                            <BadgeCheck size={12} /> {mission.trigger}
                                        </div>
                                        {mission.technician && (
                                            <div className="flex items-center gap-1 text-xs text-slate-400 mt-1">
                                                <User size={12} /> {mission.technician}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button variant="outline" className="w-full mt-4">{t('missions.view_all')}</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
