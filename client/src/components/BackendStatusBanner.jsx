import React, { useEffect, useState, useCallback } from "react";
import { AlertTriangle, RefreshCw, X } from "lucide-react";
import { baseURL } from "../api/api";

// Pings the backend on mount (and whenever the user asks to retry) and
// shows an unmissable banner if it can't be reached. This turns "the
// menu/login/etc quietly fails" into one clear, single source of truth
// instead of a different vague error on every page.
export default function BackendStatusBanner() {
    const [status, setStatus] = useState("checking"); // checking | ok | unreachable | db-down
    const [dismissed, setDismissed] = useState(false);

    const checkHealth = useCallback(async () => {
        setStatus("checking");
        try {
            const res = await fetch(baseURL.replace("/api", "") + "/health", {
                signal: AbortSignal.timeout(4000),
            });
            const data = await res.json().catch(() => ({}));

            if (res.ok && data.database === "connected") {
                setStatus("ok");
            } else if (data.database === "disconnected") {
                setStatus("db-down");
            } else {
                setStatus("unreachable");
            }
        } catch {
            setStatus("unreachable");
        }
    }, []);

    useEffect(() => {
        checkHealth();
    }, [checkHealth]);

    if ((status !== "unreachable" && status !== "db-down") || dismissed) return null;

    const isDbDown = status === "db-down";

    return (
        <div className="bg-red-600 text-white text-sm">
            <div className="max-w-7xl mx-auto px-6 py-3 flex items-start gap-3">
                <AlertTriangle size={18} className="shrink-0 mt-0.5" />
                <div className="flex-1">
                    <p className="font-medium">
                        {isDbDown ? "Backend is running, but can't reach the database." : "Can't reach the backend server."}
                    </p>
                    <p className="text-red-100 mt-0.5">
                        {isDbDown ? (
                            <>
                                Login, menu, cart, and orders will fail until this is fixed. Check that PostgreSQL
                                is running and that <code className="bg-red-700/60 px-1.5 py-0.5 rounded">DATABASE_URL</code> in{" "}
                                <code className="bg-red-700/60 px-1.5 py-0.5 rounded">server/.env</code> has the correct password.
                            </>
                        ) : (
                            <>
                                Make sure the backend is running (<code className="bg-red-700/60 px-1.5 py-0.5 rounded">npm start</code> in
                                the server/ folder) at <code className="bg-red-700/60 px-1.5 py-0.5 rounded">{baseURL.replace("/api", "")}</code>.
                            </>
                        )}
                    </p>
                </div>
                <button
                    onClick={checkHealth}
                    className="shrink-0 flex items-center gap-1.5 bg-red-700/60 hover:bg-red-700 px-3 py-1.5 rounded-full text-xs font-medium transition"
                >
                    <RefreshCw size={13} /> Retry
                </button>
                <button onClick={() => setDismissed(true)} className="shrink-0 p-1 hover:bg-red-700/60 rounded-full transition">
                    <X size={16} />
                </button>
            </div>
        </div>
    );
}
