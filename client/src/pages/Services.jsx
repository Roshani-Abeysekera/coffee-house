import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    Coffee,
    ShoppingBag,
    Smartphone,
    Briefcase,
    CalendarDays,
} from "lucide-react";
import servicesHero from "../assets/coffeeMachine.jpg";

const Services = () => {
    const navigate = useNavigate();

    const services = [
        {
            title: "Dine-In",
            description:
                "Relax in our cozy atmosphere and enjoy handcrafted drinks and fresh pastries served with care. Perfect for meetings or catching up with friends.",
            button: "Find a location",
            icon: Coffee,
            action: () => navigate("/locations"),
        },
        {
            title: "Takeaway",
            description:
                "On the go? Order at the counter and take your favorite beverages and snacks with you. Fast, convenient, and freshly prepared.",
            button: "View menu",
            icon: ShoppingBag,
            action: () => navigate("/menu"),
        },
        {
            title: "Online Ordering",
            description:
                "Skip the line and order ahead. Customize your drink and pick up at your preferred location.",
            button: "Order now",
            icon: Smartphone,
            action: () => navigate("/menu"),
        },
        {
            title: "Catering",
            description:
                "Make your meetings and events memorable with our coffee and pastry catering packages.",
            button: "Request a quote",
            icon: Briefcase,
            action: () => navigate("/contact"),
        },
        {
            title: "Private Events",
            description:
                "Host birthdays, corporate meetings, or celebrations in our welcoming space with custom packages available.",
            button: "Book an event",
            icon: CalendarDays,
            action: () => navigate("/contact"),
        },
    ];

    return (
        <div>
            {/* Hero */}
            <section
                className="relative bg-cover bg-center h-80 flex items-center justify-center"
                style={{ backgroundImage: `url(${servicesHero})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/70 to-espresso/40" />
                <div className="relative text-center text-cream px-6">
                    <p className="eyebrow text-clay-200 mb-3">What we offer</p>
                    <h1 className="text-4xl md:text-5xl font-display font-semibold mb-4">Our services</h1>
                    <p className="text-lg max-w-2xl mx-auto text-cream/70">
                        From cozy dine-in to large private events — we make every coffee moment count.
                    </p>
                </div>
            </section>

            {/* Services grid */}
            <section className="bg-cream py-20">
                <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8">
                    {services.map((service, index) => {
                        const Icon = service.icon;

                        return (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.08 }}
                                viewport={{ once: true }}
                                className="bg-paper rounded-2xl shadow-soft hover:shadow-card transition p-8"
                            >
                                <div className="w-12 h-12 rounded-full bg-gold/15 flex items-center justify-center mb-5">
                                    <Icon className="text-gold" size={22} />
                                </div>

                                <h2 className="text-xl font-display font-semibold text-espresso mb-1">
                                    {service.title}
                                </h2>
                                <div className="w-10 h-0.5 bg-gold/50 mb-4" />

                                <p className="text-coffee/70 text-sm leading-relaxed mb-6">
                                    {service.description}
                                </p>

                                <button onClick={service.action} className="btn-primary !px-5 !py-2.5 text-sm">
                                    {service.button}
                                </button>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* CTA */}
            <section className="bg-espresso py-20 text-center px-6">
                <h2 className="text-3xl md:text-4xl font-display font-semibold text-cream mb-4">
                    Let's make your coffee experience exceptional
                </h2>
                <p className="max-w-xl mx-auto text-cream/60 mb-8">
                    Whether you're visiting us, ordering ahead, or planning an event — we're here to serve you.
                </p>
                <button onClick={() => navigate("/contact")} className="btn-primary">
                    Contact us
                </button>
            </section>
        </div>
    );
};

export default Services;
