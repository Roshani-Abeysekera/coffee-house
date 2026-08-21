import { createContext, useContext, useReducer, useEffect, useMemo, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../api/api";
import { AuthContext } from "./AuthContext";

const CartContext = createContext();

const initialState = {
    items: [],
};

// Reducer function to manage cart state
function cartReducer(state, action) {
    // Helper to identify a product by its unique product_id
    const getProductId = (item) => item.product_id;

    switch (action.type) {
        case "SET_CART":
            return { ...state, items: action.payload };

        case "ADD_ITEM": {
            const { payload } = action;
            const existingItem = state.items.find(
                (item) =>
                    getProductId(item) === getProductId(payload) &&
                    JSON.stringify(item.customizations) === JSON.stringify(payload.customizations)
            );

            if (existingItem) {
                // If item with same customizations already exists, increment its quantity
                return {
                    ...state,
                    items: state.items.map((item) =>
                        item.id === existingItem.id
                            ? { ...item, quantity: item.quantity + payload.quantity }
                            : item
                    ),
                };
            }

            // If it's a new item or has different customizations, add it to the cart
            return {
                ...state,
                items: [...state.items, payload],
            };
        }

        case "REMOVE_ITEM":
            // Filter out the item with the matching cart item ID (database row ID)
            return {
                ...state,
                items: state.items.filter((item) => item.id !== action.payload),
            };

        case "UPDATE_QTY":
            // Update the quantity of a specific item by its cart item ID
            return {
                ...state,
                items: state.items.map((item) =>
                    item.id === action.payload.id
                        ? { ...item, quantity: Math.max(action.payload.quantity, 1) } // Ensure quantity is at least 1
                        : item
                ),
            };

        case "CLEAR_CART":
            // Reset the cart to an empty array
            return { ...initialState };

        default:
            return state;
    }
}

// Provider component that wraps the application
export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(cartReducer, initialState);
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    // Fetches the current cart from the backend. Exposed as refreshCart so
    // other flows (e.g. after a successful Stripe payment) can force a
    // resync without waiting for a remount.
    const refreshCart = useCallback(async () => {
        if (!token) {
            dispatch({ type: "SET_CART", payload: [] });
            return;
        }

        try {
            const res = await API.get("/cart");
            const cartItems = res.data.map((item) => ({
                id: item.id,            // This is the cart_items row ID
                product_id: item.product_id,
                name: item.name,
                price: Number(item.price), // Ensure price is a number
                image: item.image,
                quantity: item.quantity || 1, // Default quantity to 1 if not provided
                customizations: item.customizations || {},
            }));
            dispatch({ type: "SET_CART", payload: cartItems });
        } catch (err) {
            console.error("Failed to fetch cart:", err);
        }
    }, [token]);

    // On initial load (and whenever the user logs in/out), sync the cart
    // with the backend. A logged-out user simply has an empty local cart.
    useEffect(() => {
        refreshCart();
    }, [refreshCart]);

    // Function to add an item to the cart
    const addToCart = async (product) => {
        if (!token) {
            navigate("/login", {
                state: {
                    notice: "Please log in to add items to your cart.",
                    from: location.pathname,
                },
            });
            return;
        }

        try {
            // The product object might have 'id' as product_id
            const productId = product.id || product.product_id;

            if (!productId) {
                console.error("Cannot add to cart: Product ID is missing.", product);
                return;
            }

            // API call to add the item on the server
            const res = await API.post("/cart", {
                product_id: productId,
                quantity: 1,
                customizations: product.customizations || {},
            });

            // Dispatch action to update local state
            // We use the server response to get the new cart item's database ID
            dispatch({
                type: "ADD_ITEM",
                payload: {
                    id: res.data.id, // The real DB row ID for the cart item
                    product_id: productId,
                    name: product.name,
                    price: Number(product.price),
                    image: product.image,
                    quantity: 1,
                    customizations: product.customizations || {},
                },
            });
        } catch (err) {
            console.error("Failed to add item to cart:", err);

            if (err.response?.status === 401) {
                navigate("/login", {
                    state: {
                        notice: "Your session expired. Please log in again.",
                        from: location.pathname,
                    },
                });
            } else {
                alert(err.friendlyMessage || "Failed to add item to cart. Please try again.");
            }
        }
    };

    // Function to remove an item from the cart
    const removeFromCart = async (cartItemId) => {
        try {
            // API call to delete the item on the server
            await API.delete(`/cart/${cartItemId}`);
            // Dispatch action to update local state
            dispatch({ type: "REMOVE_ITEM", payload: cartItemId });
        } catch (err) {
            console.error("Failed to remove item from cart:", err);
        }
    };

    // Function to update the quantity of an item
    const updateQuantity = (cartItemId, quantity) => {
        dispatch({ type: "UPDATE_QTY", payload: { id: cartItemId, quantity } });
        // Note: This only updates locally. You might want to add a debounced API call here
        // to persist the quantity change to the backend.
    };

    // Function to clear all items from the cart (also clears on the server)
    const clearCart = async () => {
        try {
            await API.delete("/cart");
        } catch (err) {
            console.error("Failed to clear cart on server:", err);
        } finally {
            dispatch({ type: "CLEAR_CART" });
        }
    };

    // Memoized calculation for the total number of items in the.
    const totalItems = useMemo(
        () => state.items.reduce((sum, item) => sum + item.quantity, 0),
        [state.items]
    );

    // Memoized calculation for the total price of all items in the cart
    const totalPrice = useMemo(
        () => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
        [state.items]
    );

    // The value provided to consuming components
    const value = {
        cartItems: state.items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        refreshCart,
        totalItems,
        totalPrice,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

// Custom hook to easily access the cart context
export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};