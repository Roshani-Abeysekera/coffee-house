import React, { useState, useContext } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import AuthLayout from "./AuthLayout";
import API from "../api/api";

function Login() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(location.state?.notice || "");
    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsError(false);
        setLoading(true);

        try {
            const res = await API.post("/auth/login", { email, password });
            const { token, user } = res.data;

            login(user, token);
            localStorage.setItem("token", token);

            const redirectTo = location.state?.from || "/dashboard";
            navigate(redirectTo);
        } catch (err) {
            setIsError(true);
            setMessage(err.friendlyMessage || err.response?.data?.message || "Login failed. Check your email and password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            eyebrow="Welcome back"
            title="Log in to your account"
            subtitle="Pick up where you left off."
        >
            {message && (
                <p className={`text-sm rounded-lg px-4 py-2.5 mb-5 ${isError ? "bg-red-50 text-red-600" : "bg-clay-50 text-clay-700"}`}>
                    {message}
                </p>
            )}

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

                <div>
                    <div className="flex justify-between items-center mb-1.5">
                        <label className="block text-sm font-medium text-coffee/80">Password</label>
                        <Link to="/forgot-password" className="text-xs text-gold hover:underline">
                            Forgot?
                        </Link>
                    </div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="input-field"
                        placeholder="••••••••"
                    />
                </div>

                <button type="submit" disabled={loading} className="btn-primary w-full mt-2">
                    {loading ? "Logging in…" : "Log in"}
                </button>
            </form>

            <p className="text-center text-sm text-muted mt-8">
                Don't have an account?{" "}
                <Link to="/signup" className="text-espresso font-semibold hover:text-gold">
                    Sign up
                </Link>
            </p>
        </AuthLayout>
    );
}

export default Login;
