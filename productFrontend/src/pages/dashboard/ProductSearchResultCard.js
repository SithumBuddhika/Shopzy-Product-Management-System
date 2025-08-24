import React from "react";
import "./search-result-card.css";

const ProductSearchResultCard = ({ product }) => {
  const discountPercent = (product) =>
    product.priceBeforeDiscount
      ? Math.round(
          ((product.priceBeforeDiscount - product.priceAfterDiscount) /
            product.priceBeforeDiscount) *
            100
        )
      : 0;

  return (
    <div className="search-result-item">
      <div className="product-info">
        <div className="product-price-section">
          <span className="currency">LKR.</span>
          <span className="price-value">{product.priceAfterDiscount}</span>
        </div>
        <div className="product-details">
          <div className="product-name">{product.name}</div>
          <div className="product-weight">{product.weight || "500g"}</div>
        </div>
      </div>
      <div className="product-badges">
        {product.priceBeforeDiscount && (
          <div className="discount-badge">{discountPercent(product)}%</div>
        )}
        <div
          className={`availability-badge ${
            !product.availability ? "unavailable" : ""
          }`}
        >
          {product.availability ? "Available" : "Unavailable"}
        </div>
      </div>
    </div>
  );
};

export default ProductSearchResultCard;
