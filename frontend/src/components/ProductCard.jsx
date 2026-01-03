import { Card, CardContent, Typography, Button } from "@mui/material";

const ProductCard = ({ product, onAdd }) => {
    return (
        <Card sx={{ height: "100%" }}>
            <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography color="text.secondary">€{product.price}</Typography>

                <Button
                    variant="contained"
                    sx={{ mt: 2 }}
                    onClick={() => onAdd(product.id)}
                >
                    Add to Cart
                </Button>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
