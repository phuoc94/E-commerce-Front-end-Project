import { createSlice } from '@reduxjs/toolkit';

import { Product } from '../../types/product.types';

type Items = Product & {
  quantity: number;
};

type CardState = {
  cartItems: Items[];
  totalItems: number;
  totalPrice: number;
  isLoading: boolean;
  error: string | undefined | null;
};

const initialState: CardState = {
  cartItems: [],
  totalItems: 0,
  totalPrice: 0,
  isLoading: false,
  error: null,
};

export const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    addItemToCard: (state, action) => {
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
    removeItemFromCard: (state, action) => {
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

export const { addItemToCard, removeItemFromCard } = cardSlice.actions;

export default cardSlice.reducer;
