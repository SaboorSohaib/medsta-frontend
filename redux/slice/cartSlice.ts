import { useToast } from "@/hooks/use-toast";
import { createSlice } from "@reduxjs/toolkit";

const initialState: any = { cartItems: [] };
export const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemExists = state.cartItems.find(
        (item: any) => item.id === action.payload.id
      );
      if (itemExists) {
        itemExists.quantity++;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.cartItems.find(
        (item: any) => item.id === action.payload
      );
      item.quantity++;
    },
    decrementQuantity: (state, action) => {
      const item = state.cartItems.find(
        (item: any) => item.id === action.payload
      );
      if (item.quantity === 1) {
        const index = state.cartItems.findIndex(
          (item: any) => item.id === action.payload
        );
        state.cartItems.splice(index, 1);
      } else {
        item.quantity--;
      }
    },
    removeFromCart: (state, action) => {
      const index = state.cartItems.findIndex(
        (item: any) => item.id === action.payload
      );
      state.cartItems.splice(index, 1);
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cart.actions;
export default cart.reducer;
