import axios from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { Category } from '../../types/category.types';
import { CATEGORY_API_URL } from '../../utils/constants';

export const fetchCategories = createAsyncThunk(
  'category/fetchAllCategory',
  async (): Promise<Category[]> => {
    const response = await axios.get(CATEGORY_API_URL);
    return response.data;
  },
);

export const fetchCategory = createAsyncThunk(
  'category/fetchCategory',
  async (id: number): Promise<Category> => {
    const response = await axios.get(`${CATEGORY_API_URL}/${id}`);
    return response.data;
  },
);
