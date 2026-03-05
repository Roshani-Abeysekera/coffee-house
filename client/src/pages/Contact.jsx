import React from "react";

export default function Contact() {
    return (
        <div className="bg-neutral-50 text-neutral-800">
            {/* Hero Section */}
            <section className="bg-[#5a3d2b] text-white py-24 px-6 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
                <p className="max-w-2xl mx-auto text-neutral-300 text-lg">
                    We'd love to hear from you. Whether you have a question about our menu,
                    events, or anything else — our team is ready to help.
                </p>
            </section>

            {/* Contact Section */}
            <section className="py-20 px-6 md:px-16 lg:px-24">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
                    {/* Contact Info */}
                    <div>
                        <h2 className="text-2xl font-semibold mb-6">Get In Touch</h2>

                        <div className="space-y-6 text-neutral-600">
                            <div>
                                <h3 className="font-semibold text-neutral-800">Address</h3>
                                <p>123 Coffee Street</p>
                                <p>Berlin, Germany</p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-neutral-800">Phone</h3>
                                <p>+1 234 567 890</p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-neutral-800">Email</h3>
                                <p>info@yourcoffeehouse.com</p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-neutral-800">Opening Hours</h3>
                                <p>Monday - Friday: 8:00 AM - 8:00 PM</p>
                                <p>Saturday - Sunday: 9:00 AM - 10:00 PM</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>

                        <form className="space-y-6">
                            <div>
                                <label className="block mb-2 text-sm font-medium">Full Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    className="w-full border border-neutral-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-neutral-800"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full border border-neutral-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-neutral-800"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium">Message</label>
                                <textarea
                                    rows="5"
                                    placeholder="Write your message..."
                                    className="w-full border border-neutral-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-neutral-800"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-neutral-900 text-white py-3 rounded-xl font-medium hover:bg-neutral-800 transition"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="px-6 md:px-16 lg:px-24 pb-20">
                <div className="max-w-6xl mx-auto">
                    <div className="rounded-2xl overflow-hidden shadow-lg">
                        <iframe
                            title="location-map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.086487647292!2d-122.41941518468144!3d37.77492927975953!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c5f8b6b6f%3A0x4c0a7f5a0d9f740b!2sSan%20Francisco!5e0!3m2!1sen!2sus!4v1616171234567!5m2!1sen!2sus"
                            width="100%"
                            height="350"
                            allowFullScreen=""
                            loading="lazy"
                            className="border-0"
                        ></iframe>
                    </div>
                </div>
            </section>
        </div>
    );
}
