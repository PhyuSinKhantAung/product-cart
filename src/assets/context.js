import {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
} from "react";

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

      const includedCartItem = state.cart.filter(
        (item) => item.id === cartItem.id
      );

      if (includedCartItem.length !== 0) {
        const tempCart = state.cart.map((item) => {
          if (item.id === cartItem.id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });

        return { ...state, cart: tempCart };
      } else {
        const updatedCart = state.cart.concat(cartItem);
        return { ...state, cart: updatedCart };
      }
    }
    if (action.type === "REMOVE") {
      const updatedCart = state.cart.filter(
        (cartItem) => cartItem.id !== action.payload
      );
      return { ...state, cart: updatedCart };
    }
    if (action.type === "TOTAL") {
      let { total, amount } = state.cart.reduce(
        (cartTotal, cartItem) => {
          const { price, quantity } = cartItem;
          const itemTotal = price * quantity;

          cartTotal.total += itemTotal;
          cartTotal.amount += quantity;
          return cartTotal;
        },
        {
          total: 0,
          amount: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      return { ...state, total, amount };
    }
    if (action.type === "INCREASE") {
      const tempCart = state.cart.map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
      return { ...state, cart: tempCart };
    }
    if (action.type === "DECREASE") {
      const tempCart = state.cart
        .map((item) => {
          if (item.id === action.payload) {
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          }
          return item;
        })
        .filter((tempCartItem) => tempCartItem.quantity !== 0);
      return { ...state, cart: tempCart };
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const openSideBar = () => {
    setIsSideBarOpen(true);
  };

  const closeSideBar = () => {
    setIsSideBarOpen(false);
  };

  const openAlert = () => {
    setIsAlertOpen(true);
  };

  const closeAlert = () => {
    setIsAlertOpen(false);
  };

  const addToCartHandler = (item) => {
    dispatch({ type: "ADD", payload: item });
    openAlert();
  };

  const removeFromCartHandler = (id) => {
    dispatch({ type: "REMOVE", payload: id });
  };

  const increaseItemHandler = (id) => {
    dispatch({ type: "INCREASE", payload: id });
  };

  const decreaseItemHandler = (id) => {
    dispatch({ type: "DECREASE", payload: id });
  };
  useEffect(() => {
    dispatch({ type: "TOTAL" });
    const timeout = setTimeout(() => {
      closeAlert();
    }, 2000);
    return () => {
      clearTimeout(timeout);
    };
  }, [state.cart]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        isSideBarOpen,
        isAlertOpen,
        openSideBar,
        closeSideBar,
        openAlert,
        closeAlert,
        addToCartHandler,
        removeFromCartHandler,
        increaseItemHandler,
        decreaseItemHandler,
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
