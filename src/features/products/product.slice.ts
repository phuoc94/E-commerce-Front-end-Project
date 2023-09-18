import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Product } from './product.types';

interface ProductState {
  products: Product[];
  currentProduct: Product | null;
}

const initialState: ProductState = {
  products: [],
  currentProduct: null,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    setCurrentProduct: (state, action: PayloadAction<Product | null>) => {
      state.currentProduct = action.payload;
    },
  },
});

export const { setProducts, setCurrentProduct } = productSlice.actions;
export default productSlice.reducer;
