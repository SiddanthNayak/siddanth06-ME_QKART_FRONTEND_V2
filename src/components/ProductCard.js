import { AddShoppingCartOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import React, {useEffect} from "react";
import "./ProductCard.css";

const ProductCard = ({ product, handleAddToCart }) => {

  useEffect(() => {
  },[])

  return (
    <Card className="card">
      <CardMedia
        component="img"
        height="300"
        image={product.image}
        alt={product.name}
        aria-label={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          ${product.cost}
        </Typography>
        <Rating aria-label='stars' name="read-only" value={product.rating} precision={0.5} readOnly />
      </CardContent>
        <Button aria-label='add to cart' className="card-button"  variant='contained' onClick={() => handleAddToCart(product._id)}>
          <AddShoppingCartOutlined/>
          ADD TO CART
        </Button>
    </Card>
  );
};

export default ProductCard;
