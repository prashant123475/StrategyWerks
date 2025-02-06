import React, { useState } from "react";
import "../css/ProductCard.css";

const ProductCard = ({ product }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div className="product-card">
      <div className="image-container">
        {!isImageLoaded && (
          <div className="loading-placeholder">Loading...</div>
        )}
        <img
          src={product.thumbnail}
          alt={product.title}
          className="product-image"
          loading="lazy"
          onLoad={() => setIsImageLoaded(true)}
        />
      </div>
      <div className="product-details">
        <h3 className="product-title" data-full-title={product.title}>
          {product.title}
        </h3>
        <p className="price">
          <strong>Price:</strong> ${product.price}
        </p>
        <p className="category">
          <strong>Category:</strong> {product.category}
        </p>
        <p className="rating">
          <strong>Rating:</strong> {product.rating} ★
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
