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
    MenuItem,
    TextField
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // 🔹 جديد


const Products = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");

    const [quantities, setQuantities] = useState({});
    const [addedProduct, setAddedProduct] = useState(null);

    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState(""); // 🔍 zoekfunctie
    const [startDates, setStartDates] = useState({});
    const [endDates, setEndDates] = useState({});

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
        const quantity = quantities[productId] || 1;
        const startDate = startDates[productId];   // 🔹 NEW
        const endDate = endDates[productId];       // 🔹 NEW

        // 🔹 NEW: تحقق بسيط قبل الإرسال
        if (!startDate || !endDate) {
            alert("Please select start and end date");
            return;
        }

        await axiosClient.post(
            `/cart/add?productId=${productId}&quantity=${quantity}&startDate=${startDate}&endDate=${endDate}`
        );

        setAddedProduct(productId); // ✅ إظهار نافذة التأكيد
    };


    return (
        <Box sx={{ padding: 6 }}>
            <Typography variant="h3" fontWeight="bold" mb={4}>
                Product Catalog
            </Typography>



                {/* 🔹 Feedback Box بعد الإضافة */}
            {addedProduct && (
                <Box
                    sx={{
                        position: "fixed",        // 🔹 يجعلها فوق الصفحة
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        backgroundColor: "rgba(0,0,0,0.35)", // 🔹 خلفية شفافة
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 1300              // 🔹 فوق كل شيء
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: "#FFFFFF",
                            padding: 4,
                            borderRadius: "16px",
                            minWidth: "320px",
                            textAlign: "center",
                            boxShadow: 6
                        }}
                    >
                        <Typography variant="h6" mb={3}>
                            ✅ Product added to cart
                        </Typography>

                        <Button
                            variant="contained"
                            fullWidth
                            sx={{ mb: 2 }}
                            onClick={() => navigate("/cart")}
                        >
                            Go to Cart
                        </Button>

                        <Button
                            variant="outlined"
                            fullWidth
                            onClick={() => setAddedProduct(null)} // 🔹 يغلق النافذة فقط
                        >
                            Add more products
                        </Button>
                    </Box>
                </Box>
            )}


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
            <TextField
                label="Search product"
                variant="outlined"
                fullWidth
                sx={{ mb: 4, maxWidth: 400 }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <Grid container spacing={4}>
                {products
                    .filter(product =>
                        product.name.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map(product => (

                        <Grid item xs={12} sm={6} md={4} key={product.id}>
                        <Card sx={{ height: "100%", borderRadius: "18px" }}>
                            <CardContent>
                                <Typography variant="h5" fontWeight="bold">
                                    {product.name}
                                </Typography>

                                <Typography variant="h6" mt={2}>
                                    € {product.price}
                                </Typography>

                                <TextField
                                    type="date"
                                    label="Start date"
                                    InputLabelProps={{ shrink: true }}
                                    fullWidth
                                    sx={{ mt: 3 }}
                                    value={startDates[product.id] || ""}
                                    onChange={(e) =>
                                        setStartDates({
                                            ...startDates,
                                            [product.id]: e.target.value
                                        })
                                    }
                                />

                                <TextField
                                    type="date"
                                    label="End date"
                                    InputLabelProps={{ shrink: true }}
                                    fullWidth
                                    sx={{ mt: 2 }}
                                    value={endDates[product.id] || ""}
                                    onChange={(e) =>
                                        setEndDates({
                                            ...endDates,
                                            [product.id]: e.target.value
                                        })
                                    }
                                />


                                <Select
                                    fullWidth
                                    value={quantities[product.id] || 1}
                                    onChange={(e) =>
                                        setQuantities({
                                            ...quantities,
                                            [product.id]: e.target.value
                                        })
                                    }
                                    sx={{ mt: 3 }}
                                >
                                    {[1,2,3,4,5].map(q => (
                                        <MenuItem key={q} value={q}>
                                            {q}
                                        </MenuItem>
                                    ))}
                                </Select>


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
