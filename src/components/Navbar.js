import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useGlobalContext } from "../assets/context";

const NavBar = () => {
  const { openSideBar, amount } = useGlobalContext();
  return (
    <nav className="bg-slate-400 h-12 flex text-gray-900 sticky top-0 shadow-lg ">
      <div className="flex justify-between items-center w-4/5 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold">Cart</h1>
        <div className="relative">
          <FaShoppingCart
            onClick={openSideBar}
            className="text-2xl cursor-pointer"
          ></FaShoppingCart>
          <div className="absolute top-[-30%] right-[-50%] w-5 h-5 text-xs text-white bg-red-600 text-center flex justify-center items-center font-semibold rounded-full">
            <span>{amount}</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
