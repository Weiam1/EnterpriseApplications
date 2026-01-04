import axiosClient from "../api/axiosClient";
import { useState } from "react";
import {
    Box,
    Typography,
    Button,
    Paper,
    Stack
} from "@mui/material";
import {useNavigate} from "react-router-dom";

const Checkout = () => {
    const navigate = useNavigate();

    const [orderResult, setOrderResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleCheckout = async () => {
        try {
            setLoading(true);
            const response = await axiosClient.post("/checkout");

            // نحفظ نتيجة الطلب لعرضها في الواجهة
            setOrderResult(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };


    if (orderResult) {
        return (
            <Box
                sx={{
                    minHeight: "70vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <Paper
                    sx={{
                        padding: 6,
                        borderRadius: "20px",
                        maxWidth: 500,
                        width: "100%",
                        textAlign: "center"
                    }}
                    elevation={4}
                >
                    <Typography variant="h3" fontWeight="bold" mb={3}>
                        ✅ Order Confirmed
                    </Typography>
                    <Typography variant="h6" mb={2}>
                        Order ID: #{orderResult.orderId}
                    </Typography>

                    <Typography variant="h5" mb={4}>
                        Total: € {orderResult.totalPrice.toFixed(2)}
                    </Typography>

                    <Stack spacing={2}>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => navigate("/orders")}
                        >
                            View My Orders
                        </Button>

                        <Button
                            variant="outlined"
                            size="large"
                            onClick={() => navigate("/")}
                        >
                            Back Home
                        </Button>
                    </Stack>
                </Paper>
            </Box>
        );
    }

    return (
        <Box sx={{ padding: 6, maxWidth: 700, margin: "0 auto" }}>
            <Paper sx={{ padding: 5, borderRadius: "18px" }}>
                <Typography variant="h3" fontWeight="bold" mb={3}>
                    Checkout
                </Typography>

                <Typography variant="h6" mb={4}>
                    Please confirm your order.
                </Typography>

                <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    disabled={loading}
                    onClick={handleCheckout}
                    sx={{ fontSize: "18px", paddingY: 1.5 }}
                >
                    {loading ? "Processing..." : "Confirm Order"}
                </Button>
            </Paper>
        </Box>
    );
};

export default Checkout;
