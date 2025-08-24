import React from "react";
import "./product-search.css";

const ProductSearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="product-search-wrapper">
      <input
        type="text"
        className="product-search-input"
        placeholder="Search product..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default ProductSearchBar;

