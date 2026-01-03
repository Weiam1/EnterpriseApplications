import { useState } from "react";
import axiosClient from "../api/axiosClient";
import {
    Box,
    Typography,
    TextField,
    Button,
    Paper
} from "@mui/material";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axiosClient.post("/auth/login", {
                email,
                password,
            });

            const { token, userId } = response.data;

            localStorage.setItem("token", token);
            localStorage.setItem("userId", userId);

            alert("Login successful");

        } catch (err) {
            console.error(err);
            setError("Invalid email or password");
        }
    };

    return (
        <Box sx={{ padding: 6, maxWidth: 500, margin: "0 auto" }}>
            <Paper sx={{ padding: 5, borderRadius: "18px" }}>
                <Typography variant="h3" fontWeight="bold" mb={4}>
                    Login
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{ mb: 3 }}
                    />

                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{ mb: 4 }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        sx={{ fontSize: "18px", paddingY: 1.5 }}
                    >
                        Login
                    </Button>
                </form>

                {error && (
                    <Typography color="error" mt={3}>
                        {error}
                    </Typography>
                )}
            </Paper>
        </Box>
    );
};

export default Login;
