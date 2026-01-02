import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axiosClient.get("/products");
                setProducts(response.data);
            } catch (err) {
                setError("Failed to load products");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <p>Loading products...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div style={{ padding: "20px" }}>
            <h2>Products</h2>

            {products.length === 0 ? (
                <p>No products found.</p>
            ) : (
                <ul>
                    {products.map((product) => (
                        <li key={product.id} style={{ marginBottom: "10px" }}>
                            <strong>{product.name}</strong> <br />
                            Price: €{product.price} <br />
                            Category: {product.category?.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Products;
