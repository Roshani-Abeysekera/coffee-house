import React from "react";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

function Cart() {
    const { cartItems, removeFromCart, clearCart, totalPrice } = useCart();

    if (!cartItems || cartItems.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
                <ShoppingBag size={40} className="text-coffee/25 mb-4" />
                <h2 className="text-2xl font-display font-semibold text-espresso mb-2">Your cart is empty</h2>
                <p className="text-muted mb-6">Add something from the menu to get started.</p>
                <Link to="/menu" className="btn-primary">Browse the menu</Link>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto px-6 py-16">
            <h2 className="text-3xl font-display font-semibold text-espresso mb-8">Your cart</h2>

            <div className="divide-y divide-coffee/10 mb-8">
                {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 py-5">
                        {item.image && (
                            <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                            <p className="font-display font-medium text-espresso">{item.name || item.product_id}</p>
                            {item.quantity && <p className="text-sm text-muted">Qty {item.quantity}</p>}
                        </div>
                        <div className="flex items-center gap-4 shrink-0">
                            {item.price != null && (
                                <span className="font-display text-espresso">
                                    ${(Number(item.price) * (item.quantity || 1)).toFixed(2)}
                                </span>
                            )}
                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-xs font-medium text-red-500 hover:text-red-700"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-between items-baseline mb-8">
                <span className="text-muted">Subtotal</span>
                <span className="text-2xl font-display font-semibold text-espresso">
                    ${(totalPrice || 0).toFixed(2)}
                </span>
            </div>

            <div className="flex flex-wrap gap-3">
                <Link to="/checkout" className="btn-primary">Checkout</Link>
                <button onClick={clearCart} className="btn-secondary !border-red-200 !text-red-600 hover:!bg-red-50">
                    Clear cart
                </button>
            </div>
        </div>
    );
}

export default Cart;
