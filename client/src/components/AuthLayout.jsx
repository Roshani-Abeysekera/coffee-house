import React from "react";
import { Link } from "react-router-dom";
import { Coffee } from "lucide-react";
import heroImage from "../assets/coffeeMachine.jpg";

export default function AuthLayout({ eyebrow, title, subtitle, children }) {
    return (
        <div className="min-h-[calc(100vh-73px)] grid lg:grid-cols-2">
            {/* Brand panel */}
            <div
                className="hidden lg:flex relative flex-col justify-between p-12 bg-cover bg-center"
                style={{ backgroundImage: `url(${heroImage})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/80 to-espresso/50" />
                <Link to="/" className="relative flex items-center gap-2">
                    <span className="w-9 h-9 rounded-full bg-gold flex items-center justify-center">
                        <Coffee className="text-espresso" size={18} />
                    </span>
                    <span className="text-xl font-display font-semibold text-cream">Coffee House</span>
                </Link>
                <blockquote className="relative">
                    <p className="text-cream text-3xl font-display leading-snug max-w-md">
                        "The best cup I've had outside of a roastery — every single time."
                    </p>
                    <footer className="text-cream/60 text-sm mt-4">— A regular, most mornings</footer>
                </blockquote>
            </div>

            {/* Form panel */}
            <div className="flex items-center justify-center px-6 py-16 bg-cream">
                <div className="w-full max-w-sm">
                    <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
                        <span className="w-8 h-8 rounded-full bg-espresso flex items-center justify-center">
                            <Coffee className="text-cream" size={16} />
                        </span>
                        <span className="text-lg font-display font-semibold text-espresso">Coffee House</span>
                    </div>

                    {eyebrow && <p className="eyebrow mb-2 text-center lg:text-left">{eyebrow}</p>}
                    <h1 className="text-2xl font-display font-semibold text-espresso mb-1 text-center lg:text-left">
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="text-muted text-sm mb-8 text-center lg:text-left">{subtitle}</p>
                    )}

                    {children}
                </div>
            </div>
        </div>
    );
}
