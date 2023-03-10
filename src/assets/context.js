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
      // Added the boolean added value when product add to cart
      const cartItem = { ...action.payload, quantity: 1,added:false };
      const updatedCart = state.cart.concat(cartItem);
      // return { ...state, cart: [...new Set(updatedCart)] };
      return { ...state, cart: updatedCart };
    }
    if (action.type === "REMOVE") {
      const updatedCart = state.cart.filter(
        (cartItem) => cartItem.id !== action.payload
      );
      return { ...state, cart: updatedCart };
    }

    // update the added boolean value when dispatch
    if (action.type === "UPDATE") {
      return state = {
        ...state,
        cart:   
          state.cart.map(item => {
            if (item.id === action.payload.id) {
              return {...item,added:action.payload.status}
            }
            return item
          })
        
      }
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

  // Will take two parameter id to check the cart and status for true or false
  const updatedCart = (id,status) => {
    dispatch({ type: "UPDATE", payload: {id:id,status:status} });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        isSideBarOpen,
        openSideBar,
        updatedCart,
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
