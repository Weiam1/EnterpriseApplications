import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

const Cart = () => {
    const [cart, setCart] = useState(null);

    const fetchCart = async () => {
        const response = await axiosClient.get("/cart");
        setCart(response.data);
    };
    const updateQuantity = async (itemId, quantity) => {
        await axiosClient.put(
            `/cart/update?itemId=${itemId}&quantity=${quantity}`
        );
        fetchCart();
    };

    const removeItem = async (itemId) => {
        await axiosClient.delete(`/cart/remove/${itemId}`);
        fetchCart();
    };


    useEffect(() => {
        const loadCart = async () => {
            const response = await axiosClient.get("/cart");
            setCart(response.data);
        };

        loadCart();
    }, []);

    if (!cart || !cart.items || cart.items.length === 0) {
        return <h2>Your cart is empty</h2>;
    }

    const total = cart.items.reduce(
        (sum, item) => sum + item.priceAtThatTime * item.quantity,
        0
    );

    return (
        <div>
            <h2>Your Cart</h2>

            <ul>
                {cart.items.map((item) => (
                    <li key={item.id}>
                        <strong>{item.product.name}</strong>
                        <br />
                        €{item.priceAtThatTime} ×
                        <input
                            type="number"
                            value={item.quantity}
                            min="1"
                            onChange={(e) =>
                                updateQuantity(
                                    item.id,
                                    Number(e.target.value)
                                )
                            }
                        />
                        <button onClick={() => removeItem(item.id)}>
                            Remove
                        </button>
                    </li>
                ))}
            </ul>

            <h3>Total: €{total}</h3>
        </div>
    );
};
export default Cart;
