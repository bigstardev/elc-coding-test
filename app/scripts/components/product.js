import React from "react";

const Product = ({ data }) => {
  const { name, picture, about } = data;
  return (
    <div className="product">
      <div>
        <img src={picture} />
      </div>

      <h4 className="product-name">{name}</h4>
      <h6 className="product-about">{about}</h6>
    </div>
  );
};
export default Product;
