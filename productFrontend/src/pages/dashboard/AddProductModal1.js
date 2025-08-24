import React, { useState } from "react";
import "./AddProductModal.css";
import '@flaticon/flaticon-uicons/css/all/all.css';

const AddProductModal = ({ onClose }) => {
  const categories = [
    "Vegetables & Fruits",
    "Meat & Sea Food",
    "Diary & egg",
    "Pantry staples",
    "Beverages",
    "Dairy products"
  ];

  const [formData, setFormData] = useState({
    productName: '',
    quantityUnit: '',
    priceBefore: '',
    priceAfter: '',
    availability: '',
    description: '',
  });

  const [errors, setErrors] = useState({
    productName: '',
    quantityUnit: '',
    priceBefore: '',
    priceAfter: '',
    availability: '',
    description: '',
  });

  const [availability, setAvailability] = useState('');

  const validateProductName = (value) => {
    const regex = /^[A-Za-z0-9 ]+$/;
    if (!value.trim()) return "Product name is required.";
    if (value.length > 80) return "Must be under 80 characters.";
    if (!regex.test(value)) return "Only letters and numbers allowed.";
    return "";
  };

  const validatePrice = (value) => {
    if (!value.trim()) return "Price is required.";
    if (!/^\d+(\.\d{1,2})?$/.test(value)) return "Enter a valid price (e.g., 19.99)";
    return "";
  };

  const validatePriceBefore = (value) => validatePrice(value);

  const validatePriceAfter = (after, before) => {
    const baseCheck = validatePrice(after);
    if (baseCheck) return baseCheck;
    if (parseFloat(after) === parseFloat(before)) return "Prices cannot be the same.";
    if (parseFloat(after) > parseFloat(before)) return "Discounted price must be less.";
    return "";
  };

  const validateQuantityUnit = (value) => {
    const validUnits = ["g", "kg", "per unit"];
    const cleaned = value.trim().toLowerCase();
    const isValid = validUnits.some(unit => cleaned.includes(unit));
    if (!value.trim()) return "Quantity unit is required.";
    if (!isValid) return "Use valid units like '500g', '1kg' or 'per unit'.";
    return "";
  };

  const validateAvailability = (value) => {
    if (!value) return "Select product availability.";
    return "";
  };

  const validateDescription = (value) => {
    const regex = /^[A-Za-z0-9\s]+$/;
    const wordCount = value.trim().split(/\s+/).length;

    if (!value.trim()) return "Description is required.";
    if (!regex.test(value)) return "Only letters and numbers allowed.";
    if (wordCount > 20) return "Max 20 words allowed.";
    return "";
  };

  const handleChange = (field, value) => {
    const newForm = { ...formData, [field]: value };
    setFormData(newForm);

    const newErrors = { ...errors };
    if (field === "productName") newErrors.productName = validateProductName(value);
    if (field === "quantityUnit") newErrors.quantityUnit = validateQuantityUnit(value);
    if (field === "priceBefore") {
      newErrors.priceBefore = validatePriceBefore(value);
      newErrors.priceAfter = validatePriceAfter(newForm.priceAfter, value);
    }
    if (field === "priceAfter") {
      newErrors.priceAfter = validatePriceAfter(value, newForm.priceBefore);
    }
    if (field === "description") {
      newErrors.description = validateDescription(value);
    }
    if (field === "availability") {
      newErrors.availability = validateAvailability(value);
    }

    setErrors(newErrors);
  };

  const handleSubmit = () => {
    const validationResults = {
      productName: validateProductName(formData.productName),
      quantityUnit: validateQuantityUnit(formData.quantityUnit),
      priceBefore: validatePriceBefore(formData.priceBefore),
      priceAfter: validatePriceAfter(formData.priceAfter, formData.priceBefore),
      description: validateDescription(formData.description),
      availability: validateAvailability(availability)
    };

    setErrors(validationResults);

    const hasErrors = Object.values(validationResults).some(msg => msg !== "");
    if (hasErrors) return;

    const submittedData = {
      ...formData,
      availability
    };

    console.log("Form submitted!", submittedData);
    // Here you can call an API or store logic
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">Add product to the store</h2>
          <div className="modal-buttons">
            <button className="modal-btn add-product-btn" onClick={handleSubmit}>
              <i className="fi fi-rr-plus"></i>
              <span>ADD PRODUCT</span>
            </button>
            <button className="modal-btn skip-btn" onClick={onClose}>
              <span>SKIP NOW</span>
            </button>
          </div>
        </div>

        <div className="select-category-section">
          <div className="category-header">
            <i className="fi fi-rr-box"></i>
            <span className="category-title">select category</span>
          </div>
          <div className="category-scroll-wrapper">
            <div className="category-scroll">
              {categories.map((cat, idx) => (
                <button key={idx} className={`category-tab ${idx === 0 ? "active" : ""}`}>
                  {cat}
                </button>
              ))}
            </div>
            <span className="scroll-arrow">{'>'}</span>
          </div>
          <div className="category-underline"></div>
        </div>

        <div className="form-section">
          <div className="form-row">
            <div className="input-with-icon">
              <i className="fi fi-rr-box product-icon"></i>
              <div className="input-field-group">
                <fieldset className="input-wrapper">
                  <legend>Name of the Product</legend>
                  <input
                    type="text"
                    placeholder="Enter product name"
                    value={formData.productName}
                    onChange={(e) => handleChange("productName", e.target.value)}
                  />
                </fieldset>
                <div className="error-wrapper">
                  {errors.productName && <span className="error-text">{errors.productName}</span>}
                </div>
              </div>
            </div>

            <div className="input-with-icon">
              <i className="fi fi-rr-shopping-cart product-icon"></i>
              <div className="input-field-group">
                <fieldset className="input-wrapper">
                  <legend>Product Quantity unit</legend>
                  <input
                    type="text"
                    placeholder="500g / 1kg"
                    value={formData.quantityUnit}
                    onChange={(e) => handleChange("quantityUnit", e.target.value)}
                  />
                </fieldset>
                <div className="error-wrapper">
                  {errors.quantityUnit && <span className="error-text">{errors.quantityUnit}</span>}
                </div>
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="input-with-icon">
              <i className="fi fi-rr-badge-percent product-icon"></i>
              <div className="input-field-group">
                <fieldset className="input-wrapper">
                  <legend>Price Before Discount</legend>
                  <input
                    type="text"
                    placeholder="Enter original price"
                    value={formData.priceBefore}
                    onChange={(e) => handleChange("priceBefore", e.target.value)}
                  />
                </fieldset>
                <div className="error-wrapper">
                  {errors.priceBefore && <span className="error-text">{errors.priceBefore}</span>}
                </div>
              </div>
            </div>

            <div className="input-with-icon">
              <i className="fi fi-rr-plus product-icon"></i>
              <div className="input-field-group">
                <fieldset className="input-wrapper">
                  <legend>Price After Discount</legend>
                  <input
                    type="text"
                    placeholder="Enter discounted price"
                    value={formData.priceAfter}
                    onChange={(e) => handleChange("priceAfter", e.target.value)}
                  />
                </fieldset>
                <div className="error-wrapper">
                  {errors.priceAfter && <span className="error-text">{errors.priceAfter}</span>}
                </div>
              </div>
            </div>
          </div>

          <div className="form-row availability-row">
            <span className="availability-label">Product Availability:</span>
            <label className="custom-checkbox">
              <input
                type="checkbox"
                checked={availability === 'Available'}
                onChange={() => setAvailability('Available')}
              />
              <span className="checkmark"></span> Available
            </label>
            <label className="custom-checkbox">
              <input
                type="checkbox"
                checked={availability === 'Unavailable'}
                onChange={() => setAvailability('Unavailable')}
              />
              <span className="checkmark"></span> Unavailable
            </label>
            {errors.availability && <span className="error-text">{errors.availability}</span>}
          </div>

          <div className="form-row">
            <div className="input-with-icon">
              <i className="fi fi-rr-document product-icon"></i>
              <div className="input-field-group full">
                <fieldset className="input-wrapper full">
                  <legend>Description</legend>
                  <input
                    type="text"
                    placeholder="Enter a description"
                    value={formData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                  />
                </fieldset>
                <div className="error-wrapper">
                  {errors.description && <span className="error-text">{errors.description}</span>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
