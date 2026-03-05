import React from "react";
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom"; // If using Next.js, use: import Link from 'next/link'

export default function CoffeeHouseFooter() {
    return (
        <footer className="bg-[#5a3d2b] text-gray-300">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
                {/* Brand Section */}
                <div className="lg:col-span-2">
                    <h2 className="text-2xl font-semibold text-white mb-4 tracking-wide">
                        Your Coffee House
                    </h2>
                    <p className="text-sm leading-relaxed text-gray-400 mb-6 max-w-md">
                        Crafting exceptional coffee experiences with ethically sourced beans,
                        artisan roasting, and a warm welcoming atmosphere.
                    </p>

                    <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-3">
                            <MapPin size={16} />
                            <span>123 Brew Street, Berlin, Germany</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone size={16} />
                            <span>+1 (000) 123-4567</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Mail size={16} />
                            <span>hello@yourcoffeehouse.com</span>
                        </div>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-white font-semibold mb-5 uppercase tracking-wider text-sm">
                        Quick Links
                    </h3>
                    <ul className="space-y-3 text-sm">
                        <li>
                            <Link to="/" className="hover:text-white transition">Home</Link>
                        </li>
                        <li>
                            <Link to="/about" className="hover:text-white transition">About Us</Link>
                        </li>
                        <li>
                            <Link to="/menu" className="hover:text-white transition">Our Menu</Link>
                        </li>
                        <li>
                            <Link to="/contact" className="hover:text-white transition">Contact</Link>
                        </li>
                    </ul>
                </div>

                {/* Services */}
                <div>
                    <h3 className="text-white font-semibold mb-5 uppercase tracking-wider text-sm">
                        Services
                    </h3>
                    <ul className="space-y-3 text-sm">
                        <li>
                            <Link to="/services" className="hover:text-white transition">Dine-In</Link>
                        </li>
                        <li>
                            <Link to="/services" className="hover:text-white transition">Takeaway</Link>
                        </li>
                        <li>
                            <Link to="/services" className="hover:text-white transition">Online Ordering</Link>
                        </li>
                        <li>
                            <Link to="/services" className="hover:text-white transition">Catering</Link>
                        </li>
                        <li>
                            <Link to="/services" className="hover:text-white transition">Private Events</Link>
                        </li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h3 className="text-white font-semibold mb-5 uppercase tracking-wider text-sm">
                        Stay Connected
                    </h3>
                    <p className="text-sm text-gray-400 mb-4">
                        Subscribe to receive updates and special offers.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="w-full px-4 py-2 rounded-xl bg-[#1e2936] border border-gray-700 text-sm focus:outline-none focus:border-gray-500"
                        />
                        <button className="px-5 py-2 rounded-xl bg-white text-black text-sm font-medium hover:opacity-90 transition">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-800" />

            {/* Bottom Section */}
            <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <p className="text-xs text-gray-500">
                    © {new Date().getFullYear()} Your Coffee House. All rights reserved.
                </p>

                {/* Social Icons */}
                <div className="flex items-center gap-4">
                    <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-700 hover:border-white hover:text-white transition">
                        <Facebook size={16} />
                    </a>
                    <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-700 hover:border-white hover:text-white transition">
                        <Instagram size={16} />
                    </a>
                    <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-700 hover:border-white hover:text-white transition">
                        <Twitter size={16} />
                    </a>
                    <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-700 hover:border-white hover:text-white transition">
                        <Youtube size={16} />
                    </a>
                </div>

                {/* Legal Links */}
                <div className="flex flex-wrap gap-6 text-xs text-gray-500">
                    <Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link>
                    <Link to="/terms" className="hover:text-white transition">Terms & Conditions</Link>
                    <Link to="/cookies" className="hover:text-white transition">Cookie Policy</Link>
                </div>
            </div>
        </footer>
    );
}
