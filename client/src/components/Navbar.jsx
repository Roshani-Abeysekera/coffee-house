import React, { useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Coffee, Search, ShoppingCart, User, ChevronDown, X, Menu as MenuIcon } from "lucide-react";
import { useCart } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

const navLinks = [
    { to: "/", label: "Home" },
    { to: "/menu", label: "Menu" },
    { to: "/locations", label: "Locations" },
    { to: "/services", label: "Services" },
    { to: "/rewards", label: "Rewards" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
];

const Navbar = () => {
    const [cartOpen, setCartOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const { cartItems, totalItems, totalPrice, removeFromCart } = useCart();
    const { token, logout } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
        setUserMenuOpen(false);
    };

    const linkClass = ({ isActive }) =>
        `relative pb-1 transition-colors ${isActive ? "text-espresso" : "text-coffee/70 hover:text-espresso"
        } after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:bg-gold after:transition-all after:duration-300 ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"
        }`;

    return (
        <>
            <nav className="bg-paper/95 backdrop-blur border-b border-coffee/10 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 shrink-0">
                        <span className="w-9 h-9 rounded-full bg-espresso flex items-center justify-center">
                            <Coffee className="text-cream" size={18} />
                        </span>
                        <span className="text-xl font-display font-semibold text-espresso tracking-tight">
                            Coffee House
                        </span>
                    </Link>

                    {/* Desktop nav */}
                    <div className="hidden lg:flex items-center gap-8 text-[15px] font-medium">
                        {navLinks.map((link) => (
                            <NavLink key={link.to} to={link.to} className={linkClass}>
                                {link.label}
                            </NavLink>
                        ))}
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-2">

                        <button className="hidden sm:flex p-2 rounded-full hover:bg-coffee/5 text-coffee/70 hover:text-espresso transition">
                            <Search size={19} />
                        </button>

                        {/* Cart */}
                        <button
                            onClick={() => setCartOpen(true)}
                            aria-label="Open cart"
                            className="relative p-2 rounded-full hover:bg-coffee/5 text-coffee/70 hover:text-espresso transition"
                        >
                            <ShoppingCart size={19} />
                            {totalItems > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 bg-gold text-cream text-[10px] font-semibold w-4.5 h-4.5 min-w-[18px] min-h-[18px] flex items-center justify-center rounded-full">
                                    {totalItems}
                                </span>
                            )}
                        </button>

                        {/* User dropdown */}
                        <div className="relative hidden sm:block">
                            <button
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                                className="p-2 rounded-full hover:bg-coffee/5 text-coffee/70 hover:text-espresso transition flex items-center gap-0.5"
                                aria-label="Account menu"
                            >
                                <User size={19} />
                                <ChevronDown size={14} />
                            </button>

                            {userMenuOpen && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                                    <div className="absolute right-0 mt-2 w-44 bg-paper rounded-xl shadow-card border border-coffee/10 py-1.5 z-20">
                                        {!token ? (
                                            <>
                                                <Link to="/login" onClick={() => setUserMenuOpen(false)} className="block px-4 py-2.5 text-sm hover:bg-coffee/5">Log in</Link>
                                                <Link to="/signup" onClick={() => setUserMenuOpen(false)} className="block px-4 py-2.5 text-sm hover:bg-coffee/5">Sign up</Link>
                                            </>
                                        ) : (
                                            <>
                                                <Link to="/dashboard" onClick={() => setUserMenuOpen(false)} className="block px-4 py-2.5 text-sm hover:bg-coffee/5">Profile</Link>
                                                <Link to="/orders" onClick={() => setUserMenuOpen(false)} className="block px-4 py-2.5 text-sm hover:bg-coffee/5">Orders</Link>
                                                <button onClick={handleLogout} className="block w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50">Log out</button>
                                            </>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>

                        <Link to="/menu" className="hidden sm:inline-flex btn-primary !px-5 !py-2 text-sm">
                            Order now
                        </Link>

                        {/* Mobile menu toggle */}
                        <button
                            className="lg:hidden p-2 rounded-full hover:bg-coffee/5 text-coffee/70"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            aria-label="Toggle menu"
                        >
                            {mobileOpen ? <X size={22} /> : <MenuIcon size={22} />}
                        </button>
                    </div>
                </div>

                {/* Mobile nav panel */}
                {mobileOpen && (
                    <div className="lg:hidden border-t border-coffee/10 bg-paper px-6 py-4 flex flex-col gap-4 text-sm font-medium">
                        {navLinks.map((link) => (
                            <NavLink key={link.to} to={link.to} onClick={() => setMobileOpen(false)} className="text-coffee/80">
                                {link.label}
                            </NavLink>
                        ))}
                        <div className="border-t border-coffee/10 pt-4 flex flex-col gap-3">
                            {!token ? (
                                <>
                                    <Link to="/login" onClick={() => setMobileOpen(false)} className="text-coffee/80">Log in</Link>
                                    <Link to="/signup" onClick={() => setMobileOpen(false)} className="text-coffee/80">Sign up</Link>
                                </>
                            ) : (
                                <>
                                    <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="text-coffee/80">Profile</Link>
                                    <Link to="/orders" onClick={() => setMobileOpen(false)} className="text-coffee/80">Orders</Link>
                                    <button onClick={handleLogout} className="text-left text-red-600">Log out</button>
                                </>
                            )}
                            <Link to="/menu" onClick={() => setMobileOpen(false)} className="btn-primary text-sm w-fit">Order now</Link>
                        </div>
                    </div>
                )}
            </nav>

            {/* Cart drawer */}
            <div className={`fixed inset-0 z-50 ${cartOpen ? "" : "pointer-events-none"}`}>
                <div
                    className={`absolute inset-0 bg-espresso/40 transition-opacity duration-300 ${cartOpen ? "opacity-100" : "opacity-0"}`}
                    onClick={() => setCartOpen(false)}
                />
                <div className={`absolute top-0 right-0 h-full w-full max-w-sm bg-paper shadow-lift flex flex-col transform transition-transform duration-300
                    ${cartOpen ? "translate-x-0" : "translate-x-full"}`}>

                    <div className="flex justify-between items-center px-6 py-5 border-b border-coffee/10">
                        <h2 className="text-lg font-display font-semibold text-espresso">Your cart</h2>
                        <button onClick={() => setCartOpen(false)} className="p-1 rounded-full hover:bg-coffee/5">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto px-6 py-4">
                        {cartItems.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center gap-2 text-muted">
                                <ShoppingCart size={28} className="opacity-40" />
                                <p className="text-sm">Your cart is empty.</p>
                                <Link to="/menu" onClick={() => setCartOpen(false)} className="text-gold text-sm font-medium hover:underline mt-1">
                                    Browse the menu
                                </Link>
                            </div>
                        ) : (
                            <ul className="flex flex-col gap-4">
                                {cartItems.map((item) => (
                                    <li key={item.id} className="flex items-center gap-3 pb-4 border-b border-coffee/10 last:border-0">
                                        {item.image && (
                                            <img src={item.image} alt={item.name} className="w-14 h-14 rounded-lg object-cover shrink-0" />
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-espresso truncate">{item.name}</p>
                                            <p className="text-sm text-muted">${Number(item.price).toFixed(2)} × {item.quantity}</p>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-xs text-red-500 hover:text-red-700 font-medium"
                                        >
                                            Remove
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="px-6 py-5 border-t border-coffee/10">
                        <div className="flex justify-between items-baseline mb-4">
                            <span className="text-sm text-muted">Subtotal</span>
                            <span className="text-xl font-display font-semibold text-espresso">${totalPrice.toFixed(2)}</span>
                        </div>
                        <Link
                            to="/checkout"
                            onClick={() => setCartOpen(false)}
                            className={`btn-primary w-full ${cartItems.length === 0 ? "pointer-events-none opacity-50" : ""}`}
                        >
                            Checkout
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
