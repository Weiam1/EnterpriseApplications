import axiosClient from "../api/axiosClient";

const Checkout = () => {

    const handleCheckout = async () => {
        try {
            await axiosClient.post("/checkout");
            alert("Order completed!");
        } catch (err) {
            console.error(err);
            alert("Checkout failed");
        }
    };

    return (
        <div style={{ padding: "40px" }}>
            <h1>Checkout</h1>

            <button onClick={handleCheckout}>
                Confirm Order
            </button>
        </div>
    );
};

export default Checkout;
