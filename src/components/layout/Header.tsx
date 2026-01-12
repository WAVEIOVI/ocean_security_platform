import { Menu, Globe, Bell } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { USERS } from "../../data/mockData";

export function Header({ onMenuClick }: { onMenuClick: () => void }) {
    const { language, setLanguage, t } = useLanguage();
    const user = USERS.demo;

    return (
        <header className="h-16 bg-white border-b border-slate-200 px-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
            <div className="flex items-center gap-3">
                <button
                    onClick={onMenuClick}
                    className="p-2 -ml-2 hover:bg-slate-100 rounded-lg lg:hidden"
                >
                    <Menu size={20} className="text-slate-600" />
                </button>
                <span className="text-slate-500 hidden sm:block">
                    {t('header.welcome')}, <span className="font-semibold text-slate-800">{user.name}</span>
                </span>
            </div>

            <div className="flex items-center gap-4">
                {/* Language Toggle */}
                <button
                    onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors text-sm font-medium text-slate-700"
                >
                    <Globe size={16} />
                    <span>{language.toUpperCase()}</span>
                </button>

                {/* Notifications (Mock) */}
                <button className="p-2 hover:bg-slate-100 rounded-full text-slate-600 relative transition-colors">
                    <Bell size={20} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-accent rounded-full border border-white"></span>
                </button>

                {/* User Avatar */}
                <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                    <img src={user.avatar} alt="User" className="w-8 h-8 rounded-full bg-brand-primary/10" />
                    <div className="hidden md:block text-right leading-tight">
                        <div className="text-sm font-medium text-slate-700">{user.company}</div>
                        <div className="text-xs text-slate-500">{user.role}</div>
                    </div>
                </div>
            </div>
        </header>
    );
}
