import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import heroImage from "../assets/coffeeHome.jpg";
import coffee1 from "../assets/coffeeShop.jpg";
import API from "../api/api";
import { useCart } from "../context/CartContext";

const locations = [
  { id: 1, name: "Downtown", address: "123 Main St, Berlin", hours: "Mon–Sun · 7am–9pm" },
  { id: 2, name: "Riverside", address: "456 River Rd, Berlin", hours: "Mon–Sun · 8am–8pm" },
  { id: 3, name: "Uptown", address: "789 Uptown Ave, Berlin", hours: "Mon–Fri 6am–10pm · Sat–Sun 7am–10pm" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Home = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    API.get("/menu")
      .then((res) => setFeatured(res.data.slice(0, 4)))
      .catch(() => setFeatured([]));
  }, []);

  return (
    <div>
      {/* Hero */}
      <section
        className="relative min-h-[92vh] flex items-end bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/70 to-espresso/20" />
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          className="relative max-w-7xl mx-auto px-6 pb-20 pt-32 w-full"
        >
          <motion.p variants={fadeUp} className="eyebrow text-clay-200 mb-4">
            Small-batch · Roasted weekly
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="text-cream text-5xl md:text-7xl font-display font-semibold leading-[1.02] tracking-tightest max-w-3xl"
          >
            Coffee, made
            <br />
            like it matters.
          </motion.h1>
          <motion.p variants={fadeUp} className="text-cream/70 text-lg max-w-lg mt-6">
            We roast in small batches, pull every shot to order, and know most
            of our regulars by their drink. Order ahead and skip the line.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 mt-8">
            <button onClick={() => navigate("/menu")} className="btn-primary">
              View the menu
            </button>
            <button onClick={() => navigate("/locations")} className="text-cream/80 font-medium text-sm hover:text-cream transition underline underline-offset-4 decoration-cream/30">
              Find a café near you
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Story */}
      <section className="bg-paper py-24">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <img
            src={coffee1}
            alt="Coffee House interior"
            className="rounded-2xl shadow-card w-full max-h-[440px] object-cover"
          />
          <div>
            <p className="eyebrow mb-3">Since 1995</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-espresso mb-6">
              A neighborhood café that grew into a habit.
            </h2>
            <p className="text-coffee/80 leading-relaxed mb-4">
              Coffee House started as a single counter with four stools and a
              secondhand roaster. Three decades later, the roaster's bigger
              but the philosophy hasn't moved: buy well, roast honestly, and
              pull every shot like someone's actually going to taste it.
            </p>
            <p className="text-coffee/80 leading-relaxed">
              Our baristas train for weeks before they touch the espresso
              machine on their own. It shows in the cup.
            </p>
          </div>
        </div>
      </section>

      {/* Featured drinks — reuses the "menu board" leader-line motif */}
      <section className="bg-cream py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="eyebrow mb-3">On the board today</p>
              <h2 className="text-3xl md:text-4xl font-semibold text-espresso">Fan favorites</h2>
            </div>
            <button onClick={() => navigate("/menu")} className="hidden sm:block text-sm font-medium text-gold hover:underline">
              Full menu →
            </button>
          </div>

          <div className="divide-y divide-coffee/10">
            {featured.length === 0 &&
              [1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-4 py-4 animate-pulse">
                  <div className="w-14 h-14 rounded-full bg-coffee/10" />
                  <div className="flex-1 h-4 bg-coffee/10 rounded" />
                </div>
              ))}

            {featured.map((item) => (
              <div key={item.id} className="flex items-center gap-4 py-4 group">
                <img src={item.image} alt={item.name} className="w-14 h-14 rounded-full object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-medium text-espresso truncate">{item.name}</h3>
                  <p className="text-sm text-muted truncate">{item.description}</p>
                </div>
                <span className="leader-line hidden sm:block" />
                <span className="font-display text-espresso shrink-0">${Number(item.price).toFixed(2)}</span>
                <button
                  onClick={() => addToCart(item)}
                  className="shrink-0 text-xs font-semibold text-gold border border-gold/40 rounded-full px-3 py-1.5 hover:bg-gold hover:text-cream transition opacity-0 group-hover:opacity-100 sm:opacity-100"
                >
                  Add
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations preview */}
      <section className="bg-paper py-24">
        <div className="max-w-7xl mx-auto px-6">
          <p className="eyebrow mb-3 text-center">Find us</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-espresso text-center mb-14">
            Three cafés, one standard.
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {locations.map((loc) => (
              <div key={loc.id} className="bg-cream rounded-2xl p-8 hover:shadow-card transition">
                <h3 className="text-xl font-display font-semibold text-espresso mb-2">{loc.name}</h3>
                <p className="text-coffee/70 text-sm mb-1">{loc.address}</p>
                <p className="text-muted text-sm">{loc.hours}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
