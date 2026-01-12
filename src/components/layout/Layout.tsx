import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { useLanguage } from "../../context/LanguageContext";

export function Layout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { language } = useLanguage();

    return (
        <div className="flex bg-slate-50 min-h-screen font-sans" dir={language === 'fr' || language === 'en' ? 'ltr' : 'rtl'}>
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
                <Header onMenuClick={() => setSidebarOpen(true)} />

                <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto w-full max-w-[100vw]">
                    <div className="max-w-7xl mx-auto space-y-6">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
