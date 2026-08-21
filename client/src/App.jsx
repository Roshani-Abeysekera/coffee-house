import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BackendStatusBanner from "./components/BackendStatusBanner";
import ChatWidget from "./components/ChatWidget";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import Dashboard from "./components/Dashboard";

// Pages
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Locations from "./pages/Locations";
import Services from "./pages/Services";
import Rewards from "./pages/Rewards";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import CheckoutCancel from "./pages/CheckoutCancel";
import Orders from "./pages/Orders";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";

// Contexts
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="flex flex-col min-h-screen">
          <BackendStatusBanner />
          <Navbar />

          <main className="flex-1">
            <Routes>
              {/* Public Pages */}
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/locations" element={<Locations />} />
              <Route path="/services" element={<Services />} />
              <Route path="/rewards" element={<Rewards />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/checkout/success" element={<CheckoutSuccess />} />
              <Route path="/checkout/cancel" element={<CheckoutCancel />} />

              {/* Auth Pages */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />

              {/* Protected Route */}
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/orders"
                element={
                  <PrivateRoute>
                    <Orders />
                  </PrivateRoute>
                }
              />

              {/* Catch unknown routes */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <Footer />
          <ChatWidget />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

function PrivateRoute({ children }) {
  const { token } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default App;