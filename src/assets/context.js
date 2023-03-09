import { createContext, useContext, useReducer, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const initialState = {
    cart: [],
    total: 0,
    amount: 0,
  };

  const reducer = (state, action) => {
    if (action.type === "ADD") {
      const cartItem = { ...action.payload, quantity: 1 };
      const updatedCart = state.cart.concat(cartItem);
      // return { ...state, cart: [...new Set(updatedCart)] };
      return { ...state, cart: updatedCart };
    }
    if (action.type === "REMOVE") {
      const updatedCart = state.cart.filter(
        (cartItem) => cartItem.id !== action.payload
      );
      console.log(action.payload);
      console.log(state.cart);
      console.log("cart after removing", updatedCart);
      return { ...state, cart: updatedCart };
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const openSideBar = () => {
    setIsSideBarOpen(true);
  };

  const closeSideBar = () => {
    setIsSideBarOpen(false);
  };

  const addToCartHandler = (item) => {
    dispatch({ type: "ADD", payload: item });
  };

  const removeFromCartHandler = (id) => {
    dispatch({ type: "REMOVE", payload: id });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        isSideBarOpen,
        openSideBar,
        closeSideBar,
        addToCartHandler,
        removeFromCartHandler,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
