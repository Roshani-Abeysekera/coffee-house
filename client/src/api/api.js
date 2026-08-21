import axios from "axios";

// Base URL of the backend API. Configure via VITE_API_URL in a .env file
// for different environments; falls back to the local dev server.
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const API = axios.create({ baseURL });

// Attach the JWT (if present) to every outgoing request
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// Normalize errors so callers always get a clear, human-readable message:
// - No response at all -> the backend isn't reachable (server down, wrong
//   port, or VITE_API_URL misconfigured)
// - A response came back -> use the server's message, or a generic fallback
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (!error.response) {
            error.friendlyMessage =
                "Can't reach the server. Make sure the backend is running (npm start in the server/ folder) at " +
                baseURL.replace("/api", "") + ".";
        } else {
            error.friendlyMessage =
                error.response.data?.message ||
                error.response.data?.error ||
                "Something went wrong. Please try again.";
        }
        return Promise.reject(error);
    }
);

export { baseURL };

// --- Auth ---
export const signupUser = (name, email, password) =>
    API.post("/auth/signup", { name, email, password });

export const loginUser = (email, password) =>
    API.post("/auth/login", { email, password });

export const getProfile = () => API.get("/auth/profile");

export const forgotPassword = (email) =>
    API.post("/auth/forgot-password", { email });

export const resetPassword = (token, password) =>
    API.post("/auth/reset-password", { token, password });

// --- Menu ---
export const getMenu = () => API.get("/menu");

// --- Cart ---
export const getCart = () => API.get("/cart");
export const addCartItem = (product_id, quantity = 1) =>
    API.post("/cart", { product_id, quantity });
export const removeCartItem = (id) => API.delete(`/cart/${id}`);
export const clearCartItems = () => API.delete("/cart");

// --- Orders ---
export const createOrder = (items, total_price) =>
    API.post("/orders", { items, total_price });
export const getOrders = () => API.get("/orders");

// --- Contact ---
export const sendContactMessage = (name, email, message) =>
    API.post("/contact", { name, email, message });

// --- Payments ---
export const getPaymentConfig = () => API.get("/payments/config");
export const createCheckoutSession = (items) =>
    API.post("/payments/create-session", { items });
export const confirmPayment = (sessionId) =>
    API.get(`/payments/confirm/${sessionId}`);
export const sandboxPay = (items, card) =>
    API.post("/payments/sandbox-pay", { items, card });

export default API;
