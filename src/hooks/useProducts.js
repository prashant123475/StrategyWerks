import { useState, useEffect, useCallback } from "react";

const useProducts = (page, filters) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    console.log("here");
    setLoading(true);
    setError(null);
    let url = `https://dummyjson.com/products?limit=20&skip=${(page - 1) * 20}`;

    if (filters.category) {
      url = `https://dummyjson.com/products/category/${
        filters.category
      }?limit=20&skip=${(page - 1) * 20}`;
    }

    if (filters.sortBy) {
      url += `&sortBy=price&order=${filters.sortBy}`;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();

      const filteredProducts = data.products.filter((product) => {
        const meetsMinPrice = filters.minPrice
          ? product.price > filters.minPrice
          : true;
        const meetsMaxPrice = filters.maxPrice
          ? product.price <= filters.maxPrice
          : true;
        const meetsMinRating = filters.minRating
          ? product.rating >= filters.minRating
          : true;
        return meetsMinPrice && meetsMaxPrice && meetsMinRating;
      });

      setProducts((prev) =>
        page === 1 ? filteredProducts : [...prev, ...filteredProducts]
      );
      setHasMore(filteredProducts.length >= 20);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError(
        "There was an issue loading the products. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  }, [page, filters]);

  useEffect(() => {
    fetchProducts();
  }, [page, filters, fetchProducts]);

  const fetchProductDetails = async (productId) => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/${productId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch product details");
      }
      const data = await response.json();
      setSelectedProduct(data);
    } catch (error) {
      console.error("Error fetching product details:", error);
      setError(
        "There was an issue loading the product details. Please try again later."
      );
    }
  };

  return {
    products,
    loading,
    hasMore,
    selectedProduct,
    error,
    fetchProductDetails
  };
};

export default useProducts;
