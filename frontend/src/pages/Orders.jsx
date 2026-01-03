import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import {
    Box,
    Typography,
    Paper
} from "@mui/material";

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
        <Box sx={{ padding: 6 }}>
            <Typography variant="h3" fontWeight="bold" mb={4}>
                Your Orders
            </Typography>

            {orders.length === 0 && (
                <Typography>No orders yet.</Typography>
            )}

            {orders.map(order => (
                <Paper
                    key={order.orderId}
                    sx={{ padding: 4, mb: 3, borderRadius: "16px" }}
                >
                    <Typography variant="h5">
                        Order #{order.orderId}
                    </Typography>

                    <Typography variant="h6" mt={1}>
                        Total: € {order.totalPrice}
                    </Typography>
                </Paper>
            ))}
        </Box>
    );
};

export default Orders;
