import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

// TEMPORARY MOCK (remove when AuthContext is added)
const isAuthenticated = false;
const logout = () => {};

const Navbar = () => {
    return (
        <AppBar position="static" color="primary">
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                {/* Left side (App Title) */}
                <Typography
                    variant="h6"
                    component={Link}
                    to="/"
                    sx={{ color: "#fff", textDecoration: "none", fontWeight: "bold" }}
                >
                    Equipment Rental
                </Typography>

                {/* Right side (Links) */}
                <Box>
                    <Button color="inherit" component={Link} to="/products">
                        Products
                    </Button>

                    {isAuthenticated ? (
                        <>
                            <Button color="inherit" component={Link} to="/cart">
                                Cart
                            </Button>
                            <Button color="inherit" component={Link} to="/orders">
                                Orders
                            </Button>
                            <Button color="inherit" onClick={logout}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button color="inherit" component={Link} to="/login">
                                Login
                            </Button>
                            <Button color="inherit" component={Link} to="/register">
                                Register
                            </Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
