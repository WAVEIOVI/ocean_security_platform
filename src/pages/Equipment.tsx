import { useState } from "react";
import { Search, Download } from "lucide-react";
import { EQUIPMENT, SITES } from "../data/mockData";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/Table";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { useLanguage } from "../context/LanguageContext";
import { Card } from "../components/ui/Card";

export default function Equipment() {
    const { t } = useLanguage();
    const [search, setSearch] = useState("");
    const [siteFilter, setSiteFilter] = useState("all");
    const [categoryFilter, setCategoryFilter] = useState("all");

    const filteredEquipment = EQUIPMENT.filter(item => {
        const matchesSearch =
            item.type.toLowerCase().includes(search.toLowerCase()) ||
            item.location.toLowerCase().includes(search.toLowerCase()) ||
            item.id.toLowerCase().includes(search.toLowerCase());

        const matchesSite = siteFilter === "all" || item.siteId.toString() === siteFilter;
        const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;

        return matchesSearch && matchesSite && matchesCategory;
    });

    const getSiteName = (siteId: number) => SITES.find(s => s.id === siteId)?.name || "Unknown Site";

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
                <div>
                    <h1 className="text-2xl font-bold text-brand-primary">{t('nav.equipment')}</h1>
                    <p className="text-slate-500 text-sm">{t('equipment.subtitle')}</p>
                </div>

            </div>

            <Card className="p-4">
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                        <input
                            placeholder={t('equipment.search_placeholder')}
                            className="pl-9 h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <select
                            className="h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                            value={siteFilter}
                            onChange={(e) => setSiteFilter(e.target.value)}
                        >
                            <option value="all">{t('equipment.all_sites')}</option>
                            {SITES.map(site => (
                                <option key={site.id} value={site.id}>{site.name}</option>
                            ))}
                        </select>
                        <select
                            className="h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                        >
                            <option value="all">{t('equipment.all_categories')}</option>
                            {Array.from(new Set(EQUIPMENT.map(e => e.category))).map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>{t('table.id')}</TableHead>
                            <TableHead>{t('table.type')}</TableHead>
                            <TableHead>{t('table.category')}</TableHead>
                            <TableHead>{t('table.site')}</TableHead>
                            <TableHead>{t('table.location')}</TableHead>
                            <TableHead>{t('table.status')}</TableHead>
                            <TableHead>{t('table.last_maint')}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredEquipment.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell className="font-medium text-xs font-mono">{item.id}</TableCell>
                                <TableCell>{item.type}</TableCell>
                                <TableCell>
                                    <Badge variant="neutral" className="bg-slate-50 text-slate-500 border border-slate-200">
                                        {item.category}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-sm text-slate-600">{getSiteName(item.siteId)}</TableCell>
                                <TableCell>{item.location}</TableCell>
                                <TableCell>
                                    <Badge variant={
                                        item.status === 'active' ? 'success' :
                                            item.status === 'attention' ? 'warning' :
                                                item.status === 'out_of_work' ? 'danger' : 'neutral'
                                    }>
                                        {item.status === 'active' ? t('stats.active') :
                                            item.status === 'attention' ? t('status.attention') :
                                                item.status === 'out_of_work' ? t('stats.inactive') : item.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{item.lastMaintenance}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
}
