import { useState } from 'react';
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Building2, FireExtinguisher, Calendar, FileText, Award, LifeBuoy, X, LogOut, ChevronUp, User, Settings } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { useAuth } from "../../context/AuthContext";
import { cn } from "../../lib/utils";

const NAV_ITEMS = [
    { icon: LayoutDashboard, key: "nav.dashboard", path: "/" },
    { icon: Building2, key: "nav.sites", path: "/sites" },
    { icon: FireExtinguisher, key: "nav.equipment", path: "/equipment" },
    { icon: Calendar, key: "nav.missions", path: "/missions" },
    { icon: FileText, key: "nav.reports", path: "/reports" },
    { icon: Award, key: "nav.certificates", path: "/certificates" },
    { icon: LifeBuoy, key: "nav.support", path: "/support" },
];

export function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const { t } = useLanguage();
    const { logout, user } = useAuth();

    return (
        <>
            {/* Mobile Overlay */}
            <div
                className={cn("fixed inset-0 bg-black/50 z-40 lg:hidden", isOpen ? "block" : "hidden")}
                onClick={onClose}
            />

            {/* Sidebar */}
            <div className={cn(
                "fixed top-0 left-0 bottom-0 w-64 bg-white border-r border-slate-200 z-50 transition-transform duration-300 lg:translate-x-0 lg:static",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="flex items-center justify-between p-6 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                        {/* Logo Placeholder */}
                        <img
                            src={`${import.meta.env.BASE_URL}assets/logoocean.png`}
                            alt={t('app.title')}
                            className="h-8 w-auto object-contain"
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.parentElement!.innerHTML = `<div class="w-8 h-8 bg-brand-primary rounded flex items-center justify-center text-white font-bold">OS</div><span class="font-bold text-brand-primary text-xl">${t('app.title')}</span>`;
                            }}
                        />
                        <span className="font-bold text-brand-primary text-xl hidden md:block">{t('app.title')}</span>
                    </div>
                    <button onClick={onClose} className="lg:hidden p-1 hover:bg-slate-100 rounded">
                        <X size={20} />
                    </button>
                </div>

                <nav className="p-4 space-y-1">
                    {NAV_ITEMS.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={() => onClose()} // Close on navigate (mobile)
                            className={({ isActive }) => cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium",
                                isActive
                                    ? "bg-brand-primary/10 text-brand-primary"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            )}
                        >
                            <item.icon size={20} />
                            {t(item.key)}
                        </NavLink>
                    ))}
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-100 bg-white">
                    <ProfileDropdown user={user} logout={logout} t={t} />
                </div>
            </div>
        </>
    );
}

function ProfileDropdown({ user, logout, t }: { user: any, logout: () => void, t: (key: string) => string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-slate-50 transition-colors text-left"
            >
                <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary text-xs font-bold ring-2 ring-white shadow-sm">
                    {user?.name?.charAt(0) || 'U'}
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">{user?.name || 'User'}</p>
                    <p className="text-xs text-slate-500 truncate">{user?.role || 'Guest'}</p>
                </div>
                <ChevronUp size={16} className={cn("text-slate-400 transition-transform", isOpen && "rotate-180")} />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
                    <div className="absolute bottom-full left-0 w-full mb-2 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-20 animate-in slide-in-from-bottom-2 fade-in duration-200">
                        <div className="p-1">
                            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg">
                                <User size={16} />
                                {t('nav.profile') || 'My Profile'}
                            </button>
                            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg">
                                <Settings size={16} />
                                {t('nav.settings') || 'Settings'}
                            </button>
                            <div className="h-px bg-slate-100 my-1" />
                            <button
                                onClick={logout}
                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                            >
                                <LogOut size={16} />
                                {t('nav.logout') || 'Logout'}
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
