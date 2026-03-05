import React from "react";
import { motion } from "framer-motion";
import {
    Coffee,
    ShoppingBag,
    Smartphone,
    Briefcase,
    CalendarDays,
} from "lucide-react";
import servicesHero from "../assets/coffeeMachine.jpg";

const services = [
    {
        title: "Dine-In",
        description:
            "Relax in our cozy atmosphere and enjoy handcrafted drinks and fresh pastries served with care. Perfect for meetings or catching up with friends.",
        button: "Find a Location",
        icon: Coffee,
    },
    {
        title: "Takeaway",
        description:
            "On the go? Order at the counter and take your favorite beverages and snacks with you. Fast, convenient, and freshly prepared.",
        button: "View Menu",
        icon: ShoppingBag,
    },
    {
        title: "Online Ordering",
        description:
            "Skip the line and order ahead. Customize your drink and pick up at your preferred location.",
        button: "Order Now",
        icon: Smartphone,
    },
    {
        title: "Catering",
        description:
            "Make your meetings and events memorable with our coffee and pastry catering packages.",
        button: "Request Quote",
        icon: Briefcase,
    },
    {
        title: "Private Events",
        description:
            "Host birthdays, corporate meetings, or celebrations in our welcoming space with custom packages available.",
        button: "Book an Event",
        icon: CalendarDays,
    },
];

const Services = () => {
    return (
        <div className="font-sans">

            {/* Hero Section */}
            <section
                className="relative bg-cover bg-center h-80 flex items-center justify-center"
                style={{ backgroundImage: `url(${servicesHero})` }}
            >
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative text-center text-white px-6">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Our Services
                    </h1>
                    <p className="text-lg md:text-xl max-w-2xl mx-auto">
                        From cozy dine-in experiences to large private events — we make every coffee moment special.
                    </p>
                </div>
            </section>

            {/* Services Section */}
            <section className="bg-[#f8f5f2] py-20">
                <div className="container mx-auto px-6">

                    <div className="grid md:grid-cols-2 gap-10">
                        {services.map((service, index) => {
                            const Icon = service.icon;

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="bg-white rounded-2xl shadow-lg p-8 transform transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
                                >
                                    {/* Icon */}
                                    <div className="mb-4">
                                        <Icon className="w-10 h-10 text-coffee" />
                                    </div>

                                    {/* Title */}
                                    <h2 className="text-2xl font-bold text-coffee">
                                        {service.title}
                                    </h2>

                                    {/* Accent Line */}
                                    <div className="w-12 h-1 bg-gold mt-2 mb-4 rounded-full"></div>

                                    {/* Description */}
                                    <p className="text-gray-600 mb-6 leading-relaxed">
                                        {service.description}
                                    </p>

                                    {/* Button */}
                                    <button className="bg-coffee text-cream px-6 py-3 rounded-full font-semibold hover:bg-coffee/90 transition">
                                        {service.button}
                                    </button>
                                </motion.div>
                            );
                        })}
                    </div>

                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-coffee text-cream py-16">
                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Let’s Make Your Coffee Experience Exceptional
                        </h2>
                        <p className="mb-8 text-lg">
                            Whether you're visiting us, ordering ahead, or planning an event — we're here to serve you.
                        </p>
                        <button className="bg-gold text-coffee font-semibold px-8 py-3 rounded-full hover:bg-gold/80 transition shadow-md">
                            Contact Us
                        </button>
                    </motion.div>
                </div>
            </section>

        </div>
    );
};

export default Services;