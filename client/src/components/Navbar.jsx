import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Coffee, Search, ShoppingCart, User, Globe, ChevronDown } from "lucide-react";

const Navbar = () => {
    const [isLangOpen, setIsLangOpen] = useState(false);

    const toggleLang = () => setIsLangOpen(!isLangOpen);

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">

                {/* Logo */}
                <Link to="/" className="flex items-center space-x-2">
                    <Coffee className="text-[#6F4E37]" size={30} />
                    <span className="text-2xl font-extrabold text-[#6F4E37] tracking-wide">
                        Coffee House
                    </span>
                </Link>

                {/* Main Navigation Links */}
                <div className="hidden lg:flex items-center space-x-8 font-medium text-gray-700">

                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive
                                ? "text-[#6F4E37] border-b-2 border-[#6F4E37] pb-1"
                                : "hover:text-[#6F4E37] transition"
                        }
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/menu"
                        className={({ isActive }) =>
                            isActive
                                ? "text-[#6F4E37] border-b-2 border-[#6F4E37] pb-1"
                                : "hover:text-[#6F4E37] transition"
                        }
                    >
                        Menu
                    </NavLink>

                    <NavLink
                        to="/locations"
                        className={({ isActive }) =>
                            isActive
                                ? "text-[#6F4E37] border-b-2 border-[#6F4E37] pb-1"
                                : "hover:text-[#6F4E37] transition"
                        }
                    >
                        Locations
                    </NavLink>

                    {/* Services Dropdown */}
                    <div className="relative group">
                        <button className="hover:text-[#6F4E37] transition flex items-center gap-1">
                            Services <ChevronDown size={16} />
                        </button>
                        <div className="absolute left-0 mt-3 w-56 bg-white rounded-xl shadow-xl border border-neutral-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300 z-50">
                            <Link to="/services#dinein" className="block px-4 py-3 hover:bg-neutral-100 transition">
                                Dine-In
                            </Link>
                            <Link to="/services#takeaway" className="block px-4 py-3 hover:bg-neutral-100 transition">
                                Takeaway
                            </Link>
                            <Link to="/services#online" className="block px-4 py-3 hover:bg-neutral-100 transition">
                                Online Ordering
                            </Link>
                            <Link to="/services#catering" className="block px-4 py-3 hover:bg-neutral-100 transition">
                                Catering
                            </Link>
                            <Link to="/services#events" className="block px-4 py-3 hover:bg-neutral-100 transition">
                                Private Events
                            </Link>
                        </div>
                    </div>

                    <NavLink
                        to="/rewards"
                        className={({ isActive }) =>
                            isActive
                                ? "text-[#6F4E37] border-b-2 border-[#6F4E37] pb-1"
                                : "hover:text-[#6F4E37] transition"
                        }
                    >
                        Rewards
                    </NavLink>

                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            isActive
                                ? "text-[#6F4E37] border-b-2 border-[#6F4E37] pb-1"
                                : "hover:text-[#6F4E37] transition"
                        }
                    >
                        About
                    </NavLink>

                    <NavLink
                        to="/contact"
                        className={({ isActive }) =>
                            isActive
                                ? "text-[#6F4E37] border-b-2 border-[#6F4E37] pb-1"
                                : "hover:text-[#6F4E37] transition"
                        }
                    >
                        Contact
                    </NavLink>
                </div>

                {/* Right Side Extras */}
                <div className="flex items-center gap-4 relative">
                    {/* Icons */}
                    <button className="p-2 rounded-full hover:bg-neutral-100 transition group">
                        <Search size={20} className="text-neutral-700 group-hover:text-[#6F4E37] transition" />
                    </button>

                    <button className="relative p-2 rounded-full hover:bg-neutral-100 transition group">
                        <ShoppingCart size={20} className="text-neutral-700 group-hover:text-[#6F4E37] transition" />
                        <span className="absolute -top-1 -right-1 bg-[#6F4E37] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                            2
                        </span>
                    </button>

                    <button className="p-2 rounded-full hover:bg-neutral-100 transition group">
                        <User size={20} className="text-neutral-700 group-hover:text-[#6F4E37] transition" />
                    </button>

                    {/* Language Dropdown */}
                    <div className="relative">
                        <button onClick={toggleLang} className="p-2 rounded-full hover:bg-neutral-100 transition group flex items-center">
                            <Globe size={20} className="text-neutral-700 group-hover:text-[#6F4E37] transition" />
                        </button>
                        {isLangOpen && (
                            <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-neutral-200 overflow-hidden z-50">
                                <button className="w-full text-left px-4 py-2 hover:bg-neutral-100 transition">English</button>
                                <button className="w-full text-left px-4 py-2 hover:bg-neutral-100 transition">Spanish</button>
                                <button className="w-full text-left px-4 py-2 hover:bg-neutral-100 transition">French</button>
                            </div>
                        )}
                    </div>

                    {/* Order Button */}
                    <Link
                        to="/order"
                        className="bg-[#6F4E37] text-white px-5 py-2 rounded-full font-semibold hover:bg-[#5a3d2b] transition shadow-md hover:shadow-lg"
                    >
                        Order Now
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;