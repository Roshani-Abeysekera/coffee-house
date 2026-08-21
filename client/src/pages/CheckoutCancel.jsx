import React from "react";
import { Link } from "react-router-dom";
import { XCircle } from "lucide-react";

export default function CheckoutCancel() {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
            <XCircle size={44} className="text-coffee/30 mb-4" />
            <h2 className="text-2xl font-display font-semibold text-espresso mb-2">Payment cancelled</h2>
            <p className="text-muted max-w-sm mb-6">
                No charge was made. Your cart is still saved if you'd like to try again.
            </p>
            <div className="flex gap-3">
                <Link to="/cart" className="btn-primary">Back to cart</Link>
                <Link to="/menu" className="btn-secondary">Browse menu</Link>
            </div>
        </div>
    );
}
