import React, { useEffect, useState } from "react";
import "../css/ProductModal.css";

const ProductModal = ({ product }) => {
  const [isVisible, setIsVisible] = useState(true);

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const closeModal = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    if (product) {
      setIsVisible(true);
      setIsImageLoaded(false);
    }
  }, [product]);

  return (
    isVisible && (
      <div className="modal-overlay" onClick={closeModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-btn" onClick={closeModal}>
            &times;
          </button>
          <div className="modal-inner">
            <div className="modal-left">
              {!isImageLoaded && <div>Loading...</div>}
              <img
                src={product.images[0]}
                alt={product.title}
                className="modal-image"
                loading="lazy"
                onLoad={() => setIsImageLoaded(true)}
              />
            </div>
            <div className="modal-right">
              <h2>{product.title}</h2>
              <p>{product.description}</p>
              <div className="product-details">
                <p>
                  <strong>Category:</strong> {product.category}
                </p>
                <p>
                  <strong>Price:</strong> ${product.price}
                </p>
                <p>
                  <strong>Rating:</strong> {product.rating} ★
                </p>
                <p>
                  <strong>Stock:</strong> {product.stock}
                </p>
                <p>
                  <strong>Warranty:</strong> {product.warrantyInformation}
                </p>
                <p>
                  <strong>Shipping Info:</strong> {product.shippingInformation}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductModal;
