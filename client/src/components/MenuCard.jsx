import React from "react";

const MenuCard = ({ item, addToCart }) => {
    return (
        <div className="bg-white shadow-md rounded-xl p-4 hover:scale-105 hover:shadow-xl transition-all duration-300">

            {/* Image Container */}
            <div className="w-full h-48 overflow-hidden rounded-lg mb-4 bg-gray-100">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Content */}
            <h3 className="text-xl font-bold mb-2">{item.name}</h3>
            <p className="text-gray-600 mb-2">{item.description}</p>
            <p className="font-semibold text-lg mb-4">${item.price}</p>

            {/* Button */}
            <button
                onClick={() => addToCart(item)}
                className="w-full bg-coffee text-cream py-2 rounded-lg hover:bg-coffee/80 transition duration-300"
            >
                Add to Cart
            </button>
        </div>
    );
};

export default MenuCard;