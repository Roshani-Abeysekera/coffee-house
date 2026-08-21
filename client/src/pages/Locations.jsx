import React from "react";
import { MapPin, Clock, Phone } from "lucide-react";

const locations = [
    { id: 1, name: "Downtown", address: "123 Main St, Berlin", hours: "Mon–Sun · 7am–9pm", phone: "+49 30 1234 5601" },
    { id: 2, name: "Riverside", address: "456 River Rd, Berlin", hours: "Mon–Sun · 8am–8pm", phone: "+49 30 1234 5602" },
    { id: 3, name: "Uptown", address: "789 Uptown Ave, Berlin", hours: "Mon–Fri 6am–10pm · Sat–Sun 7am–10pm", phone: "+49 30 1234 5603" },
];

const Locations = () => {
    return (
        <div className="bg-cream min-h-screen">
            <div className="bg-espresso py-16 px-6 text-center">
                <p className="eyebrow text-clay-200 mb-3">Find us</p>
                <h1 className="text-4xl md:text-5xl font-display font-semibold text-cream">Our locations</h1>
                <p className="text-cream/60 mt-3">Three cafés, one standard.</p>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-16">
                <div className="grid md:grid-cols-3 gap-6">
                    {locations.map((loc) => (
                        <div key={loc.id} className="bg-paper rounded-2xl shadow-soft hover:shadow-card transition p-8">
                            <div className="w-11 h-11 rounded-full bg-gold/15 flex items-center justify-center mb-5">
                                <MapPin size={18} className="text-gold" />
                            </div>
                            <h3 className="text-xl font-display font-semibold text-espresso mb-4">{loc.name}</h3>
                            <div className="space-y-2.5 text-sm text-coffee/70">
                                <div className="flex items-start gap-2.5">
                                    <MapPin size={15} className="mt-0.5 shrink-0 text-muted" />
                                    <span>{loc.address}</span>
                                </div>
                                <div className="flex items-start gap-2.5">
                                    <Clock size={15} className="mt-0.5 shrink-0 text-muted" />
                                    <span>{loc.hours}</span>
                                </div>
                                <div className="flex items-start gap-2.5">
                                    <Phone size={15} className="mt-0.5 shrink-0 text-muted" />
                                    <span>{loc.phone}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Locations;
