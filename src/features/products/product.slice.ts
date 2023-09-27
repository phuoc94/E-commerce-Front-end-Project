import axios from 'axios';

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Product } from './product.types';

interface ProductState {
  products: Product[];
  product: Product | null;
  error: string | null;
  isLoading: boolean;
}

const initialState: ProductState = {
  products: [],
  product: null,
  error: null,
  isLoading: false,
};

export const fetchProducts = createAsyncThunk('fetchProducts', async () => {
  const data = await axios.get('https://api.escuelajs.co/api/v1/products');
  return data;
});

export const fetchProduct = createAsyncThunk(
  'fetchProduct',
  async (productId: string) => {
    const data = await axios.get(
      `https://api.escuelajs.co/api/v1/products/${productId}`,
    );
    return data;
  },
);

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
      state.product = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      if (!(action.payload instanceof Error)) {
        state.products = action.payload.data as Product[];
        state.isLoading = false;
      }
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      if (action.payload instanceof Error) {
        state.isLoading = false;
        state.error = action.payload.message;
      }
    });

    builder.addCase(fetchProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      if (!(action.payload instanceof Error)) {
        state.product = action.payload.data as Product;
        state.isLoading = false;
      }
    });
    builder.addCase(fetchProduct.rejected, (state, action) => {
      if (action.payload instanceof Error) {
        state.isLoading = false;
        state.error = action.payload.message;
      }
    });
  },
});

export const { setProducts, setCurrentProduct } = productSlice.actions;
export default productSlice.reducer;
