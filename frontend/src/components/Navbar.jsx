import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useAuth } from "../auth/AuthContext";

const Navbar = () => {
    const navigate = useNavigate();

    const { isAuthenticated, logout } = useAuth();

    const handleLogout = () => {
        logout();            // 🔥 هذا هو المهم
        navigate("/login");
    };

    return (
        <AppBar
            position="static"
            elevation={1}
            sx={{
                backgroundColor: "#8FB9A8",
                paddingY: 1.5
            }}
        >
            <Toolbar
                sx={{
                    width: "100%",
                    paddingX: { xs: 3, md: 8 },
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >

                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                        color: "#2F3E3A",
                        letterSpacing: "0.5px"
                    }}
                >
                    Equipment Rental
                </Typography>


                <Box
                    sx={{
                        display: "flex",
                        gap: 2.5,
                        alignItems: "center",
                        mr: { xs: 5, md: 10 }
                    }}
                >
                    <Button component={Link} to="/" sx={navButtonStyle}>
                        Home
                    </Button>

                    {isAuthenticated && (
                        <>
                    <Button component={Link} to="/products" sx={navButtonStyle}>
                        Products
                    </Button>

                    <Button component={Link} to="/cart" sx={navButtonStyle}>
                        Cart
                    </Button>
                            <Button component={Link} to="/orders" sx={navButtonStyle}>
                                Orders
                            </Button>
                        </>
                    )}

                    {!isAuthenticated && (
                        <>
                        <Button component={Link} to="/login" sx={navButtonStyle}>
                            Login
                        </Button>

                        <Button component={Link} to="/register" sx={navButtonStyle}>
                    Register

                </Button>
                        </>
                    )}


                    {isAuthenticated && (
                        <Button onClick={handleLogout} sx={navButtonStyle}>
                            Logout
                        </Button>
                    )}


                </Box>
            </Toolbar>
        </AppBar>
    );
};

const navButtonStyle = {
    backgroundColor: "#E8E2D6",
    color: "#2F3E3A",
    fontSize: "16px",
    paddingX: 3,
    paddingY: 1,
    borderRadius: "10px",
    textTransform: "none",
    boxShadow: "none",
    "&:hover": {
        backgroundColor: "#DDD6C8",
        boxShadow: "none"
    }
};


export default Navbar;
