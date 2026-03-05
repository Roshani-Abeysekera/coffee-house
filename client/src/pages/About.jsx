import React from "react";

export default function About() {
    return (
        <div className="bg-neutral-50 text-neutral-800">
            {/* Hero Section */}
            <section className="relative h-[70vh] flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1509042239860-f550ce710b93')] bg-cover bg-center">
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative z-10 text-center text-white px-6">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">About Our Coffee House</h1>
                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-neutral-200">
                        Where every cup tells a story and every visit feels like home.
                    </p>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-20 px-6 md:px-16 lg:px-24">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <img
                        src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085"
                        alt="Barista preparing coffee"
                        className="rounded-2xl shadow-lg"
                    />

                    <div>
                        <h2 className="text-3xl md:text-4xl font-semibold mb-6">Our Story</h2>
                        <p className="text-lg text-neutral-600 mb-6 leading-relaxed">
                            Founded with passion for quality coffee, our coffee house was
                            created to bring people together. We carefully select premium
                            beans and craft each drink with precision and care.
                        </p>
                        <p className="text-lg text-neutral-600 leading-relaxed">
                            Our baristas are trained to deliver not just coffee, but an
                            experience — warm service, welcoming atmosphere, and flavors you
                            will remember.
                        </p>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-white px-6 md:px-16 lg:px-24">
                <div className="max-w-6xl mx-auto text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-semibold">Our Values</h2>
                    <p className="mt-4 text-neutral-600 text-lg">
                        What makes our coffee house special.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <div className="bg-neutral-50 rounded-2xl shadow-md hover:shadow-xl transition p-8 text-center">
                        <h3 className="text-xl font-semibold mb-4">Premium Quality</h3>
                        <p className="text-neutral-600">
                            We use carefully sourced beans and refined brewing techniques to
                            ensure every cup meets the highest standards.
                        </p>
                    </div>

                    <div className="bg-neutral-50 rounded-2xl shadow-md hover:shadow-xl transition p-8 text-center">
                        <h3 className="text-xl font-semibold mb-4">Sustainability</h3>
                        <p className="text-neutral-600">
                            We support ethical sourcing and environmentally friendly
                            practices in every step of our process.
                        </p>
                    </div>

                    <div className="bg-neutral-50 rounded-2xl shadow-md hover:shadow-xl transition p-8 text-center">
                        <h3 className="text-xl font-semibold mb-4">Community Focused</h3>
                        <p className="text-neutral-600">
                            Our space is designed for connection — whether you're working,
                            meeting friends, or relaxing with your favorite drink.
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-neutral-900 text-white text-center px-6">
                <h2 className="text-3xl md:text-4xl font-semibold mb-6">
                    Visit Us Today
                </h2>
                <p className="max-w-2xl mx-auto text-neutral-300 mb-8 text-lg">
                    Experience handcrafted coffee and genuine hospitality.
                </p>
                <button className="bg-white text-black rounded-2xl px-8 py-3 text-lg font-medium hover:bg-neutral-200 transition">
                    Find a Location
                </button>
            </section>
        </div>
    );
}
