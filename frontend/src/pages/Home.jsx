import { Box, Typography, Button, Paper, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem("token");

    return (
        <Box
            sx={{
                padding: 6,
                maxWidth: "1100px",
                margin: "0 auto"
            }}
        >
            <Paper
                elevation={2}
                sx={{
                    padding: 6,
                    borderRadius: "20px",
                    backgroundColor: "#FFFFFF"
                }}
            >
                <Stack spacing={5}>
                    {/* Title */}
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: "bold",
                            color: "#2F3E3A"
                        }}
                    >
                        Equipment Rental Platform
                    </Typography>

                    {/* Subtitle */}
                    <Typography
                        variant="h5"
                        sx={{
                            color: "#4F635D",
                            maxWidth: "800px",
                            lineHeight: 1.6
                        }}
                    >
                        A simple and secure platform where students can reserve
                        and rent equipment such as lighting, cables, and control
                        panels for their artistic projects and final works.
                    </Typography>

                    {/* Info Section */}
                    <Box>
                        <Typography
                            variant="h4"
                            sx={{ fontWeight: "bold", mb: 2 }}
                        >
                            What can you do?
                        </Typography>

                        <Typography variant="h6" sx={{ mb: 1 }}>
                            • Browse a catalog of available equipment
                        </Typography>
                        <Typography variant="h6" sx={{ mb: 1 }}>
                            • Filter products by category
                        </Typography>
                        <Typography variant="h6" sx={{ mb: 1 }}>
                            • Add equipment to your cart
                        </Typography>
                        <Typography variant="h6">
                            • Confirm your reservation securely
                        </Typography>
                    </Box>

                    {/* Action Buttons */}
                    <Stack direction="row" spacing={3}>
                        <Button
                            variant="contained"
                            size="large"
                            sx={{
                                fontSize: "18px",
                                paddingX: 5,
                                paddingY: 1.5,
                                borderRadius: "12px"
                            }}
                            onClick={() => {
                                if (isLoggedIn) {
                                    navigate("/products");   // ✅ مستخدم مسجّل
                                } else {
                                    navigate("/login");      // 🔒 غير مسجّل
                                }
                            }}
                        >
                            Browse Products
                        </Button>

                    </Stack>
                </Stack>
            </Paper>
        </Box>
    );
};

export default Home;
