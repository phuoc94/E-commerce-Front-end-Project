import { createSlice } from '@reduxjs/toolkit';

import { Category } from '../../types/category.types';
import { fetchCategories } from '../actions/category.actions';

export interface CategoryState {
  categories: Category[];
  error: string | null | undefined;
  isLoading: boolean;
}

const initialState: CategoryState = {
  categories: [],
  error: null,
  isLoading: false,
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default categorySlice.reducer;
