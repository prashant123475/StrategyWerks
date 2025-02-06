import React, { useState, useEffect } from "react";

const Filters = ({ applyFilters }) => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minRating, setMinRating] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://dummyjson.com/products/category-list"
        );
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleApplyFilters = () => {
    applyFilters({
      category: category || "",
      minPrice: minPrice ? Number(minPrice) : 0,
      maxPrice: maxPrice ? Number(maxPrice) : Infinity,
      minRating: minRating ? Number(minRating) : 0,
      sortBy
    });
  };

  return (
    <div className="filters">
      <select onChange={(e) => setCategory(e.target.value)} value={category}>
        <option value="">All Categories</option>
        {categories.map((cat, i) => (
          <option key={i} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Min Price"
        onChange={(e) => setMinPrice(e.target.value)}
      />
      <input
        type="number"
        placeholder="Max Price"
        onChange={(e) => setMaxPrice(e.target.value)}
      />

      <input
        type="number"
        placeholder="Min Rating"
        onChange={(e) => setMinRating(e.target.value)}
      />

      <select onChange={(e) => setSortBy(e.target.value)}>
        <option value="">Sort By</option>
        <option value="asc">Price: Low to High</option>
        <option value="desc">Price: High to Low</option>
      </select>

      <button onClick={handleApplyFilters}>Apply</button>
    </div>
  );
};

export default Filters;
