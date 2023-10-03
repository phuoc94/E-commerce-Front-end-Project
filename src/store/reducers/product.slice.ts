import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Product } from '../../types/product.types';
import {
  addProduct,
  fetchProduct,
  fetchProducts,
} from '../actions/product.actions';

interface ProductState {
  products: Product[];
  product: Product | null;
  error: string | null | undefined;
  isLoading: boolean;
}

const initialState: ProductState = {
  products: [],
  product: null,
  error: null,
  isLoading: false,
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
      state.product = action.payload as Product;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload as Product[];
      state.isLoading = false;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    builder.addCase(fetchProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.product = action.payload as Product;
      state.isLoading = false;
    });
    builder.addCase(fetchProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    builder.addCase(addProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.product = action.payload as Product;
      state.isLoading = false;
    });
    builder.addCase(addProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const { setProducts, setCurrentProduct } = productSlice.actions;
export default productSlice.reducer;
