import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import API from "../api/api";

function Signup() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsError(false);
        setLoading(true);

        try {
            await API.post("/auth/signup", { name, email, password });

            setMessage("Account created — redirecting you to log in…");
            setTimeout(() => navigate("/login"), 1500);
        } catch (err) {
            setIsError(true);
            setMessage(err.friendlyMessage || err.response?.data?.message || "Signup failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            eyebrow="Join us"
            title="Create your account"
            subtitle="Save your details, order faster next time."
        >
            {message && (
                <p className={`text-sm rounded-lg px-4 py-2.5 mb-5 ${isError ? "bg-red-50 text-red-600" : "bg-clay-50 text-clay-700"}`}>
                    {message}
                </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-coffee/80 mb-1.5">Name</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="input-field"
                        placeholder="Jane Doe"
                    />
                </div>

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

                <div>
                    <label className="block text-sm font-medium text-coffee/80 mb-1.5">Password</label>
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

                <button type="submit" disabled={loading} className="btn-primary w-full mt-2">
                    {loading ? "Creating account…" : "Sign up"}
                </button>
            </form>

            <p className="text-center text-sm text-muted mt-8">
                Already have an account?{" "}
                <Link to="/login" className="text-espresso font-semibold hover:text-gold">
                    Log in
                </Link>
            </p>
        </AuthLayout>
    );
}

export default Signup;
