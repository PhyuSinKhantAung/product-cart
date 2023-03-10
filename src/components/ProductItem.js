import { useGlobalContext } from "../assets/context";
import React from "react";

const ProductItem = ({ product }) => {
  const { addToCartHandler } = useGlobalContext();

  return (
    <div key={product.id} className="shadow my-10 md:my-0">
      <img
        className="h-48 w-full object-cover"
        src={product.image}
        alt={product.name}
      />
      <div className="p-4 text-center">
        <h1 className="text-lg font-bold tracking-wide">{product.name}</h1>
        <h4 className="text-slate-500 font-semibold tracking-wide">
          $ {product.price}
        </h4>
        <div>
          <button
            onClick={() => {
              addToCartHandler(product);
            }}
            className={`${"border-slate-400 my-2 w-full border-[1px] hover:text-white hover:bg-slate-400 "}`}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
