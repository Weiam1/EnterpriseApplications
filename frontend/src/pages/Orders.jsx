import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import {
    Box,
    Typography,
    Paper,
    Divider,
    Stack
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
        <Box sx={{ padding: 6, maxWidth: "900px", margin: "0 auto" }}>
            <Typography variant="h3" fontWeight="bold" mb={4}>
                Your Orders
            </Typography>

            {orders.length === 0 && (
                <Typography>No orders yet.</Typography>
            )}

            {orders.map(order => (
                <Paper
                    key={order.orderId}
                    sx={{ padding: 4, mb: 4, borderRadius: "16px" }}
                    elevation={3}
                >
                    {/* Order Header */}
                    <Typography variant="h5" fontWeight="bold">
                        Order #{order.orderId}
                    </Typography>

                    <Typography variant="h6" mt={1} mb={2}>
                        Total: € {order.totalPrice.toFixed(2)}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    {/* 🔹 هنا التعديل المهم: عرض المنتجات */}
                    <Stack spacing={1}>
                        {order.items.map((item, index) => (
                            <Typography key={index} variant="body1">
                                • {item.productName} — {item.quantity} × € {item.price}
                            </Typography>
                        ))}
                    </Stack>
                </Paper>
            ))}
        </Box>
    );
};

export default Orders;
