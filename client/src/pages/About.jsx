import React from "react";
import { Link } from "react-router-dom";
import heroImage from "../assets/coffeeMachine.jpg";
import storyImage from "../assets/coffeeShop.jpg";

export default function About() {
    return (
        <div>
            {/* Hero */}
            <section
                className="relative h-[60vh] flex items-center justify-center bg-cover bg-center"
                style={{ backgroundImage: `url(${heroImage})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/70 to-espresso/40" />
                <div className="relative text-center text-cream px-6">
                    <p className="eyebrow text-clay-200 mb-3">Our story</p>
                    <h1 className="text-4xl md:text-6xl font-display font-semibold mb-4">About Coffee House</h1>
                    <p className="max-w-xl mx-auto text-cream/70 text-lg">
                        Where every cup tells a story and every visit feels like home.
                    </p>
                </div>
            </section>

            {/* Story */}
            <section className="bg-paper py-24 px-6">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
                    <img src={storyImage} alt="Inside Coffee House" className="rounded-2xl shadow-card w-full object-cover max-h-[420px]" />
                    <div>
                        <p className="eyebrow mb-3">Since 1995</p>
                        <h2 className="text-3xl md:text-4xl font-semibold text-espresso mb-6">Our story</h2>
                        <p className="text-coffee/80 mb-4 leading-relaxed">
                            Founded on a simple idea — bring people together over
                            genuinely good coffee. We select beans carefully and craft
                            each drink with precision.
                        </p>
                        <p className="text-coffee/80 leading-relaxed">
                            Our baristas are trained to deliver more than coffee: warm
                            service, a welcoming space, and flavor you'll remember.
                        </p>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="bg-cream py-24 px-6">
                <div className="max-w-6xl mx-auto text-center mb-14">
                    <p className="eyebrow mb-3">What we stand for</p>
                    <h2 className="text-3xl md:text-4xl font-semibold text-espresso">Our values</h2>
                </div>

                <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {[
                        { title: "Premium quality", body: "Carefully sourced beans and refined brewing so every cup meets a real standard." },
                        { title: "Sustainability", body: "Ethical sourcing and environmentally conscious practices at every step." },
                        { title: "Community focused", body: "A space built for connection — working, meeting friends, or just slowing down." },
                    ].map((v) => (
                        <div key={v.title} className="bg-paper rounded-2xl shadow-soft hover:shadow-card transition p-8 text-center">
                            <h3 className="text-xl font-display font-semibold text-espresso mb-3">{v.title}</h3>
                            <p className="text-coffee/70 text-sm leading-relaxed">{v.body}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="bg-espresso py-20 text-center px-6">
                <h2 className="text-3xl md:text-4xl font-display font-semibold text-cream mb-4">
                    Visit us today
                </h2>
                <p className="max-w-xl mx-auto text-cream/60 mb-8">
                    Experience handcrafted coffee and genuine hospitality.
                </p>
                <Link to="/locations" className="btn-primary">Find a location</Link>
            </section>
        </div>
    );
}
