import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PackageOpen } from "lucide-react";
import { getOrders } from "../api/api";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await getOrders();
                setOrders(res.data);
            } catch (err) {
                setError(err.friendlyMessage || err.response?.data?.message || "Failed to load orders");
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    return (
        <div className="max-w-2xl mx-auto px-6 py-16">
            <h1 className="text-3xl font-display font-semibold text-espresso mb-8">Your orders</h1>

            {loading && (
                <div className="space-y-4">
                    {[1, 2].map((i) => (
                        <div key={i} className="h-24 rounded-2xl bg-coffee/5 animate-pulse" />
                    ))}
                </div>
            )}

            {error && (
                <p className="text-red-600 bg-red-50 border border-red-200 rounded-lg py-3 px-4 mb-4 text-sm">
                    {error}
                </p>
            )}

            {!loading && !error && orders.length === 0 && (
                <div className="text-center py-16">
                    <PackageOpen size={36} className="text-coffee/25 mx-auto mb-4" />
                    <p className="text-muted mb-6">You haven't placed any orders yet.</p>
                    <Link to="/menu" className="btn-primary">Browse the menu</Link>
                </div>
            )}

            <div className="space-y-4">
                {orders.map((order) => (
                    <div key={order.id} className="bg-paper rounded-2xl border border-coffee/10 p-6">
                        <div className="flex justify-between items-center mb-3">
                            <div className="flex items-center gap-2">
                                <span className="font-display font-semibold text-espresso">Order #{order.id}</span>
                                {order.status && (
                                    <span className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ${order.status === "paid" ? "bg-clay-50 text-clay-700" : "bg-coffee/10 text-coffee/60"
                                        }`}>
                                        {order.status}
                                    </span>
                                )}
                            </div>
                            <span className="text-xs text-muted">
                                {new Date(order.created_at).toLocaleString(undefined, {
                                    dateStyle: "medium",
                                    timeStyle: "short",
                                })}
                            </span>
                        </div>

                        <ul className="divide-y divide-coffee/10 mb-3">
                            {order.items.map((item, idx) => (
                                <li key={idx} className="flex justify-between py-2 text-sm">
                                    <span className="text-coffee/80">{item.name} <span className="text-muted">× {item.quantity}</span></span>
                                    <span className="text-espresso font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="flex justify-between items-baseline pt-3 border-t border-coffee/10">
                            <span className="text-sm text-muted">Total</span>
                            <span className="font-display font-semibold text-espresso">${Number(order.total_price).toFixed(2)}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
