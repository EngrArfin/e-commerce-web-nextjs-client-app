/* import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  _id: string;
  productName: string;
  price: number;
  availableQuantity: number;
  image: string;
  quantity: number;
}

interface CartState {
  cartItems: Product[];
  totalQuantity: number;
  totalPrice: number;
}

const initialState: CartState = {
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const existingProduct = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
      state.totalQuantity += 1;
      state.totalPrice += action.payload.price;
    },
    removeFromCart(state, action: PayloadAction<string>) {
      const productToRemove = state.cartItems.find(
        (item) => item._id === action.payload
      );
      if (productToRemove) {
        state.totalQuantity -= productToRemove.quantity;
        state.totalPrice -= productToRemove.price * productToRemove.quantity;
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
  },
});

export const { addToCart, removeFromCart, clearCart } = productSlice.actions;
export default productSlice.reducer;
 */
