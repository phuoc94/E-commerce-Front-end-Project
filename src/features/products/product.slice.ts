import axios from 'axios';

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Product } from './product.types';

interface ProductState {
  products: Product[];
  currentProduct: Product | null;
  error: string | null;
  loading: boolean;
}

const initialState: ProductState = {
  products: [],
  currentProduct: null,
  error: null,
  loading: false,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state: ProductState, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    setCurrentProduct: (
      state: ProductState,
      action: PayloadAction<Product | null>,
    ) => {
      state.currentProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllProductAsync.fulfilled, (state, action) => {
      if (!(action.payload instanceof Error)) {
        state.products = action.payload.data as Product[];
        state.loading = false;
      }
    });
    builder.addCase(fetchAllProductAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllProductAsync.rejected, (state, action) => {
      if (action.payload instanceof Error) {
        state.loading = false;
        state.error = action.payload.message;
      }
    });
  },
});

export const fetchAllProductAsync = createAsyncThunk(
  'fetchAllProductAsync',
  async () => {
    try {
      const data = await axios.get('https://api.escuelajs.co/api/v1/products');
      return data;
    } catch (e) {
      const error = e as Error;
      return error;
    }
  },
);

export const { setProducts, setCurrentProduct } = productSlice.actions;
export default productSlice.reducer;
