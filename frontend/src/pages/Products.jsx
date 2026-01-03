import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    CardActions,
    Button,
    Select,
    MenuItem
} from "@mui/material";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");

    useEffect(() => {
        axiosClient.get("/products").then(res => setProducts(res.data));
        axiosClient.get("/categories").then(res => setCategories(res.data));
    }, []);

    const handleCategoryChange = async (categoryId) => {
        setSelectedCategory(categoryId);
        if (categoryId === "all") {
            const res = await axiosClient.get("/products");
            setProducts(res.data);
        } else {
            const res = await axiosClient.get(`/products/category/${categoryId}`);
            setProducts(res.data);
        }
    };

    const addToCart = async (productId) => {
        await axiosClient.post(`/cart/add?productId=${productId}&quantity=1`);
        alert("Product added to cart");
    };

    return (
        <Box sx={{ padding: 6 }}>
            <Typography variant="h3" fontWeight="bold" mb={4}>
                Product Catalog
            </Typography>

            <Select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                sx={{ mb: 5, fontSize: "18px", minWidth: 240 }}
            >
                <MenuItem value="all">All Categories</MenuItem>
                {categories.map(cat => (
                    <MenuItem key={cat.id} value={cat.id}>
                        {cat.name}
                    </MenuItem>
                ))}
            </Select>

            <Grid container spacing={4}>
                {products.map(product => (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                        <Card sx={{ height: "100%", borderRadius: "18px" }}>
                            <CardContent>
                                <Typography variant="h5" fontWeight="bold">
                                    {product.name}
                                </Typography>

                                <Typography variant="h6" mt={2}>
                                    € {product.price}
                                </Typography>
                            </CardContent>

                            <CardActions sx={{ padding: 2 }}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                    onClick={() => addToCart(product.id)}
                                    sx={{ fontSize: "16px" }}
                                >
                                    Add to Cart
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Products;
