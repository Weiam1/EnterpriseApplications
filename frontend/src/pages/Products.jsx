import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");

    const fetchProducts = async () => {
        const response = await axiosClient.get("/products");
        setProducts(response.data);
    };

    const fetchCategories = async () => {
        const response = await axiosClient.get("/categories");
        setCategories(response.data);
    };

    const handleCategoryChange = async (categoryId) => {
        setSelectedCategory(categoryId);

        if (categoryId === "all") {
            fetchProducts();
        } else {
            const response = await axiosClient.get(
                `/products/category/${categoryId}`
            );
            setProducts(response.data);
        }
    };

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

    useEffect(() => {
        const loadData = async () => {
            await fetchProducts();
            await fetchCategories();
        };

        loadData();
    }, []);

    return (
        <div>
            <h2>Product Catalog</h2>

            <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
            >
                <option value="all">All categories</option>
                {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                        {cat.name}
                    </option>
                ))}
            </select>

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
