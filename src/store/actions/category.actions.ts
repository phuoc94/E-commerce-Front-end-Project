import axios from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { Category } from '../../types/category.types';

const API_URL = 'https://api.escuelajs.co/api/v1/categories';

export const fetchCategories = createAsyncThunk(
  'fetchAllCategoryAsync',
  async (): Promise<Category[]> => {
    const response = await axios.get(API_URL);
    return response.data;
  },
);
