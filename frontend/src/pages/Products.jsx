import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axiosClient.get("/products");
            setProducts(response.data);
        };
        fetchProducts();
    }, []);

    const handleAddToCart = async (productId) => {
        try {
            await axiosClient.post(
                `/cart/add?productId=${productId}&quantity=1`
            );


            alert("Product added to cart");
        } catch (error) {
            console.error(error);
            alert("You must be logged in");
        }
    };


    return (
        <div>
            <h2>Products</h2>
            <ul>
                {products.map((p) => (
                    <li key={p.id}>
                        <strong>{p.name}</strong> – €{p.price}
                        <br />
                        <button onClick={() => handleAddToCart(p.id)}>
                            Add to cart
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Products;
