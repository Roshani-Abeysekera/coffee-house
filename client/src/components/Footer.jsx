import React from "react";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Coffee } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-espresso text-cream/70">
            <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                <div className="lg:col-span-2">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="w-8 h-8 rounded-full bg-gold flex items-center justify-center">
                            <Coffee className="text-espresso" size={16} />
                        </span>
                        <span className="text-xl font-display font-semibold text-cream">Coffee House</span>
                    </div>
                    <p className="text-sm leading-relaxed text-cream/50 mb-6 max-w-sm">
                        Small-batch roasted, brewed to order. Every cup starts with beans
                        sourced from growers we know by name.
                    </p>
                    <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-3"><MapPin size={15} className="text-gold" /><span>123 Brew Street, Berlin, Germany</span></div>
                        <div className="flex items-center gap-3"><Phone size={15} className="text-gold" /><span>+1 (000) 123-4567</span></div>
                        <div className="flex items-center gap-3"><Mail size={15} className="text-gold" /><span>hello@coffeehouse.example</span></div>
                    </div>
                </div>

                <div>
                    <h3 className="text-cream font-semibold mb-5 uppercase tracking-wider text-xs">Explore</h3>
                    <ul className="space-y-3 text-sm">
                        <li><Link to="/" className="hover:text-cream transition">Home</Link></li>
                        <li><Link to="/menu" className="hover:text-cream transition">Menu</Link></li>
                        <li><Link to="/about" className="hover:text-cream transition">About</Link></li>
                        <li><Link to="/contact" className="hover:text-cream transition">Contact</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-cream font-semibold mb-5 uppercase tracking-wider text-xs">Services</h3>
                    <ul className="space-y-3 text-sm">
                        <li><Link to="/services" className="hover:text-cream transition">Dine-in</Link></li>
                        <li><Link to="/services" className="hover:text-cream transition">Takeaway</Link></li>
                        <li><Link to="/services" className="hover:text-cream transition">Online ordering</Link></li>
                        <li><Link to="/rewards" className="hover:text-cream transition">Rewards</Link></li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-cream/10" />

            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-xs text-cream/40">
                    © {new Date().getFullYear()} Coffee House. All rights reserved.
                </p>
                <div className="flex items-center gap-3">
                    {[Facebook, Instagram, Twitter].map((Icon, i) => (
                        <a key={i} href="#" className="w-8 h-8 flex items-center justify-center rounded-full border border-cream/15 hover:border-gold hover:text-gold transition">
                            <Icon size={14} />
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}
