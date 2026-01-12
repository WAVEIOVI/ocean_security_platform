import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "../../lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", ...props }, ref) => {
        const variants = {
            primary: "bg-brand-primary text-white hover:bg-brand-primary/90 shadow-sm",
            secondary: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 shadow-sm",
            outline: "bg-transparent border border-brand-primary text-brand-primary hover:bg-brand-primary/5",
            ghost: "bg-transparent text-slate-600 hover:bg-slate-100",
        };

        const sizes = {
            sm: "h-8 px-3 text-xs",
            md: "h-10 px-4 py-2",
            lg: "h-12 px-6 text-lg",
        };

        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary/20 disabled:opacity-50 disabled:pointer-events-none gap-2",
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";
