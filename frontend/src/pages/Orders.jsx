import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

const Orders = () => {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axiosClient.get("/orders");
                setOrders(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div style={{ padding: "40px" }}>
            <h1>Your Orders</h1>

            {orders.length === 0 && <p>No orders yet.</p>}

            {orders.map(order => (
                <div key={order.orderId}>
                    <h4>Order #{order.orderId}</h4>
                    <p>Total: €{order.totalPrice}</p>
                </div>
            ))}
        </div>
    );
};

export default Orders;
