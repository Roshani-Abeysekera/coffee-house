import React from "react";

const locations = [
    {
        id: 1,
        name: "Downtown Café",
        address: "123 Main St, Cityville",
        hours: "Mon-Sun: 7am - 9pm",
        mapSrc:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0190410822236!2d-122.4194150846817!3d37.77492977975933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085814c39c2ffcf%3A0x5c4e6e8d3d5f1f50!2s123%20Main%20St%2C%20San%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1696861737635!5m2!1sen!2sus",
    },
    {
        id: 2,
        name: "Riverside Café",
        address: "456 River Rd, Cityville",
        hours: "Mon-Sun: 8am - 8pm",
        mapSrc:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0190410822236!2d-122.4194150846817!3d37.77492977975933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085814c39c2ffcf%3A0x5c4e6e8d3d5f1f50!2s456%20River%20Rd%2C%20San%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1696861737635!5m2!1sen!2sus",
    },
    {
        id: 3,
        name: "Uptown Café",
        address: "789 Uptown Ave, Cityville",
        hours: "Mon-Fri: 6am - 10pm, Sat-Sun: 7am - 10pm",
        mapSrc:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0190410822236!2d-122.4194150846817!3d37.77492977975933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085814c39c2ffcf%3A0x5c4e6e8d3d5f1f50!2s789%20Uptown%20Ave%2C%20San%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1696861737635!5m2!1sen!2sus",
    },
];

const Locations = () => {
    return (
        <div className="bg-[#f8f5f2] min-h-screen py-16 px-6">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold text-coffee text-center mb-12">
                    Our Locations
                </h2>

                <div className="grid md:grid-cols-3 gap-10">
                    {locations.map((loc) => (
                        <div
                            key={loc.id}
                            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition"
                        >
                            {/* Map */}
                            <div className="w-full h-48">
                                <iframe
                                    src={loc.mapSrc}
                                    className="w-full h-full border-0"
                                    allowFullScreen=""
                                    loading="lazy"
                                    title={loc.name}
                                ></iframe>
                            </div>

                            {/* Info */}
                            <div className="p-6 text-center">
                                <h3 className="text-2xl font-semibold text-gray-800 mb-2">{loc.name}</h3>
                                <p className="text-gray-600 mb-1">{loc.address}</p>
                                <p className="text-gray-500">{loc.hours}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Locations;