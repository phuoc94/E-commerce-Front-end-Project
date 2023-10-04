import { createSlice } from '@reduxjs/toolkit';

import { Product } from '../../types/product.types';

export type Item = Product & {
  quantity: number;
};

type CartState = {
  cartItems: Item[];
  totalItems: number;
  totalPrice: number;
  isLoading: boolean;
  error: string | undefined | null;
};

const initialState: CartState = {
  cartItems: [],
  totalItems: 0,
  totalPrice: 0,
  isLoading: false,
  error: null,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const index = state.cartItems.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (index !== -1) {
        state.cartItems[index].quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
      state.totalItems++;
      state.totalPrice += action.payload.price;
    },
    removeItemFromCart: (state, action) => {
      const index = state.cartItems.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (index !== -1) {
        state.cartItems[index].quantity -= 1;
        state.totalItems--;
        state.totalPrice -= action.payload.price;
      }
    },
  },
});

export const { addItemToCart, removeItemFromCart } = cartSlice.actions;

export default cartSlice.reducer;
