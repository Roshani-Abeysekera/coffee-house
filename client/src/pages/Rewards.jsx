import React from "react";
import coffeeRewards from "../assets/coffeeRewards.jpg"; // Hero image for rewards
import coffeeeLoyaltyCard from "../assets/coffeeeLoyaltyCard.jpg"; // Optional icon/image for reward points
import giftIcon from "../assets/giftIcon.jpg"; // Optional gift image

const rewardSteps = [
    {
        id: 1,
        title: "Join the Program",
        description:
            "Sign up for Coffee House Rewards for free and start earning points on every purchase.",
        icon: coffeeeLoyaltyCard,
    },
    {
        id: 2,
        title: "Earn Points",
        description:
            "Collect points every time you buy your favorite drinks or snacks at any Coffee House location.",
        icon: giftIcon,
    },
    {
        id: 3,
        title: "Redeem Rewards",
        description:
            "Use your points to get free drinks, exclusive offers, and special perks as a valued member.",
        icon: coffeeeLoyaltyCard,
    },
];

const rewardTiers = [
    { stars: 25, reward: "Free Brewed Coffee" },
    { stars: 100, reward: "Free Latte or Espresso" },
    { stars: 200, reward: "Free Specialty Drink" },
    { stars: 300, reward: "Free Bakery Item" },
    { stars: 400, reward: "Any Drink of Your Choice" },
];

const Rewards = () => {
    return (
        <div className="font-sans">
            {/* Hero Section */}
            <section
                className="relative bg-cover bg-center h-96 flex items-center justify-center"
                style={{ backgroundImage: `url(${coffeeRewards})` }}
            >
                <div className="bg-black/50 w-full h-full absolute top-0 left-0"></div>
                <div className="relative text-center px-6 text-white">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                        Coffee House Rewards
                    </h1>
                    <p className="text-lg md:text-xl drop-shadow-md">
                        Earn points, enjoy perks, and get free drinks — just for being part of our community!
                    </p>
                </div>
            </section>

            {/* How It Works */}
            <section className="bg-[#f8f5f2] py-20">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold text-coffee mb-12">
                        How It Works
                    </h2>
                    <div className="grid md:grid-cols-3 gap-10">
                        {rewardSteps.map((step) => (
                            <div
                                key={step.id}
                                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition transform hover:-translate-y-1"
                            >
                                {step.icon && (
                                    <img
                                        src={step.icon}
                                        alt={step.title}
                                        className="w-16 h-16 mx-auto mb-4"
                                    />
                                )}
                                <h3 className="text-2xl font-semibold mb-2 text-gray-800">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stars Tier Section */}
            <section className="bg-white py-20">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold text-coffee mb-12">
                        Get Your Favorites for Free
                    </h2>

                    <div className="flex flex-col md:flex-row justify-center items-center gap-8">
                        {rewardTiers.map((tier, index) => (
                            <div
                                key={index}
                                className="bg-[#f8f5f2] rounded-xl shadow-lg p-6 w-44 hover:shadow-2xl transition"
                            >
                                <div className="text-3xl font-bold mb-2">
                                    {tier.stars}
                                    <span className="text-yellow-500">★</span>
                                </div>
                                <div className="text-gray-700 font-semibold">{tier.reward}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Join Now Section */}
            <section className="bg-coffee text-cream py-20">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Ready to Start Earning?
                    </h2>
                    <p className="text-lg md:text-xl mb-8">
                        Join Coffee House Rewards today and make every cup count!
                    </p>
                    <button className="bg-gold text-coffee font-semibold px-8 py-3 rounded-full text-lg hover:bg-gold/80 transition shadow-md hover:shadow-lg">
                        Join Now
                    </button>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="bg-white py-20">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold text-coffee mb-12">
                        Rewards Benefits
                    </h2>
                    <div className="grid md:grid-cols-3 gap-10">
                        <div className="p-6 bg-[#f8f5f2] rounded-xl shadow-lg hover:shadow-2xl transition">
                            <h3 className="text-2xl font-semibold mb-3">Free Drinks</h3>
                            <p className="text-gray-600">
                                Redeem your points for your favorite beverages and enjoy complimentary treats.
                            </p>
                        </div>
                        <div className="p-6 bg-[#f8f5f2] rounded-xl shadow-lg hover:shadow-2xl transition">
                            <h3 className="text-2xl font-semibold mb-3">Exclusive Offers</h3>
                            <p className="text-gray-600">
                                Get special deals, seasonal drinks, and promotions just for members.
                            </p>
                        </div>
                        <div className="p-6 bg-[#f8f5f2] rounded-xl shadow-lg hover:shadow-2xl transition">
                            <h3 className="text-2xl font-semibold mb-3">Birthday Rewards</h3>
                            <p className="text-gray-600">
                                Celebrate your special day with bonus points and exclusive surprises.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Rewards;