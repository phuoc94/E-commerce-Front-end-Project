import axios from 'axios';

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Category } from './category.types';

export interface CategoryState {
  categories: Category[];
  error: string | null;
  loading: boolean;
}

const initialState: CategoryState = {
  categories: [],
  error: null,
  loading: false,
};

export const fetchCategories = createAsyncThunk(
  'fetchAllCategoryAsync',
  async (): Promise<Category[]> => {
    const response = await axios.get(
      'https://api.escuelajs.co/api/v1/categories',
    );
    return response.data;
  },
);

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategories: (
      state: CategoryState,
      action: PayloadAction<Category[]>,
    ) => {
      return {
        ...state,
        categories: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      if (!(action.payload instanceof Error)) {
        state.categories = action.payload as Category[];
        state.loading = false;
      }
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      if (action.payload instanceof Error) {
        state.loading = false;
        state.error = action.payload.message;
      }
    });
  },
});

export const { setCategories } = categorySlice.actions;
export default categorySlice.reducer;
