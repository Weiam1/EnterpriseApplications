import { useState } from "react";
import axiosClient from "../api/axiosClient";
import {
    Box,
    Typography,
    TextField,
    Button,
    Paper
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: ""
    });

    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            await axiosClient.post("/auth/register", form);
            alert("Registration successful. Please login.");
            navigate("/login");
        } catch  {
            setError("Registration failed");
        }
    };

    return (
        <Box sx={{ padding: 6, maxWidth: 500, margin: "0 auto" }}>
            <Paper sx={{ padding: 5, borderRadius: "18px" }}>
                <Typography variant="h3" fontWeight="bold" mb={4}>
                    Register
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="First Name"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        sx={{ mb: 3 }}
                    />

                    <TextField
                        fullWidth
                        label="Last Name"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        sx={{ mb: 3 }}
                    />

                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        sx={{ mb: 3 }}
                    />

                    <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        sx={{ mb: 4 }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        sx={{ fontSize: "18px", paddingY: 1.5 }}
                    >
                        Register
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

export default Register;
