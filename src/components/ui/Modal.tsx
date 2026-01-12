import { X } from "lucide-react";
import { cn } from "../../lib/utils";
import { createPortal } from "react-dom";

export function Modal({ isOpen, onClose, children, className }: { isOpen: boolean; onClose: () => void; children: React.ReactNode; className?: string }) {
    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className={cn("bg-white rounded-xl shadow-xl w-full max-h-[90vh] overflow-hidden flex flex-col relative animate-in zoom-in-95 duration-200", className)}>
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors z-10"
                >
                    <X size={20} />
                </button>
                {children}
            </div>
        </div>,
        document.body
    );
}

// ... helper components specific to modals can go here
