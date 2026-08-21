import { useCart } from "../context/CartContext";
import Button from "./Button";

function CartItem({ item }) {
    const { removeFromCart, updateQuantity } = useCart();

    return (
        <div className="flex justify-between border-b py-3">
            <div>
                <h4>{item.name}</h4>
                <p>${item.price}</p>
            </div>

            <div className="flex items-center gap-2">
                <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    className="w-16 border"
                    onChange={(e) =>
                        updateQuantity(item.id, Number(e.target.value))
                    }
                />

                <Button onClick={() => removeFromCart(item.id)}>
                    Remove
                </Button>
            </div>
        </div>
    );
}

export default CartItem;