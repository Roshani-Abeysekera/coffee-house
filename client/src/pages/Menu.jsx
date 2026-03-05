import React, { useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useLocation } from "react-router-dom"; // for receiving scroll target

import espresso from "../assets/Espresso.jpg";
import latte from "../assets/latte.jpg";
import cappuccino from "../assets/Cappuccino.jpg";
import americano from "../assets/Americano.jpg";
import mocha from "../assets/Mocha.jpg";
import flatWhite from "../assets/Flat White.jpg";
import macchiato from "../assets/Macchiato.jpg";
import icedCoffee from "../assets/Iced Coffee.jpg";
import coldBrew from "../assets/Cold Brew.jpg";
import caramelLatte from "../assets/CaramelLatte.jpg";
import matchaLatte from "../assets/Matcha Latte.jpg";
import chaiLatte from "../assets/Chai Latte.jpg";
import affogato from "../assets/Affogato.jpg";

const menuItems = [
    { id: 1, name: "Espresso", description: "Strong and bold single shot.", price: 3, image: espresso, category: "Hot Coffee" },
    { id: 2, name: "Latte", description: "Espresso with silky steamed milk.", price: 4, image: latte, category: "Hot Coffee" },
    { id: 3, name: "Cappuccino", description: "Rich espresso with thick foam.", price: 4.5, image: cappuccino, category: "Hot Coffee" },
    { id: 4, name: "Americano", description: "Espresso diluted with hot water.", price: 3.5, image: americano, category: "Hot Coffee" },
    { id: 5, name: "Mocha", description: "Chocolate, espresso & steamed milk.", price: 5, image: mocha, category: "Hot Coffee" },
    { id: 6, name: "Flat White", description: "Velvety microfoam & espresso.", price: 4.5, image: flatWhite, category: "Hot Coffee" },
    { id: 7, name: "Macchiato", description: "Espresso marked with foam.", price: 3.5, image: macchiato, category: "Hot Coffee" },

    { id: 8, name: "Iced Coffee", description: "Chilled brewed coffee over ice.", price: 4, image: icedCoffee, category: "Cold Coffee" },
    { id: 9, name: "Cold Brew", description: "Slow-steeped smooth cold coffee.", price: 4.5, image: coldBrew, category: "Cold Coffee" },
    { id: 10, name: "Caramel Latte", description: "Creamy latte with caramel.", price: 5, image: caramelLatte, category: "Cold Coffee" },

    { id: 11, name: "Matcha Latte", description: "Premium green tea & milk.", price: 5, image: matchaLatte, category: "Specialty" },
    { id: 12, name: "Chai Latte", description: "Spiced tea with steamed milk.", price: 4.5, image: chaiLatte, category: "Specialty" },
    { id: 13, name: "Affogato", description: "Vanilla ice cream & espresso.", price: 6, image: affogato, category: "Specialty" },
];

const Menu = () => {
    const { addToCart } = useCart();
    const categories = ["Hot Coffee", "Cold Coffee", "Specialty"];
    const location = useLocation();

    // Scroll to drink if coming from Home page
    useEffect(() => {
        if (location.state?.scrollTo) {
            const element = document.getElementById(location.state.scrollTo);
            if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" });

                // Highlight animation
                element.classList.add("ring-4", "ring-gold", "transition-all");
                setTimeout(() => {
                    element.classList.remove("ring-4", "ring-gold");
                }, 2000);
            }
        }
    }, [location.state]);

    return (
        <div className="bg-[#f8f5f2] min-h-screen py-16 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-14">
                    <h2 className="text-4xl font-bold tracking-wide text-gray-800">Our Coffee Menu</h2>
                    <p className="text-gray-500 mt-3">Crafted with passion. Served with love.</p>
                </div>

                {categories.map((category) => (
                    <div key={category} className="mb-14">
                        {/* Category Title */}
                        <h3 className="text-2xl font-semibold text-gray-700 mb-6 border-b pb-2">{category}</h3>

                        {/* Items */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {menuItems
                                .filter((item) => item.category === category)
                                .map((item) => (
                                    <div
                                        id={item.name.toLowerCase()} // scroll target
                                        key={item.id}
                                        className="flex items-center bg-white rounded-xl shadow-sm hover:shadow-md transition p-4"
                                    >
                                        {/* Small Image */}
                                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />

                                        {/* Info */}
                                        <div className="ml-5 flex-1">
                                            <div className="flex justify-between items-center">
                                                <h4 className="text-lg font-semibold text-gray-800">{item.name}</h4>
                                                <span className="text-coffee font-bold">${item.price}</span>
                                            </div>
                                            <p className="text-sm text-gray-500 mt-1">{item.description}</p>

                                            <button
                                                onClick={() => addToCart(item)}
                                                className="mt-3 text-sm bg-coffee text-white px-4 py-1.5 rounded-full hover:bg-[#5a3e2b] transition"
                                            >
                                                Add to Cart
                                            </button>
                                        </div>
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