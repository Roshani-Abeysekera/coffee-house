import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import API from "../api/api";

const categories = ["All", "Hot Coffee", "Cold Coffee", "Specialty"];

const Menu = () => {
    const { addToCart } = useCart();
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const [addedId, setAddedId] = useState(null);

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const res = await API.get("/menu");
                setMenuItems(res.data);
            } catch (err) {
                console.error("Menu fetch error:", err);
                setError(err.friendlyMessage || "Couldn't load the menu right now. Please refresh the page.");
            } finally {
                setLoading(false);
            }
        };

        fetchMenuItems();
    }, []);

    const handleAdd = (item) => {
        addToCart(item);
        setAddedId(item.id);
        setTimeout(() => setAddedId(null), 1200);
    };

    const visibleItems =
        activeCategory === "All"
            ? menuItems
            : menuItems.filter((item) => item.category === activeCategory);

    const groupedByCategory = categories
        .filter((c) => c !== "All")
        .map((category) => ({
            category,
            items: visibleItems.filter((item) => item.category === category),
        }))
        .filter((group) => group.items.length > 0);

    return (
        <div className="bg-cream min-h-screen">
            {/* Header */}
            <div className="bg-espresso py-16 px-6 text-center">
                <p className="eyebrow text-clay-200 mb-3">Roasted this week</p>
                <h1 className="text-4xl md:text-5xl font-display font-semibold text-cream">
                    The menu
                </h1>
                <p className="text-cream/60 mt-3">Crafted with passion, served with love.</p>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-12">

                {/* Category tabs */}
                <div className="flex flex-wrap gap-2 justify-center mb-12 sticky top-[73px] z-10 bg-cream/95 backdrop-blur py-3">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition ${activeCategory === cat
                                    ? "bg-espresso text-cream"
                                    : "bg-paper text-coffee/70 border border-coffee/15 hover:border-coffee/30"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {error && (
                    <p className="text-center text-red-600 bg-red-50 border border-red-200 rounded-lg py-3 px-4 mb-8">
                        {error}
                    </p>
                )}

                {loading && (
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-center gap-4 animate-pulse">
                                <div className="w-16 h-16 rounded-xl bg-coffee/10 shrink-0" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 bg-coffee/10 rounded w-1/3" />
                                    <div className="h-3 bg-coffee/10 rounded w-2/3" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && !error && groupedByCategory.length === 0 && (
                    <p className="text-center text-muted py-16">No items found in this category yet.</p>
                )}

                {!loading &&
                    groupedByCategory.map(({ category, items }) => (
                        <div key={category} className="mb-14 last:mb-0">
                            <h2 className="eyebrow mb-5">{category}</h2>

                            <div className="divide-y divide-coffee/10">
                                {items.map((item) => (
                                    <div
                                        key={item.id}
                                        id={item.name.toLowerCase().replace(/\s+/g, "-")}
                                        className="flex items-center gap-4 py-5 group scroll-mt-40"
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-16 h-16 rounded-xl object-cover shrink-0"
                                        />

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-baseline gap-2">
                                                <h3 className="font-display font-medium text-espresso">
                                                    {item.name}
                                                </h3>
                                                <span className="leader-line hidden sm:block" />
                                                <span className="font-display text-espresso shrink-0">
                                                    ${Number(item.price).toFixed(2)}
                                                </span>
                                            </div>
                                            <p className="text-sm text-muted mt-1 truncate">
                                                {item.description}
                                            </p>
                                        </div>

                                        <button
                                            onClick={() => handleAdd(item)}
                                            className={`shrink-0 text-xs font-semibold rounded-full px-4 py-2 transition ${addedId === item.id
                                                    ? "bg-espresso text-cream"
                                                    : "text-gold border border-gold/40 hover:bg-gold hover:text-cream"
                                                }`}
                                        >
                                            {addedId === item.id ? "Added ✓" : "Add"}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Menu;
