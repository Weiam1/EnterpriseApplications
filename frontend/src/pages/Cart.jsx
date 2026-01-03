import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

const Cart = () => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axiosClient.get("/cart");
                setCart(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, []);


    if (loading) return <p>Loading cart...</p>;
    if (!cart || cart.items.length === 0) return <p>Your cart is empty.</p>;

    return (
        <div>
            <h2>Your Cart</h2>
            <ul>
                {cart.items.map((item) => (
                    <li key={item.id}>
                        {item.product.name} — Qty: {item.quantity}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Cart;
