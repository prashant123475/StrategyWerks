import React, { useState, useRef } from "react";
import Filters from "./Filters";
import ProductModal from "./ProductModal";
import useProducts from "../hooks/useProducts";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import "../App.css";
import ProductGrid from "./ProductGrid";
import Loader from "./Loader";
import Toast from "./Toast";
import NoResults from "./NoResult";

const ProductList = () => {
  const [filters, setFilters] = useState({
    category: "",
    minPrice: 0,
    maxPrice: Infinity,
    minRating: 0,
    sortBy: ""
  });
  const [page, setPage] = useState(1);
  const lastProductRef = useRef(null);

  const {
    products,
    loading,
    hasMore,
    selectedProduct,
    error,
    fetchProductDetails
  } = useProducts(page, filters);

  useIntersectionObserver(lastProductRef, hasMore, loading, () =>
    setPage((prev) => prev + 1)
  );

  const applyFilters = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  return (
    <>
      {error && <Toast message={error} type="error" />}
      <Filters applyFilters={applyFilters} />
      {products.length === 0 && !loading && <NoResults />}
      <ProductGrid
        products={products}
        lastProductRef={lastProductRef}
        onProductClick={fetchProductDetails}
      />
      {loading && <Loader />}
      {selectedProduct && <ProductModal product={selectedProduct} />}
    </>
  );
};

export default ProductList;
