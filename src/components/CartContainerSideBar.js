import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { useGlobalContext } from "../assets/context";
import Overlay from "./Overlay";

const CartContainerSideBar = () => {
  const {
    closeSideBar,
    cart,
    removeFromCartHandler,
    total,
    increaseItemHandler,
    decreaseItemHandler,
  } = useGlobalContext();

  return (
    <Overlay>
      <div className="px-2 pt-2">
        <button onClick={closeSideBar}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </div>
      <h1 className="text-2xl font-bold text-center italic pb-6">Your Cart</h1>
      {/* items */}
      {cart.map((item) => (
        <div key={item.id} className="grid grid-cols-5  p-4">
          <div className="flex col-span-4">
            <div className="mr-6">
              <img
                className="h-20 w-24 object-cover"
                src={item.image}
                alt={item.image}
              />
            </div>
            <div>
              <h4 className="tracking-wide text-gray-900">{item.name}</h4>
              <span className=" text-sm">$ {item.price}</span>
              <button
                className="block text-red-600"
                onClick={() => {
                  removeFromCartHandler(item.id);
                }}
              >
                remove
              </button>
            </div>
          </div>
          <div className="col-span-1">
            <div className="text-xl flex flex-col justify-center items-center">
              <button onClick={() => increaseItemHandler(item.id)}>
                <FaCaretUp></FaCaretUp>
              </button>
              <div>
                <h1>{item.quantity}</h1>
              </div>
              <button onClick={() => decreaseItemHandler(item.id)}>
                <FaCaretDown></FaCaretDown>
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Total part */}
      <div className="p-4 flex justify-center flex-col items-center">
        <h1 className="text-2xl font-semibold italic">Total - ${total}</h1>
        <button className="border w-5/6 my-2 bg-slate-500 text-white py-1">
          Check out
        </button>
      </div>
    </Overlay>
  );
};

export default CartContainerSideBar;
