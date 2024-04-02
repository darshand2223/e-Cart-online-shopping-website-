import React from "react";

const RadioButtonDiscount = ({ priceList }) => {
  return (
    <>
      {priceList.map((item, index) => {
        return (
          <div className="mx-2" key={index}>
            <input type="radio" className="mx-1" />
            <span>{item.price}</span>
          </div>
        );
      })}
    </>
  );
};

export default RadioButtonDiscount;
