import { createSlice } from '@reduxjs/toolkit';

import { Product } from '../../types/product.types';

export type Item = Product & {
  quantity: number;
};

export type CartState = {
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
        state.totalItems -= state.cartItems[index].quantity;
        state.totalPrice -=
          state.cartItems[index].quantity * state.cartItems[index].price;
        state.cartItems.splice(index, 1);
      }
    },
    increaseItemQuantity: (state, action) => {
      const index = state.cartItems.findIndex(
        (item) => item.id === action.payload,
      );
      if (index !== -1) {
        state.cartItems[index].quantity += 1;
        state.totalItems++;
        state.totalPrice += state.cartItems[index].price;
      }
    },
    decreaseItemQuantity: (state, action) => {
      const index = state.cartItems.findIndex(
        (item) => item.id === action.payload,
      );
      if (index !== -1) {
        state.cartItems[index].quantity -= 1;
        state.totalItems--;
        state.totalPrice -= state.cartItems[index].price;
      }
    },
    setItemQuantity: (stata, action) => {
      const index = stata.cartItems.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (index !== -1) {
        stata.totalItems -= stata.cartItems[index].quantity;
        stata.totalPrice -=
          stata.cartItems[index].quantity * stata.cartItems[index].price;
        stata.cartItems[index].quantity = action.payload.quantity;
        stata.totalItems += stata.cartItems[index].quantity;
        stata.totalPrice +=
          stata.cartItems[index].quantity * stata.cartItems[index].price;
      }
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  increaseItemQuantity,
  decreaseItemQuantity,
  setItemQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
