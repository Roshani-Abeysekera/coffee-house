import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getProfile } from "../api/api";
import { useNavigate, Link } from "react-router-dom";
import { LogOut, Mail, Calendar, ShoppingBag } from "lucide-react";

export default function Dashboard() {
    const { user, token, logout } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }

        const fetchProfile = async () => {
            try {
                const res = await getProfile();
                setProfile(res.data);
            } catch (err) {
                console.error(err);
                navigate("/login");
            }
        };
        fetchProfile();
    }, [token, navigate]);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const initials = (profile?.name || user?.name || "?")
        .split(" ")
        .map((p) => p[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <div className="max-w-2xl mx-auto px-6 py-16">
            <div className="bg-paper rounded-2xl border border-coffee/10 shadow-soft p-8">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 rounded-full bg-espresso text-cream flex items-center justify-center text-xl font-display font-semibold shrink-0">
                        {profile ? initials : "…"}
                    </div>
                    <div className="min-w-0">
                        <h1 className="text-2xl font-display font-semibold text-espresso truncate">
                            {profile?.name || "Loading…"}
                        </h1>
                        <p className="text-muted text-sm">Member profile</p>
                    </div>
                </div>

                {profile ? (
                    <div className="space-y-4 mb-8">
                        <div className="flex items-center gap-3 text-sm">
                            <Mail size={16} className="text-gold shrink-0" />
                            <span className="text-coffee/80">{profile.email}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <Calendar size={16} className="text-gold shrink-0" />
                            <span className="text-coffee/80">
                                Member since {new Date(profile.created_at).toLocaleDateString(undefined, { year: "numeric", month: "long" })}
                            </span>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-3 mb-8 animate-pulse">
                        <div className="h-4 bg-coffee/10 rounded w-2/3" />
                        <div className="h-4 bg-coffee/10 rounded w-1/2" />
                    </div>
                )}

                <div className="flex flex-wrap gap-3">
                    <Link to="/orders" className="btn-secondary">
                        <ShoppingBag size={16} /> Order history
                    </Link>
                    <button onClick={handleLogout} className="btn-secondary !border-red-200 !text-red-600 hover:!bg-red-50">
                        <LogOut size={16} /> Log out
                    </button>
                </div>
            </div>
        </div>
    );
}
