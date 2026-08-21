import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock, CheckCircle2 } from "lucide-react";
import { sendContactMessage } from "../api/api";

export default function Contact() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [sent, setSent] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await sendContactMessage(form.name, form.email, form.message);
            setSent(true);
            setForm({ name: "", email: "", message: "" });
        } catch (err) {
            setError(err.friendlyMessage || "Couldn't send your message. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-cream">
            {/* Hero */}
            <section className="bg-espresso py-16 px-6 text-center">
                <p className="eyebrow text-clay-200 mb-3">Get in touch</p>
                <h1 className="text-4xl md:text-5xl font-display font-semibold text-cream">Contact us</h1>
                <p className="text-cream/60 mt-3 max-w-xl mx-auto">
                    Questions about the menu, an order, or planning an event? We're happy to help.
                </p>
            </section>

            <section className="max-w-5xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16">
                {/* Contact info */}
                <div>
                    <h2 className="text-2xl font-display font-semibold text-espresso mb-6">Reach us directly</h2>
                    <div className="space-y-6">
                        <div className="flex items-start gap-3">
                            <MapPin size={18} className="text-gold mt-0.5 shrink-0" />
                            <div>
                                <p className="font-medium text-espresso">Address</p>
                                <p className="text-coffee/70 text-sm">123 Brew Street, Berlin, Germany</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Phone size={18} className="text-gold mt-0.5 shrink-0" />
                            <div>
                                <p className="font-medium text-espresso">Phone</p>
                                <p className="text-coffee/70 text-sm">+1 (000) 123-4567</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Mail size={18} className="text-gold mt-0.5 shrink-0" />
                            <div>
                                <p className="font-medium text-espresso">Email</p>
                                <p className="text-coffee/70 text-sm">hello@coffeehouse.example</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Clock size={18} className="text-gold mt-0.5 shrink-0" />
                            <div>
                                <p className="font-medium text-espresso">Opening hours</p>
                                <p className="text-coffee/70 text-sm">Mon–Fri · 8am–8pm</p>
                                <p className="text-coffee/70 text-sm">Sat–Sun · 9am–9pm</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact form */}
                <div className="bg-paper rounded-2xl border border-coffee/10 shadow-soft p-8">
                    {sent ? (
                        <div className="text-center py-8">
                            <CheckCircle2 size={36} className="text-gold mx-auto mb-4" />
                            <h3 className="text-xl font-display font-semibold text-espresso mb-2">Message sent</h3>
                            <p className="text-muted text-sm mb-6">Thanks for reaching out — we'll get back to you soon.</p>
                            <button onClick={() => setSent(false)} className="btn-secondary">Send another message</button>
                        </div>
                    ) : (
                        <>
                            <h2 className="text-xl font-display font-semibold text-espresso mb-6">Send us a message</h2>

                            {error && (
                                <p className="text-red-600 bg-red-50 border border-red-200 rounded-lg py-2.5 px-4 mb-5 text-sm">
                                    {error}
                                </p>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-coffee/80 mb-1.5">Full name</label>
                                    <input
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        required
                                        className="input-field"
                                        placeholder="Your name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-coffee/80 mb-1.5">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                        className="input-field"
                                        placeholder="you@example.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-coffee/80 mb-1.5">Message</label>
                                    <textarea
                                        name="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        className="input-field resize-none"
                                        placeholder="How can we help?"
                                    />
                                </div>
                                <button type="submit" disabled={loading} className="btn-primary w-full">
                                    {loading ? "Sending…" : "Send message"}
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </section>
        </div>
    );
}
