import React from "react";
import Button from "./Button";
import { useCart } from "../context/CartContext";

function MenuItem({ item }) {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        console.log("Adding to cart:", item); // debugging
        addToCart({
            id: item.id || item.product_id, // consistent id
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: 1,
        });
    };

    return (
        <div className="flex items-center bg-white rounded-xl shadow-sm hover:shadow-md transition p-4">
            <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="ml-5 flex-1">
                <div className="flex justify-between items-center">
                    <h4 className="text-lg font-semibold text-gray-800">{item.name}</h4>
                    <span className="text-coffee font-bold">${item.price}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                <Button
                    onClick={handleAddToCart}
                    className="mt-3 text-sm bg-coffee text-white px-4 py-1.5 rounded-full hover:bg-[#5a3e2b] transition"
                >
                    Add to Cart
                </Button>
            </div>
        </div>
    );
}

export default MenuItem;