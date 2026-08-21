import React from "react";
import { useNavigate } from "react-router-dom";
import coffeeRewards from "../assets/coffeeRewards.jpg";
import coffeeeLoyaltyCard from "../assets/coffeeeLoyaltyCard.jpg";
import giftIcon from "../assets/giftIcon.jpg";

const rewardSteps = [
    {
        id: 1,
        title: "Join the program",
        description: "Sign up for Coffee House Rewards for free and start earning points on every purchase.",
        icon: coffeeeLoyaltyCard,
    },
    {
        id: 2,
        title: "Earn points",
        description: "Collect points every time you buy your favorite drinks or snacks at any Coffee House location.",
        icon: giftIcon,
    },
    {
        id: 3,
        title: "Redeem rewards",
        description: "Use your points to get free drinks, exclusive offers, and special perks as a valued member.",
        icon: coffeeeLoyaltyCard,
    },
];

const rewardTiers = [
    { stars: 25, reward: "Free brewed coffee" },
    { stars: 100, reward: "Free latte or espresso" },
    { stars: 200, reward: "Free specialty drink" },
    { stars: 300, reward: "Free bakery item" },
    { stars: 400, reward: "Any drink of your choice" },
];

const benefits = [
    { title: "Free drinks", body: "Redeem your points for your favorite beverages and enjoy complimentary treats." },
    { title: "Exclusive offers", body: "Get special deals, seasonal drinks, and promotions just for members." },
    { title: "Birthday rewards", body: "Celebrate your special day with bonus points and exclusive surprises." },
];

const Rewards = () => {
    const navigate = useNavigate();

    return (
        <div>
            {/* Hero */}
            <section
                className="relative bg-cover bg-center h-96 flex items-center justify-center"
                style={{ backgroundImage: `url(${coffeeRewards})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/70 to-espresso/40" />
                <div className="relative text-center px-6 text-cream">
                    <p className="eyebrow text-clay-200 mb-3">Members only</p>
                    <h1 className="text-4xl md:text-5xl font-display font-semibold mb-4">Coffee House Rewards</h1>
                    <p className="text-lg text-cream/70 max-w-xl mx-auto">
                        Earn points, enjoy perks, and get free drinks — just for being part of our community.
                    </p>
                </div>
            </section>

            {/* How it works */}
            <section className="bg-cream py-20">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <p className="eyebrow mb-3">Getting started</p>
                    <h2 className="text-3xl md:text-4xl font-display font-semibold text-espresso mb-14">How it works</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {rewardSteps.map((step) => (
                            <div key={step.id} className="bg-paper rounded-2xl shadow-soft hover:shadow-card transition p-8">
                                {step.icon && (
                                    <img src={step.icon} alt={step.title} className="w-16 h-16 mx-auto mb-5 rounded-full object-cover" />
                                )}
                                <h3 className="text-xl font-display font-semibold text-espresso mb-2">{step.title}</h3>
                                <p className="text-coffee/70 text-sm leading-relaxed">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tiers */}
            <section className="bg-paper py-20">
                <div className="max-w-5xl mx-auto px-6 text-center">
                    <p className="eyebrow mb-3">Redeem</p>
                    <h2 className="text-3xl md:text-4xl font-display font-semibold text-espresso mb-14">Get your favorites for free</h2>
                    <div className="flex flex-wrap justify-center gap-5">
                        {rewardTiers.map((tier, index) => (
                            <div key={index} className="bg-cream rounded-2xl shadow-soft hover:shadow-card transition p-6 w-44">
                                <div className="text-3xl font-display font-semibold text-espresso mb-2">
                                    {tier.stars}<span className="text-gold">★</span>
                                </div>
                                <div className="text-coffee/70 text-sm font-medium">{tier.reward}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-espresso py-20 text-center px-6">
                <h2 className="text-3xl md:text-4xl font-display font-semibold text-cream mb-4">
                    Ready to start earning?
                </h2>
                <p className="text-cream/60 mb-8">Join Coffee House Rewards today and make every cup count.</p>
                <button onClick={() => navigate("/signup")} className="btn-primary">
                    Join now
                </button>
            </section>

            {/* Benefits */}
            <section className="bg-cream py-20">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <p className="eyebrow mb-3">Why join</p>
                    <h2 className="text-3xl md:text-4xl font-display font-semibold text-espresso mb-14">Rewards benefits</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {benefits.map((b) => (
                            <div key={b.title} className="bg-paper rounded-2xl shadow-soft hover:shadow-card transition p-8">
                                <h3 className="text-xl font-display font-semibold text-espresso mb-3">{b.title}</h3>
                                <p className="text-coffee/70 text-sm leading-relaxed">{b.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Rewards;
