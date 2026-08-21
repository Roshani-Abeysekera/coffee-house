import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import { forgotPassword } from "../api/api";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsError(false);
        setLoading(true);

        try {
            const res = await forgotPassword(email);
            setMessage(res.data?.message || "If that email is registered, a reset link has been sent.");
            setSent(true);
        } catch (err) {
            setIsError(true);
            setMessage(err.friendlyMessage || err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            eyebrow="Reset password"
            title="Forgot your password?"
            subtitle="We'll email you a link to reset it."
        >
            {message && (
                <p className={`text-sm rounded-lg px-4 py-2.5 mb-5 ${isError ? "bg-red-50 text-red-600" : "bg-clay-50 text-clay-700"}`}>
                    {message}
                </p>
            )}

            {!sent && (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-coffee/80 mb-1.5">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="input-field"
                            placeholder="you@example.com"
                        />
                    </div>

                    <button type="submit" disabled={loading} className="btn-primary w-full mt-2">
                        {loading ? "Sending…" : "Send reset link"}
                    </button>
                </form>
            )}

            <p className="text-center text-sm text-muted mt-8">
                Remembered it?{" "}
                <Link to="/login" className="text-espresso font-semibold hover:text-gold">
                    Log in
                </Link>
            </p>
        </AuthLayout>
    );
}

export default ForgotPassword;
