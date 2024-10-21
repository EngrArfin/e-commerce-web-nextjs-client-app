import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the Product interface
interface Product {
  _id: string;
  productName: string;
  price: number;
  availableQuantity: number;
  image: string;
  quantity: number; // Add quantity to track how many of each product are in the cart
}

// Define the CartState interface
interface CartState {
  cartItems: Product[];
  totalQuantity: number;
  totalPrice: number;
}

// Initial state
const initialState: CartState = {
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0,
};

// Create the product slice
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const existingProduct = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (existingProduct) {
        existingProduct.quantity += 1; // Increase quantity if already in cart
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 }); // Initialize quantity to 1
      }
      state.totalQuantity += 1; // Update total quantity
      state.totalPrice += action.payload.price; // Update total price
    },
    removeFromCart(state, action: PayloadAction<string>) {
      const productToRemove = state.cartItems.find(
        (item) => item._id === action.payload
      );
      if (productToRemove) {
        state.totalQuantity -= productToRemove.quantity; // Decrease total quantity
        state.totalPrice -= productToRemove.price * productToRemove.quantity; // Decrease total price
        state.cartItems = state.cartItems.filter(
          (item) => item._id !== action.payload
        );
      }
    },
    clearCart(state) {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
    increaseQuantity(state, action: PayloadAction<string>) {
      const productToIncrease = state.cartItems.find(
        (item) => item._id === action.payload
      );
      if (
        productToIncrease &&
        productToIncrease.availableQuantity > productToIncrease.quantity
      ) {
        productToIncrease.quantity += 1; // Increase quantity
        state.totalQuantity += 1; // Update total quantity
        state.totalPrice += productToIncrease.price; // Update total price
      }
    },
    decreaseQuantity(state, action: PayloadAction<string>) {
      const productToDecrease = state.cartItems.find(
        (item) => item._id === action.payload
      );
      if (productToDecrease && productToDecrease.quantity > 1) {
        productToDecrease.quantity -= 1; // Decrease quantity
        state.totalQuantity -= 1; // Update total quantity
        state.totalPrice -= productToDecrease.price; // Update total price
      }
    },
  },
});

// Exporting the actions for use in components
export const {
  addToCart,
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} = productSlice.actions;

// Exporting the reducer to be used in the store
export default productSlice.reducer;
