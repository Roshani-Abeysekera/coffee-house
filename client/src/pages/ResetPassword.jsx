import React, { useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { resetPassword } from "../api/api";

export default function ResetPassword() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token") || "";
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsError(false);

        if (!token) {
            setIsError(true);
            setMessage("Missing or invalid reset link.");
            return;
        }

        if (password !== confirm) {
            setIsError(true);
            setMessage("Passwords don't match.");
            return;
        }

        setLoading(true);
        try {
            const res = await resetPassword(token, password);
            setMessage(res.data?.message || "Password updated.");
            setTimeout(() => navigate("/login"), 1500);
        } catch (err) {
            setIsError(true);
            setMessage(err.friendlyMessage || err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            eyebrow="Almost there"
            title="Set a new password"
            subtitle="Choose something you'll remember this time."
        >
            {message && (
                <p className={`text-sm rounded-lg px-4 py-2.5 mb-5 ${isError ? "bg-red-50 text-red-600" : "bg-clay-50 text-clay-700"}`}>
                    {message}
                </p>
            )}

            {!token ? (
                <p className="text-center text-sm text-muted">
                    This link is missing its token. Request a new one from{" "}
                    <Link to="/forgot-password" className="text-espresso font-semibold hover:text-gold">
                        Forgot Password
                    </Link>.
                </p>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-coffee/80 mb-1.5">New password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                            className="input-field"
                            placeholder="At least 6 characters"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-coffee/80 mb-1.5">Confirm password</label>
                        <input
                            type="password"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            required
                            minLength={6}
                            className="input-field"
                        />
                    </div>
                    <button type="submit" disabled={loading} className="btn-primary w-full mt-2">
                        {loading ? "Updating…" : "Reset password"}
                    </button>
                </form>
            )}
        </AuthLayout>
    );
}
