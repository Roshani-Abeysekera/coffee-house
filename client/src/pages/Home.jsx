import React from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/coffeeHome.jpg";
import coffee1 from "../assets/coffeeShop.jpg";

// Sample locations (replace with your real café locations)
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

// Popular drinks
const popularDrinks = [
  { name: "Espresso", targetId: "espresso" },// try to gt the im,amage too
  { name: "Cappuccino", targetId: "cappuccino" },
  { name: "Latte", targetId: "latte" },
];

const Home = () => {
  const navigate = useNavigate();

  const goToMenuDrink = (drinkId) => {
    navigate("/menu", { state: { scrollTo: drinkId } });
  };

  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-screen flex items-center justify-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="bg-black/50 w-full h-full absolute top-0 left-0"></div>
        <div className="relative text-center text-cream px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Welcome to Coffee House
          </h1>
          <p className="text-xl md:text-2xl mb-6 drop-shadow-md">
            Experience the finest coffee, brewed with passion since 1995.
          </p>
          <button
            onClick={() => navigate("/menu")}
            className="bg-gold text-cream font-semibold px-6 py-3 rounded-lg hover:bg-gold/80 transition shadow-md hover:shadow-lg"
          >
            Explore Our Menu
          </button>
        </div>
      </section>

      {/* About / History Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-coffee text-center mb-12">
            Our Story
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <img
              src={coffee1}
              alt="Coffee shop interior"
              className="rounded-lg shadow-lg w-full max-w-md mx-auto"
            />
            <div>
              <p className="mb-4 text-lg text-coffee/90">
                Coffee House began as a small neighborhood café in 1995, founded with a passion for serving freshly roasted coffee and creating a welcoming space for the community. Over the years, we have grown into a beloved coffee destination, known for our handcrafted beverages and friendly atmosphere.
              </p>
              <p className="mb-4 text-lg text-coffee/90">
                Our baristas are skilled artisans, blending tradition with innovation to ensure every cup delivers rich flavor, perfect aroma, and a warm experience.
              </p>
              <p className="text-lg text-coffee/90">
                Whether you’re stopping by for a morning espresso, an afternoon latte, or a quiet moment to unwind, Coffee House is committed to making every visit memorable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Drinks Section */}
      <section className="bg-[#f8f5f2] py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-coffee mb-12">Popular Drinks</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {popularDrinks.map((drink) => (
              <div
                key={drink.name}
                onClick={() => goToMenuDrink(drink.targetId)}
                className="cursor-pointer p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
              >
                <h3 className="text-2xl font-semibold mb-3">{drink.name}</h3>
                <p className="text-coffee/80">
                  Click to see this drink in our menu.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations Preview Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-coffee text-center mb-12">
            Visit Our Cafés
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {locations.map((loc) => (
              <div
                key={loc.id}
                className="bg-[#f8f5f2] rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition"
              >
                {/* Map Preview */}
                <div className="w-full h-48">
                  <iframe
                    src={loc.mapSrc}
                    className="w-full h-full border-0"
                    allowFullScreen=""
                    loading="lazy"
                    title={loc.name}
                  ></iframe>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">{loc.name}</h3>
                  <p className="text-gray-600 mb-1">{loc.address}</p>
                  <p className="text-gray-500">{loc.hours}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;