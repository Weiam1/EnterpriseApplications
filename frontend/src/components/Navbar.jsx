import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        navigate("/login");
    };

    return (
        <nav style={{
            padding: "16px",
            backgroundColor: "#1976d2",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
        }}>
            <h2>Equipment Rental</h2>

            <div style={{ display: "flex", gap: "15px" }}>
                <Link to="/products" style={{ color: "white" }}>Products</Link>
                <Link to="/cart" style={{ color: "white" }}>Cart</Link>

                {!isLoggedIn && (
                    <Link to="/login" style={{ color: "white" }}>Login</Link>
                )}

                {isLoggedIn && (
                    <button onClick={handleLogout}>
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
