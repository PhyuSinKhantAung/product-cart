import { useGlobalContext } from "../assets/context";
import React, { useEffect, useState } from "react";

const ProductItem = ({ product }) => {
  const { addToCartHandler, removeFromCartHandler,cart, updatedCart } = useGlobalContext();
  const [isAddToCart, setIsAddToCart] = useState(false);
  // I changed is add to cart to boolean by defalut false 
  // then onClick I update the added boolean value for cart true when add to cart, false otherwise
  
  useEffect(() => {
    // this side effect would run everytime cart change 
    // filter the item from the cart to cache if didn't exist it would return [], so [].length < 1 would be run to update the button
    const cache = cart.filter(item => item.id === product.id)
    if (cache.length < 1) {
      setIsAddToCart(false)
    }
  },[cart])
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
              if (isAddToCart) {
                removeFromCartHandler(product.id);
                setIsAddToCart(false);
                updatedCart(product.id,false)
              } else {
                addToCartHandler(product);
                setIsAddToCart(true);
                updatedCart(product.id,true)
              }
            }}
            className={`${
              isAddToCart
                ? "border-red-400 my-2 w-full border-[1px] text-red-700 hover:text-white hover:bg-red-400"
                : "border-slate-400 my-2 w-full border-[1px] hover:text-white hover:bg-slate-400 "
            }`}
          >
            {isAddToCart ? "Remove from cart" : "Add to cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
