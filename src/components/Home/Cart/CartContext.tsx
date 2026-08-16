import React, { createContext, useContext, useReducer, useEffect } from "react";

export interface TProduct {
  _id: string;
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  ratings: number;
}

// Define cart item type
interface CartItem extends TProduct {
  quantity: number;
}

// Define action types for cart
interface UpdateQuantityAction {
  type: "UPDATE_CART_QUANTITY";
  payload: {
    id: string;
    type: "increase" | "decrease";
  };
}

interface RemoveFromCartAction {
  type: "REMOVE_FROM_CART";
  payload: { id: string };
}

interface ClearCartAction {
  type: "CLEAR_CART";
}

interface AddToCartAction {
  type: "ADD_TO_CART";
  payload: CartItem;
}

type CartAction =
  | UpdateQuantityAction
  | RemoveFromCartAction
  | ClearCartAction
  | AddToCartAction;

interface CartState {
  cart: CartItem[];
}

const initialState: CartState = {
  cart: [],
};

// Helper to safely clean and parse prices (handling spaces, commas, etc.)
export const parsePrice = (price: any): number => {
  if (price === undefined || price === null) return 0;
  if (typeof price === "number") return price;
  const clean = String(price).replace(/[^0-9.-]/g, "");
  const num = parseFloat(clean);
  return isNaN(num) ? 0 : num;
};

// Reducer function to manage cart state
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "UPDATE_CART_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item._id === action.payload.id
            ? {
                ...item,
                quantity:
                  action.payload.type === "increase"
                    ? item.quantity + 1
                    : Math.max(1, item.quantity - 1),
              }
            : item
        ),
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item._id !== action.payload.id),
      };

    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      };

    case "ADD_TO_CART": {
      const existingProduct = state.cart.find((item) => item._id === action.payload._id);
      if (existingProduct) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item._id === action.payload._id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    }

    default:
      return state;
  }
};

// Create Cart Context
const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: TProduct, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  updateCartQuantity: (id: string, type: "increase" | "decrease") => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

// CartProvider with useReducer
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage when the component mounts
  useEffect(() => {
    try {
      const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      if (Array.isArray(savedCart)) {
        savedCart.forEach((item: CartItem) =>
          dispatch({ type: "ADD_TO_CART", payload: item })
        );
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  const addToCart = (product: TProduct, quantity: number = 1) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...product, quantity },
    });
  };

  const updateCartQuantity = (id: string, type: "increase" | "decrease") => {
    dispatch({ type: "UPDATE_CART_QUANTITY", payload: { id, type } });
  };

  const removeFromCart = (id: string) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { id } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const getTotalPrice = () => {
    return state.cart.reduce(
      (acc, item) => acc + parsePrice(item.price) * item.quantity,
      0
    );
  };

  const getTotalItems = () => {
    return state.cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        addToCart,
        removeFromCart,
        clearCart,
        updateCartQuantity,
        getTotalPrice,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
