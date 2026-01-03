import axiosClient from "../api/axiosClient";
import {
    Box,
    Typography,
    Button,
    Paper
} from "@mui/material";

const Checkout = () => {

    const handleCheckout = async () => {
        await axiosClient.post("/checkout");
        alert("Order completed successfully!");
    };

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
                    onClick={handleCheckout}
                    sx={{ fontSize: "18px", paddingY: 1.5 }}
                >
                    Confirm Order
                </Button>
            </Paper>
        </Box>
    );
};

export default Checkout;
