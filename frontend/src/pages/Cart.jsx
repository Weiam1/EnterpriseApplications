import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import {
    Box,
    Typography,
    Paper,
    Button,
    TextField,
    Stack,
    Divider
} from "@mui/material";

const Cart = () => {
    const [cart, setCart] = useState(null);

    const fetchCart = async () => {
        const response = await axiosClient.get("/cart");
        setCart(response.data);
    };
    const updateQuantity = async (itemId, quantity) => {
        if (quantity < 1) return;
        await axiosClient.put(
            `/cart/update?itemId=${itemId}&quantity=${quantity}`
        );
        fetchCart();
    };

    const removeItem = async (item) => {
        if (item.quantity > 1) {
            // ➖ إنقاص قطعة واحدة فقط
            await axiosClient.put(
                `/cart/update?itemId=${item.id}&quantity=${item.quantity - 1}`
            );
        } else {
            // 🗑️ آخر قطعة → حذف كامل
            await axiosClient.delete(`/cart/remove?itemId=${item.id}`);
        }
        fetchCart(); // نعيد تحميل السلة
    };



    useEffect(() => {
        const loadCart = async () => {
            const response = await axiosClient.get("/cart");
            setCart(response.data);
        };

        loadCart();
    }, []);

    if (!cart || !cart.items || cart.items.length === 0) {
        return (
            <Box sx={{ padding: 6 }}>
                <Typography variant="h4">
                    Your cart is empty
                </Typography>
            </Box>
        );
    }

    const total = cart.items.reduce(
        (sum, item) => sum + item.priceAtThatTime * item.quantity,
        0
    );

    return (

        <Box
            sx={{
                padding: 6,
                maxWidth: "1000px",
                margin: "0 auto"
            }}
        >
            <Typography
                variant="h3"
                sx={{ mb: 4, fontWeight: "bold" }}
            >
                🛒 Your Cart
            </Typography>

            <Stack spacing={3}>
                {cart.items.map((item) => (
                    <Paper
                        key={item.id}
                        sx={{
                            padding: 3,
                            backgroundColor: "#FFFFFF",
                            borderRadius: "16px"
                        }}
                        elevation={3}
                    >
                        <Stack
                            direction={{ xs: "column", md: "row" }}
                            spacing={4}
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            {/* Product Info */}
                            <Box sx={{ flex: 1 }}>
                                <Typography
                                    variant="h5"
                                    sx={{ fontWeight: "bold" }}
                                >
                                    {item.product.name}
                                </Typography>

                                <Typography
                                    variant="h6"
                                    color="text.secondary"
                                    sx={{ mt: 1 }}
                                >
                                    € {item.priceAtThatTime}
                                </Typography>
                            </Box>

                            {/* Quantity */}
                            <TextField
                                type="number"
                                label="Quantity"
                                value={item.quantity}
                                onChange={(e) =>
                                    updateQuantity(
                                        item.id,
                                        Number(e.target.value)
                                    )
                                }
                                inputProps={{
                                    min: 1,
                                    style: { fontSize: "20px" }
                                }}
                                sx={{
                                    width: "140px"
                                }}
                            />

                            {/* Remove Button */}
                            <Button
                                variant="contained"
                                color="error"
                                size="large"
                                onClick={() => removeItem(item)}
                                sx={{
                                    height: "56px",
                                    fontSize: "16px"
                                }}
                            >
                                Remove
                            </Button>
                        </Stack>
                    </Paper>
                ))}
            </Stack>

            <Divider sx={{ my: 5 }} />

            {/* Total */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >
                <Typography
                    variant="h4"
                    sx={{ fontWeight: "bold" }}
                >
                    Total:
                </Typography>

                <Typography
                    variant="h4"
                    sx={{ fontWeight: "bold" }}
                >
                    € {total.toFixed(2)}
                </Typography>
            </Box>

            {/* Checkout */}
            <Box sx={{ mt: 4, textAlign: "right" }}>
                <Button
                    variant="contained"
                    size="large"
                    href="/checkout"
                    sx={{
                        paddingX: 5,
                        paddingY: 1.5,
                        fontSize: "18px",
                        borderRadius: "12px"
                    }}
                >
                    Proceed to Checkout
                </Button>
            </Box>
        </Box>
    );
};
export default Cart;
