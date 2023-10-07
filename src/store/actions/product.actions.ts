import axios from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { Product } from '../../types/product.types';
import { CATEGORY_API_URL, PRODUCT_API_URL } from '../../utils/constants';

export interface AddProductRequest {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (product: AddProductRequest): Promise<Product> => {
    const response = await axios.post(PRODUCT_API_URL, product);
    return response.data;
  },
);

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (): Promise<Product[]> => {
    const response = await axios.get(PRODUCT_API_URL);
    return response.data;
  },
);

export const fetchProduct = createAsyncThunk(
  'products/fetchProduct',
  async (productId: string): Promise<Product> => {
    const response = await axios.get(`${PRODUCT_API_URL}/${productId}`);
    return response.data;
  },
);

export const fetchCategoryProducts = createAsyncThunk(
  'products/fetchCategoryProducts',
  async (id: number): Promise<Product[]> => {
    const response = await axios.get(`${CATEGORY_API_URL}/${id}/products`);
    return response.data;
  },
);
