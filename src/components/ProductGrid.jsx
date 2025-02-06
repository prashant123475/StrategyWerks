import React from "react";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products, lastProductRef, onProductClick }) => {
  return (
    <div className="product-grid">
      {products.map((product, index) => (
        <div
          key={product.id}
          ref={index === products.length - 1 ? lastProductRef : null}
          onClick={() => onProductClick(product.id)}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
