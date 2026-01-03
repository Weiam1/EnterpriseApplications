import { useState } from "react";
import axiosClient from "../api/axiosClient";

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
        <div style={{ padding: "40px", maxWidth: "400px", margin: "0 auto" }}>
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div style={{ marginTop: "10px" }}>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button style={{ marginTop: "15px" }} type="submit">
                    Login
                </button>
            </form>

            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default Login;
