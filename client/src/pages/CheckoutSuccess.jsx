import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle2, XCircle } from "lucide-react";
import { confirmPayment } from "../api/api";
import { useCart } from "../context/CartContext";

export default function CheckoutSuccess() {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const orderIdParam = searchParams.get("order_id");

    const [status, setStatus] = useState(sessionId ? "confirming" : "ok");
    const [error, setError] = useState("");
    const [orderId, setOrderId] = useState(orderIdParam ? Number(orderIdParam) : null);
    const { refreshCart } = useCart();

    useEffect(() => {
        // Sandbox flow already created the order before redirecting here -
        // nothing more to confirm.
        if (!sessionId) {
            if (!orderIdParam) {
                setStatus("error");
                setError("Missing order details.");
            }
            return;
        }

        // Live Stripe flow: verify the session and record the order now.
        confirmPayment(sessionId)
            .then((res) => {
                setOrderId(res.data.orderId);
                setStatus("ok");
                refreshCart?.();
            })
            .catch((err) => {
                setStatus("error");
                setError(err.friendlyMessage || "Couldn't confirm your payment.");
            });
    }, [sessionId, orderIdParam]);

    if (status === "confirming") {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
                <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin mb-5" />
                <p className="text-muted">Confirming your payment…</p>
            </div>
        );
    }

    if (status === "error") {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
                <XCircle size={44} className="text-red-500 mb-4" />
                <h2 className="text-2xl font-display font-semibold text-espresso mb-2">Couldn't confirm payment</h2>
                <p className="text-muted max-w-sm mb-6">{error}</p>
                <Link to="/cart" className="btn-secondary">Back to cart</Link>
            </div>
        );
    }

    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
            <CheckCircle2 size={48} className="text-gold mb-4" />
            <h2 className="text-3xl font-display font-semibold text-espresso mb-2">Payment successful</h2>
            <p className="text-muted mb-1">Thanks for your order{orderId ? ` — #${orderId}` : ""}!</p>
            <p className="text-muted mb-6">We're getting it ready.</p>
            <div className="flex gap-3">
                <Link to="/orders" className="btn-primary">View order</Link>
                <Link to="/menu" className="btn-secondary">Order more</Link>
            </div>
        </div>
    );
}
