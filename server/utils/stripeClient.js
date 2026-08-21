const Stripe = require("stripe");

let stripe = null;

// Lazily create the Stripe client so a missing key doesn't crash the
// whole server on startup - it just makes payment routes unavailable
// until STRIPE_SECRET_KEY is set, with a clear error message.
function getStripe() {
    if (!process.env.STRIPE_SECRET_KEY) {
        return null;
    }

    if (!stripe) {
        stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    }

    return stripe;
}

module.exports = { getStripe };
